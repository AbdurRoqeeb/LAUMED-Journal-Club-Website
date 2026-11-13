import { Publication, JournalClubSession, ConferenceDetails, ManuscriptSubmission } from '../types';

export const CONFERENCE_DATA: ConferenceDetails = {
  title: 'SCIENTIFIC CONFERENCE AND JOURNAL LAUNCH',
  theme: 'MEDIFICIAL INTELLIGENCE: REVOLUTIONIZING HEALTHCARE WITH TECHNOLOGY.',
  date: '27th February, 2025',
  time: '8:30 am GMT +1',
  venue: 'The Hall, LAUTECH, Ogbomoso, Nigeria.',
  slotsTotal: 100,
  slotsRemaining: 18,
  contactEmail: 'laumedjc@gmail.com',
  contactPhone: '08118908705',
  contactSocial: '@Laumedjc',
  keynote: {
    name: 'Professor Oluwadiya Kehinde Sunday',
    role: 'Keynote Speaker & Orthopaedic Surgeon',
    institution: 'Acting Chief Medical Director of the University of Sierra Leone Teaching Hospitals Complex, Freetown',
    topic: "The Trajectory of Artificial Intelligence in Nigeria's Healthcare System: Exploring Options and Opportunities",
    badge: 'Keynote Address'
  },
  panelists: [
    {
      name: 'Professor Michael Olamoyegun',
      role: 'Consultant Endocrinologist & Professor of Medicine',
      institution: 'Founder, The South West Diabetes Investigation Research Group (SWEDIG), Nigeria',
      topic: 'Precision Diabetology & AI Biomarker Profiling in Sub-Saharan Africa',
      badge: 'Panelist 01'
    },
    {
      name: 'Dr Mrs Oluyinka Titilayo Adedeji',
      role: 'Consultant Clinical Microbiologist & Medical Researcher',
      institution: 'College of Health Sciences, LAUTECH / LTH',
      topic: 'Antimicrobial Resistance Surveillance Through Machine Learning Algorithms',
      badge: 'Panelist 02'
    },
    {
      name: 'Professor Adeseye Akintunde',
      role: 'Professor of Cardiology & Consultant Physician',
      institution: 'Member, Editorial Board for the Current Hypertension Review Journal',
      topic: 'Cardiovascular Risk Modeling: From Framingham to Deep Neural Networks',
      badge: 'Panelist 03'
    },
    {
      name: 'Professor Justice',
      role: 'Director & AI Systems Architect',
      institution: 'Director of the LAUTECH Software Engineering Institute',
      topic: 'Engineering Clinical-Grade Medical AI: Infrastructure, Latency, and Privacy',
      badge: 'Panelist 04'
    }
  ]
};

