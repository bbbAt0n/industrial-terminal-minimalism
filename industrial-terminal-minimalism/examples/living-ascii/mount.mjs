// SPDX-License-Identifier: CC0-1.0
/* Local integration adapter, original CC0. Approved renderer modules are unchanged. */
export async function mountEngine({canvas, source, mode='braille', theme, phosphor='green'}) {
  if (!(canvas instanceof HTMLCanvasElement) || !source) throw new TypeError('canvas and ready source required');
  const print=['halftone','tiles'].includes(mode);
  if (!print&&!['braille','amber','monitor'].includes(mode)) throw new RangeError('Unapproved engine mode');
  if(print){await import('./print-satellite/sampling.mjs');await import('./print-satellite/renderers.mjs');}
  else await import('./signal-map/raster.mjs');
  const renderer=print?window.PrintRenderer:window.SignalRaster, history=renderer.create();
  const input=document.createElement('canvas'),x=input.getContext('2d',{willReadFrequently:true});
  const mq=matchMedia('(prefers-reduced-motion: reduce)'),cleanups=[];
  let paused=false,inView=false,active=true,disposed=false,timer=null,last=0,update=0,draws=0,reduced=mq.matches;
  let wideHalo=true,frameStart=0,frameCount=0,fallback=false;
  const presets={green:'#53d878',warm:'#d7c5a4',cool:'#a9bdc7'};
  const on=(node,event,fn)=>{node.addEventListener(event,fn);cleanups.push(()=>node.removeEventListener(event,fn));};
  const eligible=()=>!disposed&&!paused&&!mq.matches&&inView&&active&&!document.hidden;
  function palette(){
    const s=getComputedStyle(theme||document.documentElement),read=role=>s.getPropertyValue('--itm-color-'+role).trim();
    if(mode==='amber')return {bg:'#151714',fg:'#cba163'}; // Fixed approved amber; never host accent.
    if(mode==='monitor'){
      const value=typeof phosphor==='string'?phosphor.trim().toLowerCase():'';
      let fg=presets[value]||value;
      if(/^#?[0-9a-f]{3}$/i.test(fg))fg='#'+[...fg.replace('#','')].map(c=>c+c).join('');
      if(/^#?[0-9a-f]{6}$/i.test(fg))fg='#'+fg.replace('#','');
      const invalid=!/^#[0-9a-f]{6}$/i.test(fg);if(invalid)fg=presets.green;
      const lum=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((a,v,i)=>a+v*[.2126,.7152,.0722][i],0);
      canvas.dataset.phosphorWarning=invalid?'Invalid phosphor colour; using default Green':(lum(fg)+.05)/(lum('#151714')+.05)<3?'Low phosphor contrast; use at least 3:1':'';
      return {bg:'#151714',fg};
    }
    return {bg:read('canvas'),fg:read('text')};
  }
  function render(){
    if(disposed)return;
    const frame=typeof source==='function'?source({seconds:mq.matches?0:update/30,width:input.width,height:input.height}):source;
    x.fillStyle='#000';x.fillRect(0,0,input.width,input.height);
    const fw=frame.videoWidth||frame.naturalWidth||frame.width,fh=frame.videoHeight||frame.naturalHeight||frame.height;
    const scale=Math.min(input.width/fw,input.height/fh),dw=fw*scale,dh=fh*scale;
    x.drawImage(frame,(input.width-dw)/2,(input.height-dh)/2,dw,dh);
    // CanvasImageSource may be colour media; both engines consume scalar luminance.
    const pixels=x.getImageData(0,0,input.width,input.height);
    for(let i=0;i<pixels.data.length;i+=4){const l=Math.round(.2126*pixels.data[i]+.7152*pixels.data[i+1]+.0722*pixels.data[i+2]);pixels.data[i]=pixels.data[i+1]=pixels.data[i+2]=l;}
    x.putImageData(pixels,0,0);
    if(print)renderer.draw(window.PrintSampling.prepare(input,{brightness:0,contrast:1.1}),mode,palette(),canvas,history);
    else renderer.draw(input,canvas,palette(),mode,update,history);
    draws++;
  }
  function halt(){if(timer!==null)cancelAnimationFrame(timer);timer=null;last=frameStart=frameCount=0;}
  function tick(now){
    // Reconcile before eligibility too: preference state can update before its event.
    if(mq.matches!==reduced){sync(true);return;}
    timer=null;if(!eligible())return;
    if(!frameStart)frameStart=now;frameCount++;
    if(now-frameStart>=2000){
      if(!print&&mode!=='braille'&&wideHalo&&(frameCount-1)*1000/(now-frameStart)<45){history.wideHalo=false;fallback=true;canvas.dataset.engineFallback='Wide halo disabled (performance fallback)';}
      frameStart=now;frameCount=1;
    }
    if(now-last>=1000/30-.5){const steps=Math.max(1,Math.floor((now-last)/(1000/30)+.015));update+=steps;last+=steps*1000/30;render();}
    timer=requestAnimationFrame(tick);
  }
  function sync(redraw=false){halt();if(disposed)return;if(mq.matches!==reduced){reduced=mq.matches;reset();redraw=true;}if(redraw)render();if(eligible()){last=performance.now();timer=requestAnimationFrame(tick);}}
  function reset(){update=0;if(print)history.key='';else renderer.reset(history);}
  function resize(){
    if(disposed)return;
    const w=Math.max(4,Math.floor(Math.min(1600,canvas.parentElement.clientWidth)/4)*4);
    const h=Math.max(4,Math.floor(Math.min(1000,w*2/3)/4)*4);
    const dpr=Math.min(2,Math.max(1,window.devicePixelRatio||1));
    const physicalW=Math.round(w*dpr),physicalH=Math.round(h*dpr);
    if(input.width!==w||input.height!==h||canvas.width!==physicalW||canvas.height!==physicalH){
      input.width=w;input.height=h;canvas.width=physicalW;canvas.height=physicalH;
      canvas.style.width=w+'px';canvas.style.height=h+'px';
      canvas.getContext('2d').setTransform(dpr,0,0,dpr,0,0);
      if(print){history.canvas.width=w;history.canvas.height=h;}
      reset();sync(true);
    }
  }
  const intersection=new IntersectionObserver(e=>{inView=e[0].isIntersecting;sync();},{threshold:.05});
  const sizing=new ResizeObserver(resize);
  const theming=new MutationObserver(()=>sync(true));
  function destroy(){
    if(disposed)return;disposed=true;halt();intersection.disconnect();sizing.disconnect();theming.disconnect();cleanups.splice(0).forEach(fn=>fn());
    if(print){history.canvas.width=history.canvas.height=0;history.quant=null;}else renderer.dispose(history);
    input.width=input.height=0;
  }
  on(window,'resize',resize);on(mq,'change',()=>sync(true));on(document,'visibilitychange',()=>sync());
  on(window,'pagehide',e=>{if(e.persisted){active=false;sync();}else destroy();});
  on(window,'pageshow',()=>{active=true;sync();});
  resize();intersection.observe(canvas);sizing.observe(canvas.parentElement);
  theming.observe(theme||document.documentElement,{attributes:true,attributeFilter:['data-theme','class']});
  return {
    pause(value=true){paused=Boolean(value);sync();},
    redraw(){sync(true);},
    setOptions(options={}){if(disposed)return;if(options.phosphor!==undefined)phosphor=options.phosphor;if(options.theme!==undefined)theme=options.theme;sync(true);},
    seek(seconds,resetHistory=false){if(disposed)return;paused=true;if(resetHistory)reset();update=Math.round(Math.max(0,seconds)*30);sync(true);},
    setWideHalo(value){wideHalo=Boolean(value);if(!print)history.wideHalo=wideHalo;fallback=!wideHalo;sync(true);},
    get metrics(){return {mode,draws,update,paused,reduced:mq.matches,inView,disposed,schedulers:timer===null?0:1,fallback};},
    destroy
  };
}
