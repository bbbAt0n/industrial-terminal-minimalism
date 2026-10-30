// SPDX-License-Identifier: CC0-1.0
/* Original approved graphical renderers, CC0. No text/glyph rasterization. */
(() => {
  'use strict';
  const {avg,clamp,stable}=PrintSampling;
  const hex=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16));
  function ink(p,t){const a=hex(p.bg),b=hex(p.fg);return `rgb(${a.map((v,i)=>Math.round(v+(b[i]-v)*clamp(t))).join(',')})`}
  function create(){const canvas=document.createElement('canvas');canvas.width=720;canvas.height=480;return {canvas,ctx:canvas.getContext('2d'),quant:null,key:''}}
  function draw(image,mode,p,target,state){
    if(!['halftone','tiles'].includes(mode))throw new RangeError('Unknown graphical renderer');
    const {w,h}=image,cw=8,ch=8,cols=Math.ceil(w/cw),rows=Math.ceil(h/ch);
    if(state.key!==mode){state.quant=new Int16Array(cols*rows).fill(-1);state.key=mode;}
    const x=state.ctx;x.fillStyle=p.bg;x.fillRect(0,0,w,h);
    for(let row=0;row<rows;row++)for(let col=0;col<cols;col++){
      const i=row*cols+col,px=col*cw,py=row*ch;
      const v=clamp(avg(image,px,py,cw,ch)*1.15);
      const previous=state.quant[i]<0?undefined:state.quant[i];
      if(mode==='halftone'){
        const q=clamp(stable(v,previous,1/16,.1),0,16);state.quant[i]=q;
        if(q){x.fillStyle=p.fg;x.beginPath();x.arc(px+cw/2,py+ch/2,cw*.485*Math.sqrt(q/16),0,Math.PI*2);x.fill()}
      }else{
        const n=5,q=clamp(stable(v,previous,1/n,.1),0,n);state.quant[i]=q;
        // Six levels including background; abutting integer tiles, no gutters.
        if(q){x.fillStyle=ink(p,q/n);x.fillRect(px,py,cw,ch)}
      }
    }
    const out=target.getContext('2d');out.fillStyle=p.bg;out.fillRect(0,0,w,h);out.drawImage(state.canvas,0,0);
  }
  window.PrintRenderer={create,draw};
})();
