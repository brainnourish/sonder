# Motion playbook

Motion values are set in Phase 3 and recorded in DESIGN.md. Motion is built in Phase 6, after the static page passes critique.

## Two kinds of motion

- **Interface motion:** anything that responds to a control. Buttons, links, menus, popovers, modals, drawers, toasts, tooltips, tabs, form fields, drag and swipe. It follows the strict interface rules below.
- **Signature and marketing motion:** the signature moment, intros, section reveals, scroll-linked storytelling. Its timing and easing come from the concept. The interface rules (easing choices, duration caps, the interface bans) never limit it. It still follows the general rules, the performance budget, and accessibility.

When something is both (a hero control that is also the signature moment), treat it as signature motion, but it must still respond on press and never lock input.

## Overrides

Every default in this playbook is a starting point, not a law. A project's DESIGN.md can override any motion default (a curve, a duration, a spring value, or a rule) as long as it states the reason. Record each override in the Motion section of DESIGN.md and in the decision log.

## General rules (all motion)

- The signature moment comes first and gets the most care. Supporting motions: 2 or 3 at most.
- Animate only `transform` and `opacity` (and filters sparingly). Never animate layout properties.
- One easing language across the site.
- Headings may reveal line by line with a masked slide-up. Body copy at most fades. Most elements don't animate at all.
- Supporting motion should respond to the user (scroll, pointer, touch velocity) more than it plays on its own. The signature moment is the exception: it may play on load when the concept calls for it. A still signature on a simple page needs no motion at all.
- Never take control of scroll. Effects may read scroll position or velocity, never override it.
- Every motion has a reduced-motion behavior (see Accessibility).

## Interface motion

### Should it move at all?

| How often people see it | Decision |
|---|---|
| 100+ times a day (keyboard shortcuts, command palette) | No animation |
| Tens of times a day (hover effects, list navigation) | Remove or reduce to almost nothing |
| Occasionally (modals, drawers, toasts) | Standard animation |
| Rarely or once (onboarding, success, celebration) | Room for delight |

Never animate keyboard-triggered actions. Valid reasons for interface motion: showing where something came from or went, showing a change of state, explaining, giving feedback, or softening a jarring change. "It looks nice" is not a reason on something people see often.

### Easing

- Entering or leaving the screen: ease-out
- Moving or morphing on screen: ease-in-out
- Hover and color changes: ease
- Constant motion (progress, marquee): linear
- Never ease-in on interface motion. It starts slow, delaying the exact moment the user is watching.

Built-in CSS easings are too weak. Default curves:

```css
--ease-out: cubic-bezier(0.23, 1, 0.32, 1);      /* entering and leaving */
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);  /* moving on screen */
--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);   /* iOS-like drawers and sheets */
```

On reversible transitions, mirror the curve so the way out matches the way in.

### Duration

| Element | Duration |
|---|---|
| Button press feedback | 100 to 160ms |
| Tooltips, small popovers | 125 to 200ms |
| Dropdowns, menus, selects | 150 to 250ms |
| Modals | 200 to 300ms |
| Drawers, full-screen sheets | up to 500ms |

Keep interface motion under 300ms, except drawers and full-screen sheets. After the first tooltip in a group, show the next ones instantly.

### Springs

Use springs for anything the user can touch, drag, or throw. Think in two numbers: **damping** (1.0 = no bounce, lower = bouncier) and **response** (how quickly it arrives, in seconds; a spring has no fixed duration).

- Default: damping 1.0 (no bounce), response 0.3 to 0.4s.
- Add bounce (damping about 0.8, or `bounce` 0.1 to 0.3) only when the user's gesture carried momentum: a flick, a throw, a drag release. Bounce on a menu that simply opened feels wrong.
- Values Apple ships: move or reposition 1.0 / 0.4s; rotation 0.8 / 0.4s; drawer or sheet 0.8 / 0.3s.

```js
import { animate } from "motion";
animate(el, { y: 0 }, { type: "spring", bounce: 0, duration: 0.4 });       // default
animate(el, { y: target }, { type: "spring", bounce: 0.2, duration: 0.4 }); // after a flick
```

For decorative pointer-following, pass the pointer through a spring instead of tying the element directly to it.

### How it should feel

