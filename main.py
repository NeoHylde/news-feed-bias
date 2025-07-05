import rss_fetcher
import topic_clustering
import json

def main():
    rss_fetcher.fetch_rss_titles("https://feeds.bbci.co.uk/news/rss.xml", "bbc")
    rss_fetcher.fetch_rss_titles("http://rss.cnn.com/rss/cnn_topstories.rss", "cnn")
    rss_fetcher.fetch_rss_titles("http://feeds.foxnews.com/foxnews/latest", "fox")
    rss_fetcher.fetch_rss_titles("https://www.pbs.org/newshour/feeds/rss/headlines", "pbs")
    rss_fetcher.fetch_rss_titles("https://www.theguardian.com/us/rss", "the-guardian")

    # Load all headlines from multiple sources
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
    
    topic_clustering.topic_clustering(data)


if __name__ == "__main__":
    main()
