from colorama import Fore

rawFile='../files/input/raw_data.txt'
currentFile='../files/input/data_1.txt'
dataList=open(currentFile,'r').read().split('x')[:-1]
dataLength=len(dataList)

def modify_data(rawData=rawFile,currentData=currentFile):
    uploadSuccess='data added successfully!'
    uploadExists='data already exists!'

    with open(rawData,'r') as raw:
        rawFile=raw.read().replace('\n','').replace(' ','').replace('X','x').replace('xx','x')
        
    with open(currentData,'a+') as currentFile:
        currentFile.seek(0)
        
        if rawFile not in currentFile.read():
            currentFile.seek(0,2)
            currentFile.write(rawFile)
            print(dataList,'\n',dataLength)            
            print(Fore.GREEN,uploadSuccess,Fore.WHITE)

        else :
             print(dataList,'\n',dataLength)             
             print(Fore.RED,uploadExists,Fore.WHITE)

  
modify_data()