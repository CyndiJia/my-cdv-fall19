//heatmap
let w = 2400;
let h = 800;


let heatmap = d3.select("#container")
                    .append("svg")
                      .attr("width",w)
                      .attr("height",h)
                    .append("g")
                      .attr("transform","translate(120,40)")
;

//rows & columns
let xaxis = ["9/10","9/11","9/12","9/13","9/14","9/15","9/16","9/17","9/18","9/19",
            "9/20","9/21","9/22","9/23","9/24","9/25","9/26","9/27","9/28",
            "9/29","9/30","10/1","10/2","10/3"];

let yaxis = ["Ha: ExtremelyHappy","Wu: ExtremelySad","PositiveEmojis","NegativeEmojis","?: QuestionMark"];

//x-axis
let xx = d3.scaleBand()
                .domain(xaxis)
                .range([0,w-140])
                .padding(0.01)
;

//y-axis
let yy = d3.scaleBand()
                .domain(yaxis)
                .range([0,h-80])
                .padding(0.01)
;

heatmap.append("g")
            .attr("transform", "translate(0,720)")
            .call(d3.axisBottom(xx))
;

heatmap.append("g")
          .call(d3.axisLeft(yy))
;


//colorScale
let colorScale = d3.scaleLinear()
                    .domain([0,500])
                    .range(["white","green"])
;

console.log(colorScale(200));

function posx(d,i){
  return xx(d.date);
}

function posy(d,i){
  console.log(yy(d.type));
  return yy(d.type);
}

function getColor(d,i){
  return colorScale(d.number);
}


function gotData(data){
  heatmap.selectAll().data(data).enter()
                                    .append("rect")
                                        .attr("x", posx)
                                        .attr("y", posy)
                                        .attr("width", xx.bandwidth())
                                        .attr("height", yy.bandwidth())
                                        .attr("fill", getColor)
  ;
}

//getcsvdata
d3.csv("csvdata.csv").then(gotData);
