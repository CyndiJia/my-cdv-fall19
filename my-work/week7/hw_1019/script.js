let w = 1580;
let h = 850;

// for convenience
let datafile = "data.json";

// function to retrieve only the data points
// belonging to one name in time:

function getName(data,name){
  return data.filter(function(datapoint){
    if(datapoint.name == name){
      return true;
    }else{
      return false;
    }
  });
}



// creating the svg that holds everything else
// we do this outside the gotData function to
// keeps things clean
let viz = d3.select("#container")
  .append('svg')
    .attr("width", w)
    .attr("height", h)
    .style("background-color", "#ecf4dc")
;


function gotData(incomingData){
  // checking out our data
  //console.log(incomingData);
  // testing the filter function defined above
  console.log(getName(incomingData,"A"));

  let xDomain = d3.extent(incomingData, function(datapoint){
                            return datapoint.x;
                          });
  //console.log(xDomain);

  let yDomain = d3.extent(incomingData, function(datapoint){
                            return datapoint.y;
                          });
  //console.log(yDomain);

  // general padding of our visualization
  let padding = 40;
  // scale to map from min and max of our x values to the
  // boundaries (minus padding) of our svg:
  let xScale = d3.scaleLinear().domain(xDomain).range([padding, w-padding]);

  // create axis for this scale
  let xAxis = d3.axisBottom(xScale);
  // create a groyp to gold the axis elements
  let xAxisGroup = viz.append("g").attr("class", "xaxis");
  // tell d3 to fill the group with the axis elements
  xAxisGroup.call(xAxis);
  // position the axis at the bottom of the svg
  xAxisGroup.attr("transform", "translate(0, "+ (h-padding) +")");

  // note how we flip the orientation (in the range) of our y scale
  // to make sure that low y values are at the bottom of the graph
  let yScale = d3.scaleLinear().domain(yDomain).range([h-padding, padding]);
  let yAxis = d3.axisLeft(yScale);
  let yAxisGroup = viz.append("g").attr("class", "yaxis");
  yAxisGroup.call(yAxis);
  yAxisGroup.attr("transform", "translate("+padding+",0)");

  let vizgroup = viz.append("g").attr("class", "vizgroup");

  drawViz("A");

  function drawViz(name){
    let data = getName(incomingData,name);
    // d3.shuffle(data);
    console.log(data);

    // after binding the new data, d3 thinks: we have 3 datapoints
    // on the page, and have 3 datapoints in the incoming data.
    // Therefore no new elements need to enter
    let fulltable = vizgroup.selectAll(".datagroup").data(data);
    let enteringElements = fulltable.enter();
    let exitingElements = fulltable.exit();
    console.log("fulltable", fulltable);
    console.log("enteringElements", enteringElements);
    console.log("exitingElements", exitingElements);

    // // if we extract only the entering elements the
    // // "groupdata" selection will be empty the second time
    // // this function is called, because elements are already on
    // // the page and only need to be updated
    let enteringDataGroups = enteringElements
                              .append("g")
                              .attr("class", "datagroup")
        ;

    enteringDataGroups.append("circle")
                .attr("r", 5)
                .attr("fill", "#cce2a2")
    ;
    enteringDataGroups
      .attr("transform", function(d, i){
        return "translate("+ xScale(d.x) + ", " + 0 + ")"
      })
      .transition()
      .duration(3000)
      .attr("transform", function(d, i){
        return "translate("+ xScale(d.x) + ", " + yScale(d.y) + ")"
      });

    // exitingElements.selectAll("circle").transition().duration(2000).attr("r", 0);
    exitingElements
      .transition()
      .duration(3000)
      .attr("transform", function(d, i){
        return "translate("+ xScale(d.x) + ", " + h + ")"
      })
      .remove()
    ;


    fulltable.transition().attr("transform", function(d, i){
                                  return "translate("+ xScale(d.x) + ", " + yScale(d.y) + ")"
                                });
    //
    // d3.selectAll("circle").transition().attr("fill","#7A8761").duration(1500)
    //                       .transition().attr("r","10").duration(1000)
    //                       .transition().attr("r","3").duration(1000)
    //                       .transition().attr("r","5").duration(1000);
    //
    //
    //
    // groupdata.transition().attr("transform", function(d, i){
    //                               return "translate("+ xScale(d.x) + ", " + yScale(d.y) + ")"
    //                             });
    // // here we deal with the elements that need to be UPDATED
    // datagroups.attr("transform", function(d, i){
    //                               return "translate("+ xScale(d.x) + ", " + yScale(d.y) + ")"
    //                             });
    //
    // datagroups.exit().remove();//It worked but I don't understand it TAT

}

document.getElementById("btn1").addEventListener("click", function() {drawViz('A');});
document.getElementById("btn2").addEventListener("click", function() {drawViz('B');});
document.getElementById("btn3").addEventListener("click", function() {drawViz('C');});

}





d3.json(datafile).then(gotData);
