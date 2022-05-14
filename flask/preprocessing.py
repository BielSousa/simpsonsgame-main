def Preprocessing(instancia):
    import nltk
    import re

    nltk.download('omw-1.4')
    nltk.download('stopwords')
    nltk.download('rslp')
    nltk.download('punkt')
    nltk.download('wordnet')
    def RemoveStopWords(instancia):
        stopwords = set(nltk.corpus.stopwords.words('english'))
        palavras = [i for i in instancia.split() if not i in stopwords]
        return (" ".join(palavras))
    def Stemming(instancia):
        stemmer = nltk.stem.RSLPStemmer()
        palavras = []
        for w in instancia.split():
            palavras.append(stemmer.stem(w))
        return (" ".join(palavras))
    def Limpeza_dados(instancia):
        instancia = re.sub(r"http\S+", "", instancia).lower().replace('.','').replace(';','').replace('-','').replace(':','').replace(')','')
        return (instancia)

    from nltk.stem import WordNetLemmatizer
    wordnet_lemmatizer = WordNetLemmatizer()

    def Lemmatization(instancia):
        palavras = []
        for w in instancia.split():
            palavras.append(wordnet_lemmatizer.lemmatize(w))
        return (" ".join(palavras))
  
    stemmer = nltk.stem.RSLPStemmer()
    instancia = re.sub(r"http\S+", "", instancia).lower().replace('.','').replace(';','').replace('-','').replace(':','').replace(')','')
    stopwords = set(nltk.corpus.stopwords.words('english'))
    palavras = [stemmer.stem(i) for i in instancia.split() if not i in stopwords]
    return (" ".join(palavras))