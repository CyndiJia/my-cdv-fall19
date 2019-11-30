let margin = {top: 30, right: 30, bottom: 30, left: 50},
    width = 1000 - margin.left - margin.right,
    height = 620 - margin.top - margin.bottom;





function gotData(incomingData){
  // console.log(incomingData);
  let forChart = [];
  for(j = 1; j<6;j++){
    let num = 0;
    for(i = 0;i<incomingData.length;i++){
      if(incomingData[i].rating == j.toString()){
        // console.log('hi');
        num += 1;
      }
    }
    let cmtForEach = {'rating':j,'num':num};
    // console.log(cmtForEach)
    forChart.push(cmtForEach);
  }
    console.log(forChart);



  let distri = d3.select(".rate")
                .append("svg")
                  .attr("width", 1000)
                  .attr("height", 620)
                .append("g")
                  .attr("transform",
                        "translate(" + margin.left + "," + margin.top + ")")

  let div = d3.select(".rate").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0)
    ;

   let colors = ["red","orange","purple","blue","grey"]


  let xMax = d3.max(forChart, function(d){
        return d.num;
        });
  let xScale = d3.scaleLinear()
                  .domain([0,xMax])
                  .range([ 0, width ])
  ;

  let xAxis = d3.axisBottom(xScale);
  let xAxisGroup = distri.append("g").attr("class", "xaxis");
  xAxisGroup.call(xAxis);
  xAxisGroup.attr("transform", "translate(0, "+ height +")");



  // console.log(yDomain);
  let yScale = d3.scaleBand()
                  .domain(forChart.map(function(d){return d.rating;}))
                  .range([ height, 0 ])
                  .padding(0.25)
  ;
  let yAxis = d3.axisLeft(yScale);
  let yAxisGroup = distri.append("g").attr("class", "yaxis");
  yAxisGroup.call(yAxis);

  let wordcloud = div.append("svg");
  // wordcloud.append("circle").attr("r", 10);

  distri.selectAll("rect").data(forChart).enter()
                                            .append("rect")
                                                .attr("width",function(d){return xScale(d.num)})
                                                .attr("x",xScale(0))
                                                .attr("y", function(d,i){
                                                  return yScale(d.rating);
                                                })
                                                .attr("height", yScale.bandwidth())
                                                .attr("fill",function(d,i){return colors[4-i];})
                                                .style("opacity",.6)
                                              .on("mouseover",function(d){
                                                console.log('hi', d);
                                                div.select("circle").transition().delay(100).attr("cx", function(){
                                                  return d.rating*20
                                                }).attr("cy", function(){
                                                  return d.rating*20
                                                })
                                                div.transition().duration(1000).style("opacity",0.8);
                                                div.style("left",(xScale(d.num)+350)/2+"px").style("top",(yScale(d.rating)+yScale.bandwidth())+"px");
                                              })
  ;







}



d3.json("story_full_comment.json").then(gotData);
