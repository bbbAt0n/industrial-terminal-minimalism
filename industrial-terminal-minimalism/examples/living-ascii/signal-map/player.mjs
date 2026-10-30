// SPDX-License-Identifier: CC0-1.0
/* Original fictional source and one lifecycle owner, CC0. No geographic input. */
(() => {
  'use strict';
  const $=id=>document.getElementById(id),canvas=$('art'),plate=$('plate'),root=$('study');
  const source=document.createElement('canvas'),x=source.getContext('2d',{willReadFrequently:true});
  const history=SignalRaster.create(),mq=matchMedia('(prefers-reduced-motion: reduce)'),scheme=matchMedia('(prefers-color-scheme: dark)');
  const query=new URLSearchParams(location.search),cleanups=[];
  const presets={green:'#53d878',warm:'#d7c5a4',cool:'#a9bdc7'};
  const rgb=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16));
  const luminance=h=>rgb(h).map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4;}).reduce((n,v,i)=>n+v*[.2126,.7152,.0722][i],0);
  const contrast=h=>{const a=luminance(h),b=luminance('#151714');return (Math.max(a,b)+.05)/(Math.min(a,b)+.05);};
  function resolvePhosphor(value){
    const v=typeof value==='string'?value.trim().toLowerCase():'';
    if(Object.hasOwn(presets,v))return {colour:presets[v],invalid:false};
    if(/^#?[0-9a-f]{6}$/.test(v))return {colour:'#'+v.replace('#',''),invalid:false};
    if(/^#?[0-9a-f]{3}$/.test(v))return {colour:'#'+[...v.replace('#','')].map(c=>c+c).join(''),invalid:false};
    return {colour:presets.green,invalid:true};
  }
  // URL overrides an initial root CSS value; setters publish the resolved colour.
  const initial=query.has('phosphor')?query.get('phosphor'):getComputedStyle(root).getPropertyValue('--itm-phosphor').trim()||'green';
  let selection=resolvePhosphor(initial),phosphor=selection.colour,invalidPhosphor=selection.invalid;
  root.style.setProperty('--itm-phosphor',phosphor);
  let mode=['amber','monitor'].includes(query.get('mode'))?query.get('mode'):'braille',explicitTheme=query.has('theme');
  let paused=false,reduced=mq.matches,inView=false,active=true,disposed=false,timer=null,last=0;
  let update=0,draws=0,callbacks=0,costMs=0,audit={},capHeight=0,frameLast=0,frameStart=0,frameCount=0,displayFps=0;
  document.documentElement.dataset.theme=query.get('theme')==='dark'||(!explicitTheme&&scheme.matches)?'dark':'light';
  // Both phosphors keep the existing dark screen; Amber alone is token-mixed.
  const dark=document.createElement('span');dark.dataset.theme='dark';dark.hidden=true;document.body.append(dark);
  const on=(node,event,fn)=>{node.addEventListener(event,fn);cleanups.push(()=>node.removeEventListener(event,fn));};
  const eligible=()=>!disposed&&active&&inView&&!paused&&!reduced&&!document.hidden;
  function palette(){
    const isPhosphor=mode!=='braille',s=getComputedStyle(isPhosphor?dark:document.documentElement);
    const bg=s.getPropertyValue('--itm-color-canvas').trim(),text=s.getPropertyValue('--itm-color-text').trim(),accent=s.getPropertyValue('--itm-color-accentSeed').trim();
    if(!isPhosphor)return {bg,fg:text};
    if(mode==='monitor')return {bg,fg:phosphor};
    const a=rgb(accent),b=rgb(text);
    // Amber stays exactly the approved 12% ivory mix. No colour option.
    const c=a.map((v,i)=>Math.round(v+(b[i]-v)*.12));
    return {bg,fg:'#'+c.map(v=>v.toString(16).padStart(2,'0')).join('')};
  }
  // Hand-authored, invented coastline. These are normalized drawing points, not map data.
  const coast=[[.05,.24],[.12,.18],[.18,.22],[.24,.09],[.34,.12],[.39,.21],[.46,.17],[.53,.25],[.63,.13],[.74,.19],[.78,.31],[.92,.35],[.88,.49],[.79,.52],[.75,.67],[.65,.60],[.60,.77],[.48,.71],[.44,.59],[.34,.67],[.31,.53],[.19,.58],[.23,.42],[.12,.40]];
  function sourceFrame(){
    const w=source.width,h=source.height,phase=((update%360)+360)%360/360*Math.PI*2;
    x.setTransform(1,0,0,h/480,0,0);
    x.fillStyle='rgb(0,0,0)';x.fillRect(0,0,w,480);
    x.save();x.beginPath();x.rect(0,0,w,282);x.clip();
    x.translate(w/2+Math.sin(phase)*w*.025,138+Math.cos(phase)*6);
    const zoom=1+.035*Math.cos(phase);x.scale(zoom,zoom);x.translate(-w/2,-138);
    // A low-tone grid and three broad flat regions; no textured surfaces.
    x.strokeStyle='rgb(24,24,24)';x.lineWidth=1.5;x.beginPath();
    for(let u=-40;u<w+40;u+=40){x.moveTo(u,-20);x.lineTo(u,310);}
    for(let v=-20;v<310;v+=40){x.moveTo(-40,v);x.lineTo(w+40,v);}x.stroke();
    x.beginPath();coast.forEach(([a,b],i)=>i?x.lineTo(a*w,18+b*295):x.moveTo(a*w,18+b*295));x.closePath();
    x.fillStyle='rgb(78,78,78)';x.fill();x.save();x.clip();
    x.fillStyle='rgb(116,116,116)';x.beginPath();x.moveTo(w*.2,0);x.lineTo(w*.53,0);x.lineTo(w*.69,300);x.lineTo(w*.37,300);x.fill();
    x.fillStyle='rgb(153,153,153)';x.fillRect(w*.68,0,w*.32,300);x.restore();
    x.beginPath();coast.forEach(([a,b],i)=>i?x.lineTo(a*w,18+b*295):x.moveTo(a*w,18+b*295));x.closePath();
    x.strokeStyle='rgb(244,244,244)';x.lineWidth=3;x.stroke();
    x.beginPath();x.ellipse(w*.84,254,w*.045,10,-.25,0,Math.PI*2);x.fillStyle='rgb(116,116,116)';x.fill();x.stroke();x.restore();
    // Full word stays within the narrow plate; wide transforms remain unchanged.
    const text='SECTOR 07';x.font='900 200px Arial, sans-serif';
    const size=200*150/x.measureText('H').actualBoundingBoxAscent;x.font=`900 ${size}px Arial, sans-serif`;
    const m=x.measureText(text),fit=Math.min(1,(w-48)/m.width),typeZoom=w<540?1+.015*Math.sin(phase):1+.02*Math.sin(phase);
    capHeight=x.measureText('H').actualBoundingBoxAscent*typeZoom;
    x.save();x.translate(w/2+Math.sin(phase)*3,447+Math.cos(phase)*3);x.scale(fit*typeZoom,typeZoom);
    x.fillStyle='rgb(244,244,244)';x.textAlign='center';x.fillText(text,0,0);x.restore();
  }
  function render(){if(disposed)return;const start=performance.now();sourceFrame();audit=SignalRaster.draw(source,canvas,palette(),mode,update,history);draws++;costMs=performance.now()-start;}
  function status(){
    $('pause').disabled=reduced;$('pause').textContent=paused?'Resume':'Pause';
    $('theme').textContent=document.documentElement.dataset.theme==='dark'?'Light theme':'Dark theme';
    $('status').textContent=reduced?'Reduced motion / static key pose':!active||document.hidden||!inView?'Suspended':paused?'Paused / phase preserved':`Playing / 30 Hz${mode!=='braille'&&!history.wideHalo?' / wide halo disabled (performance fallback)':''}`;
    $('phosphor-controls').hidden=mode!=='monitor';
    if(mode==='monitor'){
      $('phosphor-custom').value=phosphor;
      for(const [name,colour] of Object.entries(presets))$('phosphor-'+name).setAttribute('aria-pressed',String(colour===phosphor));
      const ratio=contrast(phosphor);
      if(invalidPhosphor)$('status').textContent+=' / Invalid phosphor colour; using default Green';
      if(ratio<3)$('status').textContent+=` / Low phosphor contrast ${ratio.toFixed(2)}:1; use at least 3:1 against the screen`;
    }
    for(const id of ['braille','amber','monitor'])$(id).setAttribute('aria-pressed',String(mode===id));
  }
  function halt(){if(timer!==null)cancelAnimationFrame(timer);timer=null;last=frameLast=frameStart=frameCount=0;}
  function tick(now){
    timer=null;if(!eligible())return;callbacks++;
    if(!frameStart)frameStart=now;frameCount++;
    // A sustained display-callback rate below ~45 fps drops only the wide halo.
    if(now-frameStart>=2000){displayFps=(frameCount-1)*1000/(now-frameStart);if(mode!=='braille'&&displayFps<45&&history.wideHalo){history.wideHalo=false;status();}frameStart=now;frameCount=1;}
    frameLast=now;
    if(now-last>=1000/30-.5){const advance=Math.max(1,Math.floor((now-last)/(1000/30)+.015));update+=advance;last+=advance*1000/30;render();}
    timer=requestAnimationFrame(tick);
  }
  function sync(redraw=false){halt();if(disposed)return;if(redraw)render();status();if(eligible()){last=performance.now();timer=requestAnimationFrame(tick);}}
  function reset(){update=0;SignalRaster.reset(history);}
  function setOptions(options={}){
    if(disposed||!Object.hasOwn(options,'phosphor'))return;
    const next=resolvePhosphor(options.phosphor),changed=next.colour!==phosphor;
    phosphor=next.colour;invalidPhosphor=next.invalid;root.style.setProperty('--itm-phosphor',phosphor);
    // Keep phase and residence history. Raster rebuilds sprites only for a new colour.
    if(changed&&mode==='monitor')sync(true);else status();
  }
  function resize(){
    if(disposed)return;
    const width=Math.max(4,Math.floor(Math.min(1600,plate.clientWidth)/4)*4);
    const height=Math.max(4,Math.floor(Math.min(1000,width*2/3)/4)*4);
    const dpr=Math.min(2,Math.max(1,window.devicePixelRatio||1));
    if(canvas.width!==Math.round(width*dpr)||source.width!==width||source.height!==height){
      source.width=width;source.height=height;
      canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);
      canvas.style.width=width+'px';canvas.style.height=height+'px';
      canvas.getContext('2d').setTransform(dpr,0,0,dpr,0,0);
      SignalRaster.reset(history);sync(true);
    }
  }
  on($('braille'),'click',()=>{mode='braille';reset();sync(true);});on($('amber'),'click',()=>{mode='amber';reset();sync(true);});
  on($('monitor'),'click',()=>{mode='monitor';reset();sync(true);});
  for(const name of Object.keys(presets))on($('phosphor-'+name),'click',()=>setOptions({phosphor:name}));
  on($('phosphor-custom'),'input',e=>setOptions({phosphor:e.target.value}));
  on($('pause'),'click',()=>{paused=!paused;sync();});on($('restart'),'click',()=>{reset();sync(true);});
  on($('theme'),'click',()=>{explicitTheme=true;document.documentElement.dataset.theme=document.documentElement.dataset.theme==='dark'?'light':'dark';sync(true);});
  on(window,'resize',resize);
  on(scheme,'change',()=>{if(!explicitTheme){document.documentElement.dataset.theme=scheme.matches?'dark':'light';sync(true);}});
  on(mq,'change',()=>{reduced=mq.matches;reset();sync(true);});on(document,'visibilitychange',()=>sync());
  on(window,'pagehide',e=>{if(e.persisted){active=false;sync();}else destroy();});on(window,'pageshow',()=>{active=true;sync();});
  const observer=new IntersectionObserver(e=>{inView=e[0].isIntersecting;sync();},{threshold:.05});observer.observe(canvas);
  const sizing=new ResizeObserver(resize);sizing.observe(plate);
  function destroy(){if(disposed)return;disposed=true;halt();observer.disconnect();sizing.disconnect();cleanups.splice(0).forEach(fn=>fn());dark.remove();SignalRaster.dispose(history);source.width=source.height=0;}
  window.signalStudy={
    setOptions,
    seek(seconds,resetHistory=false){if(disposed)return;paused=true;update=Math.round(Math.max(0,seconds)*30);if(resetHistory)SignalRaster.reset(history);sync(true);},
    setWideHalo(enabled){history.wideHalo=Boolean(enabled);sync(true);},
    get metrics(){return {displayFps,mode,seconds:(update%360)/30,update,draws,callbacks,costMs,schedulers:timer===null?0:1,reduced,inView,paused,disposed,capHeight,width:canvas.width,height:canvas.height,monitorPhosphor:phosphor,phosphorContrast:contrast(phosphor),invalidPhosphor,...audit};},destroy
  };
  resize();sync(true);
})();
