from sentence_transformers import SentenceTransformer
from sklearn.cluster import DBSCAN
from sklearn.metrics.pairwise import cosine_distances
import json

def  topic_clustering(data):

    headlines = [item["title"]for item in data]

    model = SentenceTransformer('all-MiniLM-L6-v2')
    embeddings = model.encode(headlines)

    clustering = DBSCAN(eps=0.5, min_samples=2, metric='cosine').fit(embeddings)

    clustered = {}
    for i, label in enumerate(clustering.labels_):
        if label == -1: continue
        clustered.setdefault(label, []).append(data[i])

    filtered_clusters = {}
    for cluster_id, group in clustered.items():
        sources = {item["source"] for item in group}
        if len(sources) > 1:
            filtered_clusters[str(cluster_id)] = group

    return filtered_clusters