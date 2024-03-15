import spacy
from spacy.lang.en import stop_words as sw 
# from model.scrape import scrape
nlp = spacy.load('en_core_web_sm')
def preprocess(data):
    ent_collections = []
    locator = ["dealership","showroom","location","locate","directions","address","map","contact"]
    processed = False
    for tokens in nlp(data):
        if tokens.text in locator:
            ent_collections.append(tokens.text)
            for entity in nlp(data).ents:
                for ent in entity.text.split(): 
                    if ent not in sw.STOP_WORDS:
                        ent_collections.append(ent)
                        processed = True
        
    for entity in nlp(data).ents:
        for ent in entity.text.split(): 
            if ent not in sw.STOP_WORDS and ent not in ent_collections:
                ent_collections.append(ent)
            
    if "suzuki" in ent_collections:
        ent_collections.remove("suzuki")

    if "Suzuki" in ent_collections:
        ent_collections.remove("Suzuki")
        
    if not processed:
        if (len(ent_collections)%2)!=0:
            ent_collections.pop(len(ent_collections)-1)
    car_data = ent_collections
    return car_data