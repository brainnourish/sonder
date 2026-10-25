# Critique rubric

Used in Phase 5 (every section), Phase 6 (after motion), and Phase 7 (whole page).

## Step 1: The 3-second test (always first)

Look at the 390px captures, including the timed frame sequence for the signature moment, as a first-time visitor who does nothing: no scrolling, dragging, hovering, or tapping.

- Within 3 seconds, is the signature moment clearly happening on screen?
- Is the key idea legible at normal phone reading distance? (Faint, tiny, or edge-hugging elements fail.)
- Would this visitor be able to describe what makes the page special?

If any answer is no, that is the number one issue, ranked above every other fix. Restraint never applies to the one idea that must be seen.

## Step 2: The critique prompt (run on yourself)

> Act as a demanding senior design director at a top independent studio (the kind that wins Awwwards Site of the Day) reviewing this for a client who is paying a lot. You have the current screenshots at 1440 and 390, the frame sequence, the reference screenshots and measurements, and DESIGN.md. List the 10 things that make this look less premium or less memorable than the references, ranked by impact. Each item must name the element, what is wrong, and the fix in exact values. Then check the ban list. Then score the rubric. Fix only the top 3.

Be specific. Bad: "the hero feels weak." Good: "hero headline is 56px and wraps to 3 lines; set to clamp(64px, 11vw, 168px), weight 300, tracking -0.05em, so it sits on 2 lines at 1440."

Also look for: empty areas that feel unfinished rather than intentional, copy that repeats itself, and anything that reads like a developer annotation instead of a designed element.

## Step 3: Rubric (score 1 to 5 each)

1. **Signature moment**: every visitor experiences it without effort; it is legible, memorable, and comes from the concept.
2. **Typography**: real scale contrast, deliberate tracking and line height, no more than 2 to 3 families, display type feels designed.
3. **Composition**: strong alignment, intentional asymmetry, generous and consistent spacing, clear focal point per view, no dead zones.
4. **Restraint**: nothing decorative without purpose, no ban list items. (Restraint is not faintness: the key idea must still be loud enough.)
5. **Material**: real assets and real content; nothing reads as filler or stock; placeholders are clearly marked.
6. **Mobile**: the 390 view is designed, not shrunk; touch targets 44px+; nothing overflows.
7. **Motion** (Phase 6+): purposeful, consistent easing, smooth, the signature moment lands.
8. **Distinctiveness**: could this only belong to this brand, or could it be any startup?

### Scoring honestly

- 5 = holds up next to the best reference at the same width.
- 4 = clearly premium, with small issues.
- 3 = competent but forgettable; a typical good AI-builder result.
- 2 or lower = generic or broken.
- When unsure between two scores, choose the lower.
- Pass bar: 4 or higher on every dimension and a passing 3-second test.
- Distinctiveness or Signature moment below 3 means revisit the concept, not the details.

### Calibrating with the user

After presenting scores, invite the user to give their own 1 to 5 scores before discussing yours. Log both in DESIGN.md. If the user scores 1 or more points lower on any dimension, your critique is too lenient: in later rounds, score that dimension more strictly and look harder for issues there.

## Common fixes that move the score most

- Make the signature moment play on its own and enlarge its key element.
- Increase display type size and tighten tracking.
- Remove one element from every crowded view; fill or rebalance dead zones.
- Replace boxed content with typographic hierarchy and hairlines.
- Increase section padding and keep it consistent.
- Swap placeholder imagery for real assets, or remove it.
- Cut copy that repeats the headline.

## Ship checklist (Phase 7)

- [ ] Every section passes the rubric at 1440 and 390, and looks right at 768 (capture with `--viewports 390,768,1440`)
- [ ] 3-second test passes on a real phone
- [ ] 60fps on a mid-range phone; only transform and opacity animate; no layout shift
- [ ] Lighthouse performance 85+ on mobile
- [ ] Images compressed and sized; videos compressed with poster frames
- [ ] Fonts subset and preloaded; real fallback stacks
- [ ] Text contrast 4.5:1 (3:1 for large text); focus states visible; real buttons and links
- [ ] prefers-reduced-motion respected
- [ ] Open Graph image (1200x630), title, description, and favicon set and checked with a preview tool
- [ ] Analytics installed
- [ ] Forms wired to a real destination and tested with a real submission
- [ ] All placeholders replaced with real copy and assets, or flagged to the user
- [ ] Deployed, live URL checked on a phone, domain connected if available
- [ ] Final full-page critique round logged in DESIGN.md
