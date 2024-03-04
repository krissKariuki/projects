let touchPoints={x:[],y:[]}
let xps=touchPoints.x;
let yps=touchPoints.y;
let j=0;
let verticalGestVar=5;


function exitApp(element='body',url='launcher.html')
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
        if(j>verticalGestVar && yps[0]>yps[j] && (Math.abs(xps[0]-xps[j])<20) && yps[j]>600)
        {
            document.location=url;
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
exitApp();