
let viz = d3.select("#viz-container")
                .append("svg")
                    .attr("id","viz")
                    .attr("width",800)
                    .attr("height",800)
;
//
// //current selection <svg></svg>
//
// viz.attr("height","500");
//
// let myCircle = viz.append("rect")
//             .attr("x",200)
//             .attr("y",100)
//             .attr("width",500)
//             .attr("height",200)
//             //.attr("r",50);
// ;
// myCircle.attr("fill","white");

let myData = [3,6,8,1,5];
// //enter is for selecting all the datapoints that are waited to be filled in
viz.selectAll("circle").data(myData).enter().append("circle")
                                        .attr("cx",120)
                                        .attr("cy",400)
                                        .attr("r",20)
;
let circles = viz.selectAll("circle").data(myData);


circles.enter().append("circle")
                          .attr("cx",randomNumber)
                          .attr("cy",400)
                            .attr("r",10)
;

function gotData(newdata){   // this function expects to be passed data
  console.log(newdata);   // print it to the console to verify

  // in here we can now work with the new data
  let keys = Object.keys(newdata[1]);
  console.log(keys);
  // e.g. viz.selectAll("circle").data(newdata).ent.......


}
d3.json("data.json").then(gotData);
