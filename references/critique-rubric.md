# Critique rubric

Used in Phase 5 (every section) and Phase 7 (whole page).

## The critique prompt (run on yourself)

> Act as a senior design director at a top independent studio (the kind that wins Awwwards Site of the Day) reviewing this for a demanding client. You have the current screenshots at 1440 and 390, the reference screenshots, and DESIGN.md. List the 10 things that make this look less premium than the references, ranked by impact. Each item must name the element, what is wrong, and the fix in exact values. Then check the ban list. Then score the rubric below. Fix only the top 3.

Be specific. Bad: "the hero feels weak." Good: "hero headline is 56px and wraps to 3 lines; set to clamp(64px, 11vw, 168px), weight 300, tracking -0.05em, so it sits on 2 lines at 1440."

## Rubric (score 1 to 5 each)

1. **Typography**: real scale contrast, deliberate tracking and line height, no more than 2 to 3 families, display type feels designed.
2. **Composition**: strong alignment, intentional asymmetry, generous and consistent spacing, clear focal point per view.
3. **Restraint**: one signature idea, nothing decorative without purpose, no ban list items.
4. **Material**: real assets and real content; nothing reads as filler or stock.
5. **Mobile**: the 390 view is designed, not shrunk; touch targets 44px+; nothing overflows.
6. **Motion** (Phase 6+): purposeful, consistent easing, smooth, signature moment lands.
7. **Distinctiveness**: could this only belong to this brand, or could it be any startup?

Pass bar: 4 or higher on every dimension. Distinctiveness below 3 means revisit the concept, not the details.

## Common fixes that move the score most

- Increase display type size and tighten tracking.
- Remove one element from every crowded view.
- Replace boxed content with typographic hierarchy and hairlines.
- Increase section padding and keep it consistent.
- Swap any placeholder imagery for real assets, or remove it.
- Give each view one clear focal point.

## Ship checklist (Phase 7)

- [ ] Every section passes the rubric at 1440 and 390, and looks right at 768
- [ ] 60fps on a mid-range phone; only transform and opacity animate; no layout shift
- [ ] Lighthouse performance 85+ on mobile
- [ ] Images compressed and sized; videos compressed with poster frames
- [ ] Fonts subset and preloaded; real fallback stacks
- [ ] Text contrast 4.5:1 (3:1 for large text); focus states visible; real buttons and links
- [ ] prefers-reduced-motion respected
- [ ] Title, description, favicon, and social preview image set
- [ ] All placeholders replaced with real copy and assets, or flagged to the user
- [ ] Final full-page critique round logged in DESIGN.md
