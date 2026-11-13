/**
 * LAUMED JOURNAL CLUB - Centralized Content Repository
 * Edit any section below to update site content without modifying UI layouts.
 */
import { LAUMED_VOL1_NO2_COVER } from './issueCovers';

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
  imageUrl: string;
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
  file: string;
  downloadFilename: string;
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
  academicLevel: string;
  photoPlaceholder: string;
  bio?: string;
}

export interface FacultyAdvisor {
  name: string;
  title: string;
  department: string;
  bio: string;
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
    xUrl: "https://x.com/LaumedC"
  },
  stats: [
    { label: "Sessions Held", value: "48+", description: "Monthly critical deliberations" },
    { label: "Members", value: "250+", description: "Across clinical & pre-clinical classes" },
    { label: "Published Articles", value: "32+", description: "In Medificial Intelligence & indexed repositories" },
    { label: "Events", value: "12+", description: "Conferences, launches & research symposia" }
  ]
};

/* =========================================================================
   2. JOURNAL CLUB WEEKLY ARTICLES
   ========================================================================= */
export const JOURNAL_SESSIONS: JournalSession[] = [
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
  }
];

/* =========================================================================
   3. "MEDIFICIAL INTELLIGENCE" JOURNAL
   ========================================================================= */
export const JOURNAL_INFO = {
  name: "Medificial Intelligence",
  issn: "e-ISSN: [Pending Assignment]",
  frequency: "Biannual (Two issues per year)",
  description: "Medificial Intelligence is the official scholarly, peer-reviewed medical journal published by the LAUMED Journal Club at the College of Health Sciences, LAUTECH. The journal provides a rigorous editorial home for undergraduate, postgraduate, and faculty research interrogating the intersection of medical practice, clinical critical appraisal, and artificial intelligence in healthcare.",
  aimsAndScope: [
    "Machine learning and deep neural networks in diagnostic imaging, laboratory pathology, and clinical risk prediction.",
    "Critical appraisals, systematic reviews, and meta-analyses of global clinical trials.",
    "Health informatics, electronic health record (EHR) innovations, and digital health infrastructure in resource-constrained environments.",
    "Ethical, legal, and sociotechnical dimensions of AI in Sub-Saharan healthcare systems.",
    "High-yield clinical case reports and multidisciplinary surgical audit papers."
  ],
  articleTypes: [
    { type: "Original Research", wordCount: "Up to 3,500 words", description: "Empirical prospective, retrospective, or diagnostic studies with full methodological detail." },
    { type: "Systematic Review & Meta-Analysis", wordCount: "Up to 4,500 words", description: "PRISMA-compliant reviews synthesizing clinical evidence on diagnostics, therapy, or epidemiology." },
    { type: "Clinical Case Report", wordCount: "Up to 1,500 words", description: "Unique clinical presentations, diagnostic dilemmas, or novel therapeutic approaches following CARE guidelines." },
    { type: "Journal Club Critical Appraisal", wordCount: "Up to 2,000 words", description: "Rigorous methodological appraisal of landmark trials using validated CASP/CONSORT checklists." },
    { type: "Short Communication / Perspective", wordCount: "Up to 1,200 words", description: "Brief scientific commentaries on digital health policies, medical education, or emerging technology." }
  ],
  submissionGuidelines: [
    "Manuscripts must be submitted in English with a structured abstract (Background, Methods, Results, Conclusion) not exceeding 250 words.",
    "References must strictly follow Vancouver citation style.",
    "Human subject research must cite Health Research Ethics Committee (HREC) approval number and informed consent procedures.",
    "Authors must disclose all funding sources and declare any conflicts of interest.",
    "Submissions undergo double-blind peer review by qualified student editors and consultant faculty reviewers."
  ],
  editorialBoard: [
    { name: "Oluwaseun D. Adeleke", role: "Editor-in-Chief", affiliation: "LAUMED Journal Club, LAUTECH", photoPlaceholder: "avatar_eic" },
    { name: "[Name Placeholder: Deputy Editor]", role: "Deputy Editor-in-Chief", affiliation: "LAUMED Journal Club, LAUTECH", photoPlaceholder: "avatar_deic" },
    { name: "[Name Placeholder: Managing Editor]", role: "Managing Editor", affiliation: "LAUMED Journal Club, LAUTECH", photoPlaceholder: "avatar_me" },
    { name: "[Name Placeholder: Section Editor]", role: "Section Editor: Digital Health & AI", affiliation: "College of Health Sciences, LAUTECH", photoPlaceholder: "avatar_se1" },
    { name: "[Name Placeholder: Section Editor]", role: "Section Editor: Clinical Medicine & Surgery", affiliation: "College of Health Sciences, LAUTECH", photoPlaceholder: "avatar_se2" }
  ],
  currentIssue: {
    volume: 1,
    issue: 1,
    title: "Inaugural Launch Edition: Revolutionizing Healthcare with Technology",
    publicationDate: "February 2025",
    coverImagePlaceholder: "journal_cover_vol1",
    editorialNote: "The maiden edition of Medificial Intelligence commemorates the official Scientific Conference and Journal Launch at LAUTECH, bringing together clinical researchers and technologists.",
    articles: [
      {
        id: "art-101",
        title: "The Trajectory of Artificial Intelligence in Nigeria's Healthcare System: Exploring Options and Opportunities",
        authors: ["Prof. Oluwadiya Kehinde Sunday"],
        type: "Keynote Review Article",
        pages: "1–14",
        doi: "10.5281/medificial.2025.0101",
        abstract: "A comprehensive analysis examining algorithmic governance, infrastructural bottlenecks, and the translational pathway for AI-enabled decision support systems in Nigerian teaching hospitals."
      },
      {
        id: "art-102",
        title: "Diagnostic Concordance of Lightweight Convolutional Neural Networks for Diabetic Retinopathy in Southwestern Nigeria",
        authors: ["Prof. Michael Olamoyegun", "[Student Co-Author: Name]"],
        type: "Original Research",
        pages: "15–26",
        doi: "10.5281/medificial.2025.0102",
        abstract: "Evaluation of mobile-optimized deep learning inference on smartphone fundus adapters across a cohort of diabetic outpatients in Ogbomoso."
      },
      {
        id: "art-103",
        title: "Predictive Modeling of Target Organ Damage in Essential Hypertension: An Ensemble Machine Learning Approach",
        authors: ["Prof. Adeseye Akintunde", "[Student Co-Author: Name]"],
        type: "Original Research",
        pages: "27–38",
        doi: "10.5281/medificial.2025.0103",
        abstract: "Evaluating gradient boosted trees against traditional Framingham risk scores in identifying early left ventricular hypertrophy."
      }
    ]
  },
  pastIssues: [
    {
      volume: 1,
      issue: 1,
      title: "Volume 1, Issue 1 (Launch Edition)",
      publicationDate: "February 2025",
      coverImagePlaceholder: "journal_cover_vol1",
      editorialNote: "Inaugural launch edition unveiled at the Medificial Intelligence Scientific Conference.",
      articles: []
    }
  ]
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
    { title: "Monthly Critical Appraisal Training", desc: "Hands-on workshops mastering CASP, CONSORT, PRISMA, and STROBE appraisal checklists." },
    { title: "Mentorship on Publishing", desc: "Direct pairing with consultant faculty and senior student editors to draft and publish clinical papers." },
    { title: "Access to Medificial Intelligence Editorial Desk", desc: "Opportunities to serve on peer-review panels, section editing, and journal curation." },
    { title: "Priority Accreditation for Annual Conferences", desc: "Reserved delegate seating, abstract presentation opportunities, and research grant notifications." },
    { title: "Research Working Groups", desc: "Join collaborative multi-author research teams investigating clinical AI, cardiology, and public health." }
  ],
  eligibility: "Open to all medical students (Pre-clinical and Clinical levels), resident doctors, and health sciences scholars at LAUTECH.",
  howToJoin: [
    "Step 01: Complete the online membership intake form below.",
    "Step 02: Attend the next scheduled monthly Journal Club session.",
    "Step 03: Complete our short introductory Critical Appraisal orientation module.",
    "Step 04: Receive your official LAUMED Journal Club membership accreditation."
  ],
  noteOnLaunchConference: "Membership forms were originally distributed physically at our flagship Medificial Intelligence Launch Conference on 27 February 2025. Registration is now permanently open online for all aspiring student researchers."
};

