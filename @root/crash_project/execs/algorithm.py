from colorama import Fore
import json

file=open('../files/input/data_1.txt','r')
array=file.read().split('x')[:-1]
data=[float(num) for num in array]

def methods(arr):
 return {
 'neutral':lambda:neutral_interest(arr),
 'profitCumulative':lambda:profit_cumulative_interest(arr)
 }
 
def method(method):
 return methods(data)[method]

roundsInfo={'neutral':[],'profitCumulative':[]}

neutral_=method('neutral')
profit_=method('profitCumulative')

stakeFactor=2.0
stakeAmount=10.00
stakeReserve=1000.00
cashOut=0.00
cashProfit=0.00
trialLimit=4
i=0

class roundInfo:
 def __init__(self,id,currentFactor,currentStake,cashout,profit,reserve):
  self.color=Fore.WHITE
  self.id=id
  self.state='null'
  self.defaultReserve=stakeReserve
  self.defaultStake=stakeAmount
  self.defaultFactor=stakeFactor
  self.currentFactor=currentFactor
  self.currentStake=currentStake
  self.cashout=cashout
  self.profit=profit
  self.reserve=reserve
  self.info()
  
 def info(self):
  global stakeFactor
  if self.currentFactor <= stakeFactor:
   self.state='fail'
   self.color=Fore.RED
  elif self.currentFactor > stakeFactor:
   self.state='pass'
   self.color=Fore.GREEN
   
  return {'id':self.id,'state':self.state,'defaultReserve':self.defaultReserve,'defaultFactor':self.defaultFactor,'currentFactor':self.currentFactor,
  'defaultStake':self.defaultStake,
  'currentStake':self.currentStake,
  'cashout':self.
  cashout,'profit':self.profit,'reserve':self.reserve}

def neutral_interest(arr):
 global stakeReserve,i
 for num in arr:
  i+=1
  if num > stakeFactor:
   cashOut=stakeFactor*stakeAmount
   cashProfit=cashOut-stakeAmount
   stakeReserve+=cashProfit
  
  elif num <= stakeFactor:
   cashOut=0.00
   cashProfit=0.00
   stakeReserve-=stakeAmount
   
  roundsInfo['neutral'].append(roundInfo(i,num,stakeAmount,
  cashOut,
  cashProfit,stakeReserve))
  
 return roundsInfo['neutral']

def profit_cumulative_interest(arr):
 global stakeReserve,stakeAmount,i
 for num in arr:
  i+=1
  if num > stakeFactor:

   cashOut=stakeFactor*stakeAmount
   cashProfit=cashOut-stakeAmount
   stakeReserve+=cashProfit
   stakeAmount*=2
   
  elif num <= stakeFactor:
   cashOut=0.00
   cashProfit=0.00
   stakeReserve-=stakeAmount
   stakeAmount=10
   
  roundsInfo['profitCumulative'].append(roundInfo(i,num,
  stakeAmount,cashOut,
  cashProfit,stakeReserve)) 
 return roundsInfo['profitCumulative']
 
def export_data(tact):
  global method
  meth=method(tact)
  meth()
  file=open('../files/output/data_1.json','w')
  jsonData=[]
  for obj in roundsInfo[tact]:
   jsonData.append(obj.info())
   
  neutralData=json.dumps(jsonData,indent=4)
  file.write(neutralData)
  file.close()
  
  with open('../files/output/data_1.json','r') as Data:
  	data=Data.read()
  	data=json.loads(data)
  	for obj in roundsInfo[tact]:
  		print(f"{Fore.YELLOW}{obj.id}     {Fore.WHITE}stake:{Fore.CYAN}{obj.currentStake}{Fore.WHITE}     BALANCE:{obj.color}{obj.reserve}{Fore.WHITE}")
 
#export_data('neutral')