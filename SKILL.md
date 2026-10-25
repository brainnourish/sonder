---
name: sonder
description: Sonder is a repeatable system for designing and building premium, award-level websites and web apps that never look AI-generated or vibe-coded. Use this skill whenever the user wants to build, redesign, rebrand, or refine a website, landing page, waitlist page, portfolio, studio site, product site, or web app UI, or asks for something "premium", "beautiful", "clean", "not vibe coded", "Awwwards-level", or "like [reference site]". Also use it for concept redesigns of a prospect's homepage, for design direction or concepting before code, for deploying and setting up a finished site, and whenever the user says "run sonder", "sonder brief", "sonder concept", "sonder critique", "sonder ship", or names a phase. Use it even if the user only gives a one-line request with no references; the system fills the gaps.
---

# Sonder (v0.2.1)

Sonder turns a vague request ("make me a premium site for X") into a site that looks like a top studio made it. It does this with a fixed sequence of phases, a brief that every session reads, a ban list of vibe-coded tells, real measurements of reference sites, and a screenshot critique loop. The user should never have to specify everything by hand: when an input is missing, Sonder proposes it and asks for a quick yes or no.

The core belief: a premium site comes from restraint, real material, one memorable idea that every visitor actually experiences, and relentless checking against strong references. Generic output comes from adjectives, filler, safe ideas, and building everything at once.

## How to run it

Work through the phases in order. Each phase has a gate: show the result, get the user's approval (or a quick edit), then continue. Never jump ahead to code before Phase 3 is approved. If the user says "just go" or "run it all", still pause at the Phase 2 concept pick, since that decision shapes everything.

Keep a `DESIGN.md` at the project root. It is the single source of truth. Read it at the start of every session and before every phase. Update it whenever a decision is made.

### Starting state: check what already exists

- **DESIGN.md exists:** read it, tell the user which phase the project is in, and continue from there.
- **No DESIGN.md, but decisions are scattered** (docs/, notes, token files, CSS, commit history): consolidate them into a new `DESIGN.md` instead of starting over. Cite which file each decision came from. Check recent commits to make sure you have the latest state, and list anything that looks outdated or contradictory as a question for the user. Docs often lag behind decisions the user made later.
- **Empty project:** start at Phase 0.

### Verify against the code

Whenever you write a number into `DESIGN.md` or a critique (a size, a color, a spacing value, a max width), check it against the real CSS, tokens, or computed styles. Never trust memory or an estimate when the code can be read. If you could not verify a number, mark it `(estimate)`.

---

## Phase 0: Intake

Goal: understand the project, and the feeling the user has in their head, with as few questions as possible.

1. Read anything that already exists: the current site (fetch or screenshot it), the repo, `/references`, logos in `/assets`, any notes the user pasted.
2. Fill the **Intake** section of `DESIGN.md` (template: `assets/DESIGN.template.md`). For each field, use what the user said; if missing, write your best proposal marked `(proposed)`.
3. Ask at most 3 questions, only for things you cannot reasonably infer. Two of them must always be asked, even when the brief seems complete, before any references, concepts, or palette are proposed:
   - **Vibe:** "In a few words, how should this feel? Any materials, eras, moods, or textures you picture (for example: hand-drawn pencil on paper, darkroom, Swiss poster, soft and calm)? A moodboard, screenshots, or a Pinterest/Figma link works too."
   - **Brand and palette:** "Is there an existing brand to follow (logo, colors, fonts), or is the direction open? Light, dark, or no preference? Any colors you love, colors to avoid, or brands this should not resemble?"
   Record both answers word for word in the Vibe and Brand fields of `DESIGN.md`. The vibe and brand direction are often the most important things the user knows and the least likely to be written down. If an existing brand is given, follow it exactly and never replace it. If the direction is open, every palette and type choice in later phases must trace back to these answers, and the user approves the palette in Phase 3 before anything is built.
4. Never invent facts: numbers, clients, testimonials, awards, or prices. Missing facts become `[PLACEHOLDER: what's needed]`.

Gate: user confirms or edits the intake.

## Phase 1: References

Goal: ground the taste in real, measured examples, not adjectives.

