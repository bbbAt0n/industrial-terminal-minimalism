# Bounded selection

Primary selection, content and its visual indicator synchronize immediately. Do not add a trailing animated underline. Expressive motion belongs to an independently meaningful demonstration or state change, not a stale-looking selection signal.

**Problem:** Users need to distinguish current/selected state from hover, keyboard focus, and disabled state.

**Why it belongs:** A flat neutral inverted region or precise marker provides strong hierarchy with little ornament. It echoes the reference's selection language through a bounded, meaningful state.

**Appropriate:** Current destinations, selectable objects, segmented choices, or active working context with correct native/ARIA semantics.

**Avoid:** Filling large selected canvases that dominate the screen, using inversion for every informational badge, or making focus indistinguishable from selection. Do not assign tab/listbox semantics without implementing their interaction pattern.

**Acceptable variations:** Full inversion on a compact object; smaller edge/position marker where filling is excessive; a readable current label where helpful. Selection and its indicator change immediately. Any separate expressive demonstration needs its own product-specific purpose, ownership and reduced-motion alternative.

**Annotated decision:** A compact current destination can invert its background. A selected document occupying most of an editor may need only a bounded title/edge marker. The visual vocabulary stays related while the selected region's scale changes. Focus remains separately visible in both cases.
