function differentiate(expression)
{
    expression=expression.replace(/ /g,'');
  let termxp=/[+-]?\d*x\^\s?[+-]?\d*|[+-]?\d+x*|x/g;
    let tokenxp=/([+-]?)(\d*)(x*\^*)([+-]?)(\d*)/;
    let terms=expression.match(termxp);
    let termsArr=[];
    let Terms=[];
    
    class Term
{
    constructor(Sign,coef,variable,sign,pow)
    {
        this.Sign=Sign;
        this.coef=parseInt(coef);
        this.variable=variable;
        this.sign=sign;
        this.pow=parseInt(pow);
    }
    deriviate()
    {
        if(this.variable=='')
        {
            return '00';
        }
        else if(this.coef==0||this.pow==0)
        {
            return '00';
        }
        else
        {
        return this.Sign+parseInt(this.coef*parseInt(this.sign+this.pow))+this.variable+parseInt(this.sign+this.pow-1);
        }
    }
}
    function tokenize(terms)
    {
        for(let i=0;i<terms.length;i++)
        {
            termsArr.push(terms[i].match(tokenxp));
            Terms.push(new Term(termsArr[i][1]||'+',termsArr[i][2]||'1',termsArr[i][3]||'',termsArr[i][4]||'+',termsArr[i][5]||'1'));
        }
        return Terms;
    }
    function deriviate(tokens)
    {
        let ans=tokens[0].deriviate();
        for(let i=1;i<tokens.length;i++)
        {
            ans+=tokens[i].deriviate();
        }
        return ans;
    }
    function modifyOutput(output)
    {
        output=output.replace(/\+\-/g,'+').replace(/\-\-/g,'+').replace(/^\+/,'').replace(/[+-]?\b0x\^[+-]?\d*/g,'').replace(/x\^1/g,'x').replace(/x\^0/g,'').replace(/x0|\b[+-]?0/g,'');
        
        if(output.includes('x')){return output;}
        else{output=eval(output);return output;}
    }
    return modifyOutput(deriviate(tokenize(terms)));
}