1. If the user has no references, propose 4 to 6 from `references/reference-library.md` that fit the project's mood and vibe, with one line each on why. Always open the live site before relying on a library note; sites change.
2. Capture every chosen reference with `scripts/capture.mjs` (390 and 1440 wide, several scroll depths) into `/references/<site>/`.
3. Measure every chosen reference with `scripts/measure.mjs`, which records the real computed type sizes, line heights, tracking, weights, families, and colors of the key elements. Use these numbers in the analysis; do not eyeball.
4. **View every screenshot.** Do not sample a few. Look at each image file directly with your image viewing tool. Do not build HTML contact sheets that reference local file paths; browsers block them and they render blank. If there are many images, go site by site and write notes after each site.
5. For each reference, write 3 specific techniques worth borrowing (with measured numbers) and what NOT to copy. Sonder borrows techniques, never layouts or identities.
6. If a library note turned out to be wrong or outdated, tell the user so the library can be updated.

Gate: user confirms the reference set.

## Phase 2: Direction

Goal: one clear, ambitious concept with one signature moment that every visitor will experience.

Read `references/concepting.md`, then propose 3 genuinely different concepts (different ideas, not variations of one idea). Each concept has:
- a one-sentence concept
- one signature moment (the single interaction people remember)
- how a first-time visitor on a phone experiences it **without doing anything** (if they must find a control, drag, or hover to see it, say so plainly)
- type pairing and color rules, consistent with the user's vibe and brand direction
- which reference techniques it borrows
- the biggest risk of it looking generic or AI-made, stated honestly
- an honest ambition rating: "Would this plausibly win Awwwards Site of the Day? Yes / maybe / no, because..."

At least one of the 3 concepts must be bold: the kind of idea a top studio would pitch, even if harder to build. If all three feel safe or merely clever, discard them and think again before showing anything.

Recommend one, with reasons tied to the audience and the vibe. Then the user picks or mixes.

Gate: user picks a direction. Write the Concept and Signature moment sections of `DESIGN.md`.

## Phase 3: System

Goal: turn the direction into exact numbers before any page is built.

Fill the Tokens, Type, Layout, Motion, and Copy sections of `DESIGN.md`:
- colors as exact hex values with their roles
- type families, weights, a type scale in px, line heights, tracking
- spacing base and section padding at desktop and mobile
- grid, max widths, side margins
- motion: easing curves, durations, which elements may move and which may not (see `references/motion-playbook.md`)
- copy rules: real copy from the user, or placeholders at realistic lengths; never generated marketing copy unless the user asks

Be bold with the numbers. Premium pages almost always have extreme contrast between the largest and smallest type (often 10 to 20 times). Timid scales produce generic pages.

Include the ban list from `references/ban-list.md` in `DESIGN.md`, plus any project-specific bans.

Show the palette and type choices clearly (hex values with their roles, font names with sample sizes) and explain how each traces back to the user's vibe and brand answers.

Gate: user approves the system, including the palette. Then set up the project: framework, fonts, tokens as CSS variables, smooth scroll if planned. No page content yet.

## Phase 4: Build, section by section

Goal: each section reaches the quality bar before the next one starts.

Order: hero and navigation first, then each section top to bottom, then footer, then menu or overlays. For every section:

1. Build it **static** first (no animation), at 390px before 1440px if the audience is mobile-heavy.
2. Use real assets wherever they exist. Never fill gaps with stock imagery, fake logos, or invented content.
3. Run the critique loop (Phase 5) on it.
4. Commit once it passes.

If a concept depends on material only the user can make (hand-drawn marks, photography, a voice recording), build with clearly labeled placeholders and tell the user exactly what to create and in what format.

## Phase 5: Critique loop

Run after every section, after the signature moment is built, and again on the full page. Read `references/critique-rubric.md` for the full rubric.

1. Screenshot the current state at 1440 and 390 with `scripts/capture.mjs`. For the signature moment, also capture a short sequence of frames (for example at 0s, 1s, 2s, 3s after load) so the moment itself is judged, not just the end state.
2. View the screenshots next to the reference screenshots and `DESIGN.md`.
3. Run the **3-second test**: looking at the 390 captures as a first-time visitor who does nothing, is the signature moment clearly visible within 3 seconds? Is the key idea legible at normal reading distance? If not, that is the number one issue, above everything else.
4. Acting as a demanding senior design director at a top studio, list the 10 things that make it look less premium than the references, ranked by impact, each with a specific fix in numbers ("heading is 64px, should be 96px with -0.04em tracking").
5. Check every item on the ban list.
6. Score the rubric. Score strictly: 5 means it would hold up next to the best reference at the same width. When in doubt, score lower. If the user has shared their own scores before, note how yours compared and correct for any leniency.
7. Fix only the top 3, then repeat. Usually 2 or 3 rounds per section.
8. Stop when every rubric dimension scores 4 or higher and the 3-second test passes, or tell the user what is blocking it (often a missing real asset).

