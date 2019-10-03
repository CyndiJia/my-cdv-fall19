let w = 1200;
let h = 800;

let cover = d3.select("#container")
                  .append("svg")
                    .attr("width",w)
                    .attr("height",h)
;

function gotData(dataready){
  let ha = 0;
  let wu = 0;
  let pos = 0;
  let neg = 0;
  let que = 0;

  for(i = 0; i < dataready.length; i++){
    let single = dataready[i];
    ha += single.haextremelyHappy;
    wu += single.wuextremelySad;
    pos += single.emojisForPositiveFeelings;
    neg += single.emojisForNegativeFeelings;
    que += single.questionMark;
  }
  let data = {"ha":ha, "wu":wu, "pos":pos, "neg":neg, "que":que};
  console.log(data);
}


d3.json("data.json").then(gotData);
