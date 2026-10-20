/** Optional finite interaction helper, not a restriction on ambient motion. Supply authored equal-sized frames and semantic text separately. */
export function createCharacterSequence(element, frames, {fps = 8, poster = frames.length - 1, onComplete = () => {}} = {}) {
  if (!frames.length || !Number.isFinite(fps) || fps < 6 || fps > 12) throw new RangeError('Use finite authored frames at 6-12 updates/sec');
  const shape = text => text.split('\n').map(line => [...line].length).join(',');
  if (frames.some(frame => shape(frame) !== shape(frames[0])) || !Number.isInteger(poster) || poster < 0 || poster >= frames.length) throw new RangeError('Reserve equal frame bounds and a valid poster');
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  let timer, generation = 0, destroyed = false;
  const show = index => { element.textContent = frames[index]; };
  const stop = () => { generation++; clearTimeout(timer); timer = undefined; if (!destroyed) show(poster); };
  function play() {
    if (destroyed) return;
    stop();
    if (preference.matches || document.hidden) { onComplete(); return; }
    const active = generation, start = performance.now();
    show(0);
    function tick() {
      if (destroyed || active !== generation) return;
      const elapsed = performance.now() - start, index = Math.floor(elapsed * fps / 1000);
      if (index >= frames.length) { stop(); onComplete(); return; }
      show(index);
      timer = setTimeout(tick, Math.max(1, (index + 1) * 1000 / fps - elapsed));
    }
    timer = setTimeout(tick, 1000 / fps);
  }
  const hide = () => { if (document.hidden) stop(); };
  preference.addEventListener('change', stop);
  document.addEventListener('visibilitychange', hide);
  show(poster);
  return {play, stop, destroy() { stop(); destroyed = true; preference.removeEventListener('change', stop); document.removeEventListener('visibilitychange', hide); }};
}
