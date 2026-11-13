/**
 * Shared single-loop requestAnimationFrame scheduler.
 * Allows the Hero background (60fps) and Site-wide background (30fps)
 * to share a single rAF loop, automatically pausing when the tab is hidden.
 */

export interface FrameSubscriber {
  id: string;
  targetFps: number;
  onFrame: (timestamp: number, dt: number) => void;
}

interface InternalSubscriber extends FrameSubscriber {
  lastRun: number;
}

class SharedAnimationLoop {
  private subscribers = new Map<string, InternalSubscriber>();
  private rafId: number | null = null;
  private isListeningVisibility = false;

  private handleVisibilityChange = () => {
    if (typeof document === 'undefined') return;
    if (document.visibilityState === 'hidden') {
      this.stopLoop();
    } else if (this.subscribers.size > 0) {
      // Reset timestamps to prevent dt jumps on resume
      this.subscribers.forEach((sub) => {
        sub.lastRun = 0;
      });
      this.startLoop();
    }
  };

  private ensureVisibilityListener() {
    if (typeof document === 'undefined' || this.isListeningVisibility) return;
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
    this.isListeningVisibility = true;
  }

  private cleanupVisibilityListenerIfIdle() {
    if (typeof document === 'undefined' || !this.isListeningVisibility) return;
    if (this.subscribers.size === 0) {
      document.removeEventListener('visibilitychange', this.handleVisibilityChange);
      this.isListeningVisibility = false;
    }
  }

  private tick = (timestamp: number) => {
    if (typeof document !== 'undefined' && document.visibilityState === 'hidden') {
      this.rafId = null;
      return;
    }

    this.subscribers.forEach((sub) => {
      const minInterval = 1000 / Math.max(1, sub.targetFps);
      if (sub.lastRun === 0) {
        sub.lastRun = timestamp;
        sub.onFrame(timestamp, 1 / Math.max(1, sub.targetFps));
        return;
      }

      const elapsedMs = timestamp - sub.lastRun;
      // 1ms tolerance avoids dropping from 30fps to 20fps on 60Hz panels
      if (elapsedMs >= minInterval - 1) {
        const dt = Math.min(elapsedMs / 1000, 0.1);
        sub.lastRun = timestamp;
        sub.onFrame(timestamp, dt);
      }
    });

    if (this.subscribers.size > 0) {
      this.rafId = requestAnimationFrame(this.tick);
    } else {
      this.rafId = null;
    }
  };

  private startLoop() {
    if (typeof window === 'undefined') return;
    if (typeof document !== 'undefined' && document.visibilityState === 'hidden') return;
    if (this.rafId === null && this.subscribers.size > 0) {
      this.rafId = requestAnimationFrame(this.tick);
    }
  }

  private stopLoop() {
    if (typeof window === 'undefined') return;
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  subscribe(sub: FrameSubscriber): () => void {
    this.ensureVisibilityListener();
    this.subscribers.set(sub.id, { ...sub, lastRun: 0 });
    this.startLoop();

    return () => {
      this.subscribers.delete(sub.id);
      if (this.subscribers.size === 0) {
        this.stopLoop();
      }
      this.cleanupVisibilityListenerIfIdle();
    };
  }
}

export const sharedAnimationLoop = new SharedAnimationLoop();
