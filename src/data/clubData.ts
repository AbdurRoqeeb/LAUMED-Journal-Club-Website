/**
 * LAUMED JOURNAL CLUB - Centralized Content Repository
 * Edit any section below to update site content without modifying UI layouts.
 */
import { LAUMED_VOL1_NO2_COVER, MEDIFICIAL_VOL2_NO1_COVER } from './issueCovers';

export interface JournalSession {
  id: string;
  monthYear: string; // e.g. "September 2026"
  year: number;
  title: string;
  topicTag: string;
  author: string;
  institution: string;
  date: string;
  excerpt: string;
  paragraphs: string[];
  imageUrl?: string;
  link?: string;
}

export interface JournalIssue {
  volume: number;
  issue: number;
  title: string;
  publicationDate: string;
  coverImagePlaceholder: string;
  editorialNote: string;
  articles: {
    id: string;
    title: string;
    authors: string[];
    type: string;
    pages: string;
    doi: string;
    abstract: string;
  }[];
}

export interface ArchiveIssueArticleAbstract {
  id: string;
  title: string;
  authors: string;
  affiliations?: string[];
  category: 'Editorial Article' | 'Guest Editorial Article';
  page: number;
  summaryLabel: 'Abstract' | 'Summary' | 'Opening Text (Introduction)';
  abstract: string;
  keywords?: string[];
}

export interface ArchiveIssueNonEditorialItem {
  title: string;
  author: string;
  page: number;
}

export interface ArchiveJournalIssue {
  id: string;
  editionLabel?: string;
  journal: string;
  title: string;
  volume: number;
  number: number;
  date: string;
  publishedAt: string;
  issn: string;
  pages: number;
  size: string;
  format: string;
  tagline: string;
  cover: string;
  coverWidth?: number;
  coverHeight?: number;
  file: string;
  downloadFilename: string;
  editorialPageRange?: string;
  guestEditorialPageRange?: string;
  nonEditorialPageRange?: string;
  nonEditorialDescription?: string;
  articles: {
    title: string;
    page: number;
  }[];
  pdfArticles: ArchiveIssueArticleAbstract[];
  nonEditorialContents?: ArchiveIssueNonEditorialItem[];
}

export interface ClubEvent {
  id: string;
  title: string;
  subtitle?: string;
  theme: string;
  status: 'upcoming' | 'past';
  isProvisional?: boolean;
  date: string; // ISO date for timer or display
  displayDate: string;
  time: string;
  venue: string;
  registrationFee?: string;
  isFlagship?: boolean;
  flyerUrl: string;
  description: string;
  highlights?: string[];
  highlightsTitle?: string;
  speakers?: {
    name: string;
    role?: string;
  }[];
  judges?: {
    name: string;
    title: string;
  }[];
  sponsor?: {
    name: string;
    title: string;
  };
  registrationOpen: boolean;
  registrationLink?: string;
  // Recap fields for past events
  recap?: {
    summary: string;
    keynoteSpeaker: {
      name: string;
      title: string;
      topic: string;
    };
    panelists: {
      name: string;
      affiliation: string;
    }[];
    reportDownloadUrl: string;
  };
}

export interface TeamMember {
  name: string;
  role: string;
  academicLevel?: string;
  photoPlaceholder: string;
  bio?: string;
}

export interface FacultyAdvisor {
  name: string;
  title?: string;
  department?: string;
  bio?: string;
}

export interface AppraisalToolLink {
  id: string;
  title: string;
  organization: string;
  category: string;
  description: string;
  officialUrl: string;
}

/* =========================================================================
   1. CLUB METADATA & STATS
   ========================================================================= */
export const CLUB_INFO = {
  name: "LAUMED Journal Club",
  tagline: "more is definitely better…",
  mission: "Fostering critical appraisal competence, evidence-based clinical reasoning, and cutting-edge biomedical research at LAUTECH, Ogbomoso.",
  location: "College of Health Sciences, Ladoke Akintola University of Technology, Ogbomoso, Oyo State, Nigeria",
  contact: {
    email: "laumedjc@gmail.com",
    phone: "08118908705",
    xHandle: "@LaumedC",
    xUrl: "https://x.com/LaumedC",
    mediumHandle: "@laumedjc",
    mediumUrl: "https://medium.com/@laumedjc"
  },
  stats: [
    { label: "Sessions Held", value: "[To be updated]", description: "Biweekly critical deliberations" },
    { label: "Members", value: "[To be updated]", description: "LAUTECH medical students" },
    { label: "Weekly Articles", value: "22+", description: "Published every Thursday on Medium" },
    { label: "Annual Journal", value: "Annual", description: "Medificial Intelligence (est. 2020 as LAUMED)" }
  ]
};

/* =========================================================================
   2. JOURNAL CLUB WEEKLY ARTICLES
   ========================================================================= */
