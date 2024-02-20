        
        let i=0;
        
        let mainUiText=['send money','withdraw cash','buy airtime','loans and savings','lipa na m-PESA','my account'];
        while(i<6)
        {
            newElement($('#main-ui'),'div',`main_${i}`,'main-component');
            newElement($(`#main_${i}`),'p',`mainTxt_${i}`,'mainTxt');
            $(`#mainTxt_${i}`).innerText=mainUiText[i]
            i++;
        }
        
        toggleItems($('#main-ui'),$('#send-pg'));
       
       $('#main_0').addEventListener('click',exeSend);
       
       function exeSend()
       {
           toggleItems($('#send-pg'),$('#main-ui'),$('#enter-amt'),$('#enter-pin'),$('#popup-bg'));
           displayState('hidden',$('#saf-label'));
           $('#ui-header').style.boxShadow='none';
           $('#tel').focus();
           $('#tel').addEventListener('input',(e)=>{
           if(e.target.value.length>9)
           {
               $('#tel-ok').style.color='white';
               $('#tel-ok').style.background='teal';
           }
           else
           {
               $('#tel-ok').style.color='#909090';
               $('#tel-ok').style.background='rgba(0,0,0,0.1)';
           }


           });
           $('#amt').addEventListener('input',(e)=>{
               if(e.target.value!=='')
               {
               $('#amt-ok').style.color='white';
               $('#amt-ok').style.background='teal';
               }
               else
               {
               $('#amt-ok').style.color='#909090';
               $('#amt-ok').style.background='rgba(0,0,0,0.1)';
               }
           });
           $('#tel-ok').addEventListener('click',(e)=>{
           if($('#tel').value.length<10)
           {
               return
           }
           else
           {
        toggleItems($('#enter-amt'),$('#enter-tel'),$('#enter-pin'),$('#popup-bg'));
        $('#amt').focus();
           }

           });
           $('#amt-ok').addEventListener('click',(e)=>{
           if($('#amt').value.length<1)
           {
               return
           }
           else
           {
        toggleItems($('#enter-pin'),$('#enter-tel'),$('#enter-amt'),$('#popup-bg'));
        $('#pin').focus();
           }

           });
           $('#pin').addEventListener('input',(e)=>{
               if(e.target.value!=='')
               {
               $('#pin-ok').style.color='white';
               $('#pin-ok').style.background='teal';
               let chars=[];
               let pasd=[];
               pasd.push(e.target.value);
               pasd=pasd.join('');
               for(let i=0;i<e.target.value.length;i++)
               {
                   chars.push('*')
               }
               chars=chars.join('');
               e.target.value=chars;
               }
               else
               {
               $('#pin-ok').style.color='#909090';
               $('#pin-ok').style.background='rgba(0,0,0,0.1)';
               }
           });
               $('#pin-ok').addEventListener('click',()=>{
        hideItems($('#enter-tel'),$('#enter-amt'));
        setTimeout(function(){blockItems($('#popup-bg'))},1000);
        $('#send-details').innerText=`Send Money to ${$('#tel').value} KSH${$('#amt').value}`;
        $('#pin').focus();
        
        $('#ok-tct').onclick=()=>{
            $('#send-state').innerText='Sent';
            $('#send-details').innerText='Wait for M-PESA to reply';
        $('#ok-tct').onclick=()=>{
            hideItems($('#popup-bg'));
            setTimeout(
                function(){
            let sendValue=prompt(`JEFFERY KARIUKI will receive KSH${$('#amt').value}.Cost KSH 0.00.To continue reply with 1.To STOP,reply with 2\n1.Yes\n2.No`,'1');
            if(sendValue!==null)
            {
                document.location.href='http://localhost:26543/storage/emulated/0/%40_main/files/cloneMsg_1.html';
            }
            else
            {
                return;
            }
                },1000);
        }

        }
               })

       }