Fixing only the top 3 per round prevents broad rewrites that undo good work.

After presenting scores, invite the user to give their own 1 to 5 scores. Log both in the Critique log in `DESIGN.md`. A gap of 1 or more on any dimension means the critique is too lenient; tighten future rounds.

## Phase 6: Motion

Only after the static page passes. Read `references/motion-playbook.md`.

1. Build the signature moment first and get it right on its own. It must play or reveal itself without user action; any interaction (drag, hover, tap) is an optional extra, never the only way to see it. Provide a small replay control if it plays once.
2. Then add the small set of supporting motions defined in `DESIGN.md`. Nothing else moves.
3. Respect `prefers-reduced-motion`.
4. Re-run the 3-second test with frame captures.
5. Report the chosen timings and why.

## Phase 7: Ship and set up

Do the setup, don't just check it. Stop only for steps that need the user's accounts (logins, API keys, domain settings), and tell them exactly what to do for each.

1. **Social preview:** design and generate an Open Graph image in the page's own style (1200x630), plus title, description, and favicon metadata.
2. **Analytics:** install a privacy-friendly analytics option (for example Vercel Analytics) unless the user prefers another.
3. **Forms and signups:** wire any waitlist or contact form to a real destination. Ask which tool the user wants (Loops, Resend, a database, a Google Sheet); write all the code; ask the user to paste the API key into an environment variable; then test the form end to end and confirm a real submission arrived.
4. **Final checks:** run the Ship checklist in `references/critique-rubric.md` and a final full-page critique round.
5. **Deploy:** deploy (for example with the Vercel CLI), give the user the live preview URL, and walk them through connecting their domain if they have one.
6. **Testing links:** give the user the live URL plus links to check it: a social preview checker for the URL, Google PageSpeed Insights for the URL, and a reminder to test on a real phone.
7. Commit and push.

---

## Working principles

- **Numbers over adjectives.** "More elegant" produces random changes. "Headline 128px, weight 300, tracking -0.05em" produces the intended change.
- **One signature moment, and everyone sees it.** A premium site has one idea people remember. If visitors have to discover it, most never will.
- **Ambition over cleverness.** A safe, clever idea executed well is still forgettable. Aim for what a top studio would pitch.
- **Real over generated.** Real logos, real recordings, real numbers, real hand-made marks. If something real is missing, leave a placeholder and say so.
- **Verify, don't estimate.** Measure references and check numbers against the code.
- **The user writes the voice.** Do not write marketing copy unless asked. When asked, write plain sentences that explain the thing. No strings of short punchy fragments as kickers, and no forced origin stories.
- **Mobile is often primary.** Social traffic arrives on phones. Design the 390px version with the same care, never as a fallback.
- **Performance is design.** A rich page at a smooth 60fps feels expensive; a simple one that stutters feels cheap.
- **Small loops.** Never ask for or produce the whole site in one pass.

## Quick commands

- "sonder brief" → Phase 0 to 3, producing `DESIGN.md`
- "sonder concept [company]" → a single premium concept hero for a prospect's homepage: fetch their current site, run a short Phase 0 to 2 (still ask the vibe question if the user is present), build only the hero, critique it including the 3-second test, and capture a 1440 screenshot plus a short screen recording for outreach (`scripts/capture.mjs <url> <outDir> --video 6000`)
- "sonder critique" → Phase 5 on whatever exists now
- "sonder ship" → Phase 7, including setup and deployment

## Files in this skill

- `assets/DESIGN.template.md`: the brief every project fills in. Copy to the project root as `DESIGN.md`.
- `references/ban-list.md`: tells that make a site look AI-generated. Read in Phase 3 and every critique.
- `references/critique-rubric.md`: scoring rubric, 3-second test, critique prompt, and ship checklist. Read in Phase 5, 6 and 7.
- `references/concepting.md`: how to generate ambitious concepts and visible signature moments. Read in Phase 2.
- `references/motion-playbook.md`: easing, timing, and performance rules. Read in Phase 3 and 6.
- `references/reference-library.md`: curated premium reference sites by mood. Read in Phase 1 when the user has no references.
- `scripts/capture.mjs`: Playwright screenshots at 390 and 1440 (add 768 with `--viewports 390,768,1440`), at scroll depths, as a timed frame sequence, or as a short video recording (`--video`). Run it from the project folder so it finds the project's Playwright.
- `scripts/measure.mjs`: Playwright measurement of real computed type and color values on any URL.