export const JOURNAL_SESSIONS: JournalSession[] = [
  {
    id: "article-2026-09-10-glp1-obesity",
    monthYear: "September 2026",
    year: 2026,
    title: "A New Era in Obesity Management: Can GLP-1 Agonists Deliver on Their Promise?",
    topicTag: "Endocrinology",
    author: "LAUMED Journal Club",
    institution: "LAUMED Journal Club · Ladoke Akintola University of Technology",
    date: "10th September, 2026",
    excerpt:
      "This review examines the role of GLP-1 receptor agonists in modern obesity care, highlighting clinical trial outcomes alongside common gastrointestinal side effects, weight regain after stopping therapy and global affordability barriers. It concludes that lasting weight management requires integrating pharmacotherapy with structured nutritional, behavioural and lifestyle support rather than relying on medication alone.",
    paragraphs: [
      "This review examines the role of GLP-1 receptor agonists in modern obesity care, highlighting clinical trial outcomes alongside common gastrointestinal side effects, weight regain after stopping therapy and global affordability barriers. It concludes that lasting weight management requires integrating pharmacotherapy with structured nutritional, behavioural and lifestyle support rather than relying on medication alone."
    ],
    link: "https://medium.com/@laumedjc/a-new-era-in-obesity-management-can-glp-1-agonists-deliver-on-their-promise-07a7ada43ed7"
  },
  {
    id: "article-2026-09-04-adhd",
    monthYear: "September 2026",
    year: 2026,
    title: "Attention Deficit Hyperactivity Disorder (ADHD)",
    topicTag: "Mental Health & Psychiatry",
    author: "Zainab Akindele",
    institution: "LAUMED Journal Club · Ladoke Akintola University of Technology",
    date: "4th September, 2026",
    excerpt:
      "Attention deficit hyperactivity disorder (ADHD) is a disorder characterized by a pattern of extreme pervasive, persistent and debilitating inattention, overactivity and impulsivity [1]. It is one of the most common childhood neurobehavioural disorders with a prevalence of over 5% among school-age children globally [2].",
    paragraphs: [
      "Attention deficit hyperactivity disorder (ADHD) is a disorder characterized by a pattern of extreme pervasive, persistent and debilitating inattention, overactivity and impulsivity [1]. It is one of the most common childhood neurobehavioural disorders with a prevalence of over 5% among school-age children globally [2]. Despite growing global interest in the condition, data from low and middle income countries, particularly in sub-Saharan Africa, remains limited suggesting that ADHD is under-diagnosed and research capacity in these settings is constrained [2]. In Nigeria, series of school-based studies have been conducted to determine the prevalence and pattern of ADHD. A cross-sectional study of 1,112 primary school pupils aged 6-12 years in south-western Nigeria, Adewuya and Famuyiwa (2007) found that there is a prevalence of 8.7% using teacher and parent ratings [3]. An even more recent study in Ikot-Ekpene (semi-urban area in Akwa Ibom state) among 1,174 pupils aged 6-12 found a teacher-reported prevalence of 12.4% and parent-reported prevalence of 8.5%; hyperactive subtype was the most frequent on both informants [4].",
      "ADHD is usually diagnosed in school-age children but making the diagnosis is not straightforward as there are no clinical test available that can unquestionably correlate the symptoms. The definitive diagnosis is usually deduced from detailed clinical history gotten from informations provided by parents, teachers and mannerism seen in afflicted child [5]. ADHD is diagnosed according to the Diagnostic and Statistical Manual of Mental Disorders - Fourth Edition (DSM-IV), which defines three types of ADHD: Predominantly Inattentive, Predominantly Hyperactive-Impulsive, and Combined [6]. Therefore, ADHD has been employed as a diagnostic label for individuals who display symptoms such as restlessness, inability to stay focused, mood swings, temper tantrums, problems completing tasks, disorganization, inability to cope with stress, and impulsivity [5]. ADHD usually persists till adulthood and can be a risk factor for other mental health disorders. In children, psychiatric disorders that comorbid with ADHD include oppositional defiant disorder, conduct disorder, mood disorders (both unipolar and bipolar), anxiety disorders, and learning disorders [7].",
      "The exact etiology of ADHD remains unclear however, research suggests that it is primarily influenced by neurobiological and genetic factors [8]. The genetic and environmental risk appears to be associated with a range of neurodevelopmental and neuropsychiatric outcomes, not just ADHD [7]. The neurobiology of ADHD is not completely understood but structural and functional imaging studies suggest dysfunction in the fronto-subcortical pathways and imbalances between the dopaminergic and noradrenergic systems [7]. Conventional approach to the treatment of ADHD typically involves pharmacological therapy, behavioral interventions, and educational accommodations aimed at improving learning outcomes [9]. In recent years, the use of complementary and alternative medicine (CAM) has become increasingly popular in the management of ADHD symptoms [10]. CAM encompasses a range of treatment approaches, including dietary modifications, nutritional supplementation, herbal remedies, and homeopathy."
    ],
    imageUrl: "/assets/aistudio/photo_2026-11-12_23-46-50_d0258106.jpg"
  },
  {
    id: "article-2026-06-18-culinary-medicine",
    monthYear: "June 2026",
    year: 2026,
    title: "Culinary Medicine: Understanding the Impact of Meal Preparation on Health",
    topicTag: "Public Health & Policy",
    author: "Kaothar Oyeniran",
    institution: "LAUMED Journal Club · Ladoke Akintola University of Technology",
    date: "18th June, 2026",
    excerpt:
      "Healthy diet has been significantly highlighted to be one of the components of an healthy lifestyle [1]. Understanding and employing healthy lifestyle choices have been significantly associated with overall good health and mellowing with age [1].",
    paragraphs: [
      "Healthy diet has been significantly highlighted to be one of the components of an healthy lifestyle [1]. Understanding and employing healthy lifestyle choices have been significantly associated with overall good health and mellowing with age [1]. Most people are able to recognize the healthy food from the unhealthy food but understanding the content and the culinary skills that makes the healthy food still healthy is often not highlighted. Preparation of nutritious food with appropriate culinary skills and cultural appreciation for good meals reduces the occurrence of ill health and enhances the optimal growth and development [2]. Culinary Education is an emerging area in medical education addressing people’s knowledge on food and skills involved in it’s preparation [3]. Preparation of a meal plays an important role in obtaining its nutritious benefits. Meal preparation goes beyond basic cooking but also the understanding the properties of the food, meal planning and management of available food resources [3]. In an age where fast food has greatly influenced the development of basic culinary skills, educating and advocating for basic culinary education can help achieve better dietary and health quality. Less harmful cooking methods like steaming, grilling and roasting can help reduce intake of unhealthy fats and help preserve the food nutrients [3]. Home cooked meals with required culinary knowledge and skills have been associated with a lesser risk for overweight and obesity [3]. Programs directed towards nutrition education and improving eating habits and culinary skills should be made available to enhance its effectiveness [2,3].",
      "Adoption of culinary medicine is increasing in many medical institutions in various parts of the world as a practical and quite affordable skill, taught to medical students to improve their nutritional skills and patient’s nutrition care [4]. Different diets have been tailored to help patients with chronic diseases, preventing unnecessary restriction and unhealthy dietary habits [5]. For patients with chronic kidney disease, home made plant rich based diet, low animal protein diet has been key in its nutritional management [5]. “An initiative was created for US Veterans; Healthier Kidney through Kitchen Program” where dietitians teach veterans with chronic kidney disease healthy dietary choices and required skills for making theirs meals at home [5].",
      "The growing consumption of ultra-processed foods (UPFs) has emerged as a significant public health concern worldwide, with many individuals obtaining a substantial proportion of their daily caloric intake from these products [6]. Consumption of ultra-processed foods (UPFs) has been linked to multiple adverse health outcomes, including cancer, cardiovascular disease, and metabolic disorders, contributing to an increased risk of chronic disease [6]. This emphasizes the need for education on making informed dietary choices, improving culinary skills, and reviving home cooking practices [6]."
    ],
    imageUrl: "/assets/aistudio/photo_2026-11-12_23-46-55_27dce994.jpg"
  },
  {
    id: "article-2026-02-26-peritoneal-dialysis",
    monthYear: "February 2026",
    year: 2026,
    title: "Extending Survival in Chronic Kidney Disease: The Role and Limitation of Peritoneal Dialysis in Nigeria",
    topicTag: "Public Health & Policy",
    author: "Ofure Alfred",
    institution: "LAUMED Journal Club · Ladoke Akintola University of Technology",
    date: "26th February, 2026",
    excerpt:
      "Chronic kidney disease, according to WHO/PAHO is defined as the gradual long-term loss of kidney function where kidney become damaged and cannot filter waste and excess fluid from the blood effectively. It can also be defined as the estimated glomerular filtration rate of less than 60 ml/minute/1.73 m² persisting 3 months or more.",
    paragraphs: [
      "Chronic kidney disease, according to WHO/PAHO is defined as the gradual long-term loss of kidney function where kidney become damaged and cannot filter waste and excess fluid from the blood effectively. It can also be defined as the estimated glomerular filtration rate of less than 60 ml/minute/1.73 m² persisting 3 months or more. The global burden of disease reported that as at 2023, 788 million people, 20 years and above, were estimated to have chronic kidney disease globally while in Nigeria prevalence was projected to be about 16,000 people living with CKD and 31,000 deaths as at 2023. Definitive treatment modality for chronic kidney disease is renal replacement therapy which includes peritoneal dialysis, hemodialysis and renal transplantation². In the treatment of chronic kidney disease in Nigeria, hemodialysis takes the forefront and while this is not a bad treatment option it is however, not a sustainable treatment modality in Nigeria majorly due to its cost implication.",
      "Peritoneal dialysis is a process by which the abdominal lining is used as a natural filter to excrete body waste. It requires a sterilized solution which is introduced to the body by a catheter which absorbs the waste, generates waste filled fluid which is ultimately drained out. The process may be manual or automated, and the advantages of peritoneal dialysis includes enhanced opportunity for rehabilitation and return to employment. In addition, it does not require electricity, can be done by the patient at the comfort of the patient, and requires less cost compared to other interventions. The disadvantages includes the need for regular catheter care, increased frequency of dialysis, bloating, inability to obtain supplies (especially in low resource settings) and possibilities of infection.",
      "In Nigeria, peritoneal dialysis is not popularly used due to lack of peritoneal dialysis fluid, catheter inavailability, cost of fluids and other consumables, poor institutional support and limited trained personnel. This reasons however, do not excuse that chronic kidney disease is a growing non-communicable disease with a mean age affectation of approximately 46 years which is the economically productive population with a death rate of 80% within weeks of diagnosis due to late presentation at ward equipped facility and inability to sustain dialysis⁶.",
      "These problems can be surmounted if peritoneal dialysis fluid can be locally manufactured, government subsidy programs implemented with national policy on peritoneal dialysis, inclusion into the national health insurance scheme, training of medical personnels and application of tele-medicine in monitoring home dialysis. Nigeria does not suffer from just lack of dialysis technology but also from lack of sustainable dialysis model. Peritoneal dialysis represents a more feasible approach to extend survival of chronic kidney disease in resource limited environment."
    ],
    imageUrl: "/assets/aistudio/photo_2026-11-12_23-47-05_205f98fc.jpg"
  },
  {
    id: "article-2026-02-05-hypertension-staging",
    monthYear: "February 2026",
    year: 2026,
    title: "The Evolution of Hypertension Staging: From WHO/ISH Staging to Contemporary Guidelines",
    topicTag: "Cardiology",
    author: "Fareedah Agberemi",
    institution: "LAUMED Journal Club · Ladoke Akintola University of Technology",
    date: "5th February, 2026",
    excerpt:
      "According to the World Health Organization (WHO), an estimated 1.4 billion adults aged 30–79 years worldwide had hypertension in 2024 representing 33% of the world population in this age range. From its first detection independent of kidney disease by Frederick Akbar Mahomed in 1874, this non-communicable disease has gone through various investigations and consequently staging to facilitate accurate diagnosis, risk scaling and treatment decision making worldwide.",
    paragraphs: [
      "According to the World Health Organization (WHO), an estimated 1.4 billion adults aged 30–79 years worldwide had hypertension in 2024 representing 33% of the world population in this age range. From its first detection independent of kidney disease by Frederick Akbar Mahomed in 1874, this non-communicable disease has gone through various investigations and consequently staging to facilitate accurate diagnosis, risk scaling and treatment decision making worldwide. Before 1993, the main staging/classification of hypertension was made by the Joint National Committee on Detection, Evaluation and Treatment of Hypertension, and it was entirely based on diastolic blood pressure and end-organ damage. These stages were followed by the first major WHO/International Society of Hypertension guidelines in 1993, labelled as such due to their formalization of the treatment of mild, moderate, and severe hypertension and their connection to end-organ damage. This article examines the WHO/ISH classification systems, their clinical significance and the evolution towards current staging guidelines.",
      "The Early WHO/ISH guidelines (1989-1993): This were the third revision of the WHO/ISH guidelines and was ratified at the Sixth WHO/ISH Meeting on Mild Hypertension in Chantilly, France, on 28-31 March, 1993. These guidelines classified hypertension based on systolic blood pressure, assessed cardiovascular risk, recognised hypertension in the elderly as pathological and created a relationship between all of these and target organ damage, with stage 1 being no signs of end-organ damage and stage 3 with signs of more advanced TOD. It defined hypertension with both systolic and diastolic although recognised isolated systolic blood pressure as 140mmHg in contrast to the previous 160mmHg. Mild hypertension was 140-180/90-105mmHg, borderline 140-160/90-95mmHg and moderate to severe at >180/105mmHg. The downside of this staging was its complexity for general use and the requirement of excessive testing to prove end-organ damage. Other Early Hypertension Guidelines include; The 1990 WHO/ISH Revision and JNC-V's Concurrent Shift (1993).",
      "Recent Hypertension Guidelines has redefined the classification of hypertension with inclusion of lifestyle modification and global implemented guidelines.",
      "The American College of Cardiology/American Heart Association (ACC/AHA Guidelines (2017 and 2025) define hypertension as systolic blood pressure values of >/=130 mmHg and DBP >/= 80 mmHg, with the normal defined as systolic less 120 and diastolic less than 80 mmHg. In the 2025 guideline, there is emphasis on lifestyle modifications including the DASH diet as a first line of treatment and use of medication therapy to lower blood pressure if average blood pressure remains ≥130/80 mm Hg after an initial 3- to 6-month trial of lifestyle modification.",
      "International Society of Hypertension (2020): recognised hypertension as office systolic blood pressure ≥ 140 mmHg and/or diastolic blood pressure ≥ 90 mmHg following repeated examination. These guidelines were designed for implementation all around the world regardless of population or resources.",
      "Most recent guidelines identify that blood pressure in isolation from cardiovascular risk assessment is not sufficient as individuals with the same blood pressure may not necessarily be in the same stage depending on present risk factors, length of hypertension and end-organ-damage. They are vastly improved from the WHO/ISH guidelines from 1993 because they also integrate treatment recommendations.",
      "In general, these staging evolutions shed light on the increasing need to balance how fast hypertension is diagnosed and how specific its treatment should be globally."
    ],
    imageUrl: "/assets/aistudio/photo_2026-11-12_23-47-00_49a287d3.jpg"
  },
  {
    id: "article-2025-11-13-enteral-ventilation",
    monthYear: "November 2025",
    year: 2025,
    title: "Enteral Ventilation via Anus (EVA): A Potential Alternative to Mechanical Ventilation",
    topicTag: "Emergency & Critical Care",
    author: "Muntaqim Opabode",
    institution: "LAUMED Journal Club · Ladoke Akintola University of Technology",
    date: "13th November, 2025",
    excerpt:
      "Artificial respiratory support plays a very important role in the clinical management of respiratory failure. One alternative method for getting oxygen into the systemic circulation, known as \"Enteral ventilation via anus (EVA)\" has proven to be effective in respiratory-failure rat, mice and pig models.",
    paragraphs: [
      "The most important approach to ameliorate respiratory failure is by Improving hypoxia.",
      "Artificial respiratory support plays a very important role in the clinical management of respiratory failure. The currently available methods include, mechanical ventilation which is the most commonly used short-term life support technique worldwide and extracorporeal membrane oxygenation (ECMO), which is an alternative approach for critically ill patients. However, in addition to some complications which include but are not limited to; ventilator-induced lung injury, bleeding and thrombosis posed by the above methods of artificial respiration, some occurrences during the COVID-19 pandemic inspired the search for alternative methods of ventilation.",
      "One alternative method for getting oxygen into the systemic circulation, known as \"Enteral ventilation via anus (EVA)\" has proven to be effective in respiratory-failure rat, mice and pig models, in which it oxygenated the systemic circulation and ameliorated respiratory failure without any significant complications. Enteral ventilation via anus (EVA) is an enema-like procedure to deliver oxygen to the body through the distal gut. Using a liquid solvent called perfluorocarbons with extraordinary oxygen solubility, Okabe et al. showed that intrarectal administration of oxygenated perfluorocarbons led to systemic oxygenation in animals with respiratory failure.",
      "Furthermore, In studies with mice, those given low oxygen air survived eighteen minutes, but those getting gaseous oxygen directly to their colons lived for an extended period, up to fifty minutes.",
      "Also, mice in a low oxygen chamber receiving perfluorocarbon through the rectum fared much better than mice receiving just saline. Furthermore, in another study using pigs with respiratory failure, those given enemas with oxygenated perfluorocarbons lived for extended times and no significant side effects were observed.",
      "Perfluorocarbon, is a clear liquid with superhero-like powers to carry oxygen. In comparison with water which can dissolve about 10 mL of oxygen per L, perfluorodecalin can pack in 400-500 mL per L.",
      "In addition, in a phase 1a trial carried out in Japan by Takanori Takebe et al; Young men tolerated the anal administration of a liquid with high-capacity for oxygenation, known as perfluorodecalin. Among 27 men who received 25 mL to 1.5 L of perfluorodecalin, 20 were able to retain it within their intestines for 60 minutes. There's currently no study to test the efficacy of perfluorocarbons in human subjects, so it's not clear yet if oxygenated perfluorocarbons will actually drive oxygen into the bloodstream as intended. However, the liquid does have a high pressure that should help with the permeation process. Another limitation of this alternative method of oxygen delivery is its proposed cost.",
      "In conclusion, this discovery proposes another important function for the gut and research on how to fully integrate these amazing technique of systemic oxygen delivery into clinical practice are currently ongoing."
    ],
    imageUrl: "/assets/aistudio/photo_2026-11-12_23-47-15_833bb4ee.jpg"
  },
  {
    id: "article-2025-10-09-burnout-syndrome",
    monthYear: "October 2025",
    year: 2025,
    title: "Burnout Syndrome in Medical Training",
    topicTag: "Mental Health & Psychiatry",
    author: "Oluwatosin Afolayan",
    institution: "LAUMED Journal Club · Ladoke Akintola University of Technology",
    date: "9th October, 2025",
    excerpt:
      "Burnout syndrome is becoming a common challenge in medical education today. It is a state of physical, emotional and mental exhaustion that comes from prolonged stress and overwork. For many medical students and trainees, the heavy workload, clinical duties and emotional demands create an environment where burnout can easily develop.",
    paragraphs: [
      "Burnout syndrome is becoming a common challenge in medical education today. It is a state of physical, emotional and mental exhaustion that comes from prolonged stress and overwork. For many medical students and trainees, the heavy workload, clinical duties and emotional demands create an environment where burnout can easily develop.",
      "Medical training comes with long hours of study, frequent tests and intense hospital rotations. The pressure to always do well often makes students neglect rest, hobbies and social life. Over time, this constant demand drains enthusiasm and motivation. Many begin to feel detached, lose interest in their studies and sometimes doubt their own abilities.",
      "The effects go beyond the individual. Burnout reduces focus and empathy, increases mistakes and lowers the quality of patient care. On a larger scale, it affects the health of the future medical workforce, making it not only a personal concern but a public health issue.",
      "Solving burnout requires effort from both students and institutions. Medical schools can help by building supportive environments, providing access to counseling and encouraging mentorship. Reducing unnecessary academic pressure and creating room for open discussions about stress can also help.",
      "Students too must learn to care for themselves. Simple habits like getting enough sleep, eating well, exercising and setting healthy limits can make a big difference. Asking for help early should be seen as courage, not weakness.",
      "Burnout in medical training is real, but it can be prevented. A learning culture that values both excellence and well-being will produce doctors who are not only competent but also balanced, compassionate and capable of caring for others while staying healthy themselves."
    ],
    imageUrl: "/assets/aistudio/photo_2026-11-12_23-47-10_c83113ce.jpg"
  },
  {
    id: "article-2025-08-07-kangaroo-mother-care",
    monthYear: "August 2025",
    year: 2025,
    title: "Kangaroo Mother Care: Let's Strengthen Mother - Baby Bond",
    topicTag: "Obstetrics & Paediatrics",
    author: "Kaothar Oyeniran",
    institution: "LAUMED Journal Club · Ladoke Akintola University of Technology",
    date: "7th August, 2025",
    excerpt:
      "Kangaroo Mother Care (KMC), a growing incentive that involves continuous skin to skin contact of the infant with mother’s chest or chest of a substitute care giver when mother is not available, and encourages exclusive breastfeeding. The baby is unclothed, except for a nappy, and placed face down and upright on the mother's chest.",
    paragraphs: [
      "Kangaroo Mother Care (KMC), a growing incentive that involves continuous skin to skin contact of the infant with mother’s chest or chest of a substitute care giver when mother is not available, and encourages exclusive breastfeeding. The baby is unclothed, except for a nappy, and placed face down and upright on the mother's chest.",
      "The World Health Organization (WHO) advised on early and prolonged kangaroo mother care for low-birth-weight and preterm infants as it has been shown to reduce the risk of neonatal and infant death and to prevent infection. During the first 6 months after delivery, an estimated 15% to 33% of mothers experience anxiety and, during the first year after birth, around one fifth have postpartum depressive symptoms. This is more common in mothers whose baby are preterm or born with low birth weight. This incentive aims to reduce this mental burden on the parents. Skin-to-skin contact (SSC) that begins immediately after birth enhances the newborn's adaptation to extrauterine life. SSC plays a role in facilitating the release of oxytocin, physical contact, breastfeeding and the bonding process. Oxytocin, the cuddle chemical, helps to decrease stress and allows for relationship building. KMC has three main components: SSC; exclusive breastfeeding as much and for as long as possible; and early discharge and ambulatory care with regular follow-up visits at a health facility.",
      "SSC was initiated in Colombia, South America in the 1970s, and this method was used as a means to treat premature infants and babies with low birth weight. WHO recommends the adoption of SSC as part of routine care in order to stabilize the neonate's vital signs – body temperature, respiratory rate and heart rate – and to activate the infant's five senses, with development of the mother–infant bond.",
      "KMC, is an incentive that is bound to bring unlimited benefits to mother and her baby. It strengthens their bond, allows for better chances of survival in low birthweight and premature babies and reduces physiological stress. Thus, it’s practice should be advocated to explore the more benefit this incentive can offer."
    ],
    imageUrl: "/assets/aistudio/photo_2026-11-12_23-47-33_a5c8a4e8.jpg"
  },
  {
    id: "article-2025-05-29-cesarean-section",
    monthYear: "May 2025",
    year: 2025,
    title: "Cesarean Section",
    topicTag: "Obstetrics & Paediatrics",
    author: "Femi Amusa",
    institution: "LAUMED Journal Club · Ladoke Akintola University of Technology",
    date: "29th of May, 2025",
    excerpt:
      "A cesarean section (C-section) is a surgical method of childbirth involving incisions in the mother's abdomen and uterus. It is an essential procedure in modern obstetrics, significantly contributing to the reduction of maternal and perinatal mortality and morbidity, particularly in cases where vaginal delivery presents substantial risks.",
    paragraphs: [
      "A cesarean section (C-section) is a surgical method of childbirth involving incisions in the mother's abdomen and uterus. It is an essential procedure in modern obstetrics, significantly contributing to the reduction of maternal and perinatal mortality and morbidity, particularly in cases where vaginal delivery presents substantial risks. The significance of cesarean sections is particularly evident in managing complications such as obstructed labor, fetal distress, placenta previa, and uterine rupture, where the procedure can be lifesaving for both the mother and the baby. Cesarean delivery rates have been steadily increasing globally, with 2016 data indicating rates of 24.5% in Western Europe, 32% in North America, and 41% in South America. Cesarean delivery plays a crucial role in reducing maternal and perinatal mortality and morbidity in cases of maternal or fetal complications. However, a growing number of cesarean births occur without any medical or obstetric indication. In high-income countries, advancements in medical care have significantly reduced the short-term risks of cesarean delivery, such as infection, hemorrhage, visceral injury, and venous thromboembolism, making it as safe as vaginal delivery. However, in low- and middle-income countries, cesarean delivery without a medical indication is associated with a higher risk of adverse short-term maternal outcomes. Nevertheless, the long-term risks and benefits of cesarean delivery for the mother, baby, and future pregnancies are rarely discussed with women, and there are limited randomized controlled trials (RCTs) exploring these aspects.",
      "For newborns, cesarean delivery presents both advantages and potential risks. It can help prevent birth trauma, especially in cases of breech presentation and fetal macrosomia, where vaginal delivery may pose significant challenges. However, research indicates that infants delivered via cesarean section may have a higher risk of developing respiratory distress syndrome and experiencing alterations in gut microbiota. These changes can potentially impact immune system development and have been linked to an increased likelihood of conditions such as asthma and obesity later in life. Beyond the immediate effects, cesarean sections can influence future pregnancies. Women with a history of C-sections face a higher risk of uterine rupture, abnormal placentation (such as placenta accreta), and stillbirth. Moreover, in cases of multiple gestations, particularly when the leading twin is not in a cephalic presentation, a C-section may provide a safer option to achieve better neonatal outcomes. C-sections are also essential for maternal safety. In conditions such as preeclampsia or eclampsia, where prolonged labor may worsen hypertension and elevate the risk of stroke or organ failure, a timely C-section can be lifesaving by preventing severe complications. Likewise, in cases of placenta previa or placental abruption, where vaginal delivery poses a high risk of severe hemorrhage, C-sections serve as a crucial intervention to prevent life-threatening blood loss and ensure maternal and fetal safety. Given these considerations, medical professionals stress the importance of a balanced approach, ensuring that C-sections are performed only when medically necessary to achieve the best possible maternal and neonatal health outcomes."
    ],
    imageUrl: "/assets/aistudio/photo_2026-11-12_23-47-26_0057a031.jpg"
  },
  {
    id: "article-2025-05-22-health-insurance-lmics",
    monthYear: "May 2025",
    year: 2025,
    title: "Review of Health Insurance in Low-Middle Income Countries (LMICs)",
    topicTag: "Public Health & Policy",
    author: "AbdulRahman Moradeyo",
    institution: "LAUMED Journal Club · Ladoke Akintola University of Technology",
    date: "22nd of May, 2025",
    excerpt:
      "In low- and middle-income countries (LMICs), health Insurance plays a vital role in increasing access to medical care, and financial protection in healthcare services. However, because of inadequate insurance coverage and high out-of-pocket (OOP) costs, a sizable part of the population still struggles to access affordable healthcare services.",
    paragraphs: [
      "In low- and middle-income countries (LMICs), health Insurance plays a vital role in increasing access to medical care, and financial protection in healthcare services. However, because of inadequate insurance coverage and high out-of-pocket (OOP) costs, a sizable part of the population still struggles to access affordable healthcare services. The healthcare system in many LMICs is mostly dependent on OOP payments, which frequently forces people and families to incur unaffordable medical bills. For instance, OOP payments make up over 70% of all medical expenses in Nigeria, which is far higher than the 30% threshold advised by the World Health Organization (WHO). Particularly for the poor and vulnerable groups, this heavy financial burden results in inferior health outcomes, delayed treatment-seeking behavior, and decreased use of healthcare services.",
      "For these reasons, LMICs have implemented health insurance schemes targeted at lowering direct healthcare expenses. Community-Based Health Insurance (CBHI) schemes and National Health Insurance Schemes (NHIS) have emerged as critical strategies. Rwanda and Ghana have effectively implemented similar approaches to increase healthcare affordability and coverage, particularly among rural populations and workers in the informal sector. Despite these efforts, WHO estimates that less than half of Africans have any sort of health insurance. OOP payments continue to account for approximately 30% of the continent's healthcare spending. Furthermore, demographic health surveys show that nations like Nigeria and South Africa have poor insurance penetration. In 2018, only 2.8% of Nigerians have insurance, whereas South Africa had 13.3% in 2016.",
      "Achieving Universal Health Coverage (UHC), a cornerstone of the Sustainable Development Goals (SDGs), depends heavily on the expansion of equitable and sustainable health insurance systems. To this end, many LMICs are incorporating UHC objectives into their national health plans, with a focus on expanding insurance coverage. Nonetheless, challenges such as weak infrastructure, limited government funding, and fragmented health systems hinder progress. For LMICs to make substantial gains, coordinated policies, increased public investment, and inclusive insurance designs tailored to local contexts are essential and paramount."
    ],
    imageUrl: "/assets/aistudio/photo_2026-11-12_23-47-21_27558d5f.jpg"
  },
  {
    id: "article-2025-05-16-malnutrition-diabetes",
    monthYear: "May 2025",
    year: 2025,
    title: "Malnutrition-Related Diabetes",
    topicTag: "Endocrinology",
    author: "Muntaqim Opabode",
    institution: "LAUMED Journal Club · Ladoke Akintola University of Technology",
    date: "16th of May, 2025",
    excerpt:
      "Malnutrition-related diabetes distinct from type 1 and type 2 diabetes has now been officially recognized and named \"type 5 diabetes\". It is said to be due to malnutrition-induced suppression of insulin. The condition was first described in Jamaica in 1955.",
    paragraphs: [
      "Diabetes mellitus (DM) is a metabolic disorder resulting from a defect in insulin secretion, insulin action, or both. Insulin deficiency in turn leads to chronic hyperglycemia, with disturbances of carbohydrate, fat and protein metabolism.",
      "In 2024, it was found that around 589 million adults aged 20-79 years were living with diabetes and about 81% of adults with diabetes live in low- and middle-income countries.",
      "Malnutrition-related diabetes distinct from type 1 and type 2 diabetes has now been officially recognized and named \"type 5 diabetes\". It is said to be due to malnutrition-induced suppression of insulin. The condition was first described in Jamaica in 1955. It is most commonly seen in young men in low-and middle-income countries who have a body mass index (BMI) < 19.",
      "The condition has been neglected for decades in research, and often misdiagnosed as type 1 diabetes, but there is absence of ketonuria or ketosis, despite the high level of glucose and high insulin requirements in contrast to type 1. The official endorsement of this category happened during the last International Diabetes Foundation's (IDF's) world diabetes congress, that took place in Bangkok on the 8th of April, 2025.",
      "In order to know more about the etiology, diagnostic methods, clinical features and develop therapeutic guidelines for type 5 diabetes, a working group was created during the 2025 IDF's world diabetes congress. The group has been tasked to achieve these by the year 2027.",
      "This discovery has made us understand that, as obesity is a risk factor for diabetes, malnutrition can as well be a risk factor for the condition."
    ],
    imageUrl: "/assets/aistudio/photo_2026-11-12_23-47-48_68c05797.jpg"
  },
  {
    id: "article-2025-04-24-lazarus-phenomenon",
    monthYear: "April 2025",
    year: 2025,
    title: "The Lazarus Phenomenon: An Unexplained Medical Mystery",
    topicTag: "Emergency & Critical Care",
    author: "Abdulhamid Alamu",
    institution: "LAUMED Journal Club · Ladoke Akintola University of Technology",
    date: "April 24, 2025",
    excerpt:
      "The Lazarus phenomenon, named after the biblical story of Lazarus being resurrected by Jesus, refers to the rare and mysterious occurrence of a person returning to life after resuscitation efforts have been deemed unsuccessful. This phenomenon is defined as the spontaneous return of circulation and, in some cases, a heartbeat after failed attempts to resuscitate a person who has been declared clinically dead.",
    paragraphs: [
      "The Lazarus phenomenon, named after the biblical story of Lazarus being resurrected by Jesus, refers to the rare and mysterious occurrence of a person returning to life after resuscitation efforts have been deemed unsuccessful. This phenomenon is defined as the spontaneous return of circulation and, in some cases, a heartbeat after failed attempts to resuscitate a person who has been declared clinically dead.",
      "This phenomenon typically happens in a situation where a patient has been declared dead, following the cessation of heart activity and other vital signs. Still, it suddenly shows signs of life, such as movement, breathing, or a pulse return. These occurrences are exceedingly rare, with only a few documented cases worldwide. The causes of the Lazarus phenomenon include: delayed reperfusion (Ischemic Reperfusion Injury), post-resuscitation recovery, hypothermia, and spontaneous recovery from cardiac arrest. While the Lazarus phenomenon is scarce, there have been a few well-known instances of people who were declared dead but later revived:",
      "The case of a 25-year-old man in the UK (2007) who was in a cardiac arrest for 45 minutes and had no signs of life for several minutes was declared dead. However, after being transported to the morgue, he was found to have spontaneously revived, with his heart beating once again. Another case was recorded in Canada (2010); a woman who suffered a cardiac arrest and was declared clinically dead was transported to the morgue. After approximately 10 minutes, she was found to have regained a pulse and respiration. A similar case of a 65-year-old woman was also recorded in 2016.",
      "Some medical and ethical considerations of this phenomenon are accurate determination of death, risk of premature declaration of death, emotional and psychological impact on family members, legal implications, and ethical dilemma in the management of resuscitation efforts. While fascinating and mysterious, the Lazarus phenomenon sheds light on the limitations of our understanding of death and the body’s response to resuscitation. Despite the rare nature of this occurrence, it challenges existing medical protocols and serves as a reminder of the complexity of life, death, and the human body's capacity for recovery. Further research and advanced medical technologies will likely continue to explore the mechanisms behind this phenomenon."
    ],
    imageUrl: "/assets/aistudio/photo_2026-11-12_23-47-42_dff57fba.jpg"
  },
  {
    id: "article-2025-04-10-phytotherapy-mental-health",
    monthYear: "April 2025",
    year: 2025,
    title: "The Relationship Between Phytotherapy and Mental Health",
    topicTag: "Mental Health & Psychiatry",
    author: "Abdulbasit Muili",
    institution: "LAUMED Journal Club · Ladoke Akintola University of Technology",
    date: "April 10, 2025",
    excerpt:
      "Mental health is a broad term that encompasses our emotional, psychological, and social well-being, impacting how we think, feel, and react to events in our social and emotional lives. Phytotherapy, on the other hand, refers to the use of plant-derived compounds in the treatment and prevention of diseases.",
    paragraphs: [
      "Did you know that the herbal plant ginseng exhibits antidepressant-like effects on the body and may one day serve as a trustworthy source of antidepressant drugs used to treat mental disorders?",
      "Mental health is a broad term that encompasses our emotional, psychological, and social well-being, impacting how we think, feel, and react to events in our social and emotional lives. Phytotherapy, on the other hand, refers to the use of plant-derived compounds in the treatment and prevention of diseases. It is a science-based medical practice that is significantly different from more conventional ways. It is a globally recognized form of treatment.",
      "Phytotherapy and mental health are inextricably linked, as plant-derived drugs are now employed to treat mental diseases. Certain plants include vitamins and minerals that are extremely beneficial for healing mental problems. Scientists have discovered that a variety of vitamins and minerals can assist in improving our mental wellness. Vitamin B3, vitamin B1, vitamin B6, vitamin B2, and vitamin A are all extremely important, as are trace elements like copper, manganese, zinc, and calcium. These extremely beneficial vitamins and minerals are abundant in plant bodies. Vitamin B12 is necessary for the brain and nerves to operate properly (an important factor that influences emotions and anxiety). Vitamin B3 promotes appropriate nervous system function; it also improves memory and mood. Vitamin D is also one of the vitamins that aid in the enhancement of emotions and the prevention of depression.",
      "Numerous phytotherapeutic formulations are used in the treatment of mental diseases. Notable among these is a preparation made from the leaves of ginkgo (ginkgo biloba) that is used to treat a variety of mild cognitive impairments and certain central nervous system illnesses. Additionally, it improves blood flow to the brain and functions as an antioxidant.",
      "Other treatments, such as the aerial part of St. John's wort (hypericum perforatum: St. johnswort), include vitamin D, which is quite effective in the treatment of mild to moderate depression.",
      "Finally, phytotherapy has a significant role in mental health, and the goal of achieving stable mental health can be accomplished by encouraging the use of phytotherapy in various health systems."
    ],
    imageUrl: "/assets/aistudio/photo_2026-11-12_23-47-37_92fe02ab.jpg"
  },
  {
    id: "article-2024-08-01-natural-history-rare-diseases",
    monthYear: "August 2024",
    year: 2024,
    title: "Exploring the Potential of Natural History Studies in Africa: Unveiling Insights for Innovative Therapies and Interventions for Rare Diseases",
    topicTag: "Public Health & Policy",
    author: "Abdulbasit Muili",
    institution: "LAUMED Journal Club · Ladoke Akintola University of Technology",
    date: "1st August, 2024",
    excerpt:
      "This article discusses how natural history studies across Africa can strengthen evidence on genetically linked rare diseases and guide targeted interventions. It highlights the need for coordinated multi-faceted strategies to overcome the challenges posed by low condition prevalence.",
    paragraphs: [
      "This article discusses how natural history studies across Africa can strengthen evidence on genetically linked rare diseases and guide targeted interventions. It highlights the need for coordinated multi-faceted strategies to overcome the challenges posed by low condition prevalence."
    ],
    link: "https://medium.com/@laumedjc/exploring-the-potential-of-natural-history-studies-in-africa-unveiling-insights-for-innovative-75e25ca3b85f"
  },
  {
    id: "article-2024-07-18-maternal-vaccination",
    monthYear: "July 2024",
    year: 2024,
    title: "Maternal Vaccination: Protecting Both Mother and Baby",
    topicTag: "Obstetrics & Paediatrics",
    author: "Zainab Akindele",
    institution: "LAUMED Journal Club · Ladoke Akintola University of Technology",
    date: "18th July, 2024",
    excerpt:
      "Maternal immunisation shields both expectant mothers and newborns from severe vaccine-preventable infections through the vertical transfer of protective antibodies. The piece traces the clinical rationale behind routine pregnancy vaccines such as tetanus, influenza and pertussis alongside broader household protection.",
    paragraphs: [
      "Maternal immunisation shields both expectant mothers and newborns from severe vaccine-preventable infections through the vertical transfer of protective antibodies. The piece traces the clinical rationale behind routine pregnancy vaccines such as tetanus, influenza and pertussis alongside broader household protection."
    ],
    link: "https://medium.com/@laumedjc/maternal-vaccination-protecting-both-mother-and-baby-97f813839b73"
  },
  {
    id: "article-2024-07-04-cholera-lagos",
    monthYear: "July 2024",
    year: 2024,
    title: "Recent Cholera Outbreak in Lagos",
    topicTag: "Public Health & Policy",
    author: "Abdulrahmon Moradeyo",
    institution: "LAUMED Journal Club · Ladoke Akintola University of Technology",
    date: "4th July, 2024",
    excerpt:
      "Examining the June 2024 Vibrio cholerae O1 outbreak in Lagos State, this report outlines confirmed local case counts, epicentre patterns and wider national surveillance figures. It reviews the transmission mechanisms and underlying environmental drivers behind the public health emergency.",
    paragraphs: [
      "Examining the June 2024 Vibrio cholerae O1 outbreak in Lagos State, this report outlines confirmed local case counts, epicentre patterns and wider national surveillance figures. It reviews the transmission mechanisms and underlying environmental drivers behind the public health emergency."
    ],
    link: "https://medium.com/@laumedjc/recent-cholera-outbreak-in-lagos-0a3440617a18"
  },
  {
    id: "article-2024-06-20-antimicrobial-resistance",
    monthYear: "June 2024",
    year: 2024,
    title: "Combating Antimicrobial Resistance",
    topicTag: "Public Health & Policy",
    author: "Oluwafemi Amusa",
    institution: "LAUMED Journal Club · Ladoke Akintola University of Technology",
    date: "20th June, 2024",
    excerpt:
      "This piece explores how inappropriate use and over-prescription of antibiotics, antivirals and antifungals accelerate pathogen resistance worldwide. It outlines practical steps individuals and healthcare systems can take to preserve antimicrobial effectiveness.",
    paragraphs: [
      "This piece explores how inappropriate use and over-prescription of antibiotics, antivirals and antifungals accelerate pathogen resistance worldwide. It outlines practical steps individuals and healthcare systems can take to preserve antimicrobial effectiveness."
    ],
    link: "https://medium.com/@laumedjc/combating-antimicrobial-resistance-caf06d1a9b60"
  },
  {
    id: "article-2024-05-30-pig-to-human-heart-transplant",
    monthYear: "May 2024",
    year: 2024,
    title: "Pig-to-Human Heart Transplant",
    topicTag: "Cardiology",
    author: "Bright Oguntola",
    institution: "LAUMED Journal Club · Ladoke Akintola University of Technology",
    date: "30th May, 2024",
    excerpt:
      "Addressing the persistent global shortage of donor organs, this article examines the milestone porcine-to-human heart xenotransplant performed under compassionate-use approval. It considers the immunological challenges of organ rejection and what early clinical cases mean for future transplant trials.",
    paragraphs: [
      "Addressing the persistent global shortage of donor organs, this article examines the milestone porcine-to-human heart xenotransplant performed under compassionate-use approval. It considers the immunological challenges of organ rejection and what early clinical cases mean for future transplant trials."
    ],
    link: "https://medium.com/@laumedjc/pig-to-human-heart-transplant-1f39d6905410"
  },
  {
    id: "article-2024-05-23-personalised-medicine",
    monthYear: "May 2024",
    year: 2024,
    title: "Personalised Medicine and Healthcare",
    topicTag: "Public Health & Policy",
    author: "Oluwatosin Afolayan",
    institution: "LAUMED Journal Club · Ladoke Akintola University of Technology",
    date: "23rd May, 2024",
    excerpt:
      "This review explores how genomic and epigenetic profiling is shifting clinical practice away from uniform treatment protocols toward care tailored to each patient. Alongside applications in precision oncology and cardiology, it reflects on the ethical, legal and data-privacy questions raised by personalised healthcare.",
    paragraphs: [
      "This review explores how genomic and epigenetic profiling is shifting clinical practice away from uniform treatment protocols toward care tailored to each patient. Alongside applications in precision oncology and cardiology, it reflects on the ethical, legal and data-privacy questions raised by personalised healthcare."
    ],
    link: "https://medium.com/@laumedjc/personalised-medicine-and-healthcare-2cbc35d21188"
  },
  {
    id: "article-2024-05-09-art-therapy-cancer",
    monthYear: "May 2024",
    year: 2024,
    title: "Art Therapy: A Creative Approach to Cancer Treatment",
    topicTag: "Mental Health & Psychiatry",
    author: "Ofure Alfred",
    institution: "LAUMED Journal Club · Ladoke Akintola University of Technology",
    date: "9th May, 2024",
    excerpt:
      "This article looks at how visual art therapy complements conventional oncology care by easing cancer-related fatigue, anxiety and emotional distress. It explains the distinct therapeutic approaches used to support patients' psychological resilience during treatment.",
    paragraphs: [
      "This article looks at how visual art therapy complements conventional oncology care by easing cancer-related fatigue, anxiety and emotional distress. It explains the distinct therapeutic approaches used to support patients' psychological resilience during treatment."
    ],
    link: "https://medium.com/@laumedjc/art-therapy-a-creative-approach-to-cancer-treatment-87830ccf5089"
  },
  {
    id: "article-2024-05-02-acupuncture-surgery",
    monthYear: "May 2024",
    year: 2024,
    title: "Benefits of Acupuncture in Surgery",
    topicTag: "Emergency & Critical Care",
    author: "Muntaqim Opabode",
    institution: "LAUMED Journal Club · Ladoke Akintola University of Technology",
    date: "2nd May, 2024",
    excerpt:
      "Drawing on principles of Traditional Chinese Medicine, this review evaluates how perioperative acupuncture may help relieve preoperative anxiety and reduce intraoperative anaesthetic and opioid requirements. It considers evidence for integrating acupuncture alongside standard surgical care.",
    paragraphs: [
      "Drawing on principles of Traditional Chinese Medicine, this review evaluates how perioperative acupuncture may help relieve preoperative anxiety and reduce intraoperative anaesthetic and opioid requirements. It considers evidence for integrating acupuncture alongside standard surgical care."
    ],
    link: "https://medium.com/@laumedjc/benefits-of-acupuncture-in-surgery-103c508161f6"
  },
  {
    id: "article-2024-04-18-acute-leukemia-psychological",
    monthYear: "April 2024",
    year: 2024,
    title: "Psychological Effects of Acute Leukemia and Chemotherapy on Patients and Caregivers",
    topicTag: "Mental Health & Psychiatry",
    author: "Felix Ajibade",
    institution: "LAUMED Journal Club · Ladoke Akintola University of Technology",
    date: "18th April, 2024",
    excerpt:
      "This article highlights the often-overlooked burden of anxiety and depression experienced by acute leukaemia patients, survivors and their families during chemotherapy. It emphasises the importance of assessing quality of life and providing psychosocial support, particularly for children and adolescents.",
    paragraphs: [
      "This article highlights the often-overlooked burden of anxiety and depression experienced by acute leukaemia patients, survivors and their families during chemotherapy. It emphasises the importance of assessing quality of life and providing psychosocial support, particularly for children and adolescents."
    ],
    link: "https://medium.com/@laumedjc/psychological-effects-of-acute-leukemia-and-chemotherapy-on-patients-and-caregivers-f474eb3945e0"
  }
];

