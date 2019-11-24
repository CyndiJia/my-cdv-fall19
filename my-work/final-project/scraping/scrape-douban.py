# import things up here
import requests
from bs4 import BeautifulSoup
import json
from pprint import pprint
from datetime import datetime
import time

# 1.get website as plain text string
results = []

pageId = 34802041
baseUrl = "https://music.douban.com/subject/"+str(pageId)+"/comments/"
pagingExt = "new?p="

pageNumber = 1
errorcount = 0
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
    if comment_list == None:
        print('hi, sleeping for 1')
        time.sleep(1)
        errorcount+=1
        if errorcount > 10:
            break
        continue
    else:
        errorcount = 0
        commentItems = comment_list.select('.comment')


        if len(commentItems) == 0:
            print("[-] No comments, breaking")
            break
            # print(commentItems[0])

        for comment in commentItems:
            # print(comment)
            # print(comment.select('.comment-info span')[0])
            conSpan = comment.select('.comment-content span')

            if len(conSpan[0].contents)!=0:
                content = conSpan[0].contents[0]
            else:
                content = ''
            infoSpan = comment.select('.comment-info span')

            date_format = "%Y-%m-%d"
            date1 = datetime.strptime("2019-8-24",date_format)

            if len(infoSpan) > 1:
                rating = comment.select('.comment-info span')[0]['class'][1][-2:-1]
                # print(rating)
                dateraw = comment.select('.comment-info span')[1].contents[0]
                dateori = datetime.strptime(dateraw,date_format)
                numbetween = dateori - date1
                if str(numbetween)[0] == '0':
                    numofdays = 0
                else:
                    numofdays = str(numbetween)[:2]
            else:
                rating = ''
                dateraw = comment.select('.comment-info span')[0].contents[0]
                dateori = datetime.strptime(dateraw,date_format)
                numofdays = dateori - date1



            commentObject={}
            commentObject['content']=content
            commentObject['days']=str(numofdays)
            commentObject['rawdate']=dateraw
            commentObject['rating']=rating
            results.append(commentObject)



        # print(content,"|", rating,"|", date)
        # print("_--------")

        # break
    # content = comments.find_all(class_="comment-content")
    # print(content)

    # print(len(results))
    # print("- current result count:", len(results))
    pageNumber += 1
    # print("------------------\n")
    # break
#
# pprint(results)


# 4. save list as json

print("saving as json")
with open(str(34802041)+"_comments_"+str(pageNumber)+".json", "w", encoding="utf-8") as f:
    json.dump(results, f, indent=4, ensure_ascii=False)
