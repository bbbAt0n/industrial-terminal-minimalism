"""Run with an existing Python + Tk installation. Standard library only."""
import ctypes, math, sys, time, tkinter as tk
from tkinter import font

class LivingAscii:
    def __init__(self,root):
        self.root=root;self.timer=None;self.elapsed=0;self.started=0;self.closed=False;self.focused=True;self.dark=False
        self.paused=tk.BooleanVar(value=False);self.reduced=tk.BooleanVar(value=self.os_reduced())
        self.grid=[' ']*(56*20);self.ramp=' .,:;+=*#@'
        root.title('Living ASCII / Tk local example');root.geometry('760x580')
        self.title=tk.Label(root,text='A field in motion.',font=('Segoe UI',30,'bold'),anchor='w');self.title.pack(fill='x',padx=32,pady=(24,12))
        face='Departure Mono' if 'Departure Mono' in font.families(root) else 'Consolas' if 'Consolas' in font.families(root) else 'TkFixedFont'
        self.art=tk.Label(root,font=(face,-12),justify='left',anchor='center',padx=16,pady=16);self.art.pack(fill='both',expand=True,padx=32)
        self.caption=tk.Label(root,text='Original procedural interference field. Decoration; no task data.',font=('Segoe UI',12));self.caption.pack(padx=32,pady=8)
        self.controls=tk.Frame(root);self.controls.pack(pady=16)
        self.pause=tk.Checkbutton(self.controls,text='Pause visuals',variable=self.paused,command=self.sync);self.pause.pack(side='left',padx=8)
        self.reduce=tk.Checkbutton(self.controls,text='Reduce motion',variable=self.reduced,command=self.sync);self.reduce.pack(side='left',padx=8)
        self.theme=tk.Button(self.controls,text='Change theme',command=self.toggle_theme);self.theme.pack(side='left',padx=8)
        root.bind('<Unmap>',lambda _:self.sync());root.bind('<Map>',lambda _:self.sync());root.bind('<FocusIn>',lambda _:self.focus(True));root.bind('<FocusOut>',lambda _:root.after_idle(self.check_focus));root.protocol('WM_DELETE_WINDOW',self.destroy)
        self.apply_theme();self.draw(0);root.after_idle(self.sync)
    def os_reduced(self):
        if sys.platform!='win32':return False
        enabled=ctypes.c_int(1);ctypes.windll.user32.SystemParametersInfoW(0x1042,0,ctypes.byref(enabled),0);return not bool(enabled.value)
    def focus(self,value):self.focused=value;self.sync()
    def check_focus(self):self.focused=self.root.focus_displayof() is not None;self.sync()
    def allowed(self):return not self.closed and self.focused and self.root.winfo_viewable() and not self.paused.get() and not self.reduced.get() and not self.os_reduced()
    def halt(self):
        if self.timer is not None:self.elapsed+=time.monotonic()-self.started;self.root.after_cancel(self.timer);self.timer=None
    def sync(self):
        self.halt()
        if self.allowed():self.started=time.monotonic();self.timer=self.root.after(125,self.tick)
        else:self.draw(0)
    def tick(self):
        if not self.allowed():self.sync();return
        elapsed=self.elapsed+time.monotonic()-self.started;self.draw(elapsed)
        self.timer=self.root.after(max(1,round((.125-elapsed%.125)*1000)),self.tick)
    def draw(self,seconds):
        phase=(seconds%8)/8*math.tau
        for y in range(20):
            for x in range(56):
                nx=(x-28)/56;ny=(y-10)/20;r=math.hypot(nx*1.7,ny);f=math.sin(r*27-phase)+math.sin(nx*16+ny*8+phase)*.5
                self.grid[y*56+x]=self.ramp[max(0,min(9,round((f+1.5)/3*max(0,1-r*1.6)*8))) ]
        self.art.configure(text='\n'.join(''.join(self.grid[y*56:(y+1)*56]) for y in range(20)))
    def toggle_theme(self):self.dark=not self.dark;self.apply_theme()
    def apply_theme(self):
        paper,ink,surface=('#151714','#DCD6C5','#242722') if self.dark else ('#E9E6DF','#2E3432','#D4D0C6')
        self.root.configure(bg=paper);self.controls.configure(bg=paper)
        for w in [self.title,self.caption,self.pause,self.reduce,self.theme]:w.configure(bg=paper,fg=ink)
        for w in [self.pause,self.reduce]:w.configure(selectcolor=surface,activebackground=paper,activeforeground=ink)
        self.art.configure(bg=surface,fg=ink)
    def destroy(self):self.closed=True;self.halt();self.root.destroy()

if __name__=='__main__':
    root=tk.Tk();app=LivingAscii(root);root.mainloop()
