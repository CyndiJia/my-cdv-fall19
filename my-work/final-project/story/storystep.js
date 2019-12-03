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
          .attr("width", width+10 + margin.left + margin.right)
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

  console.log(incomingData);
  // console.log(incomingData[6].date);
  let parseDate = d3.timeParse("%Y-%m-%dT%H:%M:%S.%LZ");

  incomingData.forEach(function(d){d.date = parseDate(d.date)})
  console.log(incomingData);

  // let formatTime = d3.timeFormat("%m-%d %H:%M");
  // let date = rawdate.map(function(d){return formatTime(parseDate(d))})
  // let sales = incomingData.map(function(d){return d.salesamount})
  // console.log(sales);

  // let forChart = [];
  // for(let i = 0;i<date.length;i++){
  //   let ob = {"dateee":date[i],"salesss":sales[i]}
  //   forChart.push(ob);
  // }
  let forChart = incomingData.map((element, i)=>{
    return {"dateee":element.date,"salesss":element.salesamount}
  })
  console.log(forChart);

  let datemin = d3.min(forChart, element=>{
    // console.log(element.dateee);
    return element.dateee
  })
  // console.log(dateextent);
  // console.log(date.filter(function(d,i){return i<1}));
  let xScale = d3.scaleTime()
                  .domain([datemin, datemin])
                  .range([ 0, width ]);

  let xAxis = d3.axisBottom(xScale);
  // xAxis.tickValues( forChart.map(d=>d.dateee));

  let xAxisGroup = viz.append("g").attr("class", "xaxis");
  xAxisGroup.call(xAxis);
  xAxisGroup.attr("transform", "translate(0, "+ height +")");
  xAxisGroup.selectAll("text").attr("transform","rotate(60)");
  xAxis.tickValues( [datemin] );


  let yScale = d3.scaleLinear()
                  .domain([0, 6000000])
                  .range([ height, 0 ]);
  let yAxis = d3.axisLeft(yScale);
  let yAxisGroup = viz.append("g").attr("class", "yaxis");
  yAxisGroup.call(yAxis);

  let linegroup = viz.append("g").attr("class", "linegroup")
  let theline = linegroup.append("path").attr("class", "theline");
  drawline(1);
  // drawline(2);
  // drawline(3);
  // drawline(4);
  // drawline(5);
  // drawline(6);
  // drawline(7);
  // drawline(8);

  // updatexAxis(3);
  function updatexAxis(filnum){
    let relevantPoints = forChart.filter(function(d,i){return i<filnum});
    // console.log("relevant", relevantPoints);
    let timeextent = d3.extent( relevantPoints, d=>{
      return d.dateee;
    })
    let middledate = relevantPoints[parseInt(relevantPoints.length/2)].dateee
    // xScale.domain(timeextent);
    xScale.domain(timeextent);

    // console.log("extent", timeextent);
    // console.log(middledate);
    console.log(filnum);
    if(filnum==1){
      let tickdates = forChart.map(d=>d.dateee).filter((d,i)=>i==0);
      xAxis.tickValues( tickdates );
    }
    else if(filnum ==2){
      let tickdates = forChart.map(d=>d.dateee).filter((d,i)=>{
        return (
          i == 0 ||
          i == 1
        )
      })
      xAxis.tickValues( tickdates );
    }
    else if(filnum==3){
      let tickdates = forChart.map(d=>d.dateee).filter((d,i)=>{
        return (
          i == 0 ||
          i == 2
        )
      })
      xAxis.tickValues( tickdates );
    }
    else if(filnum==4){
      let tickdates = forChart.map(d=>d.dateee).filter((d,i)=>{
        return (
          i == 0 ||
          i == 1 ||
          i == 3
        )
      })
      xAxis.tickValues( tickdates );
    }
    else if(filnum==5){
      let tickdates = forChart.map(d=>d.dateee).filter((d,i)=>{
        return (
          i == 0 ||
          i == 1 ||
          i == 3 ||
          i == 4
        )
      })
      xAxis.tickValues( tickdates );
    }
    else if(filnum==6){
      let tickdates = forChart.map(d=>d.dateee).filter((d,i)=>{
        return (
          i == 0 ||
          i == 1 ||
          i == 3 ||
          i == 4 ||
          i == 5
        )
      })
      xAxis.tickValues( tickdates );
    }
    else if(filnum==7){
      let tickdates = forChart.map(d=>d.dateee).filter((d,i)=>{
        return (
          i == 0 ||
          i == 1 ||
          i == 3 ||
          i == 4 ||
          i == 5 ||
          i == 6
        )
      })
      xAxis.tickValues( tickdates );
    }
    else if(filnum==8){
      let tickdates = forChart.map(d=>d.dateee).filter((d,i)=>{
        return (
          i == 0 ||
          i == 2 ||
          i == 5 ||
          i == 6 ||
          i == 7
        )
      })
      xAxis.tickValues( tickdates );
    }





    xAxisGroup.transition().call(xAxis);
    // xAxisGroup.selectAll("text").attr("transform","rotate(60)");

    // console.log(relevantPoints.length);





  }


  function drawline(filnum){

    // updatexAxis(filnum);
    // console.log("HEY");

    theline.datum(forChart.filter(function(d,i){return i<filnum;}))

    theline.attr("fill", "none")
        .attr("stroke", "#69b3a2")
        .attr("stroke-width", 1.5)
        .transition()
        .attr("d", d3.line()
          .x(function(d) { return xScale(d.dateee); })
          .y(function(d) { return yScale(d.salesss); })
        )
      ;

      // console.log(forChart.filter(function(d,i){return i < filnum;}));
      // console.log( xScale(forChart.filter(function(d,i){return i < 2;})[1].dateee) );

      let theSituation = linegroup.selectAll(".dot").data(forChart.filter(function(d,i){return i < filnum;}))
      theSituation.enter()
          .append("circle")
            .attr("class", "dot")
            .attr("cx", function(d) { return xScale(d.dateee)} )
            .attr("cy", function(d) { return 0 } )
            .attr("r", 6.5)
            .attr("fill", "#69b3a2")
            .on("mouseover",function(d){return d.salesss})
            .transition()
            .attr("cy", function(d) { return yScale(d.salesss) } )
        ;
        theSituation
          .transition()
          .attr("cx", function(d) { return xScale(d.dateee) } )
          .attr("cy", function(d) { return yScale(d.salesss) } )

        theSituation.exit().transition()
          .attr("cy", function(d) { return yScale(0) } )
          .remove()
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
