    'use strict'
    
    let balance=0
    let total_investment=0
    const reserve=1000
    let stake=0.005*reserve
    const balances=[]
    const changes=[]
    let active_tokens=['duocent','tripgem','pentime','teendime','duodeca','quartile','fourve']

        
    const tabs=['.tab-home','.tab-trade','.tab-wallet','.tab-market','.tab-account']
    const pages=['.pg-home','.pg-trade','.pg-wallet','.pg-market','.pg-account']

    const acc_tabs=['.acc-details','.acc-security','.acc-verification','.acc-notifications']
    const acc_pages=['.acc-pg-details','.acc-pg-security','.acc-pg-verification','.acc-pg-notifications']
    
    const market_tabs=['.market-header-tokens','.market-header-performance']
    const market_pages=['.market-pg-tokens','.market-pg-performance']


    
function render_tokens(n=3,content=false)
{
    if(content==false)
    {
    for(let i=0;i<n;i++)
    {
        create_element('.tokens-ls','div',`token${i}`,'token-pkg',
        `<p class='token-name'>token name</p>
        <p class='token-alias'>TN</p>
        <p class='token-flop'>1.23</p>
        <p class='currency-rate'>
        <span class='currency'>kes</span>
        <span class='balance token-bal'>100.00</span>
        </p>`
        )
    }
    }
    else
    {
        for(let i=0;i<n;i++)
        {
        create_element('.tokens-ls','div','','no-token-data')
        }
    }
}

function render_tokens_info(n=3,content=false)
{
    if(content==false)
    {
    for(let i=0;i<n;i++)
    {
        create_element('.market-pg-tokens','div',`tokens-pg-info${i}`,'tokens-pg-info',
        `<div class='tokens-info-pkg'>
        <span class='tokens-info-alias'>DD</span>/
        <span class='tokens-info-flop'>2.00</span>
        <br>
        <span class='tokens-info-name'>duodeca</span>
        </div>
        <h4 class='currency-rate tokens-pg-price'>
        <span class='tokens-pg-curr currency'>kes</span>
        <span class='tokens-pg-bal balance'>0.00</span>
        </h4>
        <h4 class='tokens-pg-coef'>1000.00</h4>
        <h4 class='tokens-pg-change'>+3.14%</h4>
`
        )
    }
    }
    else
    {
        for(let i=0;i<n;i++)
        {
        create_element('.market-pg-tokens','div','','no-tokens-info-data')
        }
    }
}


