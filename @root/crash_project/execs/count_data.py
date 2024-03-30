def count_(file='../files/input/raw_data_1.txt'):
	with open(file,'r') as rawData:
		listData=rawData.read().replace('\n','').split(',')
	return {'current':listData[len(listData)-1],'length':len(listData)}
	
print(count_())