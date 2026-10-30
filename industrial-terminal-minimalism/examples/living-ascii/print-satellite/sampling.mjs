// SPDX-License-Identifier: CC0-1.0
/* Original integral sampling and hysteresis, CC0. */
(() => {
  'use strict';
  const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
  const integral=new Float32Array((720+1)*(480+1));
  function prepare(canvas,controls) {
    const {width:w,height:h}=canvas,data=canvas.getContext('2d',{willReadFrequently:true}).getImageData(0,0,w,h).data;
    const stride=w+1;integral.fill(0,0,stride);
    for(let y=0;y<h;y++){let sum=0;integral[(y+1)*stride]=0;for(let x=0;x<w;x++){
      const raw=data[(y*w+x)*4]/255;
      // Exactly black remains exactly empty under all tonal controls.
      const v=raw<.006?0:clamp((raw-.5)*controls.contrast+.5+controls.brightness);
      sum+=v;integral[(y+1)*stride+x+1]=integral[y*stride+x+1]+sum;
    }}
    return {w,h,stride,integral};
  }
  function avg(img,x,y,w,h) {
    const x0=clamp(Math.floor(x),0,img.w),y0=clamp(Math.floor(y),0,img.h),x1=clamp(Math.ceil(x+w),0,img.w),y1=clamp(Math.ceil(y+h),0,img.h);
    if(x1<=x0||y1<=y0)return 0;
    const a=img.integral,s=img.stride;
    return (a[y1*s+x1]-a[y0*s+x1]-a[y1*s+x0]+a[y0*s+x0])/((x1-x0)*(y1-y0));
  }
  function stable(value,previous,step,margin=.12) {
    const next=Math.round(value/step);if(previous===undefined)return next;
    return Math.abs(value-previous*step)<step*(.5+margin)?previous:next;
  }
  window.PrintSampling={prepare,avg,stable,clamp};
})();