- **Respond on press, not on release.** `:active { transform: scale(0.97) }` with a 100 to 160ms ease-out (0.95 to 0.98 is the useful range). Feedback continues during a drag, not only at the end.
- **Drag 1:1.** The element stays glued to the finger and keeps the offset from where it was grabbed. Use Pointer Events with `setPointerCapture`. Wait for about 10px of movement before committing to a direction.
- **Interruptible.** Never lock input while something animates. A user must be able to grab a moving element and reverse it. Always animate from the current on-screen value, not the target. For anything that can be triggered again mid-animation, use CSS transitions or springs, not keyframes (keyframes restart from zero).
- **Velocity handoff.** When a drag ends, the animation continues at the finger's speed, so there is no seam between dragging and animating.
- **Momentum.** Snap to the target nearest to where the gesture was heading, not where it was released:

```js
// decelerationRate 0.998 for a normal scroll feel, 0.99 for snappier
const project = (velocity, rate = 0.998) => (velocity / 1000) * rate / (1 - rate);
const target = nearestSnapPoint(position + project(releaseVelocity));
```

- **Soft edges.** Past a boundary, resist progressively instead of stopping dead:

```js
const rubberband = (overshoot, size, c = 0.55) => (overshoot * size * c) / (size + c * Math.abs(overshoot));
```

- **Spatial consistency.** Things leave the way they came in. Popovers and menus grow from the control that opened them (`transform-origin` at the trigger); modals stay centered.
- **Never from nothing.** Never grow an element from `scale(0)`. Start at 0.9 to 0.97 with opacity 0.
- **Glass chrome.** A translucent nav bar or sheet (`backdrop-filter: blur()` over a semi-transparent background) with content scrolling underneath is allowed. Never stack light translucent layers on each other, and use slightly heavier, higher-contrast text on glass.

## Signature and marketing motion

- Easing and timing come from the concept and are recorded in DESIGN.md. A common starting point for reveals: `cubic-bezier(0.22, 1, 0.36, 1)` (expo-out feel), 600 to 900ms. Longer is fine when the concept needs it.
- Springs for physical objects that should settle (figures, cursors, thrown items): no bounce by default, a little bounce only when momentum justifies it.
- If it plays once, offer a small replay control. It must never block the main action.
- Review it in slow motion or frame by frame (`scripts/capture.mjs --frames` or `--video`), not only at full speed.

## Accessibility

- **`prefers-reduced-motion: reduce`:** replace slides, springs, and parallax with short cross-fades or the end state. Drop overshoot. Keep opacity changes that help understanding. The signature moment shows its end state or a gentle cross-fade. Also avoid full-screen moving backgrounds, slow looping motion (around one cycle every 5 seconds), and sudden brightness jumps.
- **`prefers-reduced-transparency: reduce`:** make translucent surfaces solid and drop the blur.
- **`prefers-contrast: more`:** near-solid backgrounds with clear borders.

## Tools

- Smooth scroll: Lenis (keep native momentum feel on touch devices)
- Scroll-linked animation: GSAP ScrollTrigger
- Springs and gestures: Motion (motion.dev)
- Text splitting: GSAP SplitText or a lightweight equivalent
- 3D/WebGL: Three.js or React Three Fiber; bake lighting where possible

## Performance budget

- 60fps target on a mid-range iPhone and a MacBook Air
- One shadow-casting light in 3D scenes; low shadow map resolution that still looks clean
- Videos as compressed, small textures; only the active one at full frame rate
- If frames drop on mobile, reduce effect quality (blur, grain, DOF) before removing the effect
- Hint `will-change` only on elements about to move, and remove it after
- Test on a real phone, not only the desktop browser's device mode

## Deeper review (optional)

If Emil Kowalski's skills are installed (`npx skills@latest add emilkowalski/skills`), use `review-animations` for a strict motion review and `animation-performance` when anything drops frames. Their rules cover interface motion; Sonder's split between interface and signature motion, and any DESIGN.md override, still take priority.

## Reporting

After the motion pass, list every animation, whether it is interface or signature motion, its trigger, duration, easing, and why it exists. If you can't justify one in a sentence, remove it.

## Credits

The interface motion rules are adapted from Emil Kowalski's skills (https://github.com/emilkowalski/skills, MIT License, see `licenses/emilkowalski-skills.txt`), including `apple-design`, which distills Apple's WWDC talks *Designing Fluid Interfaces* (2018) and *The Details of UI Typography* (2020).
