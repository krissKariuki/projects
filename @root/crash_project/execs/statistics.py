import json
import algorithm as alg
factors=[]
rawFactors=[]
reserves=[]
factorAvg=0
factorTotal=0
timeTotal=0
timeAvg=0
stakeAmount=0
stakeFactor=0
defaultReserve=alg.stakeReserve
occurences=0
probability=0
def get_stats(file='../files/output/data_1.json'):
	global factors,total,average,factorTotal,timeTotal,timeAvg,occurences,probability,reserve
	with open(file,'r') as Data:
		Data=Data.read()
		data=json.loads(Data)
		#defaultReserve=3000
	for dataSet in data:
		reserves.append(dataSet['reserve'])
		stakeAmount=dataSet['defaultStake']
		stakeFactor=dataSet['defaultFactor']
		currentFactor=dataSet['currentFactor']
		rawFactors.append(currentFactor)
		Outlier=16
		outlier=16
		factors=[outlier if num >=Outlier else num for num in rawFactors]
		if dataSet['state'] =='pass':
			occurences=Data.count(dataSet['state'])
		
	for factor in factors:
		factorTotal+=factor
		timeTotal+=18*factor
	
	factorAvg=round(factorTotal/len(factors),2)
	timeAvg=round(timeTotal/len(factors),2)
	factorTotal=round(factorTotal,2)
	timeTotal=round(timeTotal,2)

	stats={
	'defaultStake':stakeAmount,
	'avgFactor':factorAvg,
	'defaultFactor':stakeFactor,
	'totalRounds':len(factors),
	'occurences':occurences,
	'probability':round(100*occurences/len(factors),2), 
	'avgTime':timeAvg,
	'totalFactors':factorTotal,
	'currentReserve':reserves[len(reserves)-1],
	'overallProfit':(reserves[len(reserves)-1])-defaultReserve}
	return stats
	
