/**
 * Every figure below is quoted from the linked source. Do not edit a number without re-checking its source.
 * Facilities, admissions, calls and global estimates measure different things, so they are never added together.
 */
export const SOURCES = {
  report2025: { label: 'NDDCB, Annual Statistical Report on Treatment Admissions, 2025', href: 'https://www.nddcb.gov.lk/Docs/research/Annual_Statistical_Report_on_Treatment_Admissions_for_Drug_Use_Disorders.pdf' },
  list: { label: 'NDDCB, list of designated and private centres', href: 'https://nddcb.gov.lk/designated-and-private-treatment-centers.php' },
  annual2023: { label: 'NDDCB, Annual Report 2023', href: 'https://www.parliament.lk/uploads/documents/paperspresented/1742559797053614.pdf' },
  whoMental: { label: 'WHO, Mental disorders fact sheet', href: 'https://www.who.int/news-room/fact-sheets/detail/mental-disorders' },
  whoSubstance: { label: 'WHO news release, 25 June 2024', href: 'https://www.who.int/news/item/25-06-2024-over-3-million-annual-deaths-due-to-alcohol-and-drug-use-majority-among-men' },
};

export type Graphic = { kind: 'dots'; n: number; alt?: number } | { kind: 'ring'; pct: number } | { kind: 'bars' } | { kind: 'wave' } | { kind: 'none' };
export type Stat = {
  id: string; value: number; decimals?: number; suffix?: string; prefix?: string;
  label: string; scope: string; source: { label: string; href: string }; note?: string; graphic: Graphic;
};

export const STAT_GROUPS: { id: string; title: string; measure: string; caveat?: string; stats: Stat[] }[] = [
  {
    id: 'places', title: 'Places', measure: 'Counts of treatment facilities in Sri Lanka',
    caveat: 'We could not confirm one official national total, so these counts are shown separately and not added together.',
    stats: [
      { id: 'nddcb', value: 5, label: 'NDDCB residential treatment centres', scope: 'Sri Lanka, 2025', source: SOURCES.report2025, graphic: { kind: 'dots', n: 5 } },
      { id: 'private', value: 13, label: 'private treatment centres', scope: 'Sri Lanka, listed by NDDCB, checked Nov 2026', source: SOURCES.list, note: 'The 2023 Annual Report also gives 13.', graphic: { kind: 'dots', n: 13 } },
      { id: 'designated', value: 11, label: 'designated treatment centres', scope: 'Sri Lanka, listed by NDDCB, checked Nov 2026', source: SOURCES.list, note: '10 of the 11 listed are prisons. The 2023 Annual Report gave 10 centres.', graphic: { kind: 'dots', n: 11, alt: 10 } },
    ],
  },
  {
    id: 'reach', title: 'Reach', measure: 'How often services in Sri Lanka were used',
    stats: [
      { id: 'admissions', value: 6030, label: 'treatment admissions for drug use disorders', scope: 'Sri Lanka, 2025', source: SOURCES.report2025, note: 'Counts admissions. The report does not say these are unique people.', graphic: { kind: 'bars' } },
      { id: 'residential', value: 76.6, decimals: 1, suffix: '%', label: 'of those admissions were in institutional or residential care', scope: 'Sri Lanka, 2025', source: SOURCES.report2025, graphic: { kind: 'ring', pct: 76.6 } },
      { id: 'calls', value: 15522, label: 'calls to the 1927 telephone counselling service', scope: 'Sri Lanka, 2023', source: SOURCES.annual2023, graphic: { kind: 'wave' } },
    ],
  },
  {
    id: 'world', title: 'The wider picture', measure: 'Global estimates and treatment reach',
    stats: [
      { id: 'ed', value: 18, suffix: ' million', label: 'people experienced eating disorders', scope: 'Worldwide, 2023', source: SOURCES.whoMental, note: 'Includes 4.7 million children and adolescents.', graphic: { kind: 'none' } },
      { id: 'contact', value: 35, prefix: 'Up to ', suffix: '%', label: 'of people with substance use disorders were in contact with treatment services', scope: 'Countries reporting to WHO, 2019', source: SOURCES.whoSubstance, note: 'The range ran from under 1% to no more than 35%.', graphic: { kind: 'ring', pct: 35 } },
    ],
  },
];

export const PROVIDERS_2025 = [
  { provider: 'Private treatment services', count: 2520, pct: 41.8 },
  { provider: 'NDDCB outreach services', count: 1409, pct: 23.4 },
  { provider: 'BR treatment services', count: 1299, pct: 21.5 },
  { provider: 'NDDCB treatment centres', count: 760, pct: 12.6 },
  { provider: 'Other providers', count: 42, pct: 0.7 },
];
