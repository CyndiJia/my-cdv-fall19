# 版权声明：本文为CSDN博主「姚贤贤」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。
# 原文链接：https://blog.csdn.net/u011311291/article/details/79269931


import jieba
import json

with open('dawn_comments.json') as json_file:
    word = json.load(json_file)


wlist = []

for i in range(int(word[0].get("days"))):
    wordObject = {}
    ww=""
    for j in range(len(word)):
        if word[j].get("days") == str(i) or word[j].get("days")== str(i)+" ":
            wordObject["daySince"]=word[j].get("days")
            ww = ww+word[j].get("content")
            # print(ww)
            wordObject["cloud"]= ww
    wlist.append(wordObject)

# print(wlist)


# print(word.get("days"))


# string = ''.join(map(str,wlist))
# print(string)

# print(storylist)




# text = "我去云南旅游，不仅去了玉龙雪山，还去丽江古城，很喜欢丽江古城"

def _word_ngrams(tokens, stop_words=None,ngram_range=(1,1)):
        """Turn tokens into a sequence of n-grams after stop words filtering"""
        # handle stop words
        if stop_words is not None:
            tokens = [w for w in tokens if w not in stop_words]


        # handle token n-grams
        min_n, max_n = ngram_range
        if max_n != 1:
            original_tokens = tokens
            tokens = []
            n_original_tokens = len(original_tokens)
            for n in range(min_n,min(max_n + 1, n_original_tokens + 1)):
                for i in range(n_original_tokens - n + 1):
                    tokens.append(" ".join(original_tokens[i: i + n]))

        return tokens

finalcloud=[]
for i in range(len(wlist)):
    preob = {}
    preob["daysfromRelease"]=wlist[i].get("daySince")
    print(wlist[i].get("daySince"))
    prep = wlist[i].get("cloud")
    # print(prep)
    cut = jieba.cut(str(prep))
    listcut = list(cut)
# print(listcut)
    n_gramWords = _word_ngrams(tokens = listcut,ngram_range=(1,1))
    preob["finalcloud"] = n_gramWords
    finalcloud.append(preob)

# print(finalcloud)

print('saving as json')
with open('dawn.json', 'w', encoding="utf-8") as f:
    json.dump(finalcloud, f, indent=4, ensure_ascii=False)
# for n_gramWord in n_gramWords:
    # print(n_gramWord)

# 版权声明：本文为CSDN博主「姚贤贤」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。
# 原文链接：https://blog.csdn.net/u011311291/article/details/79269931