/* =========================================================================
   3. "MEDIFICIAL INTELLIGENCE" JOURNAL & SUBMISSION GUIDELINES (STYLE GUIDE JUNE 2020)
   ========================================================================= */
export const JOURNAL_INFO = {
  name: "Medificial Intelligence",
  subtitle: "Official Annual Journal of LAUMED Journal Club · First launched in 2020 as LAUMED",
  issn: "ISSN: 2705-3709 (2020 Archive)",
  frequency: "Annual publication",
  description:
    "Medificial Intelligence is the official annual peer-reviewed journal of LAUMED Journal Club at the College of Health Sciences, LAUTECH, Ogbomoso. First launched in 2020 under the title LAUMED (Journal of the Ladoke Akintola University Medical Students' Association), the annual publication provides a platform for members to contribute to academic writing, collaborative research, literature reviews, creative work and the dissemination of knowledge.",
  aimsAndScope: [
    "Medical review articles and original research authored collaboratively by medical students and faculty.",
    "Literature reviews, critical appraisal of clinical evidence and public health commentary.",
    "Biographical explorations of influential individuals whose discoveries have positively impacted humanity.",
    "Non-fiction commentary on healthcare, medical education and relevant societal matters.",
    "Poetry and short fiction aligned with each forthcoming issue's editorial theme."
  ],
  articleTypes: [
    { type: "Original Research", wordCount: "Abstract ≤ 200 words", description: "Original research articles with a compulsory abstract (up to 200 words) and at least three keywords." },
    { type: "Medical Review Article", wordCount: "Flexible length", description: "Scholarly medical reviews examining clinical topics; an abstract may or may not be included." },
    { type: "Non-Fiction", wordCount: "No set minimum or maximum", description: "Essays, commentaries and perspectives on medical and societal issues with no length restriction." },
    { type: "Fiction", wordCount: "300–2,000 words", description: "Original unpublished creative fiction between 300 and 2,000 words." },
    { type: "Poetry", wordCount: "10–40 lines", description: "Unpublished poetry between ten and forty lines, with priority given to pieces matching the forthcoming issue theme." }
  ],
  submissionGuidelines: [
    "Forward all manuscript submissions to Laumedjc@gmail.com.",
    "Write in a clear, active style using British English unless otherwise specified; any other language cancels the submission.",
    "Submissions must be unpublished, original (not translated or adapted), formatted in Times New Roman size 12 with single spacing.",
    "Include an author biography in the third person (maximum 100 words), stating any executive position, accompanied by a photograph.",
    "Follow the APA Referencing Guide with in-text citations (author surname and year) and an alphabetical reference list."
  ],
  styleGuide: {
    versionLabel: "Style Guide as at June 2020",
    submissionEmail: "Laumedjc@gmail.com",
    pdfUrl: "/files/LAUMED-JC-Style-Guide-June-2020.pdf",
    pdfFilename: "LAUMED-JC-Style-Guide-June-2020.pdf",
    groups: [
      {
        id: "general-style",
        letter: "a",
        title: "General Writing Style",
        summary: "Clear active prose, British English, originality and manuscript formatting.",
        points: [
          "Write in a clear and active style; preferred dictionaries are Merriam-Webster Dictionary for general usage and Stedman's Medical Dictionary for medical terms.",
          "Always use British English unless specified. Any other language will cancel the submission.",
          "All entries must be unpublished, not translated or adapted; the author must be the rightful owner of the text submitted.",
          "Include an author biography with all submissions.",
          "Prepare submissions with single spacing in Times New Roman, font size 12."
        ]
      },
      {
        id: "poetry",
        letter: "b",
        title: "Poetry",
        summary: "Unpublished poetry between 10 and 40 lines.",
        points: [
          "Submit unpublished poetry between 10 and 40 lines (ten to forty lines).",
          "Priority and greater consideration are given to entries aligned with the theme of a forthcoming issue."
        ]
      },
      {
        id: "fiction",
        letter: "c",
        title: "Fiction",
        summary: "300 to 2,000 words.",
        points: [
          "All fiction submissions must be at least 300 words and no more than 2,000 words."
        ]
      },
      {
        id: "non-fiction",
        letter: "d",
        title: "Non-Fiction",
        summary: "No minimum or maximum length.",
        points: [
          "There is no set minimum length or maximum length for non-fiction submissions."
        ]
      },
      {
        id: "medical-articles",
        letter: "e",
        title: "Medical Review & Original Articles",
        summary: "Title placement, 200-word abstract limit, 3+ keywords and section order.",
        points: [
          "The title must be centred at the top of the first page and should not be italicised or underlined.",
          "Abstract of no more than 200 words with at least three keywords for original articles (compulsory for every original research work without exception; optional for review articles).",
          "Organise manuscripts strictly in the following sequence:"
        ],
        orderedSequence: [
          "Title",
          "Name(s) of author(s)",
          "Email of corresponding author",
          "Complete correspondence address",
          "Abstract",
          "Keywords",
          "Body",
          "References"
        ]
      },
      {
        id: "formatting-conventions",
        letter: "f",
        title: "Formatting Conventions",
        summary: "Names, abbreviations, acronyms, dates, numerals, quotations, capitalisation & vernacular.",
        points: [
          "Names: arrange as First Name, Middle Name (if any) and Last Name/Surname (e.g. Tammy Donald Reuben).",
          "Abbreviations & contractions: abbreviations take a full point, contractions do not (Mr; Dr; p.; the Hon. Boring vs. the Rt Hon. Boring). 'No.' (as in number) takes a full point.",
          "Initials & acronyms: all caps with no full points (UN, EU, NEPAD, UNHCR, ASEAN; never Nato or Gatt). Spell out unfamiliar organisations on first use with the acronym in parentheses; if mentioned only once, use the full name without an acronym.",
          "Capitalisation: capitalise the first letter of names of people, places and organisations; never capitalise words for emphasis.",
          "Dates and numerals: write dates as '6 January 2001' (abbreviate months in footnotes: Jan. Feb. March April May June July Aug. Sept. Oct. Dec.); write '1990s' with no apostrophe (not 'the nineties'). Use en-dashes in year/page ranges and elide except for teens and after a zero (1946–7, 1900–1907, 1999–2001, 11–12, 60–61, 100–108, 107–27). Write '13 per cent' in text and '13%' in tables and footnotes. Spell out numbers from one to twelve and ordinals (except century names such as nineteenth century, or nineteenth-century as adjective), using figures thereafter; spell out units (kilometres, kilograms) in text; use commas in thousands (3,569); hyphenate adjectival measurements (an 18,000-tonne ship); set CE/BCE or AD/BC in small caps.",
          "Quotations: use double quotation marks at all times, reserving single quotation marks solely for a quote within a quote.",
          "Vernacular: italicise words from languages besides English (e.g. Gracias), and provide translations in references if not translated in the body text."
        ]
      },
      {
        id: "author-bio",
        letter: "g",
        title: "Author Bio",
        summary: "Third person, maximum 100 words, state any executive position and include a photograph.",
        points: [
          "Provide a short biography of the author with every published work.",
          "Write the biography in the third person, not exceeding 100 words at most.",
          "If the author holds an executive position, that position must be stated in the bio.",
          "Include an author photograph alongside the biography."
        ]
      },
      {
        id: "references",
        letter: "h",
        title: "References (APA Style)",
        summary: "In-text citation rules, 'et al.' usage, alphabetical ordering and the four example formats.",
        points: [
          "Follow the APA Referencing Guide and check that author spellings and dates match exactly between in-text citations and the reference list.",
          "In-text citations use author surname (without initials) and year, plus page numbers where needed: e.g. 'Since Peterson (1988) has shown that...' or '(Kramer, 1989, pp. 12–16)'.",
          "For works by more than two authors, use the first author's surname followed by 'et al.' in the text, but list every author in full in the reference list.",
          "Arrange multiple in-text citations chronologically. Arrange the reference list alphabetically by author and chronologically per author (single-author works first, then one co-author, then multiple co-authors; same-year works labelled 1994a, 1994b, etc.)."
        ],
        referenceExamples: [
          {
            label: "a. For periodicals",
            example:
              "Sauter, R.W., Williams, C., Meyer, E.A., Celnik, B., Banks, J.L., Leith D.A., (1987). A study of bacteria present within unfertilized salmon eggs at the time of spawning and their possible relation to early lifestage disease, Journal of Fish Diseases, 10(3): 193-203. doi:10.1111/j.1365-2761.1987.tb01061.x"
          },
          {
            label: "b. For edited symposia, special issues, etc. published in a periodical",
            example:
              "Roberts, R.J., (1993). Ulcerative dermal necrosis (UDN) in wild salmonids. In: Bruno, D.W. (Ed.), Pathological conditions of wild salmonids, Fisheries Research, 17(2): 3-14."
          },
          {
            label: "c. For books",
            example:
              "Gaugh, Jr., H.G., (1992). Statistical Analysis of Regional Yield Trials. Elsevier, Amsterdam."
          },
          {
            label: "d. For multi-author books",
            example:
              "Bucke, D., (1989). Histology. In: Austin, B., Austin, D.A. (Eds.), Methods for the Microbiological Examination of Fish and Shellfish. Wiley, New York, pp. 69-97."
          }
        ]
      },
      {
        id: "footnotes-copyright",
        letter: "i",
        title: "Footnotes & Copyright",
        summary: "Minimal superscript footnotes, third-party permissions and acknowledgements.",
        points: [
          "Use footnotes only if absolutely essential; wherever possible incorporate details into normal body text.",
          "When used, number footnotes sequentially in the text using superscript numerals and keep them as brief as possible.",
          "Ensure quotations, tables or illustrations do not infringe copyright: obtain permission from the copyright holder (and the original author where different) for substantial extracts, tables, plates or illustrations.",
          "Material from unpublished letters and manuscripts is protected and must not be published without permission; always make a suitable acknowledgement of any borrowed material."
        ]
      }
    ],
    checklist: [
      "Written in clear, active British English checked against Merriam-Webster and Stedman's Medical Dictionary.",
      "Unpublished original work owned by the author (neither translated nor adapted).",
      "Formatted in Times New Roman, font size 12, with single line spacing.",
      "Matches category length rules: Poetry (10–40 lines), Fiction (300–2,000 words), or Non-fiction (unrestricted).",
      "Medical/Original article title centred at top of page 1 (not italicised or underlined) and follows the 8-part sequence.",
      "Original research manuscript includes a compulsory abstract (≤ 200 words) and at least three keywords.",
      "Numbers 1–12 spelled out, thousands comma-separated (3,569), en-dashes used in ranges, double quotes used for citations.",
      "References formatted in APA style alphabetically by author, with full co-author names listed and verified against in-text citations.",
      "Third-person author biography (≤ 100 words, stating any executive role) and photograph attached.",
      "Copyright permissions secured for borrowed tables/illustrations and manuscript sent to Laumedjc@gmail.com."
    ]
  },
  editorialBoard: [
    { name: "Kaothar Oyeniran", role: "Editor-in-Chief", affiliation: "LAUMED Journal Club, LAUTECH", photoPlaceholder: "avatar_eic" },
    { name: "Zainab Akindele", role: "Deputy Editor", affiliation: "LAUMED Journal Club, LAUTECH", photoPlaceholder: "avatar_deic" },
    { name: "Ofure Alfred", role: "Board Secretary", affiliation: "LAUMED Journal Club, LAUTECH", photoPlaceholder: "avatar_sec" },
    { name: "Habiblah Jagunmolu", role: "Associate Editor", affiliation: "LAUMED Journal Club, LAUTECH", photoPlaceholder: "avatar_ae" },
    { name: "Peter Olaniyi", role: "Managing Editor", affiliation: "LAUMED Journal Club, LAUTECH", photoPlaceholder: "avatar_me" },
    { name: "Taiwo Oluwafemi", role: "Graphics Editor", affiliation: "LAUMED Journal Club, LAUTECH", photoPlaceholder: "avatar_ge" }
  ],
  currentIssue: {
    volume: 2,
    issue: 1,
    title: "Medificial Intelligence: Revolutionizing Healthcare with Technology",
    publicationDate: "February 2025",
    coverImagePlaceholder: "journal_cover_vol2_no1",
    editorialNote:
      "The maiden edition of Medificial Intelligence (LAUMED Journal Club's 3rd journal edition), edited by Esther Adewuyi and featuring six peer-reviewed manuscripts on artificial intelligence, wearable diagnostics, robotic surgery, disaster response, radiogenomics, and non-invasive renal care, plus a crossword puzzle and poetry feature. The next edition of Medificial Intelligence is coming soon.",
    articles: []
  },
  pastIssues: []
};

