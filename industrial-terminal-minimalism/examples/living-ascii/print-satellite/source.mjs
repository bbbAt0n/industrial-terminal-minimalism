// SPDX-License-Identifier: CC0-1.0
/* Original procedural geometry. No imported models, textures, images or animation. */
(() => {
  'use strict';
  const W = 720, H = 480, DURATION = 12;
  const canvas = document.createElement('canvas'); canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d', {willReadFrequently:true});
  const faces = [];let group='bus';
  const face = (v, tone, stroke = 0) => {const f={v,tone,stroke,decals:[],id:faces.length+1,group};faces.push(f);return f};
  function box(x,y,z,w,h,d,tone) {
    const p=[[x,y,z],[x+w,y,z],[x+w,y+h,z],[x,y+h,z],[x,y,z+d],[x+w,y,z+d],[x+w,y+h,z+d],[x,y+h,z+d]];
    return [[0,3,2,1],[4,5,6,7],[0,4,7,3],[1,2,6,5],[3,7,6,2],[0,1,5,4]].map(ids=>face(ids.map(i=>p[i]),tone,0.025));
  }
  // A bus, two solar wings, mounting spars, stepped avionics and antenna.
  box(-.68,-.62,-.48,1.36,1.24,.96,.82);
  box(-.57,-.48,.48,1.14,.96,.12,.94);
  box(-.42,-.32,.61,.84,.64,.12,.62);
  box(-.18,-.17,.74,.36,.34,.16,.9);
  box(-.52,-.47,-.65,1.04,.94,.17,.7);
  for(const s of [-1,1]) {
    box(s===1?.68:-1.12,-.065,-.09,.44,.13,.18,.85);
    const x=s===1?1.08:-2.8;
    group='wing';const panel=box(x,-.7,-.065,1.72,1.4,.13,.56);group='bus';
    // Real geometric cells: panel seams survive source sampling; both sides authored.
    for(const z of [-.071,.071]) for(let c=0;c<7;c++) for(let r=0;r<5;r++) {
      const a=x+.04+c*.236,b=-.66+r*.264;
      // Decals belong to their parent plane: centroid sorting must not bury half the grid.
      panel[z<0?0:1].decals.push({v:[[a,b,z],[a+.213,b,z],[a+.213,b+.238,z],[a,b+.238,z]],tone:.68+((c+r)%2)*.025,stroke:.007});
    }
    box(x+.02,-.74,-.085,1.68,.055,.17,.92);
    box(x+.02,.685,-.085,1.68,.055,.17,.92);
    box(s===1?.52:-.61,.64,-.37,.09,.26,.74,.8);
  }
  box(-.034,-1.5,-.02,.068,.88,.068,.96);
  box(-.46,-1.51,-.025,.92,.045,.06,.96);
  box(-.23,-1.73,-.015,.46,.033,.05,.86);
  box(-.022,-1.72,-.015,.044,.23,.05,.94);
  // Instrument grille, bolt heads and a distinctive lower keel.
  for(let r=0;r<6;r++) box(-.43,-.26+r*.093,.735,.23,.025,.02,.98);
  for(const x of [-.53,.49]) for(const y of [-.43,.39]) box(x,y,.61,.045,.045,.04,.98);
  box(-.23,.63,-.24,.46,.3,.48,.75);
  function rotate([x,y,z], phase) {
    const a = phase*Math.PI*2+.48, ca=Math.cos(a),sa=Math.sin(a);
    const xx=x*ca+z*sa, zz=-x*sa+z*ca, tilt=.38;
    return [xx, y*Math.cos(tilt)-zz*Math.sin(tilt), y*Math.sin(tilt)+zz*Math.cos(tilt)];
  }
  function frame(seconds, still=false) {
    const phase=still?0:((seconds%DURATION)+DURATION)%DURATION/DURATION;
    ctx.fillStyle='#000';ctx.fillRect(0,0,W,H);
    const projected=faces.map(f=>{
      const v=f.v.map(p=>rotate(p,phase));
      const a=v[0],b=v[1],c=v[2],u=b.map((n,i)=>n-a[i]),q=c.map((n,i)=>n-a[i]);
      let n=[u[1]*q[2]-u[2]*q[1],u[2]*q[0]-u[0]*q[2],u[0]*q[1]-u[1]*q[0]];
      const length=Math.hypot(...n)||1;n=n.map(k=>k/length);
      // Two-sided panels; a fixed key light and gentle fill expose planar form.
      const lighting=.36+.64*Math.max(0,Math.abs(n[0]*-.36+n[1]*-.55+n[2]*.75));
      const decals=f.decals.map(d=>({...d,v:d.v.map(p=>rotate(p,phase)),tone:Math.round(255*d.tone*lighting)}));
      // Only the facing panel gets its grid, so back-plane decals never punch through.
      return {v,id:f.id,group:f.group,surfaceSize:[Math.hypot(...f.v[1].map((q,i)=>q-f.v[0][i]))*108,Math.hypot(...f.v[3].map((q,i)=>q-f.v[0][i]))*108],z:v.reduce((s,p)=>s+p[2],0)/v.length,tone:Math.round(255*f.tone*lighting),stroke:f.stroke,decals:n[2]>0?decals:[]};
    }).sort((a,b)=>a.z-b.z);
    for(const plane of projected) for(const f of [plane,...plane.decals]) {
      ctx.beginPath();f.v.forEach((p,i)=>{const x=W/2+p[0]*108,y=H*.56+p[1]*108;i?ctx.lineTo(x,y):ctx.moveTo(x,y)});ctx.closePath();
      ctx.fillStyle=`rgb(${f.tone},${f.tone},${f.tone})`;ctx.fill();
      if(f.stroke){ctx.strokeStyle=`rgb(${Math.round(f.tone*.32)},${Math.round(f.tone*.32)},${Math.round(f.tone*.32)})`;ctx.lineWidth=Math.max(.6,f.stroke*55);ctx.stroke()}
    }
    return canvas;
  }
  window.PrintSource={W,H,DURATION,frame};
})();
