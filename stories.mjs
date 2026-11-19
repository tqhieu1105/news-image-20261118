// Editorial selection: events on, or reporting first published on, 18 November 2026.
// Two explicit headline lines let the small newspaper preserve qualifications.
const js18 = 'https://www.justsecurity.org/165038/early-edition-november-18-2026/';
const js19 = 'https://www.justsecurity.org/165250/early-edition-november-19-2026/';
const guardian = (section, slug) => `https://www.theguardian.com/${section}/2026/nov/18/${slug}`;
const aj = (section, slug) => `https://www.aljazeera.com/${section}/2026/11/18/${slug}`;
const germany = 'https://www.dw.com/en/germany-news-merzs-coalition-agrees-on-electricity-tax-cut/live-79976869';

export const sections = [
  'WAR & DIPLOMACY', 'PEOPLE & POWER', 'MONEY & MACHINES', 'PLANET & CULTURE',
];

export const stories = [
  {
    id: 1, lines: ['Xi hosts Trump', 'at China APEC'], icon: 'summit', region: 'Asia-Pacific', field: 'Diplomacy',
    basis: 'event', timing: 'Wednesday arrival and APEC opening, not Thursday’s three-leader summit.',
    sources: [guardian('world', 'xi-jinping--protectionism-donald-trump-apec-summit-putin')],
  },
  {
    id: 2, lines: ['EU proposes', '€45bn Kyiv loan'], icon: 'euroshield', region: 'Europe', field: 'War finance',
    basis: 'event', timing: 'Commission proposal announced Wednesday; approval was still pending.',
    sources: [guardian('world', 'eu-loan-ukraine-cash-crisis-defences-von-der-leyen-kyiv')],
  },
  {
    id: 3, lines: ['Iran attacks', 'Kuwait, Bahrain'], icon: 'missile', region: 'Middle East', field: 'Conflict',
    basis: 'event', timing: 'The November 18 roundup identifies the strikes as early that day.',
    sources: [js18],
  },
  {
    id: 4, lines: ['Report: Putin', 'wants to fight on'], icon: 'tankclock', region: 'Europe', field: 'Conflict',
    basis: 'first_report', timing: 'November 18 intelligence reporting; an assessment, not a newly announced Kremlin decision.',
    sources: [js18, 'https://www.nytimes.com/2026/11/18/us/politics/trump-putin-ukraine-war.html'],
  },
  {
    id: 5, lines: ['Gaza peace board', 'faults both sides'], icon: 'peacereport', region: 'Middle East', field: 'Diplomacy',
    basis: 'first_report', timing: 'Reuters report dated November 18, summarized in that day’s Early Edition.',
    sources: [js18, 'https://www.reuters.com/world/middle-east/trumps-board-peace-faults-israel-hamas-failure-end-gaza-war-2026-11-18/'],
  },
  {
    id: 6, lines: ['Israeli tanks', 'raid central Gaza'], icon: 'tank', region: 'Middle East', field: 'Conflict',
    basis: 'event', timing: 'BBC first published November 18 at 20:14 UTC; explicitly dates the incursion Wednesday. Completion was Thursday.',
    sources: ['https://www.bbc.co.uk/news/articles/cw8r7510degno'],
  },
  {
    id: 7, lines: ['Ethiopia–Eritrea', 'troops mass'], icon: 'border', region: 'Africa', field: 'Security',
    basis: 'first_report', timing: 'Border buildup newly reported by Reuters November 18, not described as a new war.',
    sources: [js18, 'https://www.reuters.com/world/africa/ethiopia-eritrea-amass-forces-along-border-heightening-war-fears-sources-say-2026-11-18/'],
  },
  {
    id: 8, lines: ['Myanmar reviews', 'ASEAN ties'], icon: 'asean', region: 'Asia', field: 'Diplomacy',
    basis: 'event', timing: 'Parliamentary address identified as today in the November 18 roundup.',
    sources: [js18, 'https://apnews.com/article/min-aung-hlaing-asean-peace-plan-turmoil-97e863b842b3a3ad805635b11a7aea8c'],
  },
  {
    id: 9, lines: ['N Korea expands', 'uranium: IAEA'], icon: 'atom', region: 'Asia', field: 'Nuclear security',
    basis: 'event', timing: 'Grossi’s board address was Wednesday, identified as yesterday in the November 19 roundup.',
    sources: [js19, 'https://apnews.com/article/north-korea-nuclear-uranium-iaea-a74218014e9c141712e3abebdd9334ac'],
  },
  {
    id: 10, lines: ['US–Venezuela', 'military pact'], icon: 'pact', region: 'South America', field: 'Security',
    basis: 'event', timing: 'Wednesday visit and announcement in Caracas; intelligence sharing and joint training.',
    sources: [aj('news', 'us-defence-secretary-announces-military-partnership-on-trip-to-venezuela')],
  },
  {
    id: 11, lines: ['Haiti plot:', 'pastor convicted'], icon: 'gavel', region: 'Caribbean', field: 'Justice',
    basis: 'event', timing: 'Sanon convicted Wednesday in Miami over the 2021 Moïse assassination plot; the killing was not this day.',
    sources: [guardian('us-news', 'florida-pastor-guilty-haiti-president-assassination')],
  },
  {
    id: 12, lines: ['Jeffries wins', 'US Speaker nod'], icon: 'speaker', region: 'North America', field: 'Politics',
    basis: 'event', timing: 'Wednesday caucus nomination; formal House election remained in January 2027.',
    sources: [guardian('us-news', 'hakeem-jeffries-house-speaker-nomination')],
  },
  {
    id: 13, lines: ['Israel delays', 'E1 building bids'], icon: 'construction', region: 'Middle East', field: 'Land and rights',
    basis: 'first_report', timing: 'November 18 report of the tender deferral; not a cancellation of the settlement plan.',
    sources: [guardian('world', 'israel-construction-contracts-e1-west-bank-settlement-uk-sanctions')],
  },
  {
    id: 14, lines: ['Iglesias faces', 'Spain sex probe'], icon: 'micjustice', region: 'Europe', field: 'Justice and culture',
    basis: 'event', timing: 'Court statement released Wednesday. Allegations denied; investigation is not a conviction.',
    sources: [guardian('world', 'spanish-court-investigates-julio-iglesias-two-women-allegations')],
  },
  {
    id: 15, lines: ['US sanctions', 'Hezbollah funding'], icon: 'sanctions', region: 'Middle East', field: 'Security finance',
    basis: 'event', timing: 'Treasury designations announced Wednesday against an alleged funding network.',
    sources: [aj('news', 'us-steps-up-pressure-on-iran-backed-hezbollah-with-new-sanctions')],
  },
  {
    id: 16, lines: ['6 French get life', 'for ISIL in Iraq'], icon: 'prison', region: 'Middle East / Europe', field: 'Justice',
    basis: 'event', timing: 'Wednesday sentencing by Karkh Criminal Court, reported by Iraqi state media and AFP.',
    sources: [aj('news', 'iraq-sentences-six-french-nationals-to-life-in-prison-for-joining-isil')],
  },
  {
    id: 17, lines: ['Fiji declares', 'drought disaster'], icon: 'drought', region: 'Oceania', field: 'Disaster',
    basis: 'first_report', timing: 'RNZ report published November 18 at 14:44 NZDT on the national declaration.',
    sources: ['https://www.rnz.co.nz/news/pacific/2660183/fiji-declares-state-of-national-disaster-over-el-nino-drought'],
  },
  {
    id: 18, lines: ['PNG mine harm:', 'Rio Tinto’s $250m'], icon: 'mine', region: 'Oceania', field: 'Environment and rights',
    basis: 'first_report', timing: 'New York Times report November 18; RNZ corroboration at November 18 18:24 UTC (November 19 in New Zealand).',
    sources: ['https://www.nytimes.com/2026/11/18/world/asia/rio-tinto-papua-new-guinea-mine.html', 'https://www.rnz.co.nz/news/pacific/2674427/rio-tinto-commits-us-250m-to-address-damage-from-bougainville-s-panguna-mine', js19],
  },
  {
    id: 19, lines: ['Senegal migrant', 'boat capsizes'], icon: 'boat', region: 'Africa', field: 'Migration',
    basis: 'event', timing: 'Shipwreck near Yenne around 02:00 GMT Wednesday; at least one confirmed dead, toll uncertain.',
    sources: [aj('news', 'migrant-boat-capsizes-off-senegal-leaving-at-least-one-dead')],
  },
  {
    id: 20, lines: ['Yemen child toll', '64, says UNICEF'], icon: 'child', region: 'Middle East', field: 'Humanitarian',
    basis: 'first_report', timing: 'UNICEF report Wednesday: at least 64 children killed since September 3, not 64 killed in one day.',
    sources: ['https://news.un.org/en/story/2026/11/1168830'],
  },
  {
    id: 21, lines: ['UK inflation', 'climbs to 3.6%'], icon: 'inflation', region: 'Europe', field: 'Economy',
    basis: 'event', timing: 'October CPI released Wednesday; up from September’s 3.5%.',
    sources: [guardian('business', 'uk-inflation-rises-energy-prices-iran-war-oil')],
  },
  {
    id: 22, lines: ['Australian pay', 'trails inflation'], icon: 'wages', region: 'Oceania', field: 'Economy',
    basis: 'event', timing: 'Wednesday ABS wage price release: annual growth 3.5%, still below price growth.',
    sources: [guardian('australia-news', 'wages-grow-at-fastest-pace-since-2023-but-prices-are-climbing-even-more-quickly')],
  },
  {
    id: 23, lines: ['Germany agrees', 'power tax cut'], icon: 'electricity', region: 'Europe', field: 'Economy',
    basis: 'event', timing: 'Coalition agreement Wednesday for 2027; budget legislation was still pending.',
    sources: [germany],
  },
  {
    id: 24, lines: ['Anthropic sets', 'IPO price: $83'], icon: 'chipprice', region: 'North America / Global', field: 'Technology finance',
    basis: 'event', timing: 'IPO price set Wednesday; shares began trading Thursday, not this day.',
    sources: [guardian('technology', 'anthropic-share-price-stock-market-ipo')],
  },
  {
    id: 25, lines: ['Russian faces', 'US tech-spy case'], icon: 'spy', region: 'North America / Europe', field: 'Cybersecurity',
    basis: 'event', timing: 'Justice Department indictment announced Wednesday; allegations are not proven guilt.',
    sources: [guardian('technology', 'russian-national-spying-silicon-valley')],
  },
  {
    id: 26, lines: ['Arizona probes', 'rogue AI banking'], icon: 'bankai', region: 'North America', field: 'AI and finance',
    basis: 'event', timing: 'Mayes announced the investigation Wednesday, described as yesterday in November 19 reporting.',
    sources: [js19, 'https://www.reuters.com/legal/transactional/arizona-says-it-is-investigating-openai-other-firms-over-possible-rogue-agents-2026-11-19/'],
  },
  {
    id: 27, lines: ['Senate plans AI', 'terror hearings'], icon: 'aihearing', region: 'North America', field: 'AI governance',
    basis: 'event', timing: 'Hassan’s hearing plans announced Wednesday in that day’s roundup; hearings had not yet taken place.',
    sources: [js18, 'https://apnews.com/article/ai-terrorism-risks-anthropic-grok-gemini-claude-fd36b9004c00259aa2f7b871a61aeb8c'],
  },
  {
    id: 28, lines: ['US science chief', 'nominee blocked'], icon: 'sciencevote', region: 'North America', field: 'Science policy',
    basis: 'event', timing: 'Cassidy halted O’Neill’s NSF confirmation hearing Wednesday; the nominee was not confirmed director.',
    sources: [guardian('us-news', 'trump-national-science-foundation-nominee')],
  },
  {
    id: 29, lines: ['Egg giant to cull', '1.8m in bird flu'], icon: 'birdflu', region: 'North America', field: 'Health and food',
    basis: 'event', timing: 'Wednesday Cal-Maine announcement for a Florida facility; approximate flock size rounded to 1.8m.',
    sources: [aj('economy', 'largest-us-egg-producer-to-cull-1-8-million-birds-after-bird-flu-outbreak')],
  },
  {
    id: 30, lines: ['German firms’', 'orbital arms plan'], icon: 'orbital', region: 'Europe / Space', field: 'Space and defense',
    basis: 'event', timing: 'Wednesday MBDA–ATMOS development agreement; planned capability, not deployed weapons.',
    sources: [germany],
  },
  {
    id: 31, lines: ['COP31 launches', 'climate stocktake'], icon: 'stocktake', region: 'Global / Türkiye', field: 'Climate governance',
    basis: 'event', timing: 'Second Paris Agreement global stocktake launched Wednesday; it will conclude in 2028.',
    sources: ['https://news.un.org/en/story/2026/11/1168833'],
  },
  {
    id: 32, lines: ['30 nations back', 'fossil fuel treaty'], icon: 'fossiltreaty', region: 'Global / Latin America', field: 'Climate diplomacy',
    basis: 'event', timing: 'Wednesday press conference announced 30 countries backing treaty development, not a completed treaty.',
    sources: [guardian('environment', 'world-held-hostage-by-oil-mafia-says-panama-minister-at-cop-31')],
  },
  {
    id: 33, lines: ['EU–Egypt aid:', 'figures disputed'], icon: 'egypt', region: 'Africa / Europe', field: 'Development finance',
    basis: 'first_report', timing: 'Investigation first published November 18 at 05:00 UTC; disputed welfare benchmarks for EU loans.',
    sources: [guardian('world', 'european-commission-accused-sugarcoating-figures-egypt-loans')],
  },
  {
    id: 34, lines: ['Study questions', 'AUS forest offsets'], icon: 'carbon', region: 'Oceania', field: 'Climate integrity',
    basis: 'event', timing: 'Wednesday report challenges forest-regeneration offsets; project operators dispute the findings.',
    sources: [guardian('environment', 'phantom-forests-in-australian-arid-outback-used-to-create-carbon-credits-meant-to-offset-emissions-report-claims')],
  },
  {
    id: 35, lines: ['WHO warns:', 'antibiotics failing'], icon: 'microbe', region: 'Europe / Global', field: 'Public health',
    basis: 'event', timing: 'WHO/ECDC alert Wednesday reports worsening drug resistance, including last-resort treatments.',
    sources: ['https://news.un.org/en/story/2026/11/1168832'],
  },
  {
    id: 36, lines: ['Alzheimer pill:', 'mixed trial result'], icon: 'brainpill', region: 'Global', field: 'Medical research',
    basis: 'first_report', timing: 'November 18 report: AR1001 benefit in untreated subgroup; no significant benefit in overall trial population.',
    sources: [guardian('science', 'pill-mimics-viagra-can-slow-alzheimers-progression-by-third-study')],
  },
  {
    id: 37, lines: ['Voyager 1 now', 'a light-day out'], icon: 'voyager', region: 'Space', field: 'Exploration',
    basis: 'event', timing: 'Reached one light-day November 18 at 10:16 UTC; NASA confirmation arrived the following day after signal delay.',
    sources: ['https://www.dw.com/en/voyager-1-hits-milestone-at-one-light-day-from-earth/video-79983793', 'https://www.channelnewsasia.com/business/nasa-confirms-voyager-1-probes-light-day-distance-milestone-6566581'],
  },
  {
    id: 38, lines: ['England clinch', 'AUS ODI series'], icon: 'cricket', region: 'Oceania / Europe', field: 'Sport',
    basis: 'event', timing: 'Wednesday deciding cricket match: England won by 97 runs for a 2–1 series victory.',
    sources: [guardian('sport', 'ben-duckett-steers-england-odi-cricket-series-win-sandpapergate-australia')],
  },
  {
    id: 39, lines: ['Cambridge word', 'of year: “human”'], icon: 'book', region: 'Global / Europe', field: 'Culture and language',
    basis: 'first_report', timing: 'Dictionary selection reported November 18 at 05:00 UTC; distinct from Collins’s earlier word selection.',
    sources: [guardian('science', 'cambridge-word-of-the-year-human')],
  },
  {
    id: 40, lines: ['Child aid denial', 'up 16×: report'], icon: 'aid', region: 'Global', field: 'Humanitarian rights',
    basis: 'first_report', timing: 'New Save the Children analysis reported November 18; compares UN-verified 2015 and 2025 incidents.',
    sources: [guardian('global-development', 'aid-denial-humanitarian-children-save-the-children-un')],
  },
];

if (stories.length !== 40 || new Set(stories.map(s => s.id)).size !== 40) {
  throw new Error('The front page must contain exactly forty distinct stories.');
}