/* =========================================================================
   4. EVENTS & SCIENTIFIC CONFERENCES
   ========================================================================= */
export const CLUB_EVENTS: ClubEvent[] = [
  {
    id: "event-jjcc-2026",
    title: "Joint Journal Club Conference (JJCC)",
    subtitle: "Event Announcement · Presented by LAUMED Journal Club",
    theme: "Anticipate! — Presented by LAUMED Journal Club",
    status: "upcoming",
    isProvisional: true,
    date: "2026-12-12T09:00:00",
    displayDate: "12 December 2026 (Tentative — Subject to Confirmation)",
    time: "To be announced",
    venue: "To be announced",
    flyerUrl: "/assets/aistudio/photo_2026-11-13_00-03-24_6fae618f.jpg",
    description:
      "Presented by LAUMED Journal Club, the Joint Journal Club Conference (JJCC) is tentatively scheduled for 12 December 2026. This date is provisional and subject to confirmation; official venue, schedule, and registration announcements will follow.",
    registrationOpen: false
  },
  {
    id: "event-webinar-2026",
    title: "Research Webinar Series",
    subtitle: "LAUMED Journal Club Capacity Building Series",
    theme: "Research Questions, Journal Publishing, Review Methodology & Meta-Analysis",
    status: "past",
    date: "2026-09-12T18:00:00",
    displayDate: "Saturday, 12th September, 2026",
    time: "6:00pm Prompt",
    venue: "Google Meet",
    registrationFee: "₦2,000",
    flyerUrl: "/assets/aistudio/photo_2026-11-13_00-03-29_b90ca4a5.jpg",
    description:
      "A comprehensive virtual research training series hosted by LAUMED Journal Club via Google Meet, equipping medical students and early-career researchers with practical skills across literature searching, peer-reviewed publishing, systematic review methodology, and meta-analysis.",
    highlights: [
      "Developing research questions and effective search strategies",
      "Navigating journal publishing: selecting the right journal and responding to reviewer feedback",
      "Writing the methodology section for scoping, systematic, and narrative reviews (including paper screening techniques)",
      "Fundamentals of meta-analysis",
      "From systematic review to meta-analysis: data extraction, effect sizes and statistical synthesis"
    ],
    speakers: [
      { name: "Dr. Kehinde Paul", role: "Speaker" },
      { name: "Dr. Samson Afolabi", role: "Speaker" },
      { name: "Dr. Aderinto Nicholas", role: "Speaker" },
      { name: "Godswill Uzoechina", role: "Speaker" }
    ],
    registrationOpen: false
  },
  {
    id: "event-hackathon-paediatrics",
    title: "LAUMED Hackathon and Abstract Presentation",
    subtitle: "Presented by LAUMED Journal Club & Medificial Intelligence",
    theme: "THE FUTURE OF PAEDIATRICS: Transforming child health through artificial intelligence.",
    status: "past",
    date: "2026-04-18T09:00:00",
    displayDate: "18th April",
    time: "9:00 AM",
    venue: "The Assembly by Ennovate Lab, beside Willows Nest Hotel along LAUTECH Main Gate",
    flyerUrl: "/assets/aistudio/photo_2026-11-13_00-11-56_48112b67.jpg",
    description:
      "An innovation hackathon and scholarly abstract presentation jointly presented by LAUMED Journal Club and Medificial Intelligence around the theme 'The Future of Paediatrics: Transforming child health through artificial intelligence.' Held at The Assembly by Ennovate Lab near LAUTECH Main Gate.",
    highlightsTitle: "Program Highlights",
    highlights: [
      "The Pitch",
      "Poster Presentation",
      "Art and Science"
    ],
    judges: [
      {
        name: "Prof. Tesleem Babatunde Asafa",
        title: "Professor of Mechanical Engineering, Ladoke Akintola University of Technology"
      },
      {
        name: "Dr. Olanike Oladibu",
        title: "Consultant Pediatrician, LAUTECH Teaching Hospital, Ogbomoso"
      },
      {
        name: "Mr. Afolabi Favour",
        title: "Mentor and Lead Instructor, SQI College of ICT"
      }
    ],
    sponsor: {
      name: "Prof. Olawale Olakulehin",
      title: "Chief Medical Director, LAUTECH Teaching Hospital, Ogbomoso"
    },
    registrationOpen: false
  },
  {
    id: "event-launch-2025",
    title: "Medificial Intelligence Scientific Conference and Journal Launch",
    subtitle: "Presented by LAUMED Journal Club & Medificial Intelligence",
    theme: "MEDIFICIAL INTELLIGENCE: REVOLUTIONIZING HEALTHCARE WITH TECHNOLOGY.",
    status: "past",
    isFlagship: true,
    date: "2025-02-27T08:30:00",
    displayDate: "27th February, 2025",
    time: "8:30 am GMT+1",
    venue: "The Hall, LAUTECH, Ogbomoso, Nigeria",
    flyerUrl: "/assets/aistudio/photo_2026-11-13_00-03-13_438c8629.jpg",
    description:
      "Our flagship scientific conference and official launch of the Medificial Intelligence journal at LAUTECH (100 slots capacity). Featured a keynote address on artificial intelligence in Nigeria's healthcare system, a four-member academic panel, and on-site distribution of LAUMED Journal membership forms.",
    registrationOpen: false,
    recap: {
      summary:
        "Presented by LAUMED Journal Club ('more is definitely better…') and Medificial Intelligence at The Hall, LAUTECH, Ogbomoso. The conference centered on the theme 'Medificial Intelligence: Revolutionizing Healthcare with Technology' and marked the launch of the journal alongside membership form distribution.",
      keynoteSpeaker: {
        name: "Professor Oluwadiya Kehinde Sunday",
        title: "Acting Chief Medical Director of the University of Sierra Leone Teaching Hospitals Complex, Freetown",
        topic: "The Trajectory of Artificial Intelligence in Nigeria's Healthcare System; Exploring Options and Opportunities"
      },
      panelists: [
        {
          name: "Professor Michael Olamoyegun",
          affiliation: "Founder, The South West Diabetes Investigation Research Group (SWEDIG), Nigeria"
        },
        {
          name: "Dr Mrs Oluyinka Titilayo Adedeji",
          affiliation: "Conference Panelist"
        },
        {
          name: "Professor Adeseye Akintunde",
          affiliation: "Member, Editorial Board for the Current Hypertension Review Journal"
        },
        {
          name: "Professor Justice",
          affiliation: "Director of the LAUTECH Software Engineering Institute"
        }
      ],
      reportDownloadUrl: "#download-conference-report-2025"
    }
  }
];

