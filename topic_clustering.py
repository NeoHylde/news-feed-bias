from sentence_transformers import SentenceTransformer
from sklearn.cluster import DBSCAN
from sklearn.metrics.pairwise import cosine_distances
import json

def  topic_clustering(data):

    headlines = [item["title"]for item in data]

    model = SentenceTransformer('all-MiniLM-L6-v2')
    embeddings = model.encode(headlines)

    clustering = DBSCAN(eps=0.6, min_samples=2, metric='cosine').fit(embeddings)

    clustered = {}
    for i, label in enumerate(clustering.labels_):
        if label == -1: continue
        clustered.setdefault(label, []).append(data[i])

    for cluster_id, group in clustered.items():
        sources = {item["source"] for item in group}
        if len(sources) > 1:
            print(f"\n🔹 Cluster {cluster_id} ({len(group)} headlines):")
            for item in group:
                print(f" - ({item['source']}) {item['title']}")