fetch('../static/database/crypto.json')
.then(res=>res.json())
.then(data=>
{
    const tokens=Object.values(data.tokens)
    total_investment=reserve*(active_tokens.length)

    render_tokens(active_tokens.length);
    render_tokens_info(tokens.length);
    

    const token_elements=[...$$('.token-pkg')]
    const token_info_elements=[...$$('.tokens-pg-info')]
    const colors=['rgba(0,200,100,0.5)','rgba(250,100,100,0.5)']

    
    token_elements.forEach((token,i)=>
    {
       const name=token.querySelector('.token-name')
       const alias=token.querySelector('.token-alias')
       const flop=token.querySelector('.token-flop')
       const bal=token.querySelector('.token-bal')

        name.innerText=data.tokens[active_tokens[i]].name
        alias.innerText=data.tokens[active_tokens[i]].alias
        flop.innerText=`${data.tokens[active_tokens[i]].flop}.00`
        bal.innerText=parseFloat(random_number(100,2000)).toLocaleString('en-us')
        
        balances.push(parseFloat(bal.innerText.replace(/,/g,'')))
        balance=balances.reduce((acc,curr)=>acc+curr)
        $('#ovr-bal').innerText=balance.toLocaleString('en-us')


        token.style.backgroundImage=`linear-gradient(225deg,${random_color('rgb',0.5)},${random_color('rgb',0)})`
        alias.style.backgroundImage=`linear-gradient(50deg,${random_color('w',0.8)}10%,${random_color('b',0)})`
        
    })
    
    let n=0
    token_info_elements.forEach((element,i)=>
    {
        const token_info=element.querySelector('.tokens-info-pkg')
        const alias=element.querySelector('.tokens-info-alias')
        const flop=element.querySelector('.tokens-info-flop')
        const name=element.querySelector('.tokens-info-name')
        const change=element.querySelector('.tokens-pg-change')
        const PRICE=element.querySelector('.tokens-pg-price')
        const price=element.querySelector('.tokens-pg-bal')
        const coef=element.querySelector('.tokens-pg-coef')

        alias.innerText=tokens[i].alias
        flop.innerText=`${tokens[i].flop}.00`
        name.innerText=tokens[i].name
        
        
        if(active_tokens.includes(name.innerText))
        {
            const current_price=parseFloat(token_elements[n].querySelector('.token-bal').innerText.replace(/,/g,''))
            const perc=parseFloat((current_price-reserve)/100)
            const x=parseFloat((current_price-reserve)/flop.innerText).toFixed(2)
            
            coef.innerText=`${x}x`
            price.innerText=current_price.toLocaleString('en-us')
            change.innerText=parseFloat(perc)<=0?`${perc}%`:`+${perc}%`
            const change_color=parseFloat(perc)>=0?colors[0]:colors[1]
            
            element.style.color='var(--accent)'
            change.style.background=change_color
            
            //coefs.push(parseFloat(x))
            changes.push(parseFloat(perc))

            n+=1
        }
        else
        {
            coef.innerText='_'
            price.innerText='0.00'
            change.innerText='_'
            element.style.color='#aaa'
            change.style.background='#eee'
        }
    })
    const performance_label=$('.performance-pg-lbl')
    const performance_info=$('.performance-pg-info')
    const performance_investment=$('.performance-pg-inv')

    const performance_balance=$('.performance-pg-bal')
    const performance_coef=$('.performance-pg-coef')
    const performance_change=$('.performance-pg-change')
    
    //const sum_coefs=coefs.reduce((acc,curr)=>acc+curr).toFixed(2)
    const sum_coefs=(balance-total_investment)/stake
    const sum_changes=changes.reduce((acc,curr)=>acc+curr).toFixed(2)
    const change_color=sum_changes>=0?colors[0]:colors[1]
    performance_investment.innerText=total_investment.toLocaleString('en-us')
    performance_balance.innerText=balance.toLocaleString('en-us')
    
    performance_coef.innerText=`${sum_coefs}x`
    performance_change.innerText=sum_changes<=0?`${sum_changes}%`:`+${sum_changes}%`
    
    performance_change.style.background=change_color
    
    update_currency(2000)
    .then(data=>
    {
        const rate=data.conversion_rates.KES
        localStorage.setItem('rate',rate)
        
        $('#swap-currency').addEventListener('click',()=>swap_currency(rate))
    })
    .catch(error=>
    {
        $('#swap-currency').addEventListener('click',()=>swap_currency(130||localStorage.getItem('rate')))
    })
})
.catch(err=>
{
    render_tokens(3,true)
    render_tokens_info(10,true)
    $('#ovr-bal').innerText='0.00'
})
    
    
    toggle_self('.bool','active-switch')
    toggle_class('.tab','active-tab')
    toggle_class('.acc-nav','active-acc-nav')
    toggle_class('.market-header-option','active-market-option')
    
    toggle_others('#hide-balance','.balance','hide-text')
    toggle_others('#hide-balance','.currency','hide-text')
    
    tabs.forEach((tab,i)=>
    {
        $(tab).onclick=()=>toggle_display(pages[i],'.page')
    })
    
    acc_tabs.forEach((tab,i)=>
    {
    $(tab).onclick=()=>{toggle_display(acc_pages[i],'.acc-page')}
    })
 
    market_tabs.forEach((tab,i)=>
    {
    $(tab).onclick=()=>{toggle_display(market_pages[i],'.market-page')}
    })
 
    
    $('.tab-market').click()
    $('.acc-details').click()
    $('#market-performance').click()

    $('.tab-account').addEventListener('click',()=>$('.acc-details').click())
    $('.tab-market').addEventListener('click',()=>$('#market-tokens').click())