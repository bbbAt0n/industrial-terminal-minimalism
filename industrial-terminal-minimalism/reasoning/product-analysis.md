# Product analysis and design intent

Use this for **Full Redesign**, as defined in the [task modes](../SKILL.md#choose-the-task-mode). Quick Edit and Visual Restyle need only affected tasks, surrounding intent and preservation constraints; standalone ASCII Artwork starts from its source or concept without a product-discovery exercise. Produce useful decisions, not a long ceremonial brief. Discovery itself requires no separate approval; the Full Redesign direction-selection gate still applies before implementation.

## Establish the situation

| Question | Evidence to inspect | Design consequence |
| --- | --- | --- |
| What must this product help someone understand or accomplish? | User request, product content, existing flows | Attention and action priorities |
| Who uses it, with what knowledge and frequency? | Audience assumptions, terminology, onboarding, repeat tasks | Explanation, density, discoverability, shortcuts |
| What content is actually available and trustworthy? | Copy, datasets, assets, empty/error cases | Grouping, comparison, reading sequence, authentic evidence |
| What are the important journeys and recovery paths? | Existing layout/navigation, actions, state, validation, persistence, reversibility | Information architecture, feedback, continuity, necessary states |
| Where and how will it be used? | Viewport/window range, touch/keyboard/pointer, OS, accessibility requirements and assistive tech | Hit areas, focus, reflow, safe areas, platform behavior |
| What constraints must be preserved? | Relevant routes/views, component boundaries, tokens/theme ownership, framework, dependencies, performance, localization and explicit preservation requirements | Implementation mapping and realistic scope |

Do not infer a complete layout from a label such as landing page, dashboard, or mobile. One product can contain narrative, transactional, analytical, and utility views with different compositions.

Inspect real content before inventing decorative filler. Missing testimonials, metrics, customer logos, or product claims must not become fabricated proof. For demo/prototype requests, apply the [labeled sample-data contract](../SKILL.md#scope-and-precedence). Material unknowns should be resolved or stated; minor reversible choices should not block progress.

Assess what the current composition already does well and where it fails the requester's tasks. Keep working relationships; do not rearrange panels merely to demonstrate a redesign. Briefly name the inspected source paths and the constraints they establish, as required by the task modes; do not read every document or create a separate inspection report.

## Record a concise design intent

Explain the design intent briefly in the project's normal working format: user priority and main interaction; information hierarchy/navigation; composition, density and negative-space strategy; essential preservation/technical constraints; and motion/ASCII opportunities or a justified absence. Include typography, responsive or recovery decisions when they materially shape the directions. State decisions and reasons, without exposing internal deliberation.

A configuration task may keep consequence and recovery close to the action, while a discovery page may introduce evidence as questions arise. Those are relationships to solve, not prescribed sections. Where alternatives materially affect usability, briefly compare them; do not generate multiple layouts for every routine edit.

## Motion & ASCII Opportunity Assessment

For substantial UI work, follow the [engine consideration and delivery rule](../SKILL.md#consider-the-living-ascii-engine) and consider atmospheric art and functional motion in proportion to the brief. Compare artwork candidates on composition, artistic quality, product relevance, readability and cost within the task's scope and any user-selected design direction. Record the opportunity or a reasoned absence briefly. Only if artwork is selected, read [art direction](../references/ascii-motion.md); only for selected animation read [motion QA](../execution/motion-qa.md). Those owners define artistic and lifecycle decisions. Implement after the applicable direction-choice gate.

## Convert intent into checks

Describe observable success before implementation: what a visitor understands, what a user completes, which context survives resizing/back navigation, and what failure/recovery looks like. Select the relevant [review dimensions](../validation/rubric.md). A no-overflow assertion cannot prove that the primary task remains easy to find on a narrow screen.

Proceed using reasonable stated assumptions when possible. Preserve the current user's scope, existing functionality, and explicit preferences. New layouts need justification by purpose/content; architecture changes need their own functional reason.

For selected character artwork, use the [canonical artistic contract](../references/ascii-motion.md#recognizable-subject-before-animation-complexity); no ASCII reading is needed when artwork is absent.