export const PUBLICATIONS_DATA: Publication[] = [
  {
    id: 'lmj-2025-01',
    title: 'Diagnostic Accuracy of Lightweight Convolutional Neural Networks for Diabetic Retinopathy Screening in Rural Southwestern Nigeria',
    abstract: 'Diabetic retinopathy remains a principal cause of preventable adult blindness in low-resource settings. This prospective diagnostic study evaluated a mobile-optimized convolutional neural network (MobileNetV3) deployed on low-cost handheld fundus attachments across 840 diabetic patients at LAUTECH Teaching Hospital and peri-urban satellite clinics in Oyo State. The algorithm demonstrated an area under the receiver operating characteristic curve (AUC-ROC) of 0.942, with 91.8% sensitivity and 93.4% specificity for detecting referable diabetic retinopathy compared to masked dual-retina specialist evaluation.',
    authors: [
      { name: 'Dr. Michael Olamoyegun', affiliation: 'Department of Internal Medicine, LAUTECH Teaching Hospital, Ogbomoso' },
      { name: 'Adebayo T. Samuel', role: 'Student Researcher', affiliation: 'LAUMED Journal Club, College of Health Sciences, LAUTECH', isCorresponding: true, email: 'adebayo.samuel@student.lautech.edu.ng' },
      { name: 'Folashade A. Balogun', role: 'Research Fellow', affiliation: 'South West Diabetes Investigation Research Group (SWEDIG)' },
      { name: 'Prof. Justice E.', affiliation: 'LAUTECH Software Engineering Institute' }
    ],
    articleType: 'Original Research',
    specialty: 'AI & Digital Health',
    volume: 4,
    issue: 1,
    year: 2025,
    publicationDate: 'February 2025',
    doi: '10.5281/laumed.2025.0401',
    readTime: '9 min read',
    downloads: 428,
    citationsCount: 6,
    keywords: ['Diabetic Retinopathy', 'Mobile AI', 'Fundoscopy', 'SWEDIG', 'Oyo State', 'Diagnostic Accuracy'],
    fullArticle: {
      background: 'Sub-Saharan Africa bears an escalating burden of diabetes mellitus, with diabetic retinopathy affecting up to 32% of diagnosed individuals in Nigeria. The acute scarcity of certified ophthalmologists in semi-urban and rural centers necessitates automated, offline-capable diagnostic triage tools.',
      methods: 'We recruited 840 adult patients with confirmed Type 2 diabetes attending outpatient endocrinology clinics at LAUTECH Teaching Hospital (LTH), Ogbomoso, between May 2024 and December 2024. Non-mydriatic 45-degree fundus images were captured using a smartphone-mounted optical adapter. A fine-tuned transfer learning model (MobileNetV3-Small) was compiled for on-device inference without internet connectivity. Reference standard diagnoses were independently established by two masked consultant ophthalmologists.',
      results: 'Of the 840 patients (mean age 56.4 ± 8.2 years; 54.2% female), 218 (26.0%) had referable diabetic retinopathy. The offline deep learning model achieved an overall accuracy of 92.7% (95% CI: 90.9–94.4%), with 91.8% sensitivity and 93.4% specificity. Mean inference latency per two-field image pair on mid-range Android hardware was 480 milliseconds.',
      discussion: 'Our findings confirm that resource-efficient neural network architectures can achieve clinical-grade diagnostic concordance with subspecialists in sub-Saharan public health facilities. Crucially, the model maintained high predictive stability across varying ambient lighting conditions encountered in district outreach clinics.',
      conclusion: 'The deployed lightweight AI framework provides a scalable, cost-effective screening modality capable of dramatically reducing diagnostic delays and irreversible vision impairment in resource-constrained Nigerian communities.',
      ethicalApproval: 'LAUTECH Health Research Ethics Committee (LTH/HREC/2024/091). Written informed consent was obtained from all participating patients.',
      conflictOfInterest: 'The authors declare no competing financial or commercial interests.'
    }
  },
  {
    id: 'lmj-2025-02',
    title: 'Machine Learning Risk Stratification in Refractory Essential Hypertension: A Multicenter Cohort Study in Oyo and Osun States',
    abstract: 'Predicting target organ damage in hypertensive individuals remains challenging under conventional clinical risk scoring systems. Using prospective cohort data from 1,460 adult hypertensive patients monitored across teaching hospitals in Ogbomoso and Osogbo over a 24-month period, we trained gradient boosted decision trees (XGBoost) against standard Framingham and SCORE2 cardiovascular equations. The ensemble ML model demonstrated superior precision in predicting 2-year left ventricular hypertrophy and microalbuminuria progression (AUC 0.887 vs. 0.741, p < 0.001).',
    authors: [
      { name: 'Prof. Adeseye Akintunde', affiliation: 'Cardiology Unit, Department of Internal Medicine, LAUTECH', role: 'Faculty Patron & Co-Author' },
      { name: 'Oluwaseun D. Adeleke', role: 'Student Editor-in-Chief', affiliation: 'LAUMED Journal Club, LAUTECH', isCorresponding: true, email: 'adeleke.o@laumedjc.org' },
      { name: 'Chukwudi E. Okonkwo', role: 'Student Researcher', affiliation: 'Department of Physiology, LAUTECH' }
    ],
    articleType: 'Original Research',
    specialty: 'Cardiology & Vascular',
    volume: 4,
    issue: 1,
    year: 2025,
    publicationDate: 'January 2025',
    doi: '10.5281/laumed.2025.0402',
    readTime: '11 min read',
    downloads: 382,
    citationsCount: 9,
    keywords: ['Hypertension', 'Target Organ Damage', 'Cardiology', 'XGBoost', 'LAUTECH', 'Echocardiography'],
    fullArticle: {
      background: 'Hypertension is the paramount driver of heart failure, stroke, and chronic kidney disease in West Africa. Standard Western risk equations frequently underestimate cardiovascular morbidity in indigenous African populations due to distinct genetic polymorphisms, dietary salt sensitivity, and socioeconomic variables.',
      methods: 'Patients aged 30–75 with documented hypertension were consecutively enrolled. Baseline echocardiographic parameters, 24-hour ambulatory blood pressure, urinary albumin-to-creatinine ratio (uACR), and serum biochemical markers were extracted. Extreme Gradient Boosting (XGBoost) and Random Forest classifiers were trained with 5-fold nested cross-validation, using SHAP (Shapley Additive Explanations) for clinical interpretability.',
      results: 'A total of 1,460 patients were followed for a median of 22.4 months. Incident left ventricular hypertrophy (LVH) occurred in 312 patients (21.4%). The machine learning risk index achieved an AUC-ROC of 0.887 (95% CI: 0.865–0.908), compared to 0.741 for Framingham Risk Score. Top predictive drivers identified by SHAP were nocturnal systolic dipping impairment, serum uric acid, and pulse pressure.',
      discussion: 'Traditional algorithmic tools miss non-linear hemodynamic interactions characteristic of high-salt, low-renin phenotypes prevalent in Nigerian patients. Model interpretability graphs allow attending clinicians to pinpoint modifiable physiological targets rather than generic drug escalations.',
      conclusion: 'Cardiovascular risk modeling enriched by automated machine learning offers enhanced early-warning capacity for end-organ damage in Nigerian tertiary practice.',
      ethicalApproval: 'Approved by LTH Institutional Ethics Committee under reference LTH/ERC/2023/114.',
      conflictOfInterest: 'None declared.'
    }
  },
  {
    id: 'lmj-2024-03',
    title: 'Adoption Barriers, Algorithmic Bias, and Physician Perceptions of Clinical Decision Support Tools in Nigerian Teaching Hospitals',
    abstract: 'Despite global enthusiasm for artificial intelligence in medicine, clinical integration within West African healthcare systems faces infrastructural, ethical, and epistemic roadblocks. We conducted a nationwide mixed-methods cross-sectional survey of 520 resident doctors and consultants across six geopolitical zones, coupled with 24 in-depth semi-structured interviews. While 84.6% expressed positive sentiment toward AI-assisted triage and radiology support, 78.2% cited algorithmic bias against dark skin pigmentation and lack of local validation data as critical barriers to bedside adoption.',
    authors: [
      { name: 'Prof. Oluwadiya Kehinde Sunday', affiliation: 'University of Sierra Leone Teaching Hospitals Complex, Freetown' },
      { name: 'Khadijah O. Mustapha', role: 'Senior Research Lead', affiliation: 'LAUMED Journal Club, LAUTECH', isCorresponding: true, email: 'k.mustapha@laumedjc.org' },
      { name: 'Ibrahim O. Bello', affiliation: 'Department of Community Medicine, LAUTECH' }
    ],
    articleType: 'Systematic Review',
    specialty: 'Medical Education',
    volume: 3,
    issue: 2,
    year: 2024,
    publicationDate: 'November 2024',
    doi: '10.5281/laumed.2024.0308',
    readTime: '8 min read',
    downloads: 512,
    citationsCount: 14,
    keywords: ['Artificial Intelligence', 'Algorithmic Bias', 'Health Informatics', 'Medical Curriculum', 'West Africa'],
    fullArticle: {
      background: 'Clinical decision support systems (CDSS) powered by deep learning are increasingly commercialized. However, models trained predominantly on Western cohorts frequently fail when confronted with atypical clinical presentations, diverse Fitzpatrick skin phototypes, or resource constraints in African settings.',
      methods: 'A validated 38-item electronic survey was distributed to registered resident doctors and consultants across 12 federal and state university teaching hospitals. Qualitative thematic analysis was performed on interview transcripts to extract dominant institutional friction points.',
      results: 'Of 520 respondents, only 11.2% reported having formal training in biomedical artificial intelligence during medical school or residency. Primary adoption barriers ranked: (1) erratic electrical/broadband infrastructure (86.4%), (2) fear of unvalidated diagnostic hallucinations (79.8%), and (3) medico-legal liability uncertainty (73.1%).',
      discussion: 'Our findings emphasize that technological deployment without local contextualization risks worsening healthcare disparities. There is an urgent imperative to incorporate medical informatics and data literacy into Nigerian undergraduate medical training.',
      conclusion: 'Bridging the translational gap requires collaborative capacity building between African clinical researchers, software engineers, and health policymakers.',
      ethicalApproval: 'National Health Research Ethics Committee (NHREC/01/01/2007-18/06/2024).'
    }
  },
  {
    id: 'lmj-2024-04',
    title: 'Critical Appraisal of the RECOVERY Dexamethasone Trial: Methodological Rigor and Relevance to Low-Income Acute Respiratory Care',
    abstract: 'In this student-led structured critical appraisal conducted by the LAUMED Journal Club, we appraised the Landmark RECOVERY Trial (Horby et al., N Engl J Med 2021) assessing low-dose dexamethasone in hospitalized COVID-19 and severe acute respiratory distress syndrome. Utilizing the Critical Appraisal Skills Programme (CASP) randomized controlled trial checklist, we dissect the pragmatic open-label design, mortality reduction across invasive ventilation subgroups, and the clinical implications for resource-limited intensive care units in Southwestern Nigeria.',
    authors: [
      { name: 'LAUMED Critical Appraisal Working Group', affiliation: 'LAUMED Journal Club, LAUTECH College of Health Sciences' },
      { name: 'Dr. Mrs. Oluyinka T. Adedeji', affiliation: 'Faculty Advisor, Department of Medical Microbiology, LAUTECH' },
      { name: 'Temiloluwa G. Olusanya', role: 'Student Rapporteur', affiliation: 'LAUMED Journal Club' }
    ],
    articleType: 'Journal Club Appraisal',
    specialty: 'Infectious Diseases',
    volume: 3,
    issue: 2,
    year: 2024,
    publicationDate: 'September 2024',
    doi: '10.5281/laumed.2024.0304',
    readTime: '7 min read',
    downloads: 295,
    citationsCount: 4,
    keywords: ['Critical Appraisal', 'CASP', 'RECOVERY Trial', 'Dexamethasone', 'Evidence-Based Medicine', 'LAUMED JC'],
    fullArticle: {
      background: 'The RECOVERY trial established dexamethasone as a foundational therapy for hypoxemic viral pneumonia. As part of LAUMED Journal Club Session 46, student fellows critically interrogated the trial methodology to determine local translatability in Nigerian centers lacking advanced extracorporeal membrane oxygenation or mechanical ventilation reserves.',
      methods: 'Ten independent student reviewers completed the 11-question CASP RCT appraisal instrument. Discrepancies were arbitrated in plenary session with senior consultant faculty in clinical pharmacology and pulmonology.',
      results: 'The trial scored 10/11 on CASP criteria. Strengths included exceptional statistical power (2,104 patients randomized to dexamethasone vs. 4,321 standard care) and 28-day mortality endpoint clarity. Potential limitations identified: open-label allocation and absence of granular glycemic monitoring in diabetic subgroups.',
      discussion: 'Low cost and ubiquitous availability of dexamethasone in Nigerian hospital pharmacies render this trial one of the highest-yield interventions for developing health systems, provided secondary bacterial and fungal coinfections are diligently screened.',
      conclusion: 'The RECOVERY trial exemplifies robust pragmatic trial architecture and offers immediately actionable evidence for tertiary and secondary referral facilities in Nigeria.'
    }
  },
  {
    id: 'lmj-2024-05',
    title: 'Rare Giant Adrenal Pheochromocytoma Masquerading as Severe Pre-Eclampsia in a 28-Year-Old Primigravida: Multidisciplinary Management',
    abstract: 'Pheochromocytoma diagnosed during pregnancy is an exceptionally rare clinical dilemma carrying maternal and fetal mortality rates exceeding 40% if undetected before delivery. We present the case of a 28-year-old primigravida at 31 weeks gestation presenting with malignant hypertension, paroxysmal diaphoresis, and orthostatic collapse, initially misdiagnosed as atypical pre-eclampsia. Point-of-care ultrasound and urinary free fractionated metanephrines confirmed an 8.4 cm right adrenal mass. We delineate the successful combined pharmacological blockade, elective caesarean section, and posterior retroperitoneoscopic adrenalectomy performed at LAUTECH Teaching Hospital.',
    authors: [
      { name: 'Dr. O. A. Babalola', affiliation: 'Department of Surgery, LAUTECH Teaching Hospital' },
      { name: 'Zainab B. Lawal', role: 'Clinical Clerk', affiliation: 'LAUMED Journal Club, College of Health Sciences, LAUTECH', isCorresponding: true, email: 'z.lawal@laumedjc.org' },
      { name: 'Dr. E. O. Ojo', affiliation: 'Department of Obstetrics and Gynaecology, LAUTECH' }
    ],
    articleType: 'Clinical Case Report',
    specialty: 'Surgery & Anaesthesia',
    volume: 3,
    issue: 1,
    year: 2024,
    publicationDate: 'June 2024',
    doi: '10.5281/laumed.2024.0301',
    readTime: '6 min read',
    downloads: 340,
    citationsCount: 3,
    keywords: ['Pheochromocytoma', 'Pregnancy', 'Secondary Hypertension', 'Adrenalectomy', 'LTH Ogbomoso'],
    fullArticle: {
      background: 'Pheochromocytoma occurs in fewer than 1 in 54,000 pregnancies. Overlapping symptom complexes—notably hypertension, headache, and palpitations—frequently result in fatal diagnostic confusion with severe gestational pre-eclampsia or eclampsia.',
      methods: 'Comprehensive case review including serial biochemical profiles, magnetic resonance imaging without gadolinium contrast, intraoperative hemodynamic records, and histopathological analysis with PASS (Pheochromocytoma of the Adrenal Gland Scaled Score).',
      results: 'Phenoxybenzamine alpha-adrenergic blockade was titrated for 14 days followed by beta-blockade with propranolol. At 33 weeks and 4 days, uneventful caesarean section delivered a live vigorous male infant (APGAR 8 at 1 min, 10 at 5 min), followed immediately by right adrenalectomy. Postoperative urinary catecholamines normalized within 72 hours.',
      discussion: 'Early clinical suspicion and avoidance of unopposed beta-blockade are paramount. Multidisciplinary synchrony between endocrinologists, obstetricians, anaesthesiologists, and endocrine surgeons was decisive in achieving zero maternal or neonatal morbidity.',
      conclusion: 'Atypical severe hypertension in pregnancy unresponsive to triple antihypertensive regimen should prompt biochemical exclusion of catecholamine-secreting neuroendocrine tumors.'
    }
  },
  {
    id: 'lmj-2023-06',
    title: 'Prevalence and Determinants of Prediabetes and Undiagnosed Type 2 Diabetes in Agricultural Communities of Oyo North: A SWEDIG Collaborative Study',
    abstract: 'Despite traditional assumptions of physical activity offering total protection against metabolic dysregulation in agrarian populations, changing dietary transitions have triggered unheralded surges in impaired fasting glycaemia. In this cross-sectional epidemiological survey across 1,120 adults in Ogbomoso North and Surulere local government areas, we assessed fasting plasma glucose, glycated hemoglobin (HbA1c), lipid panels, and anthropometric indices. Prediabetes prevalence reached 14.8%, while undiagnosed diabetes was detected in 6.4% of surveyed adults.',
    authors: [
      { name: 'Prof. Michael Olamoyegun', affiliation: 'Founder, SWEDIG & Department of Internal Medicine, LAUTECH' },
      { name: 'Ayomide P. Ajayi', role: 'Student Research Lead', affiliation: 'LAUMED Journal Club', isCorresponding: true, email: 'a.ajayi@laumedjc.org' },
      { name: 'Babatunde K. Alabi', affiliation: 'Community Health Extension Team, LTH' }
    ],
    articleType: 'Original Research',
    specialty: 'Endocrinology & Diabetes',
    volume: 2,
    issue: 2,
    year: 2023,
    publicationDate: 'November 2023',
    doi: '10.5281/laumed.2023.0205',
    readTime: '10 min read',
    downloads: 468,
    citationsCount: 11,
    keywords: ['Diabetes Mellitus', 'SWEDIG', 'Epidemiology', 'Ogbomoso', 'Cardiometabolic Risk', 'HbA1c'],
    fullArticle: {
      background: 'The epidemiology of diabetes in rural Nigeria is shifting rapidly due to processed starch consumption, commercial vegetable oils, and urbanization of farming hamlets.',
      methods: 'Multi-stage stratified cluster sampling was employed. All participants underwent point-of-care glucometry followed by laboratory venous blood verification and oral glucose tolerance testing for borderline cases.',
      results: 'Of 1,120 participants (median age 48 years; 51.6% female), 166 (14.8%) exhibited impaired fasting glucose (100–125 mg/dL) and 72 (6.4%) had previously undiagnosed overt Type 2 diabetes. Independent risk factors included waist-to-height ratio > 0.5, family history of stroke, and consumption of refined sugar-sweetened beverages.',
      discussion: 'These numbers reveal an urgent silent epidemic in non-metropolitan communities, where healthcare infrastructure is least equipped to treat end-stage diabetic micro- and macrovascular complications.',
      conclusion: 'Community-based screening programs integrated with primary health care immunization centers represent the most feasible containment vector in rural Oyo State.'
    }
  }
];

