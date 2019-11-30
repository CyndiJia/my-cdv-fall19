import currentBox from "./leonScroller.js";
// imports just one function from a different file
// more info, import: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
// more info, export: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export

// we don't hardcode w and h this time
// but keep them responsive
// (see adjustVizHeight and resized function
// that are defined at the bottom)
let w, h;
let heightRatio = 1;
let padding = 90;

let margin = {top: 30, right: 10, bottom: 30, left: 60},
    width = 700 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page

    let viz = d3.select(".step")
        .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .style("margin-left","20px")
        .append("g")
          .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")")
    ;
    // function to adjust viz height dynamically
    // in order to keep the heightRatio at any given
    // width of the browser window
    // (function definition at the bottom)
    adjustVizHeight();



//my script
function gotData(incomingData){


  // console.log(incomingData[6].date);
  let rawdate = incomingData.map(function(d){return d.date})
  let parseDate = d3.timeParse("%Y-%m-%dT%H:%M:%S.%LZ");
  let formatTime = d3.timeFormat("%m-%d %H:%M");
  let date = rawdate.map(function(d){return formatTime(parseDate(d))})
  let sales = incomingData.map(function(d){return d.salesamount})
  console.log(sales);
  let forChart = [];
  for(let i = 0;i<date.length;i++){
    let ob = {"dateee":date[i],"salesss":sales[i]}
    forChart.push(ob);
  }

  console.log(forChart);


  let xScale = d3.scaleBand()
                  .domain(date.filter(function(d,i){return i<1}))
                  .range([ 0, width ]);

  let xAxis = d3.axisBottom(xScale);
  let xAxisGroup = viz.append("g").attr("class", "xaxis");
  xAxisGroup.call(xAxis);
  xAxisGroup.attr("transform", "translate(-40, "+ height +")");


  let yScale = d3.scaleLinear()
                  .domain([0, 15000000])
                  .range([ height, 0 ]);
  let yAxis = d3.axisLeft(yScale);
  let yAxisGroup = viz.append("g").attr("class", "yaxis");
  yAxisGroup.call(yAxis);

  drawline(1);
  // drawline(2);
  // drawline(3);
  // drawline(4);
  // drawline(5);
  // drawline(6);
  // drawline(7);
  // drawline(8);

  function updatexAxis(filnum){
    xScale.domain(date.filter(function(d,i){return i<filnum}))
          .range([0,width]);
    let xAxis = d3.axisBottom(xScale);
    xAxisGroup.transition().call(xAxis);
  }

  function drawline(filnum){

    // updatexAxis(filnum);
    let lines = viz.append("path")
                    .datum(forChart.filter(function(d,i){return i<filnum;}))

    lines.attr("fill", "none")
        .attr("stroke", "#69b3a2")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
          .x(function(d) { return xScale(d.dateee); })
          .y(function(d) { return yScale(d.salesss); })
        )
      ;


      viz.append("g")
          .selectAll("dot")
          .data(forChart.filter(function(d,i){return i < filnum;}))
          .enter()
          .append("circle")
            .attr("cx", function(d) { return xScale(d.dateee) } )
            .attr("cy", function(d) { return yScale(d.salesss) } )
            .attr("r", 5)
            .attr("fill", "#69b3a2")
            .on("mouseover",function(d){console.log(d.salesss);return d.salesss})
        ;
  }


  // scrolling event listener
  // you might move this block into the part of your code
  // in which your data is loaded/available
  let previousSection;
  d3.select("#textboxes").on("scroll", function(){
    // the currentBox function is imported on the
    // very fist line of this script
    currentBox(function(box){
      console.log(box.id);
      for(let i = 0;i<9;i++)
      if(box.id==i.toString() && box.id!=previousSection){
        console.log("changing viz");
        // trigger a new transition
        updatexAxis(i);
        drawline(i);
        previousSection = box.id;
      }

    })
  })






}

d3.json("storyprogress.json").then(gotData);







// function to adjust viz height dynamically
// in order to keep the heightRatio at any given
// width of the browser window
function adjustVizHeight(){
  viz.style("height", function(){
    w = parseInt(viz.style("width"), 10);
    h = w*heightRatio;
    return h;
  })
}
function resized(){
  adjustVizHeight()
}
window.addEventListener("resize", resized);
