import matplotlib.pyplot as plt
import numpy as np

file=open('../files/input/data_1.txt','r')
array=file.read().replace('\n','').replace(' ','').split('x')[:-1]
for num in array:
 num=float(num)
 if num >=10.00:
  num=2.5
arr=np.append([],array) 
stakeReserve=1000
stakeFactor=1.20
defaultFactor=2.00
stakeAmount=10
defaultAmount=stakeReserve/50
passFactors=[]
failedFactors=[]
round=0
X=[]
x=[]
y=arr
for num in arr:
 num=float(num)
 round+=1
 X.append(round)
 x=np.append([],X)
 y=np.append([],arr)

y=sorted(map(float,array))
plt.plot(x,y,arr)
plt.grid()
plt.show()