export const JOURNAL_CLUB_SESSIONS: JournalClubSession[] = [
  {
    id: 'jcs-51',
    sessionNumber: 51,
    date: 'March 13, 2025',
    time: '4:00 PM - 5:30 PM WAT',
    paperTitle: 'Artificial Intelligence in Point-of-Care Ultrasound for Left Ventricular Ejection Fraction Estimation in Low-Resource Emergency Departments (NEJM AI 2025)',
    originalJournal: 'New England Journal of Medicine AI',
    doi: '10.1056/AIoa2408912',
    presenter: 'Adeoluwa F. Ojedele (500L MB;BS)',
    presenterLevel: 'Clinical Clerk, LAUTECH',
    facultyModerator: 'Prof. Adeseye Akintunde (Consultant Cardiologist)',
    caspScore: 'Pending Appraisal',
    status: 'Upcoming',
    keyTakeaways: [
      'Evaluation of deep learning edge inference on handheld Philips Lumify ultrasound probes',
      'Validation across black patient cohorts with hypertensive heart failure',
      'Comparison with biplane Simpson method performed by veteran sonographers'
    ],
    venue: 'Clinical Skills Lab 2 / Google Meet Hybrid'
  },
  {
    id: 'jcs-50',
    sessionNumber: 50,
    date: 'February 13, 2025',
    time: '4:00 PM - 5:45 PM WAT',
    paperTitle: 'Sodium-Glucose Cotransporter 2 Inhibitors in Non-Diabetic Heart Failure with Preserved Ejection Fraction: The EMPEROR-Preserved Trial Revisited',
    originalJournal: 'The Lancet Respiratory & Cardiovascular Medicine',
    doi: '10.1016/S0140-6736(24)01844-3',
    presenter: 'Chiamaka N. Eze (600L MB;BS)',
    presenterLevel: 'Finalist Student Editor',
    facultyModerator: 'Prof. Michael Olamoyegun (Consultant Endocrinologist)',
    caspScore: '9 / 10 CASP RCT Score',
    status: 'Completed',
    keyTakeaways: [
      'Empagliflozin reduced combined cardiovascular death or hospitalization by 21%',
      'Renal protective effect consistent across glomerular filtration rate strata',
      'Cost-utility analysis in Nigerian private and National Health Insurance tiers'
    ],
    slidesUrl: '/assets/docs/jcs-50-slides.pdf',
    venue: 'Department of Medicine Seminar Room, LTH Ogbomoso'
  },
  {
    id: 'jcs-49',
    sessionNumber: 49,
    date: 'January 23, 2025',
    time: '4:00 PM - 5:30 PM WAT',
    paperTitle: 'Deep Neural Networks for Automated Detection of Plasmodium Falciparum Parasitemia in Thick Blood Smears: A Field Trial in Rural Primary Health Centers',
    originalJournal: 'PLOS Global Public Health',
    doi: '10.1371/journal.pgph.0003180',
    presenter: 'Khadijah O. Mustapha (500L MB;BS)',
    presenterLevel: 'Research Fellow, LAUMED JC',
    facultyModerator: 'Dr. Mrs. Oluyinka Titilayo Adedeji (Consultant Microbiologist)',
    caspScore: '9.5 / 10 Diagnostic Accuracy Checklist',
    status: 'Completed',
    keyTakeaways: [
      'Optical microscopes retrofitted with 3D printed smartphone cradles',
      '96.2% sensitivity for parasite densities > 500 parasites/μL',
      'Potential to alleviate laboratory scientist shortages during malaria peak seasons'
    ],
    slidesUrl: '/assets/docs/jcs-49-slides.pdf',
    venue: 'Microbiology Auditorium, LAUTECH College of Health Sciences'
  }
];

