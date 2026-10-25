# Ban list: tells that make a site look AI-generated

Check every item during Phase 3 and in every critique round. If a ban is broken, it goes in the top 3 fixes. A project's DESIGN.md can explicitly lift a ban only with a stated reason.

## Layout
- Centered hero with a pill badge above the headline and two buttons below it
- Three-column feature grid with an icon in a rounded box above each card
- Stats inside bordered or shadowed boxes ("10K+ users" cards)
- Every section the same height, same padding, same centered layout
- Alternating left-image/right-text rows repeated down the page
- "Trusted by" logo marquee, especially with invented or placeholder logos
- Testimonial carousels and pricing tables with a "Most popular" ribbon, unless the user asked for them
- Everything centered. Premium layouts use asymmetry and strong alignment.

## Surfaces and effects
- Gradient blobs, mesh gradients, aurora backgrounds
- Glassmorphism (frosted cards) as the default surface (a translucent nav bar or sheet with content scrolling underneath is fine)
- Glows behind cards or buttons
- Rounded cards with drop shadows as the default container
- Purple, violet, or blue-to-purple gradients as the accent
- Generic 3D shapes (floating spheres, toruses) with no meaning for the brand
- Dark mode with neon accents as the default "premium" look

## Type
- Inter, Poppins, or system fonts as the visual voice (fine for small UI text)
- Headlines all the same size; no real scale contrast
- Default tracking on large display type (big type almost always needs negative tracking)
- Default line height on display type
- Gradient-filled text

## Motion
- Fade-up on every element as it enters
- Staggered card entrances everywhere
- Hover scale on every card
- Parallax on everything
- Animations that run on load with no purpose
- Scroll-jacking that takes control away from the user

### Interface motion only
These apply only to interface elements: buttons, links, menus, popovers, modals, drawers, toasts, tooltips, tabs, form fields, and drag interactions. They never apply to the signature moment or marketing reveals. Values come from `motion-playbook.md`, and DESIGN.md can override them with a stated reason.
- ease-in on interface motion
- Growing an element from `scale(0)`
- Interface animations longer than 300ms (drawers and full-screen sheets up to 500ms)
- Buttons and controls that react only on release instead of on press
- Animations that lock input until they finish, or can't be reversed mid-way
- Animating keyboard-triggered actions (shortcuts, command palette)
- Popovers and menus that grow from their center instead of from the control that opened them

## Content and copy
- Emoji in UI, sparkle icons, robot or brain illustrations
- Invented stats, clients, testimonials, awards, or prices
- Lorem ipsum, or filler that reads like a template ("Unlock your potential")
- Strings of short punchy fragment sentences as kickers ("No noise. Just results.")
- Forced origin stories or hooks on every section
- Buzzwords: seamless, revolutionary, cutting-edge, unleash, elevate, next-level, game-changer
- Stock photos of people pointing at laptops

## Details
- Default favicon, missing social preview image
- Placeholder icons from a generic set used as decoration
- Inconsistent radii, spacing, or shadows between components
- Grey text that fails contrast to look "subtle"
- Buttons that all look the same priority
