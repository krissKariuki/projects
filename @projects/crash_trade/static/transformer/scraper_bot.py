from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import StaleElementReferenceException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from datetime import datetime
import time
import pytz
import os
import json

webUrl='https://www.mozzartbet.co.ke/en#/'
chrome_options=Options()
arguments=['--headless','--no-sandbox','--disable-dev-shm-usage']
for arg in arguments : chrome_options.add_argument(arg)
driver=webdriver.Chrome(options=chrome_options)
driver.get(webUrl)

iter=0
staleElementIter=0
timezone=pytz.timezone('Africa/Nairobi')

multiplier=0
timestamp=''
datapoints=[]

def delay_event(attr='xpath',value='',getMethod='click',triggerClick=False,timeOut=30) :
    methods={'id':By.ID,'class':By.CLASS_NAME,'xpath':By.XPATH}
    getBy={'locate':EC.presence_of_element_located((methods[attr],value)),'click':EC.element_to_be_clickable((methods[attr],value))}
    result=WebDriverWait(driver,timeOut).until(getBy[getMethod]).click() if triggerClick else WebDriverWait(driver,timeOut).until(getBy[getMethod])
    return result

def init_game(tel='0113294793',password='Chri570ph3r.'):
    print(f'navigating to {webUrl}\nsuccess\n')
    print('attempting to log in...')

    delay_event('class','login-link','click',True)
    driver.find_element(By.XPATH,'//*[@placeholder="Mobile number"]').send_keys(tel)
    driver.find_element(By.XPATH,'//*[@placeholder="Password"]').send_keys(password)
    delay_event('class','login-button','click',True)
    print('success\n\nopening game...')
    time.sleep(1)
    delay_event('xpath','//*[@alt="Aviator"]','click',True)
    print('success\n\ndata :')
    return True

init_game()

def data_server():
    try :
        multipliersBlock=delay_event('class','payouts-block','locate')
        multipliersBlockContent=delay_event('class','payouts-block','locate').text
        multiplierElements=multipliersBlock.find_elements(By.CLASS_NAME,'bubble-multiplier')

        if driver.find_element(By.CLASS_NAME,'payouts-block').text!=multipliersBlockContent :

            multiplier=float(multipliersBlock.find_elements(By.CLASS_NAME,'bubble-multiplier')[0].text.replace('x',''))
            timestamp=datetime.now(timezone).strftime('%H:%M:%S %d-%m-%Y')

            datapoints.append([multiplier,timestamp])

            with open('RawData.json','w') as rawDataFile:
                json.dump(datapoints,rawDataFile,separators=(',',':'))
            print([multiplier,timestamp])

    except (StaleElementReferenceException,NoSuchWindowExceptioj,ValueError):
        init_game()
    except webDriverException as e:
        if 'session deleted because of page crash' in str(e):init_game()
        else :raise

while True:
 data_server()
