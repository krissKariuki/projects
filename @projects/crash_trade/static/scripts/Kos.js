s=performance.now();

//injecting action-response gestures to windows that require the functionality
let inoperableWindows=['boot screen','launcher'].includes(document.title);

document.addEventListener('DOMContentLoaded',()=>{
    if(!inoperableWindows)
{
    previewGesture();
    exitGesture();
}});//gesture injection complete

let rootCss=
{
    width:innerWidth,
    height:innerHeight,
    background:'#233'
}
//setting up UI resources
let apps='spotify calculator whatsapp messages facebook youtube netflix gallery phone telegram settings playstore contacts camera clock notes instagram theme meet demo'.split(' ').sort();

let icon_images=apps.map(app=>`../media/images/launcher/${app}.png`);
let app_id=apps.map(app=>app.slice(0,4));
let wallpapers=apps.map((app,i)=>`../media/images/wallpapers/wp_${i}.jpg`);
let dtp_settings='wallpapers widgets theme settings'.split(' ');

   let recents=
   {
       render()
       {
           if(!$('#previewWindow'))
           {
               css($('#root'),'display','none');
           newElement($('body'),'div','previewWindow');
           render(new Widgets('#previewWindow','preview-tab','tab_1','tab_2','tab_3','tab_4','tab_5'));
           newElement($('#previewWindow'),'div','preview-tab-cleaner');
           $('#preview-tab-cleaner').onclick=()=>{$('#previewWindow').remove();css($('#root'),'display','block')}
           }
       },
       
       clean()
       {
           css($('#root'),'display','block');
           $('#previewWindow').remove();
       }
   }//UI resources' setup complete

//Initiating device setup

//detecting the brand company of user's device;
let deviceMatches=/tecno|nokia|sm|cph|rmx|huawei|moto|itel|redmi|nokia|iphone|infinix/i;

let thisDevice=navigator.userAgent.match(deviceMatches);
let deviceBrands=
{tecno:'tecno',sm:'samsung',nokia:'nokia',cph:'oppo',rmx:'realme',infinix:'infinix',huawei:'huawei',moto:'motorolla',itel:'itel',iphone:'iphone'}

let deviceBrand=deviceBrands?.[thisDevice]??'krakOS';
//device setup complete

//implementing  gesture navigation system

//variable initialisations
let touchPoints={x:[],y:[]}
let xPoints=touchPoints.x;
let yPoints=touchPoints.y;
let j=0;
let verticalGestVar=5;
let crossSensitivity=75;
let counter=0;
let timer=250;
let chime;

function touchHoldEvent(element,holdevent)
{
$(element).addEventListener('touchstart',touchDetected);
$(element).addEventListener('touchend',touchEnded);

function updateCounter()
{
counter++;
if(counter>=2)holdevent();
}
function touchDetected(evt)
{
    if(evt.touches.length>1)clearInterval(chime);
    chime=setInterval(updateCounter,timer);

}

function touchEnded()
{
clearInterval(chime);
counter=0;
}
}//touch & hold event complete;

//gesture to exit from app
function exitGesture(element='#root',url='launcher.html')
{
    //variable set to 0 for maximum sensitivity upon exit gesture
    verticalGestVar=0;
    
    $(element).addEventListener('touchmove',swipeGesture);
    $(element).addEventListener('touchend',endOfGesture);
    
    function swipeGesture(evt)
    {
        let touches=evt.touches[0];
                
        if(touches.length>1)return;
        
        touchPoints['x'].push(Number(touches.screenX.toFixed(0)));
        touchPoints['y'].push(Number(touches.screenY.toFixed(0)));
        if(j>verticalGestVar && yPoints[0]>yPoints[j] && (Math.abs(xPoints[0]-xPoints[j])<20) && yPoints[j]>innerHeight-10){document.location=url;}
        j++;
    }
    function endOfGesture()
    {
        yPoints.length=0;
        xPoints.length=0;
        j=0;
    }
}//exit gesture complete


//preview window swipe gesture
function previewGesture(elem='#previewWindow',previewEvent=()=>{},element='body')
{
    
//state is to prevent event from firing immediately when a finger is just placed on the screen instead of being moved(swipe gesture);
let state=false;
        
$(element).addEventListener('touchstart',touchDetected);
$(element).addEventListener('touchmove',(e)=>{
    if(e.touches[0].screenX > 300)state=true;});
$(element).addEventListener('touchend',touchEnded);

function updateCounter()
{
counter++;
if(++counter>2 && state)
{
previewEvent=()=>{
    $(element).ontouchmove=(e)=>{
        if(e.touches[0].screenY>800 && !recents.render())recents.clean();}
    recents.render();
    state=false;
}
previewEvent();
}
j++;
}
function touchDetected(evt)
{
    if(evt.touches.length>1)clearInterval(chime);
    chime=setInterval(updateCounter,timer);
}

function touchEnded()
{
clearInterval(chime);
counter=0;
state=false;
}
}//preview event complete;

//implementing vertical swpie gesture navigation system;
function verticalSwipeGesture(element,upswipe,downswipe=()=>{})
{
    $(element).addEventListener('touchmove',swipeGesture);
    $(element).addEventListener('touchend',endOfGesture);
    
    function swipeGesture(evt)
    {
        if(evt.touches.length>1)return;
        let touches=evt.touches[0];
        
        touchPoints['x'].push(Number(touches.screenX.toFixed(0)));
        touchPoints['y'].push(Number(touches.screenY.toFixed(0)));
        if(j>verticalGestVar && yPoints[0]>yPoints[j] && Math.abs(xPoints[0]-xPoints[j])<crossSensitivity)upswipe();

        else if(j>verticalGestVar && yPoints[j]>yPoints[0] && (Math.abs(xPoints[0]-xPoints[j])<crossSensitivity))downswipe();
        j++;
    }
    function endOfGesture()
    {
        yPoints.length=0;
        xPoints.length=0;
        j=0;
    }
}

e=performance.now();

console.log(`kos : ${(e-s).toFixed(3)} ms`)