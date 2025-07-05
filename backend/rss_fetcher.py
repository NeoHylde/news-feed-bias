import xml.etree.ElementTree as ET
import urllib.request
import json

#Script for fetching titles by rss_url
def fetch_rss_titles(rss_url, source):
    with urllib.request.urlopen(rss_url) as response:
        xml_data = response.read()

    root = ET.fromstring(xml_data)
    items = root.findall('.//item')

    data = []

    for item in items:
        title = item.find('title').text if item.find('title') is not None else ""
        link = item.find('link').text if item.find('link') is not None else ""
        pubDate = item.find('pubDate').text if item.find('pubDate') is not None else ""

        data.append({
            "title" : title,
            "link": link,
            "pubDate": pubDate,
            "source": source
        })
    


    with open(f"./sources/{source}.json", 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        