/* =========================================================================
   5. MEMBERSHIP INFORMATION
   ========================================================================= */
export const MEMBERSHIP_INFO = {
  benefits: [
    { title: "Biweekly Critical Appraisal Training", desc: "Hands-on biweekly sessions mastering CASP, CONSORT, PRISMA, and STROBE appraisal checklists." },
    { title: "Mentorship on Publishing", desc: "Direct pairing with consultant faculty and senior student editors to draft and publish clinical papers." },
    { title: "Access to Medificial Intelligence Editorial Desk", desc: "Opportunities to collaborate on the annual Medificial Intelligence journal publication, peer learning, and manuscript review." },
    { title: "Priority Accreditation for Annual Conferences", desc: "Reserved delegate seating, abstract presentation opportunities, and research grant notifications." },
    { title: "Research Working Groups", desc: "Join interest-based groups investigating clinical medicine, public health, and biomedical research." }
  ],
  eligibility: "Open to all medical students (Pre-clinical and Clinical levels), resident doctors, and health sciences scholars at LAUTECH.",
  howToJoin: [
    "Step 01: Complete the online membership intake form below.",
    "Step 02: Attend the next scheduled biweekly Journal Club session.",
    "Step 03: Complete our baseline topic assignment and critical appraisal orientation.",
    "Step 04: Receive your official LAUMED Journal Club membership accreditation."
  ],
  noteOnLaunchConference: "Membership forms were originally distributed physically at our 2025 Scientific Conference and Journal Launch on 27 February 2025. Registration is open online for all aspiring LAUTECH medical student researchers."
};

/* =========================================================================
   6. ABOUT US & GOVERNANCE
   ========================================================================= */
