
function gotData(incomingData){
  console.log(incomingData);
}

d3.json("storyprogress.json").then(gotData);
