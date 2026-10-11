# brainmaxxing.si

A first pass at a daily mental playground: a Daily Circuit homepage, Mental Gym, Mental Games, and Learning Lab.

## Local preview

Run `npm run dev`, then open http://localhost:4173. There are no dependencies or build step. The site is plain HTML, CSS, and JavaScript in `dist/`.

## What's playable

- Daily Circuit: Signal Hunt → Pocket Sudoku → Read & Recall
- Mental Gym: Signal Hunt, Sequence Lab, Rule Switch
- Mental Games: 4 × 4 Pocket Sudoku, 9 × 9 Sudoku, a 5 × 5 word-square Mini Crossword, Word Search
- Learning Lab: Read & Recall, Recall Cards, a personal study-set editor

The date selects one of three reading passages and rotates Sudoku digits. This is a starter content library, not a source of unlimited new daily puzzles. Gym rounds vary each play. The crossword, word search, and built-in cards currently use fixed starter content.

Circuit completion, sessions, study cards, and unfinished Sudoku grids use browser localStorage. There are no accounts or cross-device synchronization. Accuracy, response time, and completion measure performance on these activities; they aren't a general cognitive ability score.

## Vercel

Import the GitHub repository into Vercel. The root `vercel.json` specifies the `dist` output directory, no framework, and no build command. Use `first-build` for preview deployments and `main` as the production branch. Once a production deployment exists, add `brainmaxxing.si` in the project's Domains settings and enter the DNS records Vercel provides at the registrar.

The optional `.openai/hosting.json` records the separate private Sites project provisioned during prototyping; it is not used by Vercel. The application itself has no hosting-provider dependencies.

## Verification

`npm run check` validates JavaScript syntax. `npm test` checks Sudoku constraints, word-search paths, circuit accounting, and date/streak behavior.
