# Goal
Build the "Our Differences" section after the "Our Journey" section in `about.html` with full architectural parity.

## Tasks
- [x] **HTML**: Insert structural markup for `our-differences` between `our-history` and `our-team`. → Verify: Inspect DOM for correct sequence.
- [x] **CSS (Tokens)**: Define color and spacing vars for the ivory card. → Verify: CSS variables present in `style.css`.
- [x] **CSS (Layout)**: Implement `sidebar-layout` with the vertical list and bottom values grid. → Verify: 2-column header and 4-column footer grid.
- [x] **JS**: Add GSAP ScrollTrigger `reveal-on-scroll` to the section and its children. → Verify: Elements animate on scroll top 85%.

## Done When
- [ ] Section appears between History and Team.
- [ ] Typography (60px H2, 16px body, 11px uppercase labels) matches site standards.
- [ ] Ivory card (`var(--bg-surface)`) uses the signature 8px-12px radius.
- [ ] GSAP entrance animations are fluid and performant.