export const ABOUT_INFO = {
  intro:
    "LAUMED Journal Club is a student-led organisation at Ladoke Akintola University of Technology (LAUTECH). It gives medical students a platform to understand research, appreciate academic contributions and engage in meaningful intellectual discussion.",
  focusIntro: "Our meetings are held biweekly, with a focus on:",
  focusAreas: [
    "Understanding the fundamentals of medical research.",
    "Discussing research articles and publications.",
    "Exploring the biographies and contributions of influential individuals.",
    "Engaging in general discussions on relevant medical and societal matters.",
    "Developing critical thinking and academic reasoning."
  ],
  missionParagraphs: [
    "To develop members on essential research skills, appreciate and learn from the stories of individuals whose contributions have made significant impacts on humanity and hands-on practice on skills acquired.",
    "We also aim to create an intellectually stimulating environment that encourages curiosity, meaningful conversations and critical thinking."
  ],
  approachIntro:
    "We achieve our mission through regular, interactive and engaging meetings where members have the opportunity to:",
  approachPillars: [
    {
      num: "01",
      title: "Learn",
      description: "Understand the fundamentals and principles of research."
    },
    {
      num: "02",
      title: "Explore",
      description: "Examine research publications, biographies and the works of influential individuals."
    },
    {
      num: "03",
      title: "Discuss",
      description: "Participate in intellectual conversations on relevant topics and issues."
    },
    {
      num: "04",
      title: "Appreciate",
      description: "Recognise the contributions of individuals who have positively impacted humanity."
    },
    {
      num: "05",
      title: "Think critically",
      description: "Develop the ability to question, analyse, interpret and evaluate information."
    }
  ],
  meetingStructure: {
    frequency: "Biweekly",
    format: "Interactive, discussion-based sessions",
    focus: "Research, intellectual exploration, biographies and general discussion"
  },
  howClubWorksIntro:
    "The LAUMED Journal Club operates through a structured, interactive and participatory approach designed to promote continuous learning, knowledge sharing and intellectual development among members.",
  howClubWorksSteps: [
    {
      step: 1,
      title: "Membership and Baseline Assessment",
      bullets: [
        "Members are assigned specific topics to research and explore based on their existing knowledge and understanding.",
        "This process helps establish a baseline understanding of members' knowledge and identifies areas that require further learning."
      ]
    },
    {
      step: 2,
      title: "Topic Presentations and Discussions",
      bullets: [
        "Assigned topics are presented during our regular meetings.",
        "Presentations are followed by interactive discussions and question-and-answer sessions.",
        "These discussions allow members to share their perspectives, clarify difficult concepts and reinforce the knowledge gained from each presentation."
      ]
    },
    {
      step: 3,
      title: "Knowledge Assessment",
      scheduleNote: "Periodic quizzes",
      bullets: [
        "Periodic quiz sessions are organised to assess members' understanding of previously discussed topics.",
        "These assessments help reinforce learning, evaluate knowledge retention and identify areas that need improvement."
      ]
    },
    {
      step: 4,
      title: "Biographical Discussions",
      bullets: [
        "We explore the biographies, achievements and contributions of influential individuals.",
        "Discussions focus on the work of people whose ideas, discoveries and innovations have made positive contributions to humanity.",
        "This provides members with opportunities to learn from their experiences, perspectives and legacies."
      ]
    },
    {
      step: 5,
      title: "General Discussion Sessions",
      scheduleNote: "About once every four meetings",
      bullets: [
        "General discussion sessions are organised periodically, approximately once every four meetings.",
        "These sessions provide an opportunity for members to explore diverse perspectives on relevant subjects and issues.",
        "They encourage open-mindedness, intellectual exchange, critical thinking and a broader understanding of different viewpoints."
      ]
    },
    {
      step: 6,
      title: "Weekly Articles",
      scheduleNote: "Published every Thursday",
      bullets: [
        "Weekly articles are published every Thursday as part of our commitment to continuous learning and personal development.",
        "These publications serve as a means of reinforcing the club's values, encouraging self-improvement and fostering a culture of intellectual curiosity."
      ]
    }
  ],
  annualJournal: {
    intro:
      "The annual journal publication is one of the flagship projects of LAUMED Journal Club. It provides a platform for members to contribute to academic writing, collaborative research and the dissemination of knowledge.",
    points: [
      {
        title: "Annual publication",
        description:
          "The club works towards producing and publishing a journal annually, featuring articles and scholarly contributions from its members."
      },
      {
        title: "Interest-based groups",
        description:
          "Members are organised into groups based on their individual interests and areas of academic curiosity. This allows them to explore topics they are passionate about while contributing meaningfully to the journal."
      },
      {
        title: "Collaborative authorship",
        description:
          "Members work together in researching, developing, writing and reviewing articles for publication. This encourages teamwork, peer learning and collaboration among aspiring researchers."
      },
      {
        title: "Publication opportunities",
        description:
          "Members who actively participate in the journal production process have the opportunity to contribute articles that are featured in the club's annual journal."
      },
      {
        title: "Research and writing development",
        description:
          "The process exposes members to academic writing, literature review, critical appraisal, referencing and the fundamentals of scholarly publication."
      }
    ]
  },
  executiveTeam: [
    { name: "Kaothar Oyeniran", role: "Editor-in-Chief", photoPlaceholder: "team_kaothar" },
    { name: "Zainab Akindele", role: "Deputy Editor", photoPlaceholder: "team_zainab" },
    { name: "Ofure Alfred", role: "Board Secretary", photoPlaceholder: "team_ofure" },
    { name: "Habiblah Jagunmolu", role: "Associate Editor", photoPlaceholder: "team_habiblah" },
    { name: "Peter Olaniyi", role: "Managing Editor", photoPlaceholder: "team_peter" },
    { name: "Rebecca Adeyemo", role: "Financial Secretary", photoPlaceholder: "team_rebecca" },
    { name: "Muntaqim Opabode", role: "Public Relations Officer", photoPlaceholder: "team_muntaqim" },
    { name: "Taiwo Oluwafemi", role: "Graphics Editor", photoPlaceholder: "team_taiwo" }
  ] as TeamMember[],
  history: {
    title: "History of LAUMED Journal Club",
    inauguralDate: "Friday, August 26th, 2016",
    founder: "Dr Ayotunde Ojo",
    coFounders: ["Dr Sijuade Sanusi", "Dr Abimbola Olanrewaju"],
    paragraphs: [
      "The LAUMED JOURNAL CLUB is the journal club of the Ladoke Akintola University Medical Students. It is an integral yet independent arm of LAUMSA made of medical students who have deep-rooted interests in clinical research works, critical thinking and capacity building. On Friday, August the 26th 2016, we had our inaugural meeting which had in attendance the founder: Dr Ayotunde OJO and the co-founders: Dr Sijuade SANUSI, Dr Abimbola OLANREWAJU — all fifth (5th) year medical students then.",
      "The idea that birthed the establishment of the LAUMED JOURNAL CLUB stemmed from the fact that the field of Medicine is growing on a daily basis. It then became important that we, doctors to be, be kept abreast of new innovations and findings in the field of Medicine. It is vital that we keep up with and discuss current literature in a bid to achieve a greater understanding of scientific concepts.",
      "“Drink deep or taste not from the Pierian spring. For shallow draughts intoxicate the brain and drinking largely sobers us again.” — Alexander Pope. The saying goes true that a little learning is a dangerous thing. How would one feel to discover after medical school how a little learning here and there can leap us into invalid conclusions? Or what would the feeling be like to discover that we have for the most part succeeded in learning to read and pass examinations? More is definitely better. More in the place of critical appraisal skills, more in critical thinking, more in improved reading habits, more in communication skills, more in group participation and teamwork, more in professional identity, more in the development of research, writing and publishing skills. More, because more is definitely better.",
      "Trousseau said, “The worst man is he who is never an artist, and the worst artist is he who is never a man of science.” Medicine itself is a science and an art. The art and the Science of Medicine are complementary. Nowadays, it is sad to see that the medical pendulum is swinging more from the art to the science side. So, the LAUMED JOURNAL CLUB, as we agreed on our inaugural meeting, sought to revive the dying art of Medicine by having a fusion of both science and art so as not to blunt our humanities with too much scientific medicine.",
      "To conclude, Medical practice has over the years experienced and is still experiencing a constant change, the rate of which is accelerating to the point of throwing physicians and students alike off balance. What is accepted as scientific today is discarded by medical practitioners tomorrow in the light of newer evidence. We can learn about new information, new innovations and consequently decide how they modify our practice by promoting interest and capacity in research, providing a platform for the development of critical thinking skills needed to succeed in this practice. Through a peer-reviewed publication of scholarly journals both in print and electronic forms, the LAUMED JOURNAL CLUB looks forward to gaining academic prestige and notoriety on issues related to the science and art of Medicine.",
      "Special mention and thanks to Dr Muyiwa Adeniran and Dr Joy Oluwaniyi (then Editors-in-Chief of IFEMED and DOKITA respectively). The extensive knowledge and collaboration I enjoyed from them were invaluable at the nascent stage of the LAUMED Journal Club. In the same vein, I remain grateful for the unwavering support and push by the leadership of the LAUMED Journal Club since its inception as led by my humble self, followed by Dr Abimbola Adeagbo, Dr Somtolise Ajufo, Dr Nicholas Aderinto, Dr Kehinde Alare and now the freshly minted Dr Esther Adewuyi, who have all contributed a part in the story that is LAUMED today. Ditto all of our teachers whose shoulders we leaned on for mentorship, guidance, moral and financial support, we are indeed very grateful. We have all played our parts very well in this great making of our club. Thank you all. More is definitely better."
    ],
    attributionName: "Ayotunde OJO, DR.",
    attributionTitle: "Founder & Pioneer Editor-in-Chief, LAUMED Journal Club."
  },
  boardOfConsultants: [
    {
      name: "Professor Olawale Olakulehin",
      title: "Member, LAUMED JC Board of Consultants · Chief Medical Director",
      department: "LAUTECH Teaching Hospital, Ogbomoso"
    },
    {
      name: "Professor Michael Olamoyegun",
      title: "Patron & Consultant Endocrinologist",
      department: "Founder, South West Diabetes Investigation Research Group (SWEDIG)"
    },
    {
      name: "Professor Adeseye Akintunde",
      title: "Member, LAUMED JC Board of Consultants · Consultant Cardiologist",
      department: "Department of Internal Medicine, LAUTECH / LAUTECH Teaching Hospital"
    },
    {
      name: "Dr. Adeoye Oyewole",
      title: "Member, LAUMED JC Board of Consultants · Consultant Psychiatrist",
      department: "LAUTECH Teaching Hospital"
    },
    {
      name: "Dr. Olanike Oladibu",
      title: "Member, LAUMED JC Board of Consultants · Consultant Paediatrician",
      department: "LAUTECH Teaching Hospital, Ogbomoso"
    }
  ] as FacultyAdvisor[]
};

/* =========================================================================
   7. OFFICIAL APPRAISAL TOOLS & CHECKLIST LINKS
   ========================================================================= */
export const RESOURCES_LIST: AppraisalToolLink[] = [
  {
    id: "res-casp-checklists",
    title: "CASP Critical Appraisal Checklists",
    organization: "Critical Appraisal Skills Programme",
    category: "Critical Appraisal",
    description: "Official suite of validated checklists for appraising RCTs, systematic reviews, cohort studies, diagnostic studies, case-control studies, and qualitative research.",
    officialUrl: "https://casp-uk.net/casp-tools-checklists/"
  },
  {
    id: "res-jbi-tools",
    title: "JBI Critical Appraisal Tools",
    organization: "Joanna Briggs Institute",
    category: "Critical Appraisal",
    description: "Comprehensive evidence appraisal checklists covering analytical cross-sectional studies, case reports, quasi-experimental designs, RCTs, and prevalence studies.",
    officialUrl: "https://jbi.global/critical-appraisal-tools"
  },
  {
    id: "res-prisma-2020",
    title: "PRISMA 2020 Statement & Checklists",
    organization: "PRISMA Statement",
    category: "Systematic Reviews",
    description: "Official 27-item reporting checklist and flow diagram resources for designing, conducting, and reporting systematic reviews and meta-analyses.",
    officialUrl: "https://www.prisma-statement.org/"
  },
  {
    id: "res-consort",
    title: "CONSORT & SPIRIT Reporting Guidelines",
    organization: "CONSORT-SPIRIT",
    category: "Clinical Trials",
    description: "Evidence-based minimum reporting standards for randomized controlled trials (CONSORT) and clinical trial protocols (SPIRIT).",
    officialUrl: "https://www.consort-spirit.org/"
  },
  {
    id: "res-strobe",
    title: "STROBE Observational Study Checklists",
    organization: "STROBE Initiative",
    category: "Observational Studies",
    description: "Strengthening the Reporting of Observational Studies in Epidemiology: official checklists for cohort, case-control, and cross-sectional designs.",
    officialUrl: "https://www.strobe-statement.org/"
  },
  {
    id: "res-amstar-2",
    title: "AMSTAR 2 Appraisal Tool",
    organization: "AMSTAR",
    category: "Systematic Reviews",
    description: "Validated 16-domain critical appraisal instrument for evaluating systematic reviews that include randomised and non-randomised healthcare studies.",
    officialUrl: "https://amstar.ca/index.php"
  }
];

/* =========================================================================
   8. JOURNAL ARCHIVE ISSUES (DOWNLOADABLE PDF EDITIONS)
   ========================================================================= */