/* =========================================================================
   6. ABOUT US & GOVERNANCE
   ========================================================================= */
export const ABOUT_INFO = {
  mission: "To cultivate a community of scientifically rigorous medical students and clinicians equipped to critically appraise biomedical evidence, conduct reproducible clinical research, and harness technological innovations in patient care.",
  vision: "To be the foremost student-led biomedical scholarly society and digital health research hub in West Africa.",
  story: "Founded by passionate medical students at the College of Health Sciences, Ladoke Akintola University of Technology (LAUTECH) in Ogbomoso, the LAUMED Journal Club was created to bridge the critical divide between textbook medical learning and contemporary clinical trials. Guided by the motto 'more is definitely better…', the club has grown from informal seminar deliberations into a respected academic society publishing its own peer-reviewed journal, Medificial Intelligence, and hosting state-level scientific conferences.",
  executiveTeam: [
    { name: "[Name Placeholder: President / EIC]", role: "President & Editor-in-Chief", academicLevel: "600L MB;BS", photoPlaceholder: "team_pres" },
    { name: "[Name Placeholder: Vice President]", role: "Vice President (Academic & Research)", academicLevel: "500L MB;BS", photoPlaceholder: "team_vp" },
    { name: "[Name Placeholder: General Secretary]", role: "General Secretary", academicLevel: "500L MB;BS", photoPlaceholder: "team_sec" },
    { name: "[Name Placeholder: Journal Director]", role: "Director of Journal & Publications", academicLevel: "500L MB;BS", photoPlaceholder: "team_dir" },
    { name: "[Name Placeholder: Programs Lead]", role: "Director of Programs & Scientific Sessions", academicLevel: "400L MB;BS", photoPlaceholder: "team_prog" },
    { name: "[Name Placeholder: Public Relations]", role: "Public Relations Officer & Media", academicLevel: "400L MB;BS", photoPlaceholder: "team_pro" }
  ],
  facultyAdvisors: [
    {
      name: "Professor Adeseye Akintunde",
      title: "Faculty Patron & Consultant Cardiologist",
      department: "Department of Internal Medicine, LAUTECH / LAUTECH Teaching Hospital",
      bio: "Member of the Editorial Board for Current Hypertension Review Journal. Internationally published researcher in cardiovascular ultrasound and hypertensive risk stratification."
    },
    {
      name: "Professor Michael Olamoyegun",
      title: "Senior Editorial Advisor & Consultant Endocrinologist",
      department: "Founder, South West Diabetes Investigation Research Group (SWEDIG)",
      bio: "Leading authority in diabetes epidemiology, metabolic syndrome profiling, and rural endocrinological health outcomes in Nigeria."
    },
    {
      name: "Professor Oluwadiya Kehinde Sunday",
      title: "Distinguished Academic Advisor & Orthopaedic Surgeon",
      department: "Acting Chief Medical Director, University of Sierra Leone Teaching Hospitals Complex",
      bio: "Prominent scholar in trauma epidemiology, research methodology, and biomedical computational readiness."
    },
    {
      name: "Dr Mrs Oluyinka Titilayo Adedeji",
      title: "Faculty Advisor & Consultant Clinical Microbiologist",
      department: "Department of Medical Microbiology, LAUTECH",
      bio: "Investigator on antimicrobial resistance surveillance, healthcare-associated infection audits, and laboratory diagnostic quality."
    }
  ]
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
    file: "/files/issues/LAUMED-Vol1-No2-Health-and-Lifestyle-Dec2020.pdf",
    downloadFilename: "LAUMED-Vol1-No2-Health-and-Lifestyle-Dec2020.pdf",
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



