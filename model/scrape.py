from bs4 import BeautifulSoup
import urllib.request
import json

def scrape(data):
    try:
        if len(data)==2:
            url = f'https://www.carwale.com/{data[0]}-cars/{data[1]}/'
            req = urllib.request.Request(url, headers={'User-Agent': 'Chrome/80.0.3987.149'})
            page = urllib.request.urlopen(req)
            html = page.read().decode("utf-8")
            soup = BeautifulSoup(html, "html.parser")

            carname = soup.find(class_='o-dOKno o-bNCMFw o-eqqVmt')
            img = soup.find(class_='o-bXKmQE o-cgkaRG o-cQfblS o-bNxxEB o-pGqQl o-wBtSi o-bwUciP o-btTZkL o-bfyaNx o-eAZqQI')
            verdict = soup.find(class_='o-bkmzIL o-cyHybq o-fyWCgU')
            price = soup.find(class_='o-Hyyko o-bPYcRG o-eqqVmt')
            variants = soup.find(class_='o-dJmcbh o-fzoHBq o-fzoHMc o-fznVqX o-fznVsN')
            specs = soup.find(class_='o-bfyaNx o-dJmcbh o-dKUdmM o-cpnuEd')
            features = soup.find(class_='o-bkmzIL o-fyWCgU o-cpNAVm o-fBkfen o-fznVqX')
            mileage = soup.find(class_='o-bCRRBE o-bfyaNx o-bTcQuC W3A1MZ undefined o-YCHtV')
            summary = soup.find(class_='o-bfyaNx o-bNxxEB o-bqHweY')

            data = {'carname':str(carname),'img':img['src'],'specs':str(specs),'price':str(price),'features':str(features),'mileage':str(mileage),'verdict':str(verdict),'variants':str(variants),'summary':str(summary)}
            return json.dumps(data)    
    except Exception as e:
        return str(e)

