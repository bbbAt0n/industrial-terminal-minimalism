# Small reusable control contracts

Use the target project's existing accessible/native controls. These contracts support many compositions and do not require importing an HTML/CSS preset.

| Primitive | Identity and behavior contract |
| --- | --- |
| Action | Coherent control typography, square/minimal geometry, readable label and immediate feedback. Primary inversion is bounded; secondary boundary/hover stays quiet. Visible focus survives all states. |
| Input | Visible consistent label, readable editing face, associated hint/error, retained value, functional boundary, and stable geometry. Technical/code inputs can use the technical role consistently. |
| Link/navigation | Destination semantics, perceivable affordance, coherent navigation role, explicit current state where applicable. Navigation is not automatically tabs. |
| Selectable object | Correct selection semantics and keyboard behavior; current/hover/focus are distinct. [Bounded selection](../../patterns/bounded-selection.md) offers contextual variations. |
| Status/progress | Meaningful state text and actual progress semantics. Decorative ASCII is hidden from assistive technology. Async feedback does not throttle input or fabricate task state. |
| Disclosure/overlay | Correct naming, relationship, focus/dismissal behavior, preserved context, and a restrained boundary. Use platform conventions rather than custom approximations. |

Implement only states relevant to the component: default, hover, press, focus, selected, disabled, loading, empty, error, success, and recovery. Consistency comes from semantic roles and interaction contracts, not identical placement or container treatment across products. See [frontend execution](../../execution/frontend.md).
