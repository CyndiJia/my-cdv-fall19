let margin = {top: 10, right: 30, bottom: 30, left: 40},
    width = 1250 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;

function gotData(incomingData){

  let graph = d3.select('#container')
                  .append("svg")
                      .attr("width",1250)
                      .attr("height",800)
                  .append("g")
                      .attr("transform","translate(" + margin.left + "," + margin.top + ")")
  ;
  // console.log(incomingData);

  let forChart = [];
  for(j = 0; j<60;j++){
    let num = 0;
    for(i = 0;i<incomingData.length;i++){
      if(incomingData[i].days == j.toString()){
        // console.log('hi');
        num += 1;
      }
    }
    let cmtForEach = {'day':j,'num':num};
    // console.log(cmtForEach)
    forChart.push(cmtForEach);
  }
    console.log(forChart);

     let radiusScale = d3.scaleSqrt()
                              .domain([0, 64])
                              .range([12, 20]);

    let xScale = d3.scaleLinear()
                    .domain([0, 59])
                    .range([ 0, width ]);

    let xAxis = d3.axisBottom(xScale);
    let xAxisGroup = graph.append("g").attr("class", "xaxis");
    xAxisGroup.call(xAxis);
    xAxisGroup.attr("transform", "translate(0, "+ height +")");


    let yScale = d3.scaleLinear()
                    .domain([0, 70])
                    .range([ height, 0 ]);
    let yAxis = d3.axisLeft(yScale);
    let yAxisGroup = graph.append("g").attr("class", "yaxis");
    yAxisGroup.call(yAxis);

    // Reformat the data: d3.hexbin() needs a specific format
    let inputForHexbin = []
    forChart.forEach(function(d) {
      inputForHexbin.push( [xScale(d.day), yScale(d.num)] )  // Note that we had the transform value of X and Y !
    });

    let color = d3.scaleLinear()
                  .domain([756, 0])
                  .range(["transparent",  "red"])
    ;

    let colorafter = d3.scaleLinear()
                  .domain([756, 0])
                  .range(["transparent",  "purple"])
    ;

    // Compute the hexbin data
    let hexbin = d3.hexbin()
                    .radius(20) // size of the bin in px
                    .extent([ [0, 0], [width, height] ])
    ;

    // console.log(hexbin(inputForHexbin));

    // Plot the hexbins
    graph.append("clipPath")
          .attr("id", "clip")
        .append("rect")
          .attr("width", width)
          .attr("height", height)
    ;

    // graph.on('click',function(){
    //   console.log('whole');
    //   let whole = d3.select(this);
    //   whole.attr("background","black");
    // })

    // https://www.youtube.com/watch?v=aBwOMlSjh48

    let density = graph.append("g")
                          .attr("clip-path", "url(#clip)")
                        .append('a').attr("xlink:href",'storywordcloud.html')
                        .selectAll("path")
                        .data( hexbin(inputForHexbin) )
                        .enter().append("path")
                          .attr("d", hexbin.hexagon())
                          .attr("transform", function(d) { return "translate(" + (d.x) + "," + (d.y-10)+ ")"; })
                          .attr("fill", function(d) { return color(d.y); })
                          .attr("stroke", "black")
                          .attr("stroke-width", "0.2")
    ;

    density
      .on("mouseover",function(){
        console.log("hovering");
        let element = d3.select(this);
        element.transition().duration(1000).attr("fill",function(d) { return colorafter(d.y); }).attr("d", d => hexbin.hexagon(radiusScale((d.y))))
        d3.json("story.json").then(wordcloud);
      })
      .on("mouseout",function(){
        let element = d3.select(this);
        element.transition().duration(1000).attr("fill", function(d) { return color(d.y); }).attr("d", d => hexbin.hexagon())
        d3.json("story.json").interrupt().then(wordcloud)
      })
    ;


    function wordcloud(words){
      // console.log(words);
      let mywords = words.map(function(d){return d.finalcloud})
      // console.log(mywords);

      // Constructs a new cloud layout instance. It run an algorithm to find the position of words that suits your requirements
      let layout = d3.layout.cloud().size([width, height])
                            .words(mywords.map(function(d) { return {text: d[0]}; }))
                            .padding(10)
                            .fontSize(60)
                            .on("end", draw);
      layout.start();

      function draw(words) {
            graph
              .append("g")
                .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
                .selectAll("text")
                  .data(words)
                .enter().append("text")
                  .style("font-size", function(d) {return d.size + "px"; })
                  .style("opacity",0.1)
                  .attr("text-anchor", "middle")
                  .attr("transform", function(d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                  })
                  .text(function(d) { return d.text; });
          }
      }






}







d3.json("story_full_comment.json").then(gotData);
