/** Local optional mechanics; render supplies original art and separate semantic content. */
export function createSurface(element, render, {fps=8,cycle=8000}={}){
 if(!Number.isFinite(fps)||fps<=0||!Number.isFinite(cycle)||cycle<=0)throw new RangeError('Positive cadence and cycle required');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');let timer=null,ms=0,start=0,visible=false,paused=false,active=true,destroyed=false;
 const eligible=()=>!destroyed&&visible&&active&&!paused&&!reduced.matches&&!document.hidden;
 const elapsed=()=>ms+(timer!==null?performance.now()-start:0);
 const paint=still=>render(still?0:elapsed()%cycle,{still});
 function halt(){if(timer!==null){ms+=performance.now()-start;clearTimeout(timer);timer=null;}}
 function tick(){if(destroyed)return;if(!eligible()){sync();return;}paint(false);const t=elapsed(),step=1000/fps;timer=setTimeout(tick,Math.max(1,step-t%step));}
 function sync(){if(destroyed)return;halt();if(eligible()){start=performance.now();timer=setTimeout(tick,1000/fps);paint(false);}else paint(true);}
 const intersection=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();},{threshold:.05});intersection.observe(element);
 const leave=()=>{active=false;sync();},enter=()=>{active=true;sync();};
 reduced.addEventListener('change',sync);document.addEventListener('visibilitychange',sync);window.addEventListener('pagehide',leave);window.addEventListener('pageshow',enter);paint(true);
 return {pause(value=true){paused=value;sync();},setActive(value){active=value;sync();},refresh(){if(!destroyed)paint(!eligible());},get running(){return timer!==null;},destroy(){destroyed=true;halt();intersection.disconnect();reduced.removeEventListener('change',sync);document.removeEventListener('visibilitychange',sync);window.removeEventListener('pagehide',leave);window.removeEventListener('pageshow',enter);}};
}
