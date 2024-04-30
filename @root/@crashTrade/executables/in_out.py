import json
import stats_module as stats

def i_o(multiplier=15,time=60) :
	multipliers=[]
	datetimes=[]
	ARR=[]
	EMA=[]
	with open('../database/in/dataset.json','r') as fileIn ,open ('../database/out/data_out.json','w') as fileOut :
		dataIn=json.loads(fileIn.read())
		
		for arr in dataIn :
			multipliers.append(arr[0])
			datetimes.append(arr[1])
			
		factors=stats.array(multipliers,multiplier)._dataOut_(False)['factors'][::-1]
		
		sma=stats.array(factors)._EMA_(time)
		
		for i in range(len(multipliers)) :
			ARR.append([factors[i],datetimes[i]])
			
		for i in range(len(sma)) :
			EMA.append([sma[i],datetimes[i]])
			
		fileOut.write(json.dumps(EMA))
	
	return ARR
i_o()
		