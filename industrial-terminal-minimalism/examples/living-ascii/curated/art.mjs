/** Original artwork functions only. Scheduling belongs to the existing host surface. */
function sheet(cols,rows){const cells=new Array(cols*rows).fill(' ');return {put(x,y,ch){x=Math.round(x);y=Math.round(y);if(x>=0&&x<cols&&y>=0&&y<rows)cells[y*cols+x]=ch;},text(x,y,s){for(let i=0;i<s.length;i++)this.put(x+i,y,s[i]);},finish(){return Array.from({length:rows},(_,y)=>cells.slice(y*cols,(y+1)*cols).join('')).join('\n');}};}
export function phone(ms=0,cols=64,rows=28,stage=2){
 const a=sheet(cols,rows),p=ms/8000*Math.PI*2;
 // Broadside throughout: the device remains a phone even at maximum separation.
 const spread=(1-Math.cos(p))/2*[.55,.82,1,.35][stage],w=cols>=50?25:19,h=Math.min(25,rows-3),lift=Math.round(Math.sin(p)*.6),shift=Math.round(Math.min(cols>=50?15:9,Math.max(0,cols-w-4))*spread),x=Math.round((cols-w-shift)/2),y=1+lift,bx=x+shift,by=y+1;
 function panel(px,py,pw,ph,edge){for(let j=0;j<ph;j++)for(let i=0;i<pw;i++)a.put(px+i,py+j,j===0||j===ph-1?(i===0||i===pw-1?'+':edge):i===0||i===pw-1?'|':' ');}
 panel(bx,by,w,h-2,'-');
 for(let j=2;j<h-4;j++)for(let i=2;i<w-2;i++)if(j%4===0||i%6===0)a.put(bx+i,by+j,'.');
 for(const j of [2,h-5])for(const i of [2,w-3])a.put(bx+i,by+j,'o');
 const chipX=bx+w-9;panel(chipX,by+4,6,5,'=');for(let j=1;j<4;j++){a.text(chipX+1,by+4+j,'####');a.put(chipX-1,by+4+j,'=');a.put(chipX+6,by+4+j,'=');}
 panel(bx+4,by+11,w-8,Math.max(5,h-16),'-');a.text(bx+6,by+13,'+');
 for(let i=3;i<w-3;i++)a.put(bx+i,by+h-4,i%2?'#':'=');
 // Solid foreground mask; distinct chassis, bezel, earpiece, glass and home bar.
 panel(x,y,w,h,'=');a.put(x,y,'.');a.put(x+w-1,y,'.');a.put(x,y+h-1,"'");a.put(x+w-1,y+h-1,"'");
 a.text(x+Math.floor(w/2)-3,y+1,'--- o');
 panel(x+2,y+3,w-4,h-7,'-');
 for(let j=1;j<h-9;j++){
  const gx=x+w-5-Math.floor(j*.55);a.put(gx,y+3+j,'/');if(j<7)a.put(gx-1,y+3+j,':');
 }
 // Two broad quiet screen masses read as a display, with open glass around them.
 a.text(x+4,y+6,'====');a.text(x+4,y+8,'---');
 for(let j=0;j<3;j++)a.text(x+4,y+h-11+j,'::');
 a.text(x+Math.floor(w/2)-3,y+h-3,'=====');
 for(let j=2;j<h-1;j++)a.put(x+w,y+j,j%3===0?'#':':');a.put(x+w,y+6,'#');a.put(x-1,y+6,'|');a.put(x-1,y+7,'|');
 // Alignment marks describe assembly; no orbiting filler or random particles.
 if(shift>8){a.text(bx+w+2,by+5,'+');a.text(bx+w+2,by+h-6,'+');}
 return a.finish();
}
export function ribbon(ms=0,cols=72,rows=27){
 const a=sheet(cols,rows),p=ms/10000*Math.PI*2,ramp=' .,:=+*#@';
 // One folded ribbon, sampled back-to-front; its wide dark folds frame an open centre.
 const points=[];
 for(let i=0;i<=640;i++){
  const t=i/640,u=t*Math.PI*2,edge=Math.pow(Math.sin(Math.PI*t),.6);
  points.push({x:3+t*(cols-7),y:rows*.5+Math.sin(u*1.5+p)*rows*.24*edge+Math.sin(u*3-p)*rows*.035,z:Math.cos(u*1.5+p),t,edge});
 }
 points.sort((a,b)=>a.z-b.z);
 for(const q of points){const half=.35+q.edge*3,light=.35+.65*(q.z+1)/2;for(let v=-half;v<=half;v+=.45){const n=Math.abs(v)/half,shade=Math.min(8,Math.max(1,Math.round((1-n*.65)*light*8)));a.put(q.x,q.y+v,ramp[shade]);}}
 return a.finish();
}
export function directed(ms=0,cols=72,rows=19){
 const a=sheet(cols,rows),cy=Math.floor(rows/2),left=4,right=cols-5,span=right-left-1,head=(ms%6000)/6000*span;
 for(const x of [left,right]){a.text(x-2,cy-3,'+---+');for(let y=-2;y<=2;y++)a.text(x-2,cy+y,'|   |');a.text(x-2,cy+3,'+---+');}
 for(let x=left+3;x<right-2;x++){a.put(x,cy-2,'-');a.put(x,cy+2,'-');a.put(x,cy,x%3===0?'.':' ');}
 // A three-row arrow travels left to right; wrapped tails do not reverse direction.
 for(let x=left+3;x<right-2;x++){const dist=Math.min((head-(x-left)+span)%span,(head+span/2-(x-left)+span)%span);if(dist<11){a.put(x,cy,dist<3?'>':dist<8?'=':':');if(dist<3){a.put(x-1,cy-1,'>');a.put(x-1,cy+1,'>');}}}
 a.text(3,cy-5,'SOURCE');a.text(cols-12,cy-5,'RECEIVER');a.text(4,rows-2,'PERMITTED ROUTE / ILLUSTRATION');return a.finish();
}
