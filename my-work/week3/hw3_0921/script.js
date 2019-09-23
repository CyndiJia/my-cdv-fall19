//name: color DONE ; number: radiusx of the ellipse DONE;
//date: position DONE ；parity: odd-rectleft even-rectright

//setting positions for different days in the week
function posTrans(datapoint,index){
    //console.log(datapoint.date);
    let x = (index+1)*210;
    let y = (datapoint.date-1)*100;
    return "translate(" + x + "," + y + ")";
  }

//setting colors for different types of words
function getColor(datapoint){
    //console.log(datapoint.name);
    if(datapoint.name == "haextremelyHappy"){
      return "orange";
    }
    else if(datapoint.name == "wuextremelySad"){
      return "grey";
    }
    else if(datapoint.name == "emojisForPositiveFeelings"){
      return "hotpink";
    }
    else if(datapoint.name == "emojisForNegativeFeelings"){
      return "lightblue"
    }
    else{
      return "red";
    }
  }

  //setting the radiusx for the ellipse
  function rx(datapoint){
    if(datapoint.number > 100){
      return 80;
    }
    else{
      return datapoint.number;
    }
  }

  //setting the radiusy for the ellipse
  function ry(datapoint){
    if(datapoint.number > 100){
      return 40;
    }
    else{
      return datapoint.number/2;
    }
  }

  //matching number to the text
  function text(datapoint){
    return String(datapoint.number);
  }

function gotData(incomingData){
    //console.log(incomingData);
    let newDataSet1 = [];
    let newDataSet2 = [];
    let newDataSet3 = [];
    let newDataSet4 = [];
    let newDataSet5 = [];
    let newDataSet6 = [];
    let types = Object.keys(incomingData[1]);
    //console.log(types);
    for(i = 0; i < types.length; i++){
      let name = types[i];
      let date = types[0];
      for(j = 0; j<incomingData.length;j++){
        let indi = incomingData[j];
        //console.log(indi[name]);
        if(name in indi && indi[date] == "2" && name != "date"){
          let res = {"name":name, "number": indi[name], "date": indi[date]};
          newDataSet1.push(res);
        }
        else if(name in indi && indi[date] == "3" && name != "date"){
          let res = {"name":name, "number": indi[name], "date": indi[date]};
          newDataSet2.push(res);
        }
        else if(name in indi && indi[date] == "4" && name != "date"){
          let res = {"name":name, "number": indi[name], "date": indi[date]};
          newDataSet3.push(res);
        }
        else if(name in indi && indi[date] == "5" && name != "date"){
          let res = {"name":name, "number": indi[name], "date": indi[date]};
          newDataSet4.push(res);
        }
        else if(name in indi && indi[date] == "6" && name != "date"){
          let res = {"name":name, "number": indi[name], "date": indi[date]};
          newDataSet5.push(res);
        }
        else if(name in indi && indi[date] == "7" && name != "date"){
          let res = {"name":name, "number": indi[name], "date": indi[date]};
          newDataSet6.push(res);
        }
      }
    }
    console.log(newDataSet5);

    //create svg
    let viz = d3.select("body")
                  .append("svg")
                    .attr("width", 1300)
                    .attr("height", 700)
    ;


    let group1 = viz.selectAll(".datagroup1").data(newDataSet1)
                          .enter()
                            .append("g")
                            .attr("class","datagroup1")
    ;

    group1.append("ellipse")
                    .attr("rx",rx)
                    .attr("ry",ry)
                    .attr("fill",getColor)
    ;

    group1.append("text")
                    .text(text)
                    .attr("fill","white")
    ;



    group1.attr("transform",posTrans);

    let group2 = viz.selectAll(".datagroup2").data(newDataSet2)
                          .enter()
                            .append("g")
                            .attr("class","datagroup2")
    ;

    group2.append("ellipse")
                    .attr("rx",rx)
                    .attr("ry",ry)
                    .attr("fill",getColor)
    ;

    group2.append("text")
                    .text(text)
                    .attr("fill","white")
    ;

    group2.attr("transform",posTrans);

    let group3 = viz.selectAll(".datagroup3").data(newDataSet3)
                          .enter()
                            .append("g")
                            .attr("class","datagroup3")
    ;

    group3.append("ellipse")
                    .attr("rx",rx)
                    .attr("ry",ry)
                    .attr("fill",getColor)
    ;

    group3.append("text")
                    .text(text)
                    .attr("fill","white")
    ;

    group3.attr("transform",posTrans);

    let group4 = viz.selectAll(".datagroup4").data(newDataSet4)
                          .enter()
                            .append("g")
                            .attr("class","datagroup4")
    ;

    group4.append("ellipse")
                    .attr("rx",rx)
                    .attr("ry",ry)
                    .attr("fill",getColor)
    ;

    group4.append("text")
                    .text(text)
                    .attr("fill","white")
    ;

    group4.attr("transform",posTrans);

    let group5 = viz.selectAll(".datagroup5").data(newDataSet5)
                          .enter()
                            .append("g")
                            .attr("class","datagroup5")
    ;

    group5.append("ellipse")
                    .attr("rx",rx)
                    .attr("ry",ry)
                    .attr("fill",getColor)
    ;

    group5.append("text")
                    .text(text)
                    .attr("fill","white")
    ;

    group5.attr("transform",posTrans);

    let group6 = viz.selectAll(".datagroup6").data(newDataSet6)
                          .enter()
                            .append("g")
                            .attr("class","datagroup6")
    ;

    group6.append("ellipse")
                    .attr("rx",rx)
                    .attr("ry",ry)
                    .attr("fill",getColor)
    ;

    group6.append("text")
                    .text(text)
                    .attr("fill","white")
    ;

    group6.attr("transform",posTrans);

    // Why this one doesn't work? How is it diffrent from the one below?
    // d3.select(".datagroup4").selectAll("ellipse")
    //                             .attr("rx",rx)
    //                             .transition()
    //                             .duration(1000)
    //                             .attr("rx",text)
    // ;

    d3.selectAll("ellipse")
          .attr("rx",rx)
          .transition()
          .duration(1000)
          .attr("rx",text)
          .transition()
          .duration(1000)
          .attr("rx",rx)
          .transition()
          .duration(1000)
          .attr("rx",text)
          .transition()
          .duration(1000)
          .attr("rx",rx)

    ;

  }
  d3.json("data.json").then(gotData);
