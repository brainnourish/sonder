# Motion playbook

Motion is added in Phase 6, after the static page passes critique.

## Rules
- The signature moment comes first and gets the most care. Supporting motions: 2 or 3 at most.
- Animate only `transform` and `opacity` (and filters sparingly). Never animate layout properties.
- One easing language across the site. Defaults:
  - Reveals and transitions: `cubic-bezier(0.22, 1, 0.36, 1)` (expo-out feel), 600 to 900ms
  - UI feedback (hover, press): 150 to 250ms, ease-out
  - Springs for physical objects that should settle (figures, cursors): stiffness moderate, low bounce
- Headings may reveal line by line with a masked slide-up. Body copy at most fades. Most elements don't animate at all.
- Supporting motion should respond to the user (scroll, pointer, touch velocity) more than it plays on its own. The signature moment is the exception: it may play on load when the concept calls for it. A still signature on a simple page needs no motion at all.
- Never take control of scroll. Effects may read scroll position or velocity, never override it.
- Every motion has a `prefers-reduced-motion` behavior (usually: show the end state).

## Tools
- Smooth scroll: Lenis (keep native momentum feel on touch devices)
- Scroll-linked animation: GSAP ScrollTrigger
- Text splitting: GSAP SplitText or a lightweight equivalent
- 3D/WebGL: Three.js or React Three Fiber; bake lighting where possible

## Performance budget
- 60fps target on a mid-range iPhone and a MacBook Air
- One shadow-casting light in 3D scenes; low shadow map resolution that still looks clean
- Videos as compressed, small textures; only the active one at full frame rate
- If frames drop on mobile, reduce effect quality (blur, grain, DOF) before removing the effect
- Test on a real phone, not only the desktop browser's device mode

## Reporting
After the motion pass, list every animation, its trigger, duration, easing, and why it exists. If you can't justify one in a sentence, remove it.