export const ISSUES: ArchiveJournalIssue[] = [
  {
    id: "medificial-vol2-no1-feb2025",
    editionLabel: "Maiden Edition · Medificial Intelligence",
    journal: "Medificial Intelligence · LAUMED Journal Club (Ladoke Akintola University Medical Journal Club)",
    title: "Medificial Intelligence: Revolutionizing Healthcare with Technology",
    volume: 2,
    number: 1,
    date: "February 2025",
    publishedAt: "2025-02",
    issn: "",
    pages: 39,
    size: "10.9 MB",
    format: "PDF",
    tagline: "Revolutionizing Healthcare with Technology",
    cover: MEDIFICIAL_VOL2_NO1_COVER,
    coverWidth: 520,
    coverHeight: 673,
    file: "/assets/aistudio/LAUMED_Journal_Book.pdf_compressed_a5e1acbf.pdf",
    downloadFilename: "Medificial-Intelligence-Vol2-No1-Feb2025.pdf",
    editorialPageRange: "Pages 1–30",
    nonEditorialPageRange: "Pages 31–32",
    nonEditorialDescription:
      "The following crossword puzzle and poetry feature also appear in the published PDF edition (no standalone research abstracts printed in the PDF):",
    articles: [
      { title: "Exploring the Role of Artificial Intelligence in Stroke Treatment and Management", page: 1 },
      { title: "Measuring Blood Cholesterol Levels Using Wearable Devices", page: 10 },
      { title: "The Significance of Robotic Surgery for Developing Countries: A Focus on Nigeria", page: 14 },
      { title: "Artificial Intelligence Guided Emergency Response and Disaster Management", page: 18 },
      { title: "Artificial Intelligence in Radiogenomics for Cancer Risk Prediction", page: 23 },
      { title: "Improving Non-Invasive Procedures in the Diagnosis of Renal Pathologies Using Artificial Intelligence", page: 27 }
    ],
    pdfArticles: [
      {
        id: "vol2-no1-ai-stroke",
        title: "Exploring the Role of Artificial Intelligence in Stroke Treatment and Management",
        authors: "¹Abdulbasit Opeyemi Muili, ²Oluwafemi Amusa, ³Mustapha Mubarak Jolayemi, ³Idris Abdulwahab",
        affiliations: [
          "1. Preclinical II, Faculty of Basic Medical Sciences, Ladoke Akintola University, Ogbomoso",
          "2. Clinical I, Faculty of Basic Clinical Sciences, Ladoke Akintola University, Ogbomoso",
          "3. Clinical I, Faculty of Basic Clinical Sciences, University Ilorin, Ilorin"
        ],
        category: "Editorial Article",
        page: 1,
        summaryLabel: "Abstract",
        abstract:
          "Stroke is one of the neurological diseases with the most common cause of mortality and disability in the world, significantly impacting individuals’ lives, due to its deleterious effect on the brain and nervous system. Due to the time-sensitive nature of stroke, there is a need for prompt and effective treatment methods. Various management strategies have been employed for the management of stroke and have been evaluated in multiple clinical trials. Moreover, the advent of emerging technologies has introduced the use of Artificial intelligence, telemedicine, stem cell therapy, virtual reality, and robotics in the management of stroke and they have shown to be a safe and efficient method of treatment.\n\nThis current study provides an outlook on the role of AI in stroke treatment and management through the evaluation of its current state of use in the management of stroke, challenges facing its usage in stroke management, and opportunities for future development in its implementation. We discovered the potential of AI in stroke diagnosis, treatment, and rehabilitation. However, it also presents significant challenges such as AI bias, data privacy, and ethical concerns. Despite these challenges, there are opportunities for growth and development through advancing AI techniques, collaborations between health professionals and AI developers, and identifying potential breakthroughs and research areas to enhance its implementation.",
        keywords: ["Stroke", "Artificial Intelligence", "Technology"]
      },
      {
        id: "vol2-no1-cholesterol-wearables",
        title: "Measuring Blood Cholesterol Levels Using Wearable Devices",
        authors: "¹Ridwan Olanipekun, ²Korede Amao",
        affiliations: [
          "1. Clinical I, Faculty of Basic Clinical Sciences, Ladoke Akintola University, Ogbomoso",
          "2. Clinical II, Faculty of Clinical Sciences, Ladoke Akintola University, Ogbomoso"
        ],
        category: "Editorial Article",
        page: 10,
        summaryLabel: "Abstract",
        abstract:
          "The increasing prevalence of diseases associated with abnormal cholesterol levels, like cardiovascular diseases, has emphasized the need for routine monitoring of blood cholesterol levels. Wearable devices, emerging as a promising tool for self-monitoring, offer a convenient and noninvasive alternative to conventional methods of measuring blood cholesterol levels. This review aims to assess the current state of knowledge and recent technological advancements in measuring blood cholesterol levels using wearable devices, exploring their accuracy, reliability, accessibility, affordability, and potential applications. A comprehensive literature search was conducted across various databases, including PubMed and ResearchGate, to identify studies on noninvasive methods of cholesterol monitoring, like wearable devices. The review highlights technological advances in the use of wearable devices to measure blood cholesterol, such as smartwatches. Various technologies, including photoplethysmography, LipidPlus, and Accutrend Plus, have shown promising results in noninvasive methods of detecting changes in cholesterol levels. Wearable devices offer a promising pathway to reducing the risks of cardiovascular diseases. They provide a convenient, accessible and self-monitoring tool for individuals at risk of cardiovascular disease to keep track of their blood cholesterol levels. However, further research is needed to establish the clinical validity, accuracy, and reliability, as well as their cost-effectiveness and potential integration into healthcare systems.",
        keywords: ["Wearable devices", "Cholesterol", "Cardiovascular disease", "Self-monitoring"]
      },
      {
        id: "vol2-no1-robotic-surgery-nigeria",
        title: "The Significance of Robotic Surgery for Developing Countries: A Focus on Nigeria",
        authors: "¹Habiblah Ayomide, ¹Kaothar Oyeniran, ²Abdulrahmon Moradeyo, ³Benjamin Simiyu, ⁴Kabirat Aminu",
        affiliations: [
          "1. Clinical II, Faculty of Clinical Sciences, Ladoke Akintola University, Ogbomoso",
          "2. Preclinical, Faculty of Basic Medical Sciences, Ladoke Akintola University, Ogbomoso",
          "3. Clinical III, Faculty of Clinical Sciences, School of Medicine, Kisumu-Kenya",
          "4. Clinical III, Faculty of Clinical Sciences, Ladoke Akintola University, Ogbomoso"
        ],
        category: "Editorial Article",
        page: 14,
        summaryLabel: "Abstract",
        abstract:
          "Robotic surgery represents a significant advancement in Medicine, especially in various surgical specialties. This study focuses on the relevance of robotics in surgical specialties. It involves the use of robots to assist surgeons in performing complex procedures, leading to an exponential rise in the degree of accuracy and precision. While robotic-assisted surgery has gained wide implementation in developed countries, developing countries are still way behind as its’ implementation into healthcare systems in LMICs (Low-and-Middle-Income Countries) remains limited due to constraints in terms of financial, infrastructural, and human resources. This review aims to assess the feasibility, challenges, and benefits of implementing robotic surgery in developing countries like Nigeria while also examining the current global state of robotic surgery. We also examine possible economic implications, including cost-effectiveness, scalability, and long-term sustainability. In addition, strategies to stimulate the widespread adoption of robotics in LMICs are also dissected, and they include international collaboration, government policies, public awareness, and NGO intervention. By dwelling on case studies and real-life applications, this study provides insights into how robotic surgery can promote global health equity and reduce morbidity, mortality, and physician burnout. Current barriers to implementation and how to overcome them are also discussed, in addition to prospects and recommendations across all societal levels in the quest towards ensuring global robotic-assisted surgery implementation.",
        keywords: ["Robotic surgery", "Nigeria", "Surgical precision", "Minimally invasive", "Telemedicine"]
      },
      {
        id: "vol2-no1-ai-emergency-disaster",
        title: "Artificial Intelligence Guided Emergency Response and Disaster Management",
        authors: "¹Ayomide Kayode, ²Peter Olaniyi, ³Mahmud Aruna",
        affiliations: [
          "1. Clinical III, Faculty of Clinical Sciences, Ladoke Akintola University, Ogbomoso",
          "2. Clinical II, Faculty of Clinical Sciences, Ladoke Akintola University, Ogbomoso",
          "3. Clinical I, Faculty of Basic Clinical Sciences, Ladoke Akintola University, Ogbomoso"
        ],
        category: "Editorial Article",
        page: 18,
        summaryLabel: "Abstract",
        abstract:
          "Emergency response involves a systematic approach to managing the responsibilities of disaster prevention, preparedness, response, and recovery. In 2020, the 389 reported global natural disasters caused over 15 000 deaths, 98 million infected people, and over US$171Bn losses and the COVID 19 pandemic also recently caused 6.5 million deaths, 623 million confirmed cases, and trillions of dollars in losses to date. Artificial Intelligence (AI), with its remarkable capabilities for visual perception, speech recognition, decision-making, and translation between languages is emerging as a potent tool in disaster prevention, early warning, and response efforts, and with increasing incidence of Emergencies, Crises and Disasters, AI is now more indispensable than ever. The use of AI in emergency response and disaster management developed from its initial use in predictive modelling, using algorithms to analyze historical data and identify patterns to forecast future events. AI now employs real time disaster response using tools such as drone surveillance and satellite imagery analysis to assess disaster impact and coordinate response efforts. The development of autonomous systems such as AI robots have been useful in search and rescue missions in hazardous environments. AI has also been used to model and simulate disaster scenarios to help countries in emergency preparedness and response.\n\nThe use of AI in disaster management offers a great advantage over human error and limited capacity while maintaining its precision and accuracy. However, the biggest challenge to the use of AI in emergency response and disaster management still lies with its ethical considerations.",
        keywords: ["Artificial intelligence", "Emergency preparedness", "Emergency response", "Disaster management", "Crisis management"]
      },
      {
        id: "vol2-no1-ai-radiogenomics",
        title: "Artificial Intelligence in Radiogenomics for Cancer Risk Prediction",
        authors: "¹Temitayo Odedele, ²Oluwatosin Afolayan",
        affiliations: [
          "1. Clinical III, Faculty of Clinical Sciences, Ladoke Akintola University, Ogbomoso",
          "2. Clinical II, Faculty of Clinical Sciences, Ladoke Akintola University, Ogbomoso"
        ],
        category: "Editorial Article",
        page: 23,
        summaryLabel: "Abstract",
        abstract:
          "Cancer stands as a significant contributor to global mortality rates. A considerable number of individuals are diagnosed at an advanced stage, presenting significant challenges in effectively addressing tumour removal within this population. The utilization of radiogenomics in oncology showcases substantial potential for precision medicine. The interdisciplinary field of radiogenomics integrates genomics and radiological imaging to explore the molecular characteristics of tumours. Traditional cancer risk prediction has been the major prediction model that has been in place since the onset for the prediction of most cancers but a lot of limitations have been in place for this method and a lot of risk factors have emerged and are not included in the model. Radiogenomics is advancing cancer treatment by using genomics to provide individualized and personalised care. The predictive capacity of imaging-derived biomarkers in terms of their robustness, clinical implementability, and reliability. The image-based genomics predictive values yielded positive results, and they were able to predict the epidermal growth factor receptor (EGFR). This demonstrated the value of image-based radiogenomics, which is currently in use, and its capacity for cancer prediction correction. The rapid pace of AI technology development, characterized by innovations in machine learning algorithms, deep learning architectures, and computational power, is poised to revolutionize radiogenomics, thus advancements in AI explainability and interpretability will enhance the trustworthiness of AI-driven radiogenomic models, facilitating their integration into clinical practice.",
        keywords: ["Radiogenomics", "Machine learning", "Imaging modalities"]
      },
      {
        id: "vol2-no1-ai-renal-diagnosis",
        title: "Improving Non-Invasive Procedures in the Diagnosis of Renal Pathologies Using Artificial Intelligence",
        authors: "¹Esther Adewuyi, ²Rebecca Adeyemo, ³Muntaqim Opabode",
        affiliations: [
          "1. Clinical III, Faculty of Clinical Sciences, Ladoke Akintola University, Ogbomoso",
          "2. Clinical II, Faculty of Clinical Sciences, Ladoke Akintola University, Ogbomoso",
          "3. Clinical I, Faculty of Basic Clinical Sciences, Ladoke Akintola University, Ogbomoso"
        ],
        category: "Editorial Article",
        page: 27,
        summaryLabel: "Abstract",
        abstract:
          "Renal pathologies such as AKI, renal tumors and chronic kidney disease, have high morbidity and mortality rate and they pose a significant global concern for nephrology and public health. Artificial intelligence technologies which include machine learning, deep learning, neural networks and so on, are computational technologies that imitate or emulate human-intelligence supporting processes such as adaptation, reasoning, sensory comprehension and interaction. AI has found application in various healthcare domains, where it is used in clinical diagnosis, patient management and therapeutic planning. In nephrology, the technology has been found useful in early detection and prompt diagnosis of several kidney pathologies, optimizing therapy for patients placed on dialysis or those who underwent kidney transplantation, prediction of prognosis and analysis of biopsy images for pathological diagnosis. Limitations to the use of this amazing technology include, unfamiliarity of nephrologists with medical artificial intelligence, data access and quality, data privacy and security, bias, trustworthiness, ethical and legal issues. While AI holds promise as a non-invasive diagnostic technique in nephrology, challenges must be addressed for its full integration into clinical practice and ethical considerations must be put in place when developing AI-powered diagnostic techniques in the future.",
        keywords: ["Kidney disease", "Non-invasive procedures", "Artificial intelligence"]
      }
    ],
    nonEditorialContents: [
      { title: "Crossword Puzzle", author: "Abdulbasit Muili", page: 31 },
      { title: "Poem: 'Cheers' to Revolutionary Health Care", author: "Oluwanifemi Odediya", page: 32 }
    ]
  },
  {
    id: "laumed-vol1-no2-dec2020",
    journal: "LAUMED, Journal of the Ladoke Akintola University Medical Students' Association",
    title: "Health & Lifestyle",
    volume: 1,
    number: 2,
    date: "December 2020",
    publishedAt: "2020-12",
    issn: "2705-3709",
    pages: 81,
    size: "1.6 MB",
    format: "PDF",
    tagline: "...more is definitely better!",
    cover: LAUMED_VOL1_NO2_COVER,
    coverWidth: 520,
    coverHeight: 735,
    file: "/files/issues/LAUMED-Vol1-No2-Health-and-Lifestyle-Dec2020.pdf",
    downloadFilename: "LAUMED-Vol1-No2-Health-and-Lifestyle-Dec2020.pdf",
    editorialPageRange: "Pages 9–49",
    guestEditorialPageRange: "Pages 50–62",
    nonEditorialPageRange: "Pages 63–80",
    nonEditorialDescription:
      "The following creative works, essays, book reviews, interview, and club report also appear in the full PDF edition (no standalone research abstracts printed in the PDF):",
    articles: [
      { title: "Gaming Disorder in Adolescents", page: 6 },
      { title: "Transient Smartphone Blindness", page: 25 }
    ],
    pdfArticles: [
      {
        id: "vol1-no2-gaming-disorder",
        title: "Gaming Disorder in Adolescents",
        authors: "Oyewole A. O¹, Aderinto N. O², Opanike J. O³",
        affiliations: [
          "1. Consultant Psychiatrist, LAUTECH Teaching Hospital, Osogbo",
          "2. Clinical II Student, Faculty of Clinical Sciences, LAUTECH, Ogbomoso",
          "3. Clinical I Student, Faculty of Clinical Sciences, LAUTECH, Ogbomoso"
        ],
        category: "Editorial Article",
        page: 9,
        summaryLabel: "Opening Text (Introduction)",
        abstract:
          "The advent of computers and its evolutionary transformation over centuries has had significant impact on human lives. It is particularly interesting that an innovation that seeks originally to achieve an easier way of doing things has increasingly become a necessity for life; from information to banking to entertainment to health to spiritual worship. Truly the limits of its prowess are still emerging.\n\nIn 2018, Gaming Disorder (GD) was defined in the International Classification of Diseases (ICD) publication of the WHO as a pattern of gaming behavior characterized by impaired control over other activities to the extent that gaming takes precedence over other interests and daily activities and continuation of gaming despite the occurrence of negative consequences.⁵ Many countries are recognizing GD as a public health issue and policies have been put in places by countries such as China, Switzerland and Iran to deal with it.⁶"
      },
      {
        id: "vol1-no2-sleep-health",
        title: "Sleep, Health and Wellness",
        authors: "Onaolapo A. Y¹, Amao T², Ajasa B³",
        affiliations: [
          "1. Lecturer and Neuroscience Researcher, Faculty of Basic Medical Sciences, LAUTECH, Ogbomoso",
          "2. Clinical II Student, Faculty of Clinical Sciences, LAUTECH, Ogbomoso",
          "3. Clinical I Student, Faculty of Clinical Sciences, LAUTECH, Ogbomoso"
        ],
        category: "Editorial Article",
        page: 14,
        summaryLabel: "Opening Text (Introduction)",
        abstract:
          "Sleep plays an important role in health and wellness. Alteration in the normal sleep pattern as required by an individual leads to a distorted day. Decreased duration and quality of sleep, whether due to sleep disorders or lack of proper sleep patterns, have been linked to cardiovascular disease risk factors such as hypertension, dyslipidemia and obesity. [1] The terms Health and wellness are often used interchangeably, but each has distinct origin and meaning. As established by the World Health Organization (WHO) in the 1940s, health is referred to as “a state of complete physical, mental and social well-being and not merely the absence of disease or infirmity”. Although this definition has been criticized for being overly inclusive and unattainable, especially as it relates to the word “complete,” very importantly, it broadens the medical definition of health beyond the absence of disease. [2]"
      },
      {
        id: "vol1-no2-alcohol-liver",
        title: "Contribution of Alcohol Consumption to Chronic Liver Disease",
        authors: "Oje M.¹, Adetunji O²",
        affiliations: [
          "1. Senior Registrar, Dept. of Internal Medicine, LAUTECH Teaching Hospital, Ogbomoso",
          "2. Clinical II Student, Faculty of Clinical Sciences, LAUTECH, Ogbomoso"
        ],
        category: "Editorial Article",
        page: 23,
        summaryLabel: "Opening Text (Introduction)",
        abstract:
          "The liver is a large, meaty organ that is located on the upper right quadrant of the abdomen. Weighing approximately 1.5 kg, the liver is reddish-brown in colour. The liver’s main function is to filter the blood coming from the digestive tract, before passing it to the rest of the body. The liver also detoxifies chemicals and metabolizes drugs. It is responsible for the production of several important proteins in the body as well.\n\nLiver diseases contribute markedly to the global burden of mortality and disease as well. Chronic liver disease in the clinical context is a disease process of the liver that involves a process of progressive destruction and regeneration of the liver parenchyma leading to fibrosis and cirrhosis¹. Chronic liver disease refers to disease of the liver which lasts over a period of six months. It consists of a wide range of liver pathologies which include inflammation (chronic hepatitis), liver cirrhosis, and hepatocellular carcinoma. The entire spectrum need not be experienced."
      },
      {
        id: "vol1-no2-smartphone-blindness",
        title: "Transient Smartphone Blindness",
        authors: "Abayomi O.¹, Salam O. O²",
        affiliations: [
          "1. Fellow West Africa College of Physician, Faculty of Clinical Sciences, LAUTECH, Ogbomoso",
          "2. Clinical II Student, Faculty of Clinical Sciences, LAUTECH, Ogbomoso"
        ],
        category: "Editorial Article",
        page: 27,
        summaryLabel: "Opening Text (Introduction)",
        abstract:
          "Transient Smartphone Blindness is a temporary monocular loss of vision. It is a real phenomenon and may contribute to neurologic misdiagnosis in clinical practice and as such an important condition to be well understood by doctors as well as smartphone users.\n\nThe use of smartphone darkrooms in combination with lying on the side result in the emergence one-sided and temporary loss of vision. (1) In this century, the use of smartphones and other electronic gadgets have become inevitably important. Not only do we use our smartphones for our day to day activities, we also use it at night to catch up on one thing or the other, be it mails, messages or news."
      },
      {
        id: "vol1-no2-stroke-prevention",
        title: "Lifestyle Modification for Stroke Prevention",
        authors: "Oguntoye A. R¹, Ojo R.², Omoniyo T.³",
        affiliations: [
          "1. Fellow West African College of Physicians",
          "2. Clinical II Student, Faculty of Clinical Sciences, LAUTECH, Ogbomoso",
          "3. Clinical I Student, Faculty of Clinical Sciences, LAUTECH, Ogbomoso"
        ],
        category: "Editorial Article",
        page: 30,
        summaryLabel: "Abstract",
        abstract:
          "Non-communicable diseases like stroke are increasingly becoming major health problems in Africa. Stroke is the leading cause of disability and worse in Africa because of the relatively younger age of occurrence and severity of stroke in blacks relative to the white population. A review of the modifiable risk factors backed with available facts will in no measure be invaluable at this time. According to the World Health Organization, 15 million people suffer stroke worldwide each year. Of these, 5 million die, and another 5 million are permanently disabled. Eighty percent have at least one of the risk factors for heart and/or cerebrovascular disease: daily smoking, physical inactivity, being overweight, self-reported high blood pressure, or diabetes. High blood pressure contributes to more than 12.7million strokes worldwide.",
        keywords: [
          "stroke",
          "hypertension",
          "obesity",
          "physical activity",
          "smoking",
          "low to moderate alcohol consumption",
          "low-risk diet",
          "stress"
        ]
      },
      {
        id: "vol1-no2-hypertension",
        title: "Hypertension",
        authors: "Kehinde Alare",
        affiliations: [
          "Ladoke Akintola University Medical Journal Club, Osogbo, Osun State, Nigeria"
        ],
        category: "Editorial Article",
        page: 41,
        summaryLabel: "Summary",
        abstract:
          "In this article, hypertension will be discussed under these headings : Epidemiology, Diagnosis, Causes, Stages, Management and Complications of uncontrolled hypertension. With this, the reader will be enlighten on the topic and how it’s related to our health and lifestyle.\n\nKey Facts:\n• In 2015, 1 in 4 men and 1 in 5 women lived with hypertension\n• Fewer than 1 in 5 people with hypertension have it controlled.\n• Hypertension is a major cause of premature death world wide\n• About 1.13 billion individuals of the world’s population have hypertension\n• Hypertension accounts for about 7.1 million death each year globally"
      },
      {
        id: "vol1-no2-nutrition-neurocognitive",
        title: "Role of Nutrition in Children’s Neurocognitive Development From Pregnancy Through Childhood.",
        authors: "Ilori O. R¹, Akintepede F. O², Olajide O.³",
        affiliations: [
          "1. Consultant Community Health Physician, Lautech Teaching Hospital Ogbomoso",
          "2. Clinical II Student, Faculty of Clinical Sciences, LAUTECH, Ogbomoso",
          "3. Clinical I Student, Faculty of Clinical Sciences, LAUTECH, Ogbomoso"
        ],
        category: "Editorial Article",
        page: 45,
        summaryLabel: "Opening Text (Introduction)",
        abstract:
          "Nutrition is one of the many factors that affect the development of the brain and cognitive ability of children. Cognition represents a complex set of higher mental functions sub-served by the brain. It includes attention, memory, thinking, learning and perception (Bhatnagar and Taneja, 2001). Cognitive development in pre- scholars is predictive of later school achievement (Tramontana et al., 1988; Clark et al., 2010; Engle, 2010). Academic achievement is important for future personal health and well- being. Schooling builds human capital-skills, abilities, resources which in turn shape an individual’s health and well- being (Ross and Mirowsky, 1999). Indeed, more education has been linked to better jobs, higher income, higher socio-economic status, better healthcare access and housing, better lifestyle, nutrition and physical activity which are all well-known health determinants."
      },
      {
        id: "vol1-no2-myiasis-case-report",
        title: "Claim of Adverse Drug Reactions Masquerading as Myiasis in a 13 - Year Old Nigerian Teenager - A Case Report and Review of Literature",
        authors: "OV Kayode¹, AO Odeyemi², FJ Adesokan³",
        affiliations: [
          "1. Department of Paediatrics and Child Health, Reddington Multi-Specialty Hospital, Victoria Island, Lagos.",
          "2. Department of Paediatrics and Child Health, College of Health Sciences, Bowen University, Ogbomosho, Oyo State.",
          "3. Department of Paediatrics, College of Health Sciences, LAUTECH, Osogbo, Osun state."
        ],
        category: "Guest Editorial Article",
        page: 50,
        summaryLabel: "Abstract",
        abstract:
          "Myiasis is the infestation of the skin and subcutaneous tissue by the larvae of obligatory dipterous insects. It affects under – developed countries especially in the tropics and some parts of the temperate countries. It is however under – reported because of wrong diagnosis and fear of stigmatization even when the diagnosis becomes evident. This case report and literature review highlights how a coincidental diagnosis of malaria in a boarding house student and the development of multiple nodular swellings following commencement of prescribed antimalarial drugs in the same subject, raised the claim of idiosyncratic drug reactions by the parents with the threats of initiating legal proceedings against the facility of care. This calls for more awareness and education for the first on call clinicians and the general population."
      },
      {
        id: "vol1-no2-covid-clerkship",
        title: "Implications of COVID-19 on Clinical Clerkship and Hospital Postings - A Nigerian Medical Student’s Perspective",
        authors: "Adetunji Busayo Henry",
        affiliations: [
          "College of Clinical Science, Ladoke Akintola University of Technology, Osogbo, Osun State, Nigeria"
        ],
        category: "Guest Editorial Article",
        page: 55,
        summaryLabel: "Abstract",
        abstract:
          "The corona virus pandemic hit the world, sweeping through all its parts; crumbling economies and overwhelming health systems. Undergraduate medical education has been disrupted and put to a halt. As Nigeria braces to open up medical schools and clinical rotation about to begin, the palpable panic that accompanies patient-student spread of the virus will definitely affect undergraduate medical education in Nigeria. Presently, little is known in Nigeria about the long term effects of COVID-19 on clinical clerkship and undergraduate medical education and adaptations to juxtapose future pandemics with medical education. This review accesses risks, plans and policies in place and how they will affect undergraduate medical education.",
        keywords: [
          "COVID-19",
          "Clinical Clerkship",
          "Undergraduate Medical Education",
          "Clinical Rotations",
          "SARS-CoV2"
        ]
      },
      {
        id: "vol1-no2-masks-respirators",
        title: "COVID-19: Can Surgical Masks or Respirators Prevent Corona Virus?",
        authors: "Sahaj Sabharwal",
        affiliations: [
          "Jammu city, Jammu and Kashmir, India"
        ],
        category: "Guest Editorial Article",
        page: 58,
        summaryLabel: "Opening Text (Introduction)",
        abstract:
          "The world is suffering from the deadly infection of Coronavirus. The World Health Organization (WHO) has declared the infection as ‘pandemic’. The early symptoms of this deadly infection are high fever, shortness of breath, tiredness and dry cough. So, the entire world is under lockdown to break the chain of COVID-19 with certain precautionary steps being ensured.\n\nThe contemporary ways to sanitize oneself is the 20 seconds formulae of hand wash or using disinfectant containing at least 60% alcohol, avoid touching surfaces and handshakes and unnecessary contacts. The use of mask and covering face using napkin or elbow while coughing and disposing the napkin would add an added advantage."
      },
      {
        id: "vol1-no2-discrimination-healthcare",
        title: "Discrimination and Racism in Healthcare",
        authors: "Dr Abimbola Olanrewaju",
        category: "Guest Editorial Article",
        page: 61,
        summaryLabel: "Opening Text (Introduction)",
        abstract:
          "The issues surrounding racism and discrimination in the world are far reaching and cannot be fully discussed. These issues have either been ignored or very little has been done to deal with them, leading to a system or culture of acceptance of the perceived “norm”. Unfortunately, they are found in every fiber of the society, family, peer groups, and organizations, including healthcare.\n\nHealthcare is multi-faceted and it begins from education to prevention to diagnosis, care, treatment and follow up. Racism and discrimination can happen in any of these facets and can have far reaching consequences for the individual who is the patient and also the society at large."
      }
    ],
    nonEditorialContents: [
      { title: "Counsel to New Hippocrates", author: "Dr Olaewe Opeyemi", page: 63 },
      { title: "Experts Say in This Bloodless War, Withdrawal is the Weapon", author: "Dr. Ajala Adeshina", page: 64 },
      { title: "Baami", author: "OmoobaJesu Adetunji", page: 65 },
      { title: "Tribute to My Chemicals", author: "Yusuff Abdul Quadri", page: 67 },
      { title: "Book Review: The Void", author: "Dr Fadahunsi K. Philip", page: 68 },
      { title: "Book Review: Unglued by Lysa Terkeurst", author: "Ehinbare Miracle", page: 79 },
      { title: "Eat That Frog: 21 Great Ways to Stop Procastinating and Get More Done in Less Time", author: "Kayode Ayomide", page: 71 },
      { title: "Autopsy Report", author: "Ayotunde Ojo", page: 72 },
      { title: "Weird Feelings", author: "Koathar Oyeniran", page: 72 },
      { title: "Brian Banks", author: "Adekanle Oluwatosin", page: 73 },
      { title: "An Attention to Prevention", author: "Bridget Boluwatife Ogungbemi", page: 74 },
      { title: "The Dangerous Helper", author: "Odedele Temitayo", page: 75 },
      { title: "Exclusive Interview With Dr. Olamide S. Valentine Kayode", author: "LAUMED Journal Club", page: 76 },
      { title: "LAUMED Journal Club Report", author: "Opanike Joshua", page: 79 }
    ]
  }
];



