from sentence_transformers import SentenceTransformer, util

headline_1 = "Apple unveils new iPhone 16 at California event"
headline_2 = "Apple launches iPhone 16 during live keynote presentation"

#Semantic Similarity
model = SentenceTransformer('all-MiniLM-L6-v2')
embeddings = model.encode([headline_1, headline_2])
similarity = util.cos_sim(embeddings[0], embeddings[1])

print(f"Semantic Similarity: {similarity.item():.4f}")


#Structure, scrapes article headlines from different sources
#based on some thresh-hold sorts headlines  