export const INITIAL_SUBMISSIONS: ManuscriptSubmission[] = [
  {
    id: 'sub-084',
    trackingCode: 'LMJ-2025-084',
    title: 'Evaluating Machine Learning Clinical Decision Support for Pediatric Sepsis Early Warning in Southwestern Nigeria',
    category: 'Original Research',
    specialty: 'AI & Digital Health',
    abstract: 'Pediatric sepsis in low-resource emergency departments is marred by ambiguous early signs. We assessed an ensemble tree-based algorithm utilizing simple vital signs and capillary refill duration across 320 pediatric admissions.',
    leadAuthor: 'Oluwadarasimi A. Jacobs (500L MB;BS)',
    email: 'darasimi.jacobs@student.lautech.edu.ng',
    institution: 'LAUTECH College of Health Sciences, Ogbomoso',
    submissionDate: 'Feb 10, 2025',
    status: 'In Peer Review',
    reviewProgress: 65,
    reviewersNotes: 'Methodology section well structured. Reviewers requested subgroup analysis on children aged < 12 months.'
  },
  {
    id: 'sub-081',
    trackingCode: 'LMJ-2025-081',
    title: 'Serum Ferritin and Glycated Albumin Interplay in Sickle Cell Anemia Patients with Comorbid Type 2 Diabetes',
    category: 'Clinical Case Report',
    specialty: 'Endocrinology & Diabetes',
    abstract: 'Severe hemolytic turnover in sickle cell disease falsely depresses HbA1c, creating severe management hazards. We evaluate glycated albumin as a superior glycaemic surrogate in two homozygous HbSS patients.',
    leadAuthor: 'Babatunde G. Fashola (600L MB;BS)',
    email: 'b.fashola@laumedjc.org',
    institution: 'LAUTECH Teaching Hospital, Ogbomoso',
    submissionDate: 'Jan 28, 2025',
    status: 'Revision Requested',
    reviewProgress: 80,
    reviewersNotes: 'Minor revisions required: please include longitudinal 6-month continuous glucose monitoring traces.'
  },
  {
    id: 'sub-079',
    trackingCode: 'LMJ-2025-079',
    title: 'Critical Appraisal of the STAMPEDE Trial: Surgical vs. Medical Therapy for Type 2 Diabetes Remission Over 5 Years',
    category: 'Journal Club Appraisal',
    specialty: 'Surgery & Anaesthesia',
    abstract: 'A rigorous CASP appraisal of the long-term randomized trial of bariatric metabolic surgery versus intensive pharmacotherapy in obese diabetic patients, with commentary on surgical access in Nigeria.',
    leadAuthor: 'Chiamaka N. Eze (600L MB;BS)',
    email: 'chiamaka.eze@laumedjc.org',
    institution: 'LAUMED Journal Club',
    submissionDate: 'Jan 15, 2025',
    status: 'Accepted for Publication',
    reviewProgress: 100,
    reviewersNotes: 'Accepted for inclusion in LMJ Volume 4, Issue 1 (Conference Launch Edition).'
  }
];

