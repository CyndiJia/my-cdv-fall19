// data we work with
let data = [
  {
    "laughs": 0,
    "mood": 0
  },
  {
    "laughs": 3,
    "mood": 6
  },
  {
    "laughs": 4,
    "mood": 3
  },
  {
    "laughs": 8,
    "mood": 9
  }
];


let w = 900;
let h = 500;
let viz = d3.select("#container")
  .append("svg")
    .style("width", w)
    .style("height", h)
    .style("outline", "solid black")
;

//bind data

// let theSituation = viz.selectAll("circle").data(data).enter()
//                                     .append("circle")
//                                     .attr("cx",d=>{return d.laughs*50+30})
//                                     .attr("cy",d=>{return d.mood*50+30})
//                                     .attr("r",10)
//                                     .attr("fill","green")
//   ;

let lineMaker = d3.line()
                    .x(d=>{return d.laughs*50+30})
                    .y(d=>{return d.mood*50+30})
;

let test = lineMaker(data);

console.log(test);

let theSituation = viz.datum(data)
theSituation.append('path').attr("d",lineMaker)
                            .attr("fill","none")
                            .attr("stroke","seagreen")
//viz.append("path").attr("d",test).attr("fill","none").attr("stroke","red");
