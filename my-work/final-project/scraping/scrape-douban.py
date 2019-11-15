# import things up here
import requests
from bs4 import BeautifulSoup
import json
from pprint import pprint

# 1.get website as plain text string
results = []

pageId = 27613725
baseUrl = "https://music.douban.com/subject/"+str(pageId)+"/comments/"
pagingExt = "hot?p="

pageNumber = 1
while True:
    print("[+] Page Number:", pageNumber)
    url = baseUrl + pagingExt + str(pageNumber)
    print("- URL:", url)

    page = requests.get(url)
    # print(page.text)

    # Create a BeautifulSoup Object


    # 2. turn string into understandable html object
    soup = BeautifulSoup(page.text,'html.parser')
    # print(soup)
    # using the beautifulSoup4 package\

    # 3. find the info we want in the html, save it to a list or dict
    comment_list=soup.find(class_='comment-list')
    # print(comment_list)
    #
    comments = comment_list.select('.comment-content span')
    # pprint(comments)
    if len(comments) == 0:
        print("[-] No comments, breaking")
        break

    for comment in comments:
        # print(comment.contents[0])
        commentObject = {}
        commentObject["content"] = comment.contents[0]
        results.append(commentObject)

    # content = comments.find_all(class_="comment-content")
    # print(content)

    # print(len(results))
    print("- current result count:", len(results))
    pageNumber += 1
    print("------------------\n")
#
# pprint(results)
print("saving as json")
with open(str(27613725)+"_comments.json", "w", encoding="utf-8") as f:
    json.dump(results, f, indent=4, ensure_ascii=False)
#
#
#
# # 3. save list as json