export const CASP_CHECKLIST_TEMPLATE = [
  {
    id: 'q1',
    question: 'Did the study address a clearly focused research question?',
    hint: 'Consider the population studied, the intervention/exposure given, and the outcomes measured (PICO).'
  },
  {
    id: 'q2',
    question: 'Was the assignment of participants to interventions randomized?',
    hint: 'Look for allocation concealment and computer-generated random sequences.'
  },
  {
    id: 'q3',
    question: 'Were all participants who entered the trial accounted for at its conclusion?',
    hint: 'Check if loss to follow-up was minimized and intention-to-treat (ITT) analysis was performed.'
  },
  {
    id: 'q4',
    question: 'Were participants, healthcare workers, and study personnel blinded?',
    hint: 'Consider if double or triple blinding was feasible and whether outcome assessors were masked.'
  },
  {
    id: 'q5',
    question: 'Were the groups similar at the start of the trial?',
    hint: 'Look at Table 1 for baseline clinical and demographic comparability.'
  },
  {
    id: 'q6',
    question: 'Aside from the experimental intervention, were groups treated equally?',
    hint: 'Were concomitant medications or clinical visit frequencies standardized?'
  },
  {
    id: 'q7',
    question: 'How large was the treatment effect?',
    hint: 'Evaluate the relative risk reduction, absolute risk reduction, odds ratio, and number needed to treat (NNT).'
  },
  {
    id: 'q8',
    question: 'How precise was the estimate of the treatment effect?',
    hint: 'Check the 95% confidence intervals and p-values.'
  },
  {
    id: 'q9',
    question: 'Can the results be applied to your local population?',
    hint: 'Consider whether the patients in the trial are clinically representative of Nigerian tertiary hospital patients.'
  },
  {
    id: 'q10',
    question: 'Were all clinically important outcomes considered?',
    hint: 'Were adverse events, quality of life, and treatment costs addressed?'
  }
];
