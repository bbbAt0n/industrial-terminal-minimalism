# Product analysis and design intent

Use this before a new interface or substantial redesign. For a bounded change, identify only the affected task, surrounding intent, and constraints. Produce useful decisions, not a long ceremonial brief or a mandatory approval step.

## Establish the situation

| Question | Evidence to inspect | Design consequence |
| --- | --- | --- |
| What must this product help someone understand or accomplish? | User request, product content, existing flows | Attention and action priorities |
| Who uses it, with what knowledge and frequency? | Audience assumptions, terminology, onboarding, repeat tasks | Explanation, density, discoverability, shortcuts |
| What content is actually available and trustworthy? | Copy, datasets, assets, empty/error cases | Grouping, comparison, reading sequence, authentic evidence |
| What are the important journeys and recovery paths? | Actions, state, validation, persistence, reversibility | Navigation, feedback, continuity, necessary states |
| Where and how will it be used? | Viewport/window range, touch/keyboard/pointer, OS, assistive tech | Hit areas, focus, reflow, safe areas, platform behavior |
| What constraints must be preserved? | Framework, design system, architecture, dependencies, performance, localization | Implementation mapping and realistic scope |

Do not infer a complete layout from a label such as landing page, dashboard, or mobile. One product can contain narrative, transactional, analytical, and utility views with different compositions.

Inspect real content before inventing decorative filler. Missing testimonials, metrics, customer logos, or product claims must not become fabricated proof. Use supplied facts or clearly identified placeholders only when necessary and requested. Material unknowns should be resolved or stated; minor reversible choices should not block progress.

## Record a concise design intent

Explain the chosen outcome in the project's normal working format. Cover the user's primary task; content/attention order; navigation and grouping; density and negative-space strategy; typography roles; responsive transformations; interaction/recovery behavior; and useful motion or its deliberate absence. State decisions and reasons, without exposing internal deliberation.

A configuration task may keep consequence and recovery close to the action, while a discovery page may introduce evidence as questions arise. Those are relationships to solve, not prescribed sections. Where alternatives materially affect usability, briefly compare them; do not generate multiple layouts for every routine edit.

## Motion & ASCII Opportunity Assessment

For substantial UI work, consider atmospheric art and functional motion. Generate several distinct candidate concepts, then select on composition, artistic quality, product relevance, readability and cost. Describe subject, silhouette/density, grid/scale, depth, negative space, frame behavior and how the artwork belongs beside real content. Substantial focal scenes deserve consideration in suitable heroes, media and instrument views; primitive diagrams are not the default answer. Define ambient/reactive/interaction modes, actual data sources, autoplay/loop/pause lifecycle and static alternative. Artistic expression is a valid purpose. A reasoned absence is valid where motion would obstruct the task. Read [art direction and techniques](../references/ascii-motion.md), implement in the existing stack, observe movement and refine it.

## Convert intent into checks

Describe observable success before implementation: what a visitor understands, what a user completes, which context survives resizing/back navigation, and what failure/recovery looks like. Select the relevant [review dimensions](../validation/rubric.md). A no-overflow assertion cannot prove that the primary task remains easy to find on a narrow screen.

Proceed using reasonable stated assumptions when possible. Preserve the current user's scope, existing functionality, and explicit preferences. New layouts need justification by purpose/content; architecture changes need their own functional reason.

For substantial ASCII, apply **Recognizable Subject Before Animation Complexity** during concept selection: inspect a representative static composition and its subject, silhouette, density, contrast, negative space and intended rhythm before building the motion. Use the [artistic checks](../references/ascii-motion.md), then verify normal-speed perceptual strength.
