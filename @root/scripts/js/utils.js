//initialise syntax for query selection
let $=document.querySelector.bind(document);
let $$=document.querySelectorAll.bind(document);

//string methods

//shorten text and add ellipse at the end
function ellipseStr(len,str)
{
    if(str.length>len)
    {
       return `${str.slice(0,len)}...`;
    }
    else return str=str;

}

function hideStr(str,char)
{
    let i=0;
    let chars=[];
    while(i<str.length)
    {
        chars.push(char);
        i++;
    }
    chars=chars.join('');
    return {
        char:chars,
        string:str
    }
}

//End of string methods

//html dom methods

//create and append html element with id and class attributes
function newElement(parent,elem,id,Class,txt='')
{
    let el=document.createElement(elem);
    parent.append(el);
    el.setAttribute('id',id);
    el.classList.add(Class);
    el.innerHTML=txt;
}

//alter css styles code block;

//toggle classList of an element
function toggleClass(elem,condition,styles)
{
    if(condition===true)
    {
        elem.classList.add(styles)
    }
    else elem.classList.remove(styles)
}

  function  defProp(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }
  
  function css(elem,prop,value)
  {
      defProp(elem.style,prop,value)
  }
  
function centerX(...elems)
{
    elems.forEach((elem)=>{
        css(elem,'left','50%');
        css(elem,'transform','translate(-50%,0%)')});

}
function centerY(...elems)
{
    elems.forEach((elem)=>{
        css(elem,'top','50%');
        css(elem,'transform','translate(0%,-50%)')});

}

function centerXY(...elems)
{
    elems.forEach((elem)=>{
        css(elem,'left','50%');
        css(elem,'top','50%');
        css(elem,'transform','translate(-50%,-50%)')});

}

//end of css ...code block


//toggle display of multiple elements
function toggleItems(current,...others)
{
    displayState('block',current);
    if(current.style.display!=='none')
    {
        others.forEach(el=>{el.style.display='none'});
    }
    else return;
}


//html elements' display states code blocks;
function displayState(state,...elems)
{
    this.state = state;
    
    if(this.state=='inline')
    {
        elems.forEach(el=>{el.style.display='inline'})
    }
    else if(this.state=='block')
    {
        elems.forEach(el=>{el.style.display='block'})
    }
    else if(this.state=='flex')
    {
        elems.forEach(el=>{el.style.display='flex'})
    }
        else if(this.state=='hidden')
    {
         elems.forEach(el=>{el.style.visibility='hidden'})
    }
    

    else if(this.state=='none')
    {
         elems.forEach(el=>{el.style.display='none'})
    }
    
    else
    {elems.forEach(ele=>{ele.innerText='ERROR:invalid display state!';
    });
}
}

//hide html element
function hideItems(...items)
{
    items.forEach((item,index)=>{return item.style.display='none';
    });
}

//set html element display to block
function blockItems(...items)
{
    items.forEach((item,index)=>{return item.style.display='block'});
}

//set html element display to flex
function flexItems(...items)
{
    items.forEach((item,index)=>{return item.style.display='flex'});
}

//set html element display to inline
function inlineItems(...items)
{
    items.forEach((item,index)=>{return item.style.display='inline'});
}
//end of html dom methods

//date and time methods
//easy access to datetime object and methods
function time(second,minute,hour,date,month,year)
{
    let time=new Date();
    
    second=time.getSeconds();
    minute=time.getMinutes();
    hour=time.getHours();
    date=time.getDate();
    month=time.getMonth();
    year=time.getFullYear();
    //return object with prefix of time unit name
    return{
        sec : second,
        min : minute,
        hr : hour,
        dte : date,
        mth : month+1,
        yr : year
    }
    
}

//write time to html element
function writeTime(...elems)
{
    elems.forEach(elem=>{elem.innerText=`${time().hr}:${time().min<10?time().min='0'+time().min:time().min=time().min}:${time().sec<10?time().sec='0'+time().sec:time().sec=time().sec}`});
}
//write date to html element
function writeDate(...elems)
{
    elems.forEach(elem=>{elem.innerText=`${time().dte}/${time().mth}/${time().yr}`});
}

//end of date and time methods


//mathematical methods
//arithmetic operations utilities code block
function calculate(a,b,sign)
{
    let operands=
    {
        '+':(a,b)=>a+b,
        '-':(a,b)=>a-b,
        '*':(a,b)=>a*b,
        '/':(a,b)=>a/b,
        '%':(a,b)=>(a/100)*b,
        '√':(a,b)=>a**(1/b)
    }
    if(sign in operands)
    {
        return operands[sign](a,b);
    }
    else return 'invalid operator';
}
        function calcExp(expression)
        {
            let tokens=expression.match(/\d+|\+|\-|\*|\//g);
            let pre=0;
            let post=0;
            
            for(let i=0;i<tokens.length;i++)
            {
                if(tokens[i]==='/')
                {
                    pre=parseFloat(tokens[i-1]);
                    post=parseFloat(tokens[i+1]);
                    if(post==0)
                    {
                        return 'division by zero not possible!'
                        
                    }
                    else
                    {
                    let result=pre/post;
                    tokens.splice(i-1,3,result);
                    i-=2;
                    }
                }
            }
            for(let i=0;i<tokens.length;i++)
            {
                if(tokens[i]==='*')
                {
                    pre=parseFloat(tokens[i-1]);
                    post=parseFloat(tokens[i+1]);
                    
                    let result=pre*post;
                    tokens.splice(i-1,3,result);
                    i-=2;
                }
            }
            for(let i=0;i<tokens.length;i++)
            {
                if(tokens[i]==='+')
                {
                    pre=parseFloat(tokens[i-1]);
                    post=parseFloat(tokens[i+1]);
                    
                    let result=pre+post;
                    tokens.splice(i-1,3,result);
                    i-=2;
                }
            }
            for(let i=0;i<tokens.length;i++)
            {
                if(tokens[i]==='-')
                {
                    pre=parseFloat(tokens[i-1]);
                    post=parseFloat(tokens[i+1]);
                    
                    let result=pre-post;
                    tokens.splice(i-1,3,result);
                    i-=2;
                }
            }
            return tokens[0];
            
        }
//end of mathematical methods