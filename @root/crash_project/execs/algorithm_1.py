import statistics as stats

roundHistory=open('../files/input/data_1.txt','r')
rH=roundHistory.read().replace('\n','').replace(' ','').split('x')[:-1]

stakeFactor=2.00
stakeAmount=10
stakeReserve=100
cashOut=0
trial=0
trialLimit=4
stakePass,stakeFail=[],[]

for factor in rH:
   fcr=float(factor)
   
   if fcr > stakeFactor:
    stakePass.append(fcr)
    if trial >= trialLimit : trial=0
    trial+=1
    cashOut=(stakeAmount*stakeFactor) - stakeAmount
    stakeReserve+=cashOut 
    
   elif fcr <= stakeFactor:
    stakeFail.append(fcr)
    trial=0
    cashOut -= stakeAmount
    stakeReserve+=cashOut 
    
obj=stats.get_stats()
for value in stats.get_stats():
	print(value,' : ',obj[value])

