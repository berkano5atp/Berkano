/**
 * Support resources. Every entry was checked against the source named in `checkedVia` on the date below.
 * Phone numbers and hours change, so re-check this file before each release and before the viva.
 */
export const LAST_CHECKED = '4 November 2026';

export type Topic = 'eating' | 'substance' | 'emotional' | 'professional' | 'learn';
export type Region = 'lk' | 'intl';

export const TOPICS: { id: Topic; label: string }[] = [
  { id: 'eating', label: 'Eating disorders' },
  { id: 'substance', label: 'Substance use and rehabilitation' },
  { id: 'emotional', label: 'Emotional support' },
  { id: 'professional', label: 'Professional care' },
  { id: 'learn', label: 'Learn more' },
];

export type Resource = {
  name: string;
  description: string;
  href: string;
  linkLabel: string;
  region: Region;
  where: string;
  topics: Topic[];
  phones?: { label: string; tel: string; note?: string }[];
  checkedVia: string;
};

export const RESOURCES: Resource[] = [
  {
    name: 'CCCline 1333',
    description: 'A confidential, toll-free crisis support line from LifeLine Sri Lanka. Find A Helpline lists it for people struggling with eating and body image, among other concerns.',
    href: 'https://lifeline-international.com/member/sri-lanka/', linkLabel: 'View the LifeLine International listing',
    region: 'lk', where: 'Sri Lanka', topics: ['emotional', 'eating'],
    phones: [{ label: '1333', tel: '1333', note: '24 hours, every day' }],
    checkedVia: 'LifeLine International member page and Find A Helpline',
  },
  {
    name: '1926 National Mental Health Helpline',
    description: 'The national helpline from the National Institute of Mental Health, the specialist mental-health institute in Sri Lanka.',
    href: 'https://nimh.health.gov.lk/en/1926-national-mental-health-helpline/', linkLabel: 'Visit the NIMH helpline page',
    region: 'lk', where: 'Sri Lanka', topics: ['emotional', 'professional'],
    phones: [{ label: '1926', tel: '1926', note: 'Listed as 24 hours by Find A Helpline' }],
    checkedVia: 'NIMH website and Find A Helpline',
  },
  {
    name: 'Sri Lanka Sumithrayo',
    description: 'Volunteers offer emotional support to people who feel lonely, depressed or despairing, or who are at risk of suicide. Branches operate around the country. An affiliate of Befrienders Worldwide.',
    href: 'https://srilankasumithrayo.lk/contact-us/', linkLabel: 'See all branches and numbers',
    region: 'lk', where: 'Branches across Sri Lanka', topics: ['emotional'],
    phones: [{ label: '011 269 6666', tel: '+94112696666', note: 'Founding branch, Colombo 7, daily 9 am to 8 pm' }],
    checkedVia: 'Sumithrayo contact page',
  },
  {
    name: 'Lanka Life Line 1375',
    description: 'A non-profit, confidential community helpline staffed by counsellors and volunteers. Find A Helpline lists it for eating and body image concerns.',
    href: 'https://findahelpline.com/countries/lk/topics/eating-body-image', linkLabel: 'View the Find A Helpline listing',
    region: 'lk', where: 'Sri Lanka', topics: ['eating', 'emotional'],
    phones: [{ label: '1375', tel: '1375', note: 'Hours not listed' }],
    checkedVia: 'Find A Helpline',
  },
  {
    name: 'National Dangerous Drugs Control Board',
    description: 'The government body for drug control. It provides counselling and residential treatment at its own centres, including Talangama, Nawadiganthaya (Nittambuwa), Galle and Kandy.',
    href: 'https://nddcb.gov.lk/', linkLabel: 'Visit the NDDCB website',
    region: 'lk', where: 'Colombo, Gampaha, Galle and Kandy districts', topics: ['substance', 'professional'],
    checkedVia: 'NDDCB website',
  },
  {
    name: 'NDDCB 1927 helpline',
    description: 'A telephone counselling service for people who use drugs and their families, with basic information and referrals to treatment.',
    href: 'https://www.nddcb.gov.lk/helpline.php', linkLabel: 'Visit the 1927 helpline page',
    region: 'lk', where: 'Sri Lanka', topics: ['substance', 'emotional'],
    phones: [{ label: '1927', tel: '1927', note: 'Hours not listed' }],
    checkedVia: 'NDDCB website and NDDCB Annual Report 2023',
  },
  {
    name: 'NDDCB list of private and designated treatment centres',
    description: 'The official list, with addresses and phone numbers. Private centres include Mel Medura in Colombo. Most designated centres on the list are prison-based, so check which type applies before you make contact.',
    href: 'https://nddcb.gov.lk/designated-and-private-treatment-centers.php', linkLabel: 'Open the list of centres',
    region: 'lk', where: 'Sri Lanka', topics: ['substance', 'professional'],
    checkedVia: 'NDDCB website',
  },
  {
    name: 'National Council for Mental Health (Sahanaya)',
    description: 'Outpatient psychiatric consultations, counselling, a day programme in Borella and residential rehabilitation in Pandura for people with mental-health or behavioural conditions. Centres open Monday to Friday, 8:30 am to 4:30 pm.',
    href: 'https://ncmh.lk/page/what-we-do/57', linkLabel: 'See what NCMH offers',
    region: 'lk', where: 'Colombo and Pandura', topics: ['professional', 'emotional', 'substance'],
    checkedVia: 'NCMH website',
  },
  {
    name: 'National Institute of Mental Health',
    description: 'The national institute for mental-health care, with information in English, Sinhala and Tamil.',
    href: 'https://nimh.health.gov.lk/en/home-page/', linkLabel: 'Visit the NIMH website',
    region: 'lk', where: 'Angoda, Sri Lanka', topics: ['professional', 'learn'],
    checkedVia: 'NIMH website',
  },
  {
    name: 'Alcohol and Drug Information Centre (ADIC)',
    description: 'A Sri Lankan resource organisation working to reduce the demand for alcohol, tobacco and other drugs. It offers information, prevention materials and technical expertise.',
    href: 'https://adicsrilanka.org/whats-adic/', linkLabel: 'Read about ADIC',
    region: 'lk', where: 'Sri Lanka', topics: ['substance', 'learn'],
    checkedVia: 'ADIC website',
  },
  {
    name: 'Find A Helpline: Sri Lanka',
    description: 'A public directory of helplines in Sri Lanka that you can filter by topic.',
    href: 'https://findahelpline.com/countries/lk', linkLabel: 'Browse Sri Lankan helplines',
    region: 'lk', where: 'Directory', topics: ['emotional', 'eating', 'substance'],
    checkedVia: 'Find A Helpline',
  },
  {
    name: 'Alcoholics Anonymous',
    description: 'A worldwide mutual-support fellowship. The international directory includes a listing for Sri Lanka.',
    href: 'https://www.aa.org/find-aa/world', linkLabel: 'Find A.A. by country',
    region: 'intl', where: 'Worldwide', topics: ['substance'],
    checkedVia: 'aa.org directory',
  },
  {
    name: 'Beat',
    description: 'The UK eating-disorder charity. It offers information and support for people affected, along with families, friends and healthcare professionals.',
    href: 'https://www.beateatingdisorders.org.uk/get-information-and-support/', linkLabel: 'Get information from Beat',
    region: 'intl', where: 'United Kingdom', topics: ['eating', 'learn'],
    checkedVia: 'Beat website',
  },
  {
    name: 'National Alliance for Eating Disorders',
    description: 'A US nonprofit offering education, referrals and support for people with eating disorders and their families.',
    href: 'https://www.allianceforeatingdisorders.com/', linkLabel: 'Visit the Alliance website',
    region: 'intl', where: 'United States', topics: ['eating', 'learn'],
    checkedVia: 'Alliance website',
  },
  {
    name: 'Academy for Eating Disorders',
    description: 'A professional association. This page explains treatment options, care teams and settings.',
    href: 'https://www.aedweb.org/resources/about-eating-disorders/treatment-options', linkLabel: 'Read about treatment options',
    region: 'intl', where: 'International', topics: ['eating', 'learn', 'professional'],
    checkedVia: 'AED website',
  },
  {
    name: 'World Health Organization: mental disorders',
    description: 'A plain-language fact sheet on mental-health conditions, including a section on eating disorders.',
    href: 'https://www.who.int/news-room/fact-sheets/detail/mental-disorders', linkLabel: 'Read the WHO fact sheet',
    region: 'intl', where: 'Global', topics: ['learn', 'eating'],
    checkedVia: 'WHO website',
  },
  {
    name: 'World Health Organization: alcohol, drugs and addictive behaviours',
    description: 'Information on psychoactive drugs and the WHO programme of work on substance use.',
    href: 'https://www.who.int/teams/mental-health-and-substance-use/alcohol-drugs-and-addictive-behaviours/drugs-psychoactive', linkLabel: 'Read the WHO overview',
    region: 'intl', where: 'Global', topics: ['learn', 'substance'],
    checkedVia: 'WHO website',
  },
  {
    name: 'UNODC: drug dependence treatment and care',
    description: 'The UN Office on Drugs and Crime explains its work on treatment and rehabilitation, including international standards.',
    href: 'https://www.unodc.org/unodc/en/treatment-and-care/index.html', linkLabel: 'Visit the UNODC page',
    region: 'intl', where: 'Global', topics: ['learn', 'substance'],
    checkedVia: 'UNODC website',
  },
];
