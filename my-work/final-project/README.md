# What happened after they were released?

## Introduction

This project explores the stories of four popular Chinese songs after they were released, which are <span style="font-weight:bold">"The Story of Us" by JJ Lin</span>, <span style="font-weight:bold">"Won't Cry" by Jay Chou</span>,<span style="font-weight:bold">"Dawn" by Kris Wu</span>, and <span style="font-weight:bold" >"The Rivals" by Evan Lin</span>.I collected the data and studied the performance of these four songs on two Chinese mainstream music/online discussion platforms, <span style="color: #69b3a2">"QQ Music"</span> and <span style="color:#b3697a">"Douban"</span>.</p>

<p align="center">
  <img width="460" src="qq.jpg" />
</p>

<span style="color: #69b3a2">QQ Music</span> is one of the biggest online music platforms in China.
With the prevalence of digital music and rising awareness of music copyright, many songs in
current music market are not for free - users need to buy the songs on QQ music
to listen to them. QQ music have different <span style="color: #69b3a2">awards</span> for a song
according to the <span style="color: #69b3a2">sales amount</span>.
In this project, I collected the <span style="color: #69b3a2">progress achievements</span> of the four songs and analyzed the data
according to the timelines.</p>

<p align="center">
  <img width="460" src="douban.png" />
</p>

<span style="color:#b3697a">Douban</span> is one of the biggest online communities in China. People like to share their views
toward music, films, social phenomenons...etc. Douban Music is particularly for <span style="color:#b3697a">online discussions</span> of different
songs. Users are able to rate the music (from 1 point to 5 point), and write comments under certain music source.
In this project, i collected the <span style="color:#b3697a">rating distribution</span> of the four songs, as well as
<span style="color:#b3697a">the number of comments</span> and <span style="color:#b3697a">
content</span> in the comments to show users' views toward the four songs.

## Home Page

  <img src="home.gif" />

The home page is a collection of the introduction of all four songs. When the user hovers on the images, introduction of that song shows up. The div box at the bottom left is a brief introduction of the song, and the one at the bottom left is an introduction of the singer's background & awards. The user can also listen to the songs by clicking the play/pause button.

Clicking on the images will redirect to the progress achievement page of each song, which is the start of that song's data story. The user can also click the "intro" button to get back to the introduction page.

## Progress of Achievements on QQ Music

<img src="progress.gif" />

This is a scrolling page showing the progress of achievements of the song on QQ Music. QQ Music gives different awards to a digital song according to the sales amount. For instance, if a song's sales amount reaches 250,000 rmb, it will be identified as a "Golden Album" on QQ Music. I collected the data which tracks the sales amount, the award title given by QQ Music, also the fans/fan groups who contributed the most to the sales amount according to the timeline (from the release of the song to the last achievement it made on QQ Music). When the user scrolls the page, the line chart gets updated with the description.

When I was making this animated line chart, I had many difficulties dealing with the scaling. Initially I had all the points and lines set up, but they weren't updating their positions correctly. I added the remove and exit, also restructured my dataset a bit, and finally the updating part worked, but then all the dates were clustered together. After asking for help, I filtered the date being shown on the page and it looked much better,

## Rating Distribution on Douban

<img src="rate.gif" />

This graph is a bar chart reflecting the rating distribution of the song on "Douban". "Douban" is one of the most popular online discussing platforms in China, and people like to rate and share their views on songs and even publish short/long articles. The opacity of the bars are also scaled according to the numbers. When the user hovers on the bars, a tooltip will appear with the ratio and number of that rating.

## Number of Comments on Douban & Wordcloud formed by the content of comments

<img src="comment.gif" />

This graph shows the number of comments the song received each day. Represented by hexbins, the more comments the song received on that day, the darker the color is. When the user hovers on the hexbins, the color changes and the size gets larger. Most importantly, a wordcloud will appear showing the content of people's comments on that day. The wordcloud reflects the same/different perspectives of people all over China on one same song.

I went through many struggles developing this part. I need to get the numbers of comments the song received each day, but I don't have the source of comments, so I had to scrape them from internet. After asking for help, I learned to use python to scrape and got all the information of comments and ratings. Then I made a new array and restructure everything. I created an array with only the comments, ratings and dates, and export the data as json files. I created another array to calculate the dates and number of comments received on that day.

The d3 wordcloud is also very tricky, because it only takes an array of well-prepared keywords for the wordcloud instead of generating it from raw comments. So I had to transform them into arrays with keywords, then use d3 to draw the graph, but at that time I didn't know how the wordcloud algorithm work. After googling for a while I finally got the method to do a Chinese n-gram, which could be a potential source of wordcloud arrays. After the graph is made, to position the graph at matching hexbin, I also restructured the data passed into the drawwordcloud function with the help of Leon and finally got everything working.

## Reflection
I chose the singers on purpose, because two of them are famous independent singers & composers, and the other two were initially in an idol group and more of idols rather than artists. After completing this project, I really found something interesting for all four songs, especially when comparing all their data together. I switched my dataset in the middle of this project, and thanks Leon for giving me the chance to let me choose what I am really passionate about instead of random cold data. The debugging process is always struggling, but I'm very happy to see that my effort finally paid off and this project turned out to be what I expected to look like. Thanks again to Leon, Phyllis, Ezster and everyone who had helped me during this cumbersome progress.
