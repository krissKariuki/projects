import json

class array :
	def __init__(self,arr,multiplier=2,stake=1) :
		self.multiplier=float(multiplier)
		self.arr=arr
		self.state=''
		self.stake=stake
		self.factor=0
		self.total=0
		self.avg=0
		
		self.states=[]
		self.factors=[]
		self.output_array=[]
		self.output_object={
		'multipliers':[],
		'states':[],
		'factors':[]
		}
		self.windows=[]
		self.arr_SMA=[]
		self.arr_EMA=[]
		
	def _dataIn_(self) :
		return self.arr
		
	def _total_(self) :
		for n in self.arr :
			self.total+=n
		return round(self.total,2)
		
	def _avg_(self) :
		self._total_()
		self.avg=self.total/len(self.arr)
		return round(self.avg,2)
		
	def _dataOut_(self,isArray=True) :
		self.isArray=isArray
		for num in self.arr :
			if num > self.multiplier :
				self.state='pass'
				self.factor+=(self.multiplier*self.stake)-self.stake
				
			elif num <= self.multiplier :
					self.state='fail'
					self.factor-=self.stake
					
			self.states.append(self.state)
			self.factors.append(self.factor)
			
			self.output_array.append({'multiplier':num,'state':self.state,'factor':self.factor})
			self.output_object['multipliers'].append(num)
			self.output_object['states'].append(self.state)
			self.output_object['factors'].append(self.factor)
			
		output=self.output_array if isArray else self.output_object
		
		return output
	def _range_(self,time=60) :
		constant=27
		c=constant
		t=time
		r=round((t*60)/c)
		
		return r
		
	def _windows_(self,size=1) :
		
		def _frame_(frame=size,size=size) :
			m,n=[0,0]
			window=[0,size]
			window=[frame* _ for _ in window]
			window[0]=window[1]-size
			
			for i in range(1,frame+1) :
				n=m+size
				window=[m,n]
				m=n+1
				
			return window
			
		for i in range(int(len(self.arr)/size)) :
			frame=_frame_(i+1,size-1)
			_window=self.arr[frame[0]:frame[1]+1] 
			self.windows.append(_window)
			
		return self.windows
		
	def _SMA_(self,time=1) :
		size=self._range_(time)
		
		for i in range(len(self.arr)-size+1) :
			window=self.arr[i:i+size]
			sma=sum(window)/size
			self.arr_SMA.append(round(sma,2))
			
		return self.arr_SMA
		
	def _EMA_(self,time=1) :
		size=self._range_(time)
		factor=2/(size+1)
		self.arr_EMA.append(self.arr[0])
		for i in range(1,len(self.arr)) :
			ema=(self.arr[i]-self.arr_EMA[-1])*factor+self.arr_EMA[-1]
			self.arr_EMA.append(round(ema,2))
		
		return self.arr_EMA