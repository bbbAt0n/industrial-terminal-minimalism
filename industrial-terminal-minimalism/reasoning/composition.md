# Adaptive composition principles

Read [product analysis](product-analysis.md) first. The [DNA](../STYLE.md) constrains visual identity; it does not choose the information architecture. These are reviewable reasoning principles, not page recipes.

## Three creative directions

For **Full Redesign only**, turn discovery into exactly three meaningfully distinct concepts before production implementation. Quick Edit, Visual Restyle and ASCII Artwork do not require this workshop.

**Distinctness contract:** each direction must have a different **primary object** (what dominates the screen: e.g. a large central object/illustration, a giant number/signal block, or an editorial headline with annotated diagram), a different **type scale** (state display and body sizes and their ratio; at least one display must be approximately 4x body size or larger), and a different **density** (one sparse, one medium, one dense). Compare navigation/grouping, graphic treatment, interaction and motion/ASCII as well. Recoloring or rearranging the same panels fails. **Same-screen test:** if swapping two directions' panels produces the other screen, reject both as insufficiently distinct.

**Boldness:** at least one option must be clearly bolder through strong scale contrast, signal color from the [project-derived palette](../references/palette.md) or editorial asymmetry. Keep the identity boundaries: no general black/green hacker-terminal identity (the scoped Old Monitor phosphor colour is allowed by the [canonical contract](../references/ascii-motion.md#canonical-scoped-raster-and-phosphor-contract)), hacker terminal, cyberpunk neon, gratuitous glitch, heavy CRT or generic SaaS cards.

Keep each proposal brief and concrete:

- Give it a memorable name and one-sentence thesis connected to the product's goals.
- Explain what the requester sees first and next, and why; specify layout, navigation/grouping, density, typography, rhythm, whitespace and emphasis.
- Describe color through existing semantic/project roles and follow the [three-variant palette rule](../references/palette.md#three-variant-rule): different ground material/temperature and signal logic, each with a project rationale and validated roles; keep at least one close to existing project colours. Preserve supported themes and existing design-system constraints.
- Identify one or two useful motion/art opportunities, or give a reason for restraint. Distinguish actual-data feedback from ambient illustration.
- State the main usability or implementation tradeoff for this product, rather than a generic aesthetic label.

**Real content:** preview the **same real screen or interaction** with actual labels and records read-only from available product data, saves or existing labeled sample datasets; identify the source. No lorem ipsum, "sample event" or invented placeholder copy. If real data is genuinely unavailable, say so explicitly, use clearly labeled minimal stand-ins and mark the preview **limited**. This overrides the general synthetic-demo allowance for creative directions.

**Previews:** render each direction as its own full-size page at **1440 px width**, with a full-page rendered image when tools allow. Use the [responsive owner](../execution/frontend.md#responsive-and-platform-behavior) for the additional whole-page probes, including wide-screen coverage. Thumbnail-only comparisons fail; a comparison sheet is optional and secondary. Keep previews isolated and disposable; do not build three complete apps, alter production behavior or require image generation. If rendering is unavailable, give concrete written comparisons and mark visuals **not checked**.

**Self-review before presentation:** view every rendered preview at full size; check the distinctness contract (including the same-screen test), boldness, real content, hierarchy/focal point and banned looks. Reject and redo weak variants before presenting; briefly state what was checked and any verification limits.

**Selection gate:** present A/B/C and stop for the requester's choice, blend or replacement. Exception: if the requester explicitly delegates the choice, choose and record the decision and rationale next to the previews. An explicit earlier choice satisfies the gate; retain it without repeating the workshop. After selection, implement **one** coherent direction, resolving routine layout details within the brief and existing architecture. If material scope changes invalidate the choice, explain the new decision needed.

Use the [reference families](../references/visual-reference.md#product-aware-reference-families) as vocabulary for product reasoning, not fixed themes or layouts. Compare options by what they help the requester do and by their costs.

## Compose from product needs

- **Prioritize by outcome.** Let attention reflect the requester's next decision and the consequence of missing information. A large heading or dominant action must earn that emphasis. Repeated equal boxes are rarely a substitute for hierarchy.
- **Group by meaning.** Put information together because it is compared, edited, understood, or acted on together. Use proximity, alignment, contrast, and rules before adding containers. A card is appropriate for an independent object or bounded interaction; a data table is appropriate for comparison. Neither is default filler.
- **Choose a reading/working sequence.** Narrative explanation, comparison, search, direct manipulation, staged entry, and monitoring have different spatial needs. Select navigation and disclosure from actual task transitions and frequency. Do not import a sidebar, hero, or status rail merely because another product uses one.
- **Use hierarchy at several scales.** Page purpose, region purpose, labels, values, and feedback should remain distinguishable. Typography, placement, rhythm, and contrast work together. Do not make everything uppercase, large, boxed, or amber.
- **Balance density with comprehension.** Frequent expert work may benefit from compact visible information. Unfamiliar decisions may require explanation and breathing room. Compress redundant chrome before compressing readable content or hit targets.
- **Make negative space relational.** Use it to distinguish groups, pace reading, or give important content room. Correct accidental dead zones and indiscriminate large padding. A marketing page may need a different rhythm from a keyboard-driven tool.
- **Use meaningful imagery.** Product visuals, photography, diagrams, and charts can explain real content. Choose their scale and placement for that role. Avoid stock terminal diagrams, decorative machinery, fake charts, or unrelated sci-fi visuals as identity substitutes.
- **Transform for available space.** Reconsider priority, grouping, navigation, and interaction as space/input changes. Stacking every desktop region in DOM order is not automatically good mobile design. Preserve logical focus/reading order and access to the main task. Determine breakpoints from failure points in real content, not device labels alone.
- **Maintain visual relationships across products.** Preserve type-role logic, surface relationships, alignment discipline, restrained selection, and feedback character. Different compositions should still read as related products.

Consult the [curated patterns](../patterns/README.md) only when their stated problem applies. Their variations allow contextual expression; they do not assemble into a required page skeleton. [Annotated decisions](../examples/decisions/README.md) show how to justify choices without copying a whole screen.

## Questions before implementation

Can a user identify the purpose and next relevant action? Does the dominant content deserve dominance? Are equal-looking elements actually peers? Can the design explain its grouping, typography, density, and empty space? Does the narrow version preserve task priority? Would the underlying organization still make sense without decorative ASCII?

Correct an unconvincing answer through composition/content changes rather than adding retro ornament. Use a contextual type scale and spacing rhythm, then express them as reusable roles in the existing implementation system.

For selected character artwork, use the [canonical artistic contract](../references/ascii-motion.md#recognizable-subject-before-animation-complexity); no ASCII reading is needed when artwork is absent.
