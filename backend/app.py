import rss_fetcher
import topic_clustering
import json
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


def fetch_all_feeds():
    sources = {
        "bbc": "https://feeds.bbci.co.uk/news/rss.xml",
        "cnn": "http://rss.cnn.com/rss/cnn_topstories.rss",
        "fox": "http://feeds.foxnews.com/foxnews/latest",
        "pbs": "https://www.pbs.org/newshour/feeds/rss/headlines",
        "the-guardian": "https://www.theguardian.com/us/rss"
    }

    for name, url in sources.items():
        rss_fetcher.fetch_rss_titles(url, name)

def load_headlines():
    data = []
    for src in ["bbc", "cnn", "fox","pbs","the-guardian"]:
        with open(f"./sources/{src}.json", "r", encoding="utf-8") as f:
            for item in json.load(f):
                data.append({
                    "source": src,
                    "title": item["title"],
                    "link": item["link"],
                    "pubDate": item["pubDate"]
                })
    return data


@app.route("/api/clusters")
def get_clusters():
    fetch_all_feeds()
    headlines = load_headlines()
    clusters = topic_clustering.topic_clustering(headlines)
    return jsonify(clusters)

    
