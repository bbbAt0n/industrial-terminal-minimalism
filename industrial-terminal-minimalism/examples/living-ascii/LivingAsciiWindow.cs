// Add to an existing WinUI 3 app; its App can open new LivingAsciiExample.LivingAsciiWindow().Activate().
using System;
using System.Diagnostics;
using System.Text;
using Microsoft.UI.Dispatching;
using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using Microsoft.UI.Xaml.Media;
using Windows.UI;
using Windows.UI.ViewManagement;
namespace LivingAsciiExample;

public sealed class LivingAsciiWindow : Window
{
    public Grid Surface { get; }=new();
    public TextBlock Art { get; }=new();
    private readonly UISettings settings=new();
    private readonly DispatcherQueueTimer timer;
    private readonly Stopwatch clock=new();
    private readonly char[] grid=new char[56*20];
    private readonly Button pause=new(){Content="Pause visuals",MinHeight=44};
    private readonly CheckBox reduce=new(){Content="Reduce motion",MinHeight=44};
    private bool paused,active,loaded,dark;
    private readonly TextBlock title=new(){Text="A field in motion.",FontSize=36,FontWeight=Microsoft.UI.Text.FontWeights.SemiBold};
    private readonly TextBlock caption=new(){Text="Original procedural field. Decorative; no measured task data.",TextWrapping=TextWrapping.Wrap};
    public bool IsAnimating=>timer.IsRunning;
    public LivingAsciiWindow()
    {
        Title="Living ASCII / WinUI local example";Content=Surface;AppWindow.Resize(new Windows.Graphics.SizeInt32(780,620));
        var stack=new StackPanel {Padding=new Thickness(32),Spacing=16};Surface.Children.Add(stack);stack.Children.Add(title);
        Art.FontFamily=new FontFamily("Departure Mono, Consolas");Art.FontSize=12;Art.LineHeight=15;Art.IsTextSelectionEnabled=false;
        Microsoft.UI.Xaml.Automation.AutomationProperties.SetAccessibilityView(Art,Microsoft.UI.Xaml.Automation.Peers.AccessibilityView.Raw);
        stack.Children.Add(Art);stack.Children.Add(caption);var controls=new StackPanel{Orientation=Orientation.Horizontal,Spacing=16};stack.Children.Add(controls);controls.Children.Add(pause);controls.Children.Add(reduce);
        var theme=new Button {Content="Change theme",MinHeight=44};controls.Children.Add(theme);theme.Click+=(_,_)=>{dark=!dark;ApplyTheme();};
        timer=DispatcherQueue.CreateTimer();timer.Interval=TimeSpan.FromMilliseconds(125);timer.IsRepeating=true;timer.Tick+=(_,_)=>{if(!Eligible()){Sync();return;}Draw(clock.Elapsed.TotalSeconds);};
        pause.Click+=(_,_)=>{paused=!paused;pause.Content=paused?"Resume visuals":"Pause visuals";Sync();};reduce.Checked+=(_,_)=>Sync();reduce.Unchecked+=(_,_)=>Sync();
        Surface.Loaded+=(_,_)=>{loaded=true;settings.AnimationsEnabledChanged+=PreferenceChanged;Sync();};
        Activated+=(_,e)=>{active=e.WindowActivationState!=WindowActivationState.Deactivated;Sync();};AppWindow.Changed+=(_,_)=>Sync();
        Closed+=(_,_)=>{loaded=false;Sync();settings.AnimationsEnabledChanged-=PreferenceChanged;};ApplyTheme();Draw(0);
    }
    public void PauseVisuals(bool value){paused=value;pause.Content=value?"Resume visuals":"Pause visuals";Sync();}
    public void ReduceVisuals(bool value){reduce.IsChecked=value;Sync();}
    public void SetTheme(bool value){dark=value;ApplyTheme();}
    private void PreferenceChanged(UISettings s,UISettingsAnimationsEnabledChangedEventArgs e)=>DispatcherQueue.TryEnqueue(Sync);
    private bool Eligible()=>loaded&&active&&AppWindow.IsVisible&&!paused&&reduce.IsChecked!=true&&settings.AnimationsEnabled;
    private void Sync(){if(Eligible()){if(!timer.IsRunning){clock.Start();timer.Start();}}else{timer.Stop();clock.Stop();Draw(0);}}
    private void Draw(double seconds)
    {
        const string ramp=" .,:;+=*#@";var phase=seconds%8/8*Math.PI*2;
        for(int y=0;y<20;y++)for(int x=0;x<56;x++){var nx=(x-28d)/56;var ny=(y-10d)/20;var r=Math.Sqrt(nx*nx*1.7*1.7+ny*ny);var f=Math.Sin(r*27-phase)+Math.Sin(nx*16+ny*8+phase)*.5;grid[y*56+x]=ramp[Math.Clamp((int)Math.Round((f+1.5)/3*Math.Max(0,1-r*1.6)*8),0,9)];}
        var text=new StringBuilder(56*21);for(int y=0;y<20;y++){if(y>0)text.Append('\n');text.Append(grid,y*56,56);}Art.Text=text.ToString();
    }
    private void ApplyTheme(){var paper=dark?Color.FromArgb(255,21,23,20):Color.FromArgb(255,233,230,223);var ink=dark?Color.FromArgb(255,220,214,197):Color.FromArgb(255,46,52,50);Surface.RequestedTheme=dark?ElementTheme.Dark:ElementTheme.Light;Surface.Background=new SolidColorBrush(paper);title.Foreground=Art.Foreground=caption.Foreground=new SolidColorBrush(ink);}
}
