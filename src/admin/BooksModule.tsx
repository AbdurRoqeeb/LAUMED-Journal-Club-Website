import { useState } from 'react';
import OrdersModule from './OrdersModule';
import ProductsModule from './ProductsModule';

export default function BooksModule() {
  const [tab, setTab] = useState<'orders' | 'products'>('orders');

  return (
    <div>
      <div className="mb-6 flex gap-2">
        {(['orders', 'products'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-lg px-4 py-2 text-sm font-semibold capitalize transition ${
              tab === t ? 'bg-brand text-white' : 'border border-line text-cream/80 hover:bg-white/5'
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      {tab === 'orders' ? <OrdersModule /> : <ProductsModule />}
    </div>
  );
}