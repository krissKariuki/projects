import json
import pandas as pd

crypto='../db/in/crypto.json'
INPUT='../db/in/data_1.json'
OUTPUT='../db/out/output.json'

class Dataset :
	def __init__(self,token=2.0,period={'window':60,'emaw':10},file=INPUT) :
		
		with open(file,'r') as file_in ,open(crypto,'r') as cryptos:
			array=json.loads(file_in.read())[::-1]
			crypto_db=json.loads(cryptos.read())
		
		self.crypto=crypto_db['currency']
		self.tokens=crypto_db['tokens']
		self.token=token
		
		self.TOKEN= next((self.TOKEN for self.TOKEN,value in self.tokens.items() if value["flop"] == token),None)
		
		if self.TOKEN is None :
			self.TOKEN={'name':'randcoin','alias':'RC','flop':self.token}
		else :self.TOKEN=self.tokens[self.TOKEN]
		
		self.array=array
		self.period=period['window']
		self.emaw=period['emaw']
		self.frame=int(self.period*60/27)
		self.total=0
		self.avg=0
		
		self.frames=[]
		self.mults=[]
		self.dttms=[]
		self.coefs=[]
		

		self.dataset={
		'token':self.TOKEN,
		'window':{'vizw':{'period':self.period,'span':self.frame},'emaw':{'period':self.emaw,'span':int(self.emaw*60/27)}},
		'datapoints':[]
		}
		
		self.ATTACH()
		
		self.emas={
		'semas':{
		'mults':self.EMA('mults'),
		'coefs':self.EMA('coefs')
		},
		'lemas':{
		'mults':self.EMA('mults',False),
		'coefs':self.EMA('coefs',False)
		}
		}
		self.derivs={
		'vels':{
		'mults':self.DERIV('mults'),
		'coefs':self.DERIV('coefs')
		},
		'accs':{
		'mults':self.DERIV('mults',True),
		'coefs':self.DERIV('coefs',True)
		}
		}		

		self.POPULOUS()
		
	class Datapoint :
					def __init__(self,round,dttm='',mult={'vel':0,'acc':0,'nema':1.00,'sema':0.00,'lema':0.00},coef={'vel':0,'acc':0,'nema':0.00,'sema':0.00,'lema':0.00}) :
						self.round=round
						self.mult=mult
						self.coef=coef
						self.dttm=dttm
						self.data=self.output()
						
					def output (self) :
						return {'round':self.round,'dttm':self.dttm,'mult':self.mult,'coef':self.coef}


	def ATTACH (self) :
			coef=0
			stake=1
			
			for i in range(len(self.array)) :
				num=self.array[i][0]
				time=self.array[i][1]
				
				if num > self.token :
					coef+=(self.token*stake)-stake
					
				elif num<= self.token :
					coef-=stake
					
				self.mults.append(num)
				self.dttms.append(time)
				self.coefs.append(round(coef,2))
				
				
	def EMA (self,key='coefs',ißhort=True) :
			switch={
			'mults':[self.token if num > self.token else num for num in self.mults],
			'coefs':self.coefs
			}
			F=self.emaw if ißhort else self.emaw*2
			array=[]
			smoothing=2/(F+1)
			array.append(switch[key][0])
			
			for i in range(1,len(switch[key])) :
				ema=(switch[key][i]-array[-1])*smoothing+array[-1]
				array.append(round(ema,2))
			
			return array
			
	def DERIV(self,key='coefs',acc=False) :
		switch={
		'mults':self.emas['semas'][key],
		'coefs':self.emas['semas'][key]
		}
		arr=pd.DataFrame(switch[key])
		velocities=round(arr.diff(),2).fillna(0)
		accelerations=round(velocities.diff(),2).fillna(0)
		array=velocities if not acc else accelerations
		output=array.values.flatten().tolist()
		
		return output
								
	def POPULOUS (self) :
				for i in range(len(self.array)) :
					self.dataset['datapoints'].append(self.Datapoint(i+1,self.dttms[i],{'vel':self.derivs['vels']['mults'][i],'acc':self.derivs['accs']['mults'][i],'nema':self.mults[i],'sema':self.emas['semas']['mults'][i],'lema':self.emas['lemas']['mults'][i]},{'vel':self.derivs['vels']['coefs'][i],'acc':self.derivs['accs']['coefs'][i],'nema':self.coefs[i],'sema':self.emas['semas']['coefs'][i],'lema':self.emas['lemas']['coefs'][i]}).data)

	
	def ACTIVE (self) :
				active_window=len(self.array)-self.frame
				return {'token':self.TOKEN,'window':self.dataset['window'],'datapoints':self.dataset['datapoints'][active_window : ]}
				
				
	def IO (self,recent=True,file=OUTPUT) :
			batch=self.ACTIVE() if recent else self.dataset		
			data=json.dumps(batch,indent=0,separators=(',',':'))
			with open(file,'w') as output :
				output.write(data)
	
data=Dataset(2.5,{'window':60,'emaw':10})
data.IO()