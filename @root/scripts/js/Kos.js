//setting up UI resources
let wallpapers=[];
let ids=[];
let icon_images=[];
let apps='spotify calculator whatsapp messages facebook youtube netflix gallery phone telegram settings playstore contacts camera clock notes instagram theme meet demo'.split(' ').sort();

icon_images=apps.map(app=>{return '../media/images/launcher/'+app+'.png'});
ids=apps.map(app=>{return app.slice(0,4)});
wallpapers=apps.map((app,i)=>{return `../media/images/wallpapers/wp_${i}.jpg`});
let dtp_settings='wallpapers widgets theme settings'.split(' ');
//UI resources' setup complete

//Initiating device setup

//detecting the brand of user's device;
let userDevice=navigator.userAgent;
let thisDevice;
function deviceInfo()
{
let validDevices=/tecno|nokia|sm|cph|rmx|huawei|moto|itel|redmi|nokia|iphone|infinix/i;

thisDevice=userDevice.match(validDevices).join('').toLowerCase();
switch(thisDevice)
{
    case 'tecno':return 'tecno';
    break;
    case 'sm':return 'samsung';
    break;
    case 'rmx':return 'realme';
    break;
    case 'nokia':return 'nokia';
    break;
    case 'cph':return 'oppo';
    break;
    case 'huawei':return 'huawei';
    break;
    case 'infinix':return 'infinix';
    break;
    case 'itel':return 'itel';
    break;
    case 'redmi':return 'redmi';
    break;
    case 'iphone':return 'iphone';
    break;
}
}

let deviceBrand;//to be displayed in the bootLoader screen to credit device make company;

switch(deviceInfo())
{
    case 'tecno':deviceBrand='tecno';
        break;
        
    case 'realme':deviceBrand='realme';
        break;
}
//ensuring bootloader screen is rendered before the homeScreen;
function setup_os(boot,home)
{
    function bootScreen()
    {
        blockItems($(boot));
        hideItems($(home));
        
    setTimeout(homeScreen,5000);
    
    }
    //bootScreen();
    function homeScreen()
    {
        blockItems($(home));
        hideItems($(boot));
    }
    homeScreen();
}//finished device setup


//implementing touch & hold event functions;
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
if(counter>=2)
{
fireEvents(holdevent());
}
}
function touchDetected(evt)
{
    if(evt.touches.length>1)
    {
        clearInterval(chime);
    }
    else
    {
        chime=setInterval(updateCounter,timer);
    }
}

function touchEnded()
{
clearInterval(chime);
counter=0;
}
}//touch & hold event complete;


let state=false;
function preview(holdevent,element='body')
{
$(element).addEventListener('touchstart',touchDetected);
$(element).addEventListener('touchmove',()=>{state=true;});
$(element).addEventListener('touchend',touchEnded);

function updateCounter()
{
counter++;
if(counter>=3 && state===true)
{
fireEvents(holdevent());
}
}
function touchDetected(evt)
{
    if(evt.touches.length>1)
    {
        clearInterval(chime);
    }
    else
    {
        chime=setInterval(updateCounter,timer);
    }
}

function touchEnded()
{
clearInterval(chime);
counter=0;
state=false;
}
}//preview event complete;



//implementing swpie gesture navigation system;
let touchPoints={x:[],y:[]}
let xps=touchPoints.x;
let yps=touchPoints.y;
let j=0;
let verticalGestVar=5;
let crossSensitivity=75;

function verticalSwipeGesture(element,upswipe,downswipe=()=>{})
{
    $(element).addEventListener('touchmove',swipeGesture);
    $(element).addEventListener('touchend',endOfGesture);
    
    function swipeGesture(evt)
    {
        if(evt.touches.length>1)
        {
            return;
        }
        let touches=evt.touches[0];
        
        touchPoints['x'].push(Number(touches.screenX.toFixed(0)));
        touchPoints['y'].push(Number(touches.screenY.toFixed(0)));
        if(j>verticalGestVar && yps[0]>yps[j] && Math.abs(xps[0]-xps[j])<crossSensitivity)
        {
            fireEvents(upswipe());
        }
        else if(j>verticalGestVar && yps[j]>yps[0] && (Math.abs(xps[0]-xps[j])<crossSensitivity))
        {
            fireEvents(downswipe());
        }
        j++;
    }
    function endOfGesture()
    {
        yps.length=0;
        xps.length=0;
        j=0;
    }
}