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

let margin = {top: 30, right: 30, bottom: 30, left: 50},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page

let viz = d3.select("#visualization")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .style("background-color", "lavender")
    .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")")
;
// function to adjust viz height dynamically
// in order to keep the heightRatio at any given
// width of the browser window
// (function definition at the bottom)
adjustVizHeight();


// your script starts here, e.g. load data here.
d3.json("story_full_comment.json").then(gotData);

function gotData(incomingData){
  console.log(incomingData);

  let forChart = [];
  for(let j = 1; j<6;j++){
    let num = 0;
    for(let i = 0;i<incomingData.length;i++){
      if(incomingData[i].rating == j.toString()){
        // console.log('hi');
        num += 1;
      }
    }
    let cmtForEach = {'day':j,'num':num};
    // console.log(cmtForEach)
    forChart.push(cmtForEach);
  }
  console.log(forChart);

  let xScale = d3.scaleLinear()
                  .domain([0, 5])
                  .range([ 0, width ]);

  let xAxis = d3.axisBottom(xScale);
  let xAxisGroup = viz.append("g").attr("class", "xaxis");
  xAxisGroup.call(xAxis);
  xAxisGroup.attr("transform", "translate(0, "+ height +")");


  let yScale = d3.scaleLinear()
                  .domain([0, 70])
                  .range([ height, 0 ]);
  let yAxis = d3.axisLeft(yScale);
  let yAxisGroup = viz.append("g").attr("class", "yaxis");
  yAxisGroup.call(yAxis);

  

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

    if(box.id=="two" && box.id!=previousSection){
      console.log("changing viz");
      // trigger a new transition
      previousSection = box.id;
    }

  })
})







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
