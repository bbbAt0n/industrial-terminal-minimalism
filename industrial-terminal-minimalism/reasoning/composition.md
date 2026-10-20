# Adaptive composition principles

Read [product analysis](product-analysis.md) first. The [DNA](../STYLE.md) constrains visual identity; it does not choose the information architecture. These are reviewable reasoning principles, not page recipes.

- **Prioritize by outcome.** Let attention reflect the user's next decision and the consequence of missing information. A large heading or dominant action must earn that emphasis. Repeated equal boxes are rarely a substitute for hierarchy.
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

For substantial ASCII, apply **Recognizable Subject Before Animation Complexity** during concept selection: inspect a representative static composition and its subject, silhouette, density, contrast, negative space and intended rhythm before building the motion. Use the [artistic checks](../references/ascii-motion.md), then verify normal-speed perceptual strength.
