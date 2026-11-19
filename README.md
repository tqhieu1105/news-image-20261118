# The World in One Day — 18 November 2026

[![make.fun competition](https://make.fun/badge/news-image-20261118.svg)](https://make.fun/c/news-image-20261118)
[![Rank](https://make.fun/badge/news-image-20261118/tqhieu1105/news-image-20261118/rank.svg)](https://make.fun/c/news-image-20261118)
[![Reward](https://make.fun/badge/news-image-20261118/tqhieu1105/news-image-20261118/reward.svg)](https://make.fun/c/news-image-20261118)

A newspaper front page with forty illustrated reports from Wednesday 18 November 2026.
The editorial selection spans the inhabited continents, conflict, diplomacy, the economy,
technology, health, climate, science, sport and culture. Selection and ordering are editorial judgments.

`stories.mjs` records each headline, the event/report date check, and the source links.
Reports of earlier events are included only for a new development or newly published finding.
For example, the Voyager milestone occurred Wednesday and was confirmed Thursday;
the Haiti story is a new verdict about an assassination in 2021.

The illustrations and layout are original SVG, rasterized from HTML by headless Chromium.
The runtime uses only Node's standard library and copies the committed PNG without network access.

```sh
node render.mjs
node verify.mjs
MAKEFUN_OUTPUT_DIR=/tmp/news-entry node main.ts
```

Rendering requires the local `google-chrome` executable and installed Barlow Condensed and
Libre Baskerville fonts. Rendering is a development step; none are needed by `main.ts`.
`entry.png` is the sole contest image. `/tmp/news1118-preview-300.png` is a review aid generated outside the repository.
