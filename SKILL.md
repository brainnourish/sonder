---
name: sonder
description: Sonder is a repeatable system for designing and building premium, award-level websites and web apps that never look AI-generated or vibe-coded. Use this skill whenever the user wants to build, redesign, rebrand, or refine a website, landing page, portfolio, studio site, product site, or web app UI, or asks for something "premium", "beautiful", "clean", "not vibe coded", "Awwwards-level", or "like [reference site]". Also use it for concept redesigns of a prospect's homepage, for design direction or concepting before code, and whenever the user says "run sonder", "sonder brief", "sonder critique", or names a phase. Use it even if the user only gives a one-line request with no references; the system fills the gaps.
---

# Sonder

Sonder turns a vague request ("make me a premium site for X") into a site that looks like a top studio made it. It does this with a fixed sequence of phases, a brief that every session reads, a ban list of vibe-coded tells, and a screenshot critique loop. The user should never have to specify everything by hand: when an input is missing, Sonder proposes it and asks for a quick yes or no.

The core belief: a premium site comes from restraint, real material, one memorable idea, and relentless checking against strong references. Generic output comes from adjectives, filler, and building everything at once.

## How to run it

Work through the phases in order. Each phase has a gate: show the result, get the user's approval (or a quick edit), then continue. Never jump ahead to code before Phase 3 is approved. If the user says "just go" or "run it all", still pause at the Phase 2 concept pick, since that decision shapes everything.

Keep a `DESIGN.md` at the project root. It is the single source of truth. Read it at the start of every session and before every phase. Update it whenever a decision is made.

If the project already has a `DESIGN.md`, read it, tell the user which phase the project is in, and continue from there.

---

## Phase 0: Intake

Goal: understand the project with as few questions as possible.

1. Read anything that already exists: the current site (fetch or screenshot it), the repo, `/references`, logos in `/assets`, any notes the user pasted.
2. Fill the **Intake** section of `DESIGN.md` (template: `assets/DESIGN.template.md`). For each field, use what the user said; if missing, write your best proposal marked `(proposed)`.
3. Ask at most 3 questions, only for things you cannot reasonably infer. The usual ones: who the site is for and what they should do; what real assets exist (logo, recordings, photos, numbers); and any references they love or hate.
4. Never invent facts: numbers, clients, testimonials, awards, or prices. Missing facts become `[PLACEHOLDER: what's needed]`.

Gate: user confirms or edits the intake.

## Phase 1: References

Goal: ground the taste in real examples, not adjectives.

1. If `/references` has screenshots, view every image. For each reference site, list the 3 specific techniques that make it feel premium (type sizes, spacing, layout, how imagery is used, motion), using numbers where possible. Write these into `DESIGN.md`.
2. If the user has no references, propose 4 to 6 from `references/reference-library.md` that fit the project's mood, with one line each on why. When the user picks, capture screenshots with `scripts/capture.mjs` (desktop 1440 and mobile 390, plus scrolled positions) into `/references/<site>/`, then analyze them as in step 1.
3. Note what NOT to copy from each reference. Sonder borrows techniques, never layouts or identities.

Gate: user confirms the reference set.

## Phase 2: Direction

Goal: one clear concept with one signature moment.

Read `references/concepting.md`, then propose 3 distinct concepts. Each concept has:
- a one-sentence concept
- one signature moment (the single interaction people remember)
- type pairing and color rules
- which reference techniques it borrows
- the biggest risk of it looking generic or AI-made, stated honestly

Recommend one, with reasons tied to the audience (for example, if most traffic is mobile, the signature moment must work on touch). Then the user picks or mixes.

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

Include the ban list from `references/ban-list.md` in `DESIGN.md`, plus any project-specific bans.

Gate: user approves the system. Then set up the project: framework, fonts, tokens as CSS variables, smooth scroll if planned. No page content yet.

## Phase 4: Build, section by section

Goal: each section reaches the quality bar before the next one starts.

Order: hero and navigation first, then each section top to bottom, then footer, then menu or overlays. For every section:

1. Build it **static** first (no animation), at 390px before 1440px if the audience is mobile-heavy.
2. Use real assets wherever they exist. Never fill gaps with stock imagery, fake logos, or invented content.
3. Run the critique loop (Phase 5) on it.
4. Commit once it passes.

## Phase 5: Critique loop

Run after every section and again on the full page. Read `references/critique-rubric.md` for the full rubric.

1. Screenshot the current state at 1440 and 390 with `scripts/capture.mjs`.
2. View the screenshots next to the reference screenshots and `DESIGN.md`.
3. Acting as a senior design director at a top studio, list the 10 things that make it look less premium than the references, ranked by impact, each with a specific fix in numbers ("heading is 64px, should be 96px with -0.04em tracking").
4. Check every item on the ban list.
5. Fix only the top 3, then repeat. Usually 2 or 3 rounds per section.
6. Stop when the rubric score is 4 or higher on every dimension, or tell the user what is blocking it (often a missing real asset).

Fixing only the top 3 per round prevents broad rewrites that undo good work.

## Phase 6: Motion

Only after the static page passes. Read `references/motion-playbook.md`.

1. Build the signature moment first and get it right on its own.
2. Then add the small set of supporting motions defined in `DESIGN.md`. Nothing else moves.
3. Respect `prefers-reduced-motion`.
4. Report the chosen timings and why.

## Phase 7: Ship check

Run the checklist in `references/critique-rubric.md` (Ship checklist section): performance (60fps target on a mid-range phone, animate only transform and opacity), responsiveness at 390, 768, 1440, accessibility basics, metadata and social preview image, real copy in place of placeholders, and a final full-page critique round.

---

## Working principles

- **Numbers over adjectives.** "More elegant" produces random changes. "Headline 128px, weight 300, tracking -0.05em" produces the intended change.
- **One signature moment.** A premium site has one idea people remember. Everything else is restrained so that idea lands.
- **Real over generated.** Real logos, real recordings, real numbers. If something real is missing, leave a placeholder and say so.
- **The user writes the voice.** Do not write marketing copy unless asked. When asked, write plain sentences that explain the thing. No strings of short punchy fragments as kickers, and no forced origin stories.
- **Mobile is often primary.** Social traffic arrives on phones. Design the 390px version with the same care, never as a fallback.
- **Performance is design.** A rich page at a smooth 60fps feels expensive; a simple one that stutters feels cheap.
- **Small loops.** Never ask for or produce the whole site in one pass.

## Quick commands

The user may trigger phases directly:
- "sonder brief" → Phase 0 to 3 only, producing `DESIGN.md`
- "sonder concept [company]" → a single premium concept hero for a prospect's homepage: fetch their current site, run a short Phase 0 to 2, build only the hero, critique it, and capture a 1440 screenshot for outreach
- "sonder critique" → Phase 5 on whatever exists now
- "sonder ship" → Phase 7

## Files in this skill

- `assets/DESIGN.template.md`: the brief every project fills in. Copy to the project root as `DESIGN.md`.
- `references/ban-list.md`: tells that make a site look AI-generated. Read in Phase 3 and every critique.
- `references/critique-rubric.md`: scoring rubric, critique prompt, and ship checklist. Read in Phase 5 and 7.
- `references/concepting.md`: how to generate strong concepts and signature moments. Read in Phase 2.
- `references/motion-playbook.md`: easing, timing, and performance rules. Read in Phase 3 and 6.
- `references/reference-library.md`: curated premium reference sites by mood. Read in Phase 1 when the user has no references.
- `scripts/capture.mjs`: Playwright screenshot capture for references and critique rounds.
