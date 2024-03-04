newElement($('body'),'section','bootScreen','boot-screen');
$('.boot-screen').innerHTML=
`<p class='device-brand'>tecno</p>
<p class='os'><span class='pwd-by'>powered by</span><br><span class='kos-label'>Kos</span><div class='kos-bot'></div></p>`;

newElement($('body'),'section','homeScreen','no class');
newElement($('#homeScreen'),'section','home','no class');
newElement($('#homeScreen'),'section','desktop','launcher');
newElement($('#desktop'),'section','fade','filter');
let desktop_settings=new Widgets('#home','dtp','dtp_wallpapers','dtp_widgets','dtp_theme','dtp_settings');render(desktop_settings);
setup_os('#bootScreen','#homeScreen');
[...$$('.dtp')].forEach((icon,i)=>{
icon.innerHTML=`<p class='dtp_txt'>
${dtp_settings[i]}
</p>`;
css(icon,'background-image',`url('../media/images/launcher/desktop/desktop_${dtp_settings[i]}.png')`);
});

for(let i=0;i<apps.length;i++)
{
newElement($('#desktop'),'div',`${ids[i]}`,'app');
newElement($(`#${ids[i]}`),'div',`${ids[i]}_icon`,'icon');
newElement($(`#${ids[i]}`),'p',`${ids[i]}_label`,'label',`${apps[i]}`);
}
[...$$('.icon')].forEach((icon,i)=>{css(icon,'background-image',`url('${icon_images[i]}')`)});
[...$$('.label')].forEach(label=>{css(label,'text-transform','capitalize')});
css($('#home'),'background-image',`url(../media/images/wallpapers/wp_${random(wallpapers.length-1)}.jpg)`);
css($('#desktop'),'bottom','0%');
css($('#desktop'),'opacity','0');

$('.device-brand').setAttribute('style','color:#fff');

setTimeout(launchApps,750);

touchHoldEvent('#home',homeHoldEvent);

function homeHoldEvent()
{
[...$$('.dtp')].forEach(icon=>{
css(icon,'bottom','5%');
});
$('#home').ontouchstart=()=>{
[...$$('.dtp')].forEach(icon=>{
css(icon,'bottom','-10%');
});
}
}

verticalSwipeGesture('#home',launchApps);
verticalSwipeGesture('#desktop',()=>{},fallApps);

function launchApps()
{
css($('#desktop'),'bottom','100%');
css($('#desktop'),'opacity','1');
css($('#desktop'),'z-index','1');
css($('#fade'),'opacity','0.9');
[...$$('.dtp')].forEach(icon=>{
css(icon,'bottom','-10%');
});
}
function fallApps()
{
css($('#desktop'),'bottom','60%');
css($('#desktop'),'opacity','0');
css($('#desktop'),'z-index','-1');
css($('#fade'),'opacity','0');

}
[...$$('.icon')].forEach(icon=>{
icon.addEventListener('touchstart',openApp);
});/*
newElement($('#home'),'div','prevWindow');

render(new Widgets('#prevWindow','prevTabs','one','two'));
preview(previewActive,'#prevWindow');

function previewActive()
{
    $('#prevWindow').ontouchstart=()=>{
        [...$$('.prevTab')].forEach(tab=>{
            tab.remove();
        })
    }
}*/
function openApp(evt)
{
let id=evt.target.getAttribute('id');
switch(id)
{
case 'calc_icon':document.location='calculator.html';
break;

case 'demo_icon':document.location='demo_0.html';
break;

case 'spot_icon':document.location='spotify.html';
break;
}
}