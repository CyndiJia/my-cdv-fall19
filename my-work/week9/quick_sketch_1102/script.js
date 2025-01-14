let margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

let viz = d3.select('#container').append("svg")
                                    .attr("width", width + margin.left + margin.right)
                                    .attr("height", height + margin.top + margin.bottom)
                                  .append("g")
                                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

let x0Scale = d3.scaleBand()
    .rangeRound([0, width])
    .padding(0.1)
;

let x1 = d3.scaleBand();

let yScale = d3.scaleLinear()
    .range([height, 0])
;

let xAxis = d3.axisBottom(x0Scale)
    .tickSize(0)
;

let yAxis = d3.axisLeft(yScale);
// let yAxisGroup = viz.append("g").classed("yAxis", true);
// // tell d3 to put the axis into place
// yAxisGroup.call(yAxis);
//
// yAxisGroup.selectAll("text").attr("font-size", 24).attr("y", 9);
// // bring axis to the correct y position
// yAxisGroup.attr("transform", "translate("+(margin.left)+",0)");



let color = d3.scaleOrdinal()
    .range(["#ca0020","#f4a582","#d5d5d5","#92c5de","#0571b0"]);



function gotData(incomingData){
    console.log(incomingData.length);
    console.log(incomingData[0]);

    // APPROACH #2
    let meanPrice = d3.mean(incomingData, function(d){
      return Number(d.price);
    });
    let meanTR = d3.mean(incomingData, function(d){
      return Number(d.totalreviews);
    });
    let meanNig = d3.mean(incomingData, function(d){
      return Number(d.minimum_nights);
    });
    let meanavail = d3.mean(incomingData, function(d){
      return Number(d.availability);
    });
    console.log("mean:", meanPrice);


    let bronx = incomingData.filter(d=>{return d.zone == "Bronx"});
    console.log(bronx);


    //let a = [1,2,3,5,7,6,8];
    function compareFunction(a, b){
      return Number(a.price)-Number(b.price);
    }
    bronx.sort(compareFunction);
    console.log("bronx",bronx);
    let sortedBronx = bronx.slice(0,10);
    console.log("sorted",sortedBronx);

    let meanPricebronx = d3.mean(bronx, function(d){
      return Number(d.price);
    });

    let meanAvailbronx = d3.mean(bronx, function(d){
      return Number(d.availability);
    });

    let meanTotalRevbronx = d3.mean(bronx, function(d){
      return Number(d.totalreviews);
    });

    let meanNightsbronx = d3.mean(bronx, function(d){
      return Number(d.minimum_nights);
    });

    console.log("mean:", meanPricebronx);
    let listing = bronx[9];

    let data = [
      {
        'category' : "price",
        'values': [
          {
          "value":listing.price,
          "name":"listing",
        },
          {
          "value": meanPricebronx,
          "name": "avgzone"
        },
          {
          "value": meanPrice,
          "name":"avgNYC"
        }
        ]
      },
      {
        'category': "minimum_nights",
        'values': [
          {
          "value":listing.minimum_nights,
          "name":"listing",
        },
          {
          "value": meanNightsbronx,
          "name": "avgzone"
        },
          {
          "value": meanNig,
          "name":"avgNYC"
        }
        ]
      },
      {
        'category': "totalreviews",
        'values': [
          {
          "value":listing.totalreviews,
          "name":"listing",
        },
          {
          "value": meanTotalRevbronx,
          "name": "avgzone"
        },
          {
          "value": meanPrice,
          "name":"avgNYC"
        }
        ]
      },
      {
        'category': "availability",
        'values': [
          {
          "value":listing.availability,
          "name":"listing",
        },
          {
          "value": meanAvailbronx,
          "name": "avgzone"
        },
          {
          "value": meanavail,
          "name":"avgNYC"
        }
        ]
      }
    ]

    let categoryNames = data.map(function(d) { return d.category; });
    let listingNames = data[0].values.map(function(d) { return d.name; });

    x0Scale.domain(categoryNames);
    x1.domain(listingNames).rangeRound([0,x0Scale.bandwidth()]);
    yScale.domain([0, d3.max(data, function(category) { return d3.max(category.values, function(d) { return d.value; }); })]);

    viz.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    viz.append("g")
          .attr("class", "y axis")
          .style('opacity','0')
        . call(yAxis)
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .style('font-weight','bold')
          .text("Value")
    ;

    viz.select('.y').transition().duration(500).delay(1300).style('opacity','1');

    //graph
    let graph = viz.selectAll(".graph").data(data)
                        .enter().append("g")
                                    .attr("class", "graph")
                                    .attr("transform",function(d) { return "translate(" + x0Scale(d.category) + ",0)"; })
    ;

    graph.selectAll("rect").data(function(d) { return d.values; })
              .enter().append("rect")
                          .attr("width", x1.bandwidth())
                          .attr("x", function(d){return x1(d.name);})
                          .attr("fill", function(d) { return color(d.name); })
                          .attr("y", function(d){return yScale(0);})
                          .attr("height", function(d) {return d.value; })
                          .on("mouseover", function(d) {
            d3.select(this).style("fill", d3.rgb(color(d.name)).darker(2));
        })
                          .on("mouseout", function(d) {
            d3.select(this).style("fill", color(d.name));
        });



    graph.selectAll("rect")
            .transition()
            .delay(function (d) {return Math.random()*1000;})
            .duration(1000)
            .attr("y", function(d) { return yScale(d.value); })
            .attr("height", function(d) { return height - yScale(d.value); })
      ;

    let legend = viz.selectAll(".legend")
        .data(data[0].values.map(function(d) { return d.name; }).reverse())
        .enter().append("g")
                    .attr("class", "legend")
                    .attr("transform", function(d,i) { return "translate(0," + i * 20 + ")"; })
                    .attr("opacity","0");

    legend.append("rect")
              .attr("x", 65)
              .attr("width", 18)
              .attr("height", 12)
              .attr("fill", function(d) { return color(d); });

    legend.append("text")
            .attr("x", 62)
            .attr("y", 6)
            .attr("dy", ".35em")
            .style("text-anchor", "end")
            .text(function(d) {return d; });

    legend.transition().duration(500).delay(function(d,i){ return 1300 + 100 * i; }).style("opacity","1");




 }


d3.csv("AB_NYC_2019.csv").then(gotData);
