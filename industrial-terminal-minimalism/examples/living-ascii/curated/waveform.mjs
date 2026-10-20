/** Actual-sample peak envelope. Pure analysis; no clock, randomness or generated activity. */
export function createPeakEnvelope(columns=64){
 let levels=new Float32Array(columns),raw=new Float32Array(columns),targets=new Float32Array(columns),ceiling=.10;
 let metrics={rms:0,maximum:0,minimum:0,ceiling,columns};
 function reset(n=levels.length){levels=new Float32Array(n);raw=new Float32Array(n);targets=new Float32Array(n);ceiling=.10;}
 function read(samples,dt=125){
  let sum=0;for(const s of samples)sum+=s*s;const rms=Math.sqrt(sum/Math.max(1,samples.length));
  if(rms<.003){levels.fill(0);metrics={rms,maximum:0,minimum:0,ceiling,columns:levels.length};return levels;}
  for(let x=0;x<levels.length;x++){const from=Math.floor(x*samples.length/levels.length),to=Math.floor((x+1)*samples.length/levels.length);let peak=0,sq=0;for(let i=from;i<to;i++){const v=Math.abs(samples[i]);peak=Math.max(peak,v);sq+=v*v;}raw[x]=peak*.82+Math.sqrt(sq/Math.max(1,to-from))*.18;}
  const sorted=Array.from(raw).sort((a,b)=>a-b),wanted=Math.max(.075,sorted[Math.floor((sorted.length-1)*.9)]*1.05),frames=Math.max(.25,Math.min(2,dt/125));
  ceiling+=(wanted-ceiling)*(1-Math.pow(1-(wanted>ceiling?.65:.035),frames));
  for(let x=0;x<levels.length;x++)targets[x]=Math.pow(Math.max(0,Math.min(1,(raw[x]-.003)/Math.max(.04,ceiling-.003))),.88);
  for(let x=0;x<levels.length;x++){const target=(targets[x-1]??targets[x])*.12+targets[x]*.76+(targets[x+1]??targets[x])*.12;const rate=1-Math.pow(1-(target>levels[x]?.84:.28),frames);levels[x]+=(target-levels[x])*rate;}
  metrics={rms,maximum:Math.max(...levels),minimum:Math.min(...levels),ceiling,columns:levels.length};return levels;
 }
 return {read,reset,get metrics(){return {...metrics};}};
}
export function waveform(levels,rows=17){
 const columns=levels.length,center=Math.floor(rows/2),grid=new Array(columns*rows).fill(' ');
 for(let x=0;x<columns;x++){const h=Math.min(center,Math.round(levels[x]*center)),mark=levels[x]>.72?'#':levels[x]>.35?'|':':';grid[center*columns+x]=h?'=':x%4===0?'+':'-';for(let y=1;y<=h;y++){grid[(center-y)*columns+x]=y===h?':':mark;grid[(center+y)*columns+x]=y===h?':':mark;}}
 return Array.from({length:rows},(_,y)=>grid.slice(y*columns,(y+1)*columns).join('')).join('\n');
}
