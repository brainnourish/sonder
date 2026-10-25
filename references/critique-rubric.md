# Critique rubric

Used in Phase 5 (every section), Phase 6 (after motion), and Phase 7 (whole page).

## Step 1: The first-screen test (always first)

Look at the 390px first screen (plus the timed frame sequence if anything moves on load) as a first-time visitor who does nothing: no scrolling, dragging, hovering, or tapping. Check DESIGN.md for whether the project is a simple page or a journey site.

- **Simple page:** within 3 seconds, is the signature clearly on screen? It may be still.
- **Journey site:** within 3 seconds, is there a strong hook that clearly belongs to the concept and makes you want to keep going? Then scroll normally: does the signature moment land where DESIGN.md says, without needing a hidden control?
- Is the key idea legible at normal phone reading distance? (Faint, tiny, or edge-hugging elements fail.)
- Would this visitor be able to describe what makes the page special?

If any answer is no, that is the number one issue, ranked above every other fix. Restraint never applies to the one idea that must be seen.

## Step 2: The critique prompt (run on yourself)

> Act as a demanding senior design director at a top independent studio (the kind that wins Awwwards Site of the Day) reviewing this for a client who is paying a lot. You have the current screenshots at 1440 and 390, the frame sequence, the reference screenshots and measurements, and DESIGN.md. List the 10 things that make this look less premium or less memorable than the references, ranked by impact. Each item must name the element, what is wrong, and the fix in exact values. Then check the ban list. Then score the rubric. Fix only the top 3.

Be specific. Bad: "the hero feels weak." Good: "hero headline is 56px and wraps to 3 lines; set to clamp(64px, 11vw, 168px), weight 300, tracking -0.05em, so it sits on 2 lines at 1440."

Also look for: empty areas that feel unfinished rather than intentional, copy that repeats itself, and anything that reads like a developer annotation instead of a designed element.

## Step 3: Rubric (score 1 to 5 each)

1. **Signature moment**: every visitor reaches it without hunting (first screen on a simple page; hook first and moment later on a journey site); it is legible, memorable, and comes from the concept.
2. **Typography**: real scale contrast, deliberate tracking and line height, no more than 2 to 3 families, display type feels designed.
3. **Composition**: strong alignment, intentional asymmetry, generous and consistent spacing, clear focal point per view, no dead zones.
4. **Restraint**: nothing decorative without purpose, no ban list items. (Restraint is not faintness: the key idea must still be loud enough.)
5. **Material**: real assets and real content; nothing reads as filler or stock; placeholders are clearly marked.
6. **Mobile**: the 390 view is designed, not shrunk; touch targets 44px+; nothing overflows.
7. **Motion** (Phase 6+): purposeful and consistent. Interface motion follows the playbook (right easing, under 300ms, responds on press, can be interrupted, follows the finger). Signature and marketing motion follows the concept and lands. Smooth at 60fps. Judge against DESIGN.md, including its stated overrides.
8. **Distinctiveness**: could this only belong to this brand, or could it be any startup?

### Scoring honestly

- 5 = holds up next to the best reference at the same width.
- 4 = clearly premium, with small issues.
- 3 = competent but forgettable; a typical good AI-builder result.
- 2 or lower = generic or broken.
- When unsure between two scores, choose the lower.
- Pass bar: 4 or higher on every dimension and a passing first-screen test.
- Distinctiveness or Signature moment below 3 means revisit the concept, not the details.

### Calibrating with the user

After presenting scores, invite the user to give their own 1 to 5 scores before discussing yours. Log both in DESIGN.md. If the user scores 1 or more points lower on any dimension, your critique is too lenient: in later rounds, score that dimension more strictly and look harder for issues there.

## Common fixes that move the score most

- Put the signature (or, on a journey site, its hook) on the first screen and enlarge its key element.
- Increase display type size and tighten tracking.
- Remove one element from every crowded view; fill or rebalance dead zones.
- Replace boxed content with typographic hierarchy and hairlines.
- Increase section padding and keep it consistent.
- Swap placeholder imagery for real assets, or remove it.
- Cut copy that repeats the headline.

## Ship checklist (Phase 7)

- [ ] Every section passes the rubric at 1440 and 390, and looks right at 768 (capture with `--viewports 390,768,1440`)
- [ ] First-screen test passes on a real phone
- [ ] 60fps on a mid-range phone; only transform and opacity animate; no layout shift
- [ ] Lighthouse performance 85+ on mobile
- [ ] Images compressed and sized; videos compressed with poster frames
- [ ] Fonts subset and preloaded; real fallback stacks
- [ ] Text contrast 4.5:1 (3:1 for large text); focus states visible; real buttons and links
- [ ] prefers-reduced-motion, prefers-reduced-transparency, and prefers-contrast respected
- [ ] Worst-case content tested: very long names and words, long emails, one-letter names, empty lists, huge numbers, long button labels, non-Latin text; nothing overflows, clips, or breaks the layout
- [ ] Phone fixes: no 100vh jump (use svh/dvh), inputs 16px or larger so iOS doesn't zoom, no grey tap flash, hover styles don't stick after a tap, content clears the notch and home bar (safe areas), long-press doesn't select button text
- [ ] Open Graph image (1200x630), title, description, and favicon set and checked with a preview tool
- [ ] Analytics installed
- [ ] Forms wired to a real destination and tested with a real submission
- [ ] All placeholders replaced with real copy and assets, or flagged to the user
- [ ] Deployed, live URL checked on a phone, domain connected if available
- [ ] Final full-page critique round logged in DESIGN.md
