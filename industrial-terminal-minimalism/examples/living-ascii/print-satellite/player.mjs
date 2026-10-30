// SPDX-License-Identifier: CC0-1.0
/* One bounded 30 Hz owner. Original example code, CC0. */
(() => {
  'use strict';
  const $=id=>document.getElementById(id),canvas=$('art'),mq=matchMedia('(prefers-reduced-motion: reduce)');
  const query=new URLSearchParams(location.search),history=PrintRenderer.create(),cleanups=[];
  let mode=query.get('mode')==='tiles'?'tiles':'halftone',paused=false,reduced=mq.matches;
  let inView=false,active=true,disposed=false,timer=null,last=0,seconds=0,draws=0,callbacks=0,costMs=0;
  const eligible=()=>!disposed&&active&&inView&&!paused&&!reduced&&!document.hidden;
  const on=(node,event,fn)=>{node.addEventListener(event,fn);cleanups.push(()=>node.removeEventListener(event,fn))};
  if(query.get('theme')==='dark'||(!query.has('theme')&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.dataset.theme='dark';
  function palette(){const s=getComputedStyle(document.documentElement);return {bg:s.getPropertyValue('--itm-color-canvas').trim(),fg:s.getPropertyValue('--itm-color-text').trim()}}
  function render(){
    if(disposed)return;
    const start=performance.now();
    const image=PrintSampling.prepare(PrintSource.frame(reduced?0:seconds),{brightness:0,contrast:1.1});
    PrintRenderer.draw(image,mode,palette(),canvas,history);draws++;costMs=performance.now()-start;
  }
  function status(){
    $('pause').disabled=reduced;$('pause').textContent=paused?'Resume':'Pause';
    $('status').textContent=reduced?'Reduced motion / static key pose':!active||document.hidden||!inView?'Suspended':paused?'Paused / phase preserved':'Playing / 30 Hz';
    $('theme').textContent=document.documentElement.dataset.theme==='dark'?'Light theme':'Dark theme';
  }
  function halt(){if(timer!==null){clearTimeout(timer);timer=null;}last=0;}
  function schedule(){timer=setTimeout(tick,1000/30);}
  function tick(){
    timer=null;if(!eligible())return;callbacks++;
    const now=performance.now(),advance=Math.max(1,Math.floor((now-last)/(1000/30)+.03));
    // Quantized 30 Hz active clock; skip late poses, never play a backlog.
    seconds=(seconds+advance/30)%PrintSource.DURATION;last+=advance*1000/30;
    render();const delay=Math.max(1,last+1000/30-performance.now());timer=setTimeout(tick,delay);
  }
  function sync(redraw=false){
    halt();if(disposed)return;
    if(redraw)render();status();if(eligible()){last=performance.now();schedule();}
  }
  function select(next){
    mode=next;seconds=0;history.key='';
    $('title').textContent=next==='tiles'?'Grey Tiles satellite':'Halftone satellite';
    $('description').textContent=next==='tiles'?'Graphical quantized mosaic: six tonal levels, integer tiles, no gaps. This is tile/block graphics, not literal ASCII.':'Graphical print-style dot screen. Dot area carries tone. This is a non-character renderer, not literal ASCII.';
    for(const id of ['halftone','tiles'])$(id).setAttribute('aria-pressed',String(id===next));sync(true);
  }
  on($('halftone'),'click',()=>select('halftone'));on($('tiles'),'click',()=>select('tiles'));
  on($('pause'),'click',()=>{paused=!paused;sync()});
  on($('restart'),'click',()=>{seconds=0;history.key='';sync(true)});
  on($('theme'),'click',()=>{document.documentElement.dataset.theme=document.documentElement.dataset.theme==='dark'?'light':'dark';sync(true)});
  on(mq,'change',()=>{reduced=mq.matches;seconds=0;history.key='';sync(true)});
  on(document,'visibilitychange',()=>sync());on(window,'resize',()=>sync(true));
  on(window,'pagehide',e=>{if(e.persisted){active=false;sync()}else destroy()});
  on(window,'pageshow',()=>{active=true;sync()});
  const observer=new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;sync()},{threshold:.05});observer.observe(canvas);
  function destroy(){if(disposed)return;disposed=true;halt();observer.disconnect();cleanups.splice(0).forEach(fn=>fn());}
  // Host integration API: seek is deterministic and paused, not a second scheduler.
  window.printStudy={
    seek(t,reset=false){if(disposed)return;paused=true;seconds=((t%12)+12)%12;if(reset)history.key='';sync(true);},
    get metrics(){return {mode,seconds,draws,callbacks,costMs,schedulers:timer===null?0:1,reduced,inView,paused,disposed};},
    destroy
  };
  select(mode);
})();
