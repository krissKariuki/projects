import json
import colorama
import urllib.request

C=colorama.Fore
w=C.WHITE
r=C.RED
g=C.GREEN
b=C.BLUE
y=C.YELLOW
cy=C.CYAN
mg=C.MAGENTA

crypto_path='../database/crypto.json'
data_path='../database/mozzart.json'
#live_path=json.loads(urllib.request.urlopen('http://13.246.196.224:5000/json').read())['crash_trade']

def compute(balance={'amount':5000,'stake':5},MULT=15) :
	with open(data_path,'r') as d_file :
		static_path=json.loads(d_file.read())
		
		length=0
		DATA=static_path[::-1][3600*7:3600*14]
		bal=balance['amount']
		stake=balance['stake']
		coef=0
		coefs=[]
		stakes=[]
		balances=[]
		dttms=[]
		
	for i in range(len(DATA)) :
			mult=DATA[i][0]
			dttm=DATA[i][1]
			if mult > MULT :
				coef+=(MULT*1)-stake
				bal+=(MULT*stake)-stake
				
			else :
				coef-=1
				bal-=stake
				
			stakes.append(round(stake,2))
			coefs.append(round(coef,2))
			balances.append(round(bal,2))
			dttms.append(dttm)
	
	min_balance=min(balances)
	max_balance=max(balances)
	
	print(f'{r}min : {min_balance}\n{g}max : {max_balance}\n{cy}current : {balances[len(balances)-1]}\n{y}length : {len(DATA)}{w}')
	
			
compute({'amount':5000,'stake':5},15)