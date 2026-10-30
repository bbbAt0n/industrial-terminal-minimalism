// SPDX-License-Identifier: CC0-1.0
/* Original CC0. Narrow port of the approved pixel raster and established phosphor finishes.
 * Internal source pixels are scalar luminance, never display palette colours. */
(() => {
  'use strict';
  const clamp=v=>Math.max(0,Math.min(1,v));
  const bayer=[[0,8,2,10],[12,4,14,6],[3,11,1,9],[15,7,13,5]];
  function create(){const layer=document.createElement('canvas');return {layer,on:null,age:null,update:null,sprites:null,wideHalo:true};}
  function reset(s){s.on=null;s.age=null;s.update=null;}
  // Blur is used only during sprite construction, never on a frame-sized surface.
  function sprite(color,monitor,wide){
    const c=document.createElement('canvas');c.width=c.height=64;
    const core=document.createElement('canvas');core.width=core.height=64;
    const x=core.getContext('2d');x.fillStyle=color;x.beginPath();
    if(monitor)x.ellipse(32,32,1.9,.8,0,0,Math.PI*2);else x.arc(32,32,1.6,0,Math.PI*2);x.fill();
    const o=c.getContext('2d');o.globalCompositeOperation='lighter';
    o.globalAlpha=.90;o.filter=`blur(${monitor?2.7:2.3}px)`;o.drawImage(core,0,0);
    if(wide){o.globalAlpha=.70;o.filter=`blur(${monitor?8:7}px)`;o.drawImage(core,0,0);}
    o.filter='none';return c;
  }
  // Cache eight-site row patterns (256 bounded entries), reducing additive
  // draw calls without changing the per-dot glow or the current-state mask.
  function patterns(dot){
    const tiles=new Array(256);tiles[0]=null;
    for(let mask=1;mask<256;mask++){
      const c=document.createElement('canvas');c.width=92;c.height=64;
      const o=c.getContext('2d');o.globalCompositeOperation='lighter';
      for(let bit=0;bit<8;bit++)if(mask&(1<<bit))o.drawImage(dot,bit*4,0);
      tiles[mask]=c;
    }
    return tiles;
  }
  function dispose(s){reset(s);s.layer.width=s.layer.height=0;if(s.sprites)for(const c of s.sprites.layers)c.width=c.height=0;s.sprites=null;}
  function draw(source,target,p,mode,update,s){
    const phosphor=mode==='amber'||mode==='monitor',monitor=mode==='monitor';
    if(phosphor){
      const key=[p.fg,monitor].join('/');
      if(s.sprites?.key!==key){
        if(s.sprites)for(const c of s.sprites.layers)c.width=c.height=0;
        const dots=[sprite(p.fg,monitor,true),sprite(p.fg,monitor,false)],tiles=dots.map(patterns);
        s.sprites={key,tiles,layers:[...dots,...tiles.flat().filter(Boolean)]};
      }
    }
    const w=source.width,h=source.height,nx=Math.ceil(w/4),ny=Math.ceil(h/4);
    if(!s.on||s.on.length!==nx*ny){s.on=new Uint8Array(nx*ny);s.age=new Uint8Array(nx*ny).fill(2);s.update=null;s.layer.width=w;s.layer.height=h;}
    const data=source.getContext('2d',{willReadFrequently:true}).getImageData(0,0,w,h).data;
    const x=s.layer.getContext('2d'),initial=s.update===null,advance=s.update!==update;
    x.clearRect(0,0,w,h);x.fillStyle=p.fg;x.beginPath();let toggled=0,points=0;
    for(let row=0;row<ny;row++)for(let col=0;col<nx;col++){
      const i=row*nx+col,a=(col+.5)*4,b=(row+.5)*4;
      let sum=0,n=0,lo=1,hi=0;
      for(let v=row*4;v<Math.min(h,(row+1)*4);v++)for(let u=col*4;u<Math.min(w,(col+1)*4);u++){
        const k=(v*w+u)*4,luma=(.2126*data[k]+.7152*data[k+1]+.0722*data[k+2])/255;
        sum+=luma;n++;lo=Math.min(lo,luma);hi=Math.max(hi,luma);
      }
      const raw=sum/n;
      if(advance){
        // established controls fixed at brightness=0, contrast=1.1, density=1.15, threshold=.32.
        const areaTone=clamp((raw-.5)*1.1+.5),edge=clamp((hi-lo-.03)/.18);
        const tone=raw<.006?0:clamp(Math.max(areaTone,edge*.92)*1.15);
        const threshold=(bayer[row%4][col%4]+.5)/16;
        const desired=raw<.006?false:initial?tone>threshold:s.on[i]?tone>Math.max(.012,threshold-.06):tone>threshold+.06;
        // A changed state must survive the next two updates: reversal earliest at t+3.
        if(desired!==Boolean(s.on[i])&&(initial||s.age[i]>=2)){s.on[i]=desired?1:0;s.age[i]=0;toggled++;}
        else s.age[i]=Math.min(255,s.age[i]+1);
      }
      if(s.on[i]){if(monitor){x.moveTo(a+1.9,b);x.ellipse(a,b,1.9,.8,0,0,2*Math.PI);}else{x.moveTo(a+1.6,b);x.arc(a,b,1.6,0,2*Math.PI);}points++;}
    }
    x.fill();s.update=update;
    const out=target.getContext('2d'),c=s.layer;out.fillStyle=p.bg;out.fillRect(0,0,w,h);
    if(phosphor){
      out.save();out.globalCompositeOperation='lighter';
      const tiles=s.sprites.tiles[s.wideHalo?0:1];
      for(let row=0;row<ny;row++)for(let col=0;col<nx;col+=8){
        let mask=0;for(let bit=0;bit<8&&col+bit<nx;bit++)mask|=s.on[row*nx+col+bit]<<bit;
        if(mask)out.drawImage(tiles[mask],(col+.5)*4-32,(row+.5)*4-32);
      }
      out.restore();
    }
    // Opaque core is redrawn last; no prior-frame accumulation or clock input.
    out.drawImage(c,0,0);
    if(monitor){out.fillStyle='rgba(0,0,0,.045)';for(let y=0;y<h;y+=4)out.fillRect(0,y,w,1);}
    return {points,toggled,pitch:4,radius:1.6,cadenceHz:30,wideHalo:s.wideHalo,geometry:monitor?'3.8 x 1.6 px horizontal beam segments':'3.2 px circular cores',phosphor:phosphor?p.fg:null};
  }
  window.SignalRaster={create,draw,reset,dispose};
})();
