//piechart
let w = 600;
let h = 600;
let margin = 20;

//radius of pieplot
let radius = Math.min(w,h)/2-margin;

//append svg to the div
let graph = d3.select("#container")
                  .append("svg")
                    .attr("width",w)
                    .attr("height",h)
                  .append("g")
                    .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")")//why is + needed?
;

let note = d3.select("#container")
                .append("svg")
                  .attr("width",w)
                  .attr("height",h)
                  .attr("background-color","red")
;

note.append("text")
        .text("hi")
        .attr("dx",100)
;

function gotData(incomingData){
    let ha = 0;
    let wu = 0;
    let pos = 0;
    let neg = 0;
    let que = 0;

    for(i = 0; i < incomingData.length; i++){
      let single = incomingData[i];
      ha += single.haextremelyHappy;
      wu += single.wuextremelySad;
      pos += single.emojisForPositiveFeelings;
      neg += single.emojisForNegativeFeelings;
      que += single.questionMark;
    }
    let data = {"ha":ha, "wu":wu, "pos":pos, "neg":neg, "que":que};
    console.log(data);


    // set the color scale
    let color = d3.scaleOrdinal()
                      .domain(["ha", "wu", "pos", "neg", "que"])
                      .range(d3.schemeAccent)
    ;

    // Compute the position of each group on the pie:
    let pie = d3.pie()
                    .sort(null) // Do not sort group by size??
                    .value(function(d) {return d.value; })
    ;

    //d3.entries => return an array of data
    let data_ready = pie(d3.entries(data));



    // The arc generator
    let arc = d3.arc()
                    .innerRadius(radius * 0.3)         // This is the size of the donut hole
                    .outerRadius(radius * 0.8)
    ;


    graph.selectAll("allSlices").data(data_ready).enter()
                                                    .append("path")
                                                    .attr("d",arc)
                                                    .attr("fill",function(d){
                                                      return (color(d.data.key));
                                                    })
                                                    .attr("stroke","white")
                                                    .style("stroke-width","2px")
                                                    .style("opacity",0.7)
    ;

}

d3.json("data.json").then(gotData);
