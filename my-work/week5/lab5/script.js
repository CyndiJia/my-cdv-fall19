let w = 1200;
let h = 800;

let viz = d3.select("#container")
                .append("svg")
                    .attr("width",w)
                    .attr("height",h)
                    .style("background-color","lavender")
;

function gotData(incomingData){
  console.log(incomingData);
  function filterFunction(d){
    if(d.Code == "CHN"){
      return true;
    }
    else{
      return false;
    }
  }
  let filteredData = incomingData.filter(filterFunction);
  console.log(filteredData);

  let yearToDateObjectConverter = d3.timeParse("%Y")//%Y stands for 4-digit year
  let test = yearToDateObjectConverter("2001");
  console.log(test);
  console.log(typeof(test));

  // function formatYearFunction(d){
  //   let year = d.Year;
  //   let properFormatedYear = yearToDateObjectConverter(year);
  //   return properFormatedYear;
  // }
  // let minYear = d3.min(filteredData,formatYearFunction);
  // console.log(minYear);
  // let maxYear = d3.max(filteredData,formatYearFunction);
  // console.log(maxYear);

  //let domainArray = [minYear,maxYear];
  //console.log(domainArray);

  let alternativeDomainArray = d3.extent(filteredData,function (d){
    return yearToDateObjectConverter(d.Year);
  });

  console.log(alternativeDomainArray);

  let xPadding = 50;
  let xScale = d3.scaleTime().domain(alternativeDomainArray).range([xPadding,w-xPadding*2]);
  console.log(xScale(yearToDateObjectConverter("2007")));

  let xAxis = d3.axisBottom(xScale);
  let xAxisG = viz.append("g").attr("class","xaxis");
  xAxisG.call(xAxis);//make xAxis belong to xAxisG

  let xAxisPos = h-30;
  xAxisG.attr("transform","translate(0, "+xAxisPos+")");

  let valueKey = "Incidence - HIV/AIDS - Sex: Both - Age: All Ages (Number) (new cases of HIV)";

  //we use d[valueKey] instead of d.valuekey is because there are spaces in the key
  let yScale = d3.scaleLinear().domain(d3.extent(filteredData,
                              function(d){
                                return d[valueKey]
                              }))
                              .range([xAxisPos,30])
  ;

  let yAxis = d3.axisLeft(yScale);
  let yAxisG = viz.append("g").attr("class","yaxis");
  yAxisG.call(yAxis);
  yAxisG.attr("transform","translate("+xPadding+",0)")

}

d3.csv("new-cases-of-hiv-infection.csv").then(gotData);

//1.for each method
// for(let i = 0; i < incomingData.length; i++){
//   let element = incomingData[i];
//   console.log("current: ",i);
//   console.log(element);
// }
// function printIndexAndValue(d){
//   console.log(d);
// }
// incomingData.forEach(printIndexAndValue);

//2/map method
// function newDataPointBasedOnOldData(d){
//   let entity = d.Entity;
//   let year = d.year;
//   return {firstValue: entity,secondValue:year};
// }
// let newarray = incomingData.map(newDataPointBasedOnOldData);
// console.log(newarray);

//3.filter method
// function filterFunction(d){
//   if(d.Code == "CHN"){
//     return true;
//   }
//   else{
//     return false;
//   }
// }
// let filteredData = incomingData.filter(filterFunction);
// console.log(filteredData);
