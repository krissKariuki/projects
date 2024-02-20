var database=[['BioYoghurt','foodstuff',4,'KSH 250',14],
['GreekYoghurt','foodstuff',0,'KSH 249',14],
['IlaraYoghurt','foodstuff',2,'KSH 137',14],
['Hotpizza','foodstuff',4,'KSH 3,200',15],
['DeliciousBurger','foodstuff',3,'KSH 999',14],
['DawaatRice','foodstuff',3,'KSH 600',10],
['PishoriRice','foodstuff',3,'KSH 590',11],
['PS5','electronics',2,'KSH 136,785',16],
['PS4','electronics',3,'KSH 59,599',10],
['SonyPS5','electronics',4,'KSH 139,000',17],
['NokiaH5','electronics',10,'KSH 25,600',16],
['SamsungTelevision(TV)','electronics',7,'KSH 39,000',10],
['HPHeadphones','electronics',8,'KSH 4,500',10],
['BTEarphones','electronics',3,'KSH 480',15],
['NokiaSmart','electronics',9,'KSH 39,500',17],
['OppoA15','electronics',7,'KSH 15,000',16],
['LenovoLaptop','electronics',2,'KSH 38,600',10],
['WOLFTOP','clothings',3,'KSH 1,280',16],
['CATTOP','clothings',9,'KSH 1,690',15],
['KenyanT-Shirt','clothings',8,'KSH 960',10],
['JORDANSHOES','shoes',7,'KSH 3,800',10],
['JORDANSNICKERS','shoes',2,'KSH 5,450',15],
['SPORTSSHOES','shoes',3,'KSH 4,300',9],
['Redbull','drinks',2,"KSH 300",15]];
//pushing items to their respective arrays
var electronics=[];
var foodstuff=[];
var clothings=[];
var shoes=[];
var drinks=[];
database.forEach(function(value){eval(value[1]).push(value[0]);})
//initializing values
var left=16;
var width=200;
var left1=16;
var width1=200;
let x=0;
let i=0;
//functions automatically creating divs
var div,div1,divC,divE,divF,divD,divS;
function myCreate(){div=document.createElement('div');
document.getElementById('rated').appendChild(div);
div.style.left=left;}
function myCreate1(){div1=document.createElement('div');
document.getElementById('editors').appendChild(div1);
div1.style.left=left1;}
function myCreateC(){divC=document.createElement('div');
document.getElementById('category_clothings1').appendChild(divC);}
function myCreateE(){divE=document.createElement('div');
document.getElementById('category_electronics1').appendChild(divE);}
function myCreateF(){divF=document.createElement('div');
document.getElementById('category_foodstuff1').appendChild(divF);}
function myCreateS(){divS=document.createElement('div');
document.getElementById('category_shoes1').appendChild(divS);}
function myCreateD(){divD=document.createElement('div');
document.getElementById('category_drinks1').appendChild(divD);}
//onloading page
function myFunction(){while(x<database.length){if(database[x][2]>=5){myCreate();
var images=database[x][0]+".jpg";
div.innerHTML=`<img src=${images} class="image" onClick='dispImage()' id=${database[x][0]} ><p id='name'>${database[x][0]}</p>
<p id='price'>${database[x][3]}</p>`;
left+=width+30};
x++};
while(i<database.length){if(database[i][4]>14){myCreate1();
var images1=database[i][0]+".jpg";
div1.innerHTML=`<img src=${images1} class="image" onClick='dispImage()' id=${database[i][0]} ><p id='name'>${database[i][0]}</p>
<p id='price'>${database[i][3]}</p>`;
left1+=width1+30};
i++};
document.getElementById('dispOnload').click();
tabChange();}
//onclicking navigation buttons 
function openTab(color,pageName,element){
var g,tabcontent,tablink;
tabcontent=document.getElementsByClassName("tabcontent");
tablink=document.getElementsByClassName("tablink");
for(g=0;g<tabcontent.length;g++){tabcontent[g].style.backgroundColor=color;tabcontent[g].style.display='none';}
for(g=0;g<tablink.length;g++){tablink[g].style.backgroundColor='';tablink[g].style.color='#6200EA';}
document.getElementById(pageName).style.display='flex';element.style.backgroundColor='#6200EA';element.style.color='white';
document.getElementById('item_clicked').style.display='none';}
//Displaying images clicked
function dispImage(){
var j=0;
while(j<database.length){
if(event.target.id==database[j][0]){
var name=document.getElementById(database[j][0]).src;
var name1=name.split('/');
document.getElementById('item_clicked').innerHTML=`<img src=${name1[name1.length-1]} id='clicked'><p id='name'>${database[j][0]}</p><p id='price'>${database[j][3]}</p><br><button id='order'>Order Now</button><br><button id='back' onClick='goBack()'>Back</button>`;
document.getElementById('item_clicked').style.display='flex';};j++};}
//function onclicking back
function goBack(){
document.getElementById('item_clicked').style.display='none';
document.getElementById('editors').style.display='flex';
document.getElementById('rated').style.display='flex';
document.getElementById('choice_p').style.display='flex';
document.getElementById('choice_T').style.display='flex';}
//Changing tabs onclicking buttons
function tabChange(){
var w=0;
while(w<database.length){
if(database[w][1]=="foodstuff"){
myCreateF();
var imagesF=database[w][0]+".jpg";
divF.innerHTML=`<img src=${imagesF} class="imageT" onClick='dispImage()' id=${database[w][0]} ><p id='name'>${database[w][0]}</p>
<p id='price'>${database[w][3]}</p>`;};
if(database[w][1]=="electronics"){
myCreateE();
var imagesE=database[w][0]+".jpg";
divE.innerHTML=`<img src=${imagesE} class="imageT" onClick='dispImage()' id=${database[w][0]} ><p id='name'>${database[w][0]}</p>
<p id='price'>${database[w][3]}</p>`;};
if(database[w][1]=="clothings"){
myCreateC();
var imagesC=database[w][0]+".jpg";
divC.innerHTML=`<img src=${imagesC} class="imageT" onClick='dispImage()' id=${database[w][0]} ><p id='name'>${database[w][0]}</p>
<p id='price'>${database[w][3]}</p>`;};
if(database[w][1]=="shoes"){
myCreateS();
var imagesS=database[w][0]+".jpg";
divS.innerHTML=`<img src=${imagesS} class="imageT" onClick='dispImage()' id=${database[w][0]} ><p id='name'>${database[w][0]}</p>
<p id='price'>${database[w][3]}</p>`;};
if(database[w][1]=="drinks"){
myCreateD();
var imagesD=database[w][0]+".jpg";
divD.innerHTML=`<img src=${imagesD} class="imageT" onClick='dispImage()' id=${database[w][0]} ><p id='name'>${database[w][0]}</p>
<p id='price'>${database[w][3]}</p>`;};w++};}
