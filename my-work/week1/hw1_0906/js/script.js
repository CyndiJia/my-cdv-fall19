let instruments = [
    {
        "timestamp": "2019-09-05T11:46:24.606Z",
        "piano": 7,
        "cello": 6,
        "clarinet": 7,
        "guitar": 9,
        "saxophone": 5,
        "drum": 3
    },
    {
        "timestamp": "2019-09-05T11:47:14.030Z",
        "piano": 10,
        "cello": 5,
        "clarinet": 5,
        "guitar": 5,
        "saxophone": 5,
        "drum": 5
    },
    {
        "timestamp": "2019-09-05T12:00:14.205Z",
        "piano": 8,
        "cello": 10,
        "clarinet": 2,
        "guitar": 9,
        "saxophone": 6,
        "drum": 8
    },
    {
        "timestamp": "2019-09-05T12:11:15.932Z",
        "piano": 10,
        "cello": 9,
        "clarinet": 8,
        "guitar": 10,
        "saxophone": 9,
        "drum": 8
    },
    {
        "timestamp": "2019-09-05T12:20:49.162Z",
        "piano": 9,
        "cello": 7,
        "clarinet": 7,
        "guitar": 9,
        "saxophone": 5,
        "drum": 5
    },
    {
        "timestamp": "2019-09-05T12:23:03.736Z",
        "piano": 10,
        "cello": 7,
        "clarinet": 7,
        "guitar": 8,
        "saxophone": 5,
        "drum": 9
    },
    {
        "timestamp": "2019-09-05T13:31:01.472Z",
        "piano": 8,
        "cello": 3,
        "clarinet": 1,
        "guitar": 10,
        "saxophone": 8,
        "drum": 9
    },
    {
        "timestamp": "2019-09-05T13:43:03.731Z",
        "piano": 6,
        "cello": 8,
        "clarinet": 7,
        "guitar": 7,
        "saxophone": 10,
        "drum": 6
    },
    {
        "timestamp": "2019-09-05T13:47:46.336Z",
        "piano": 7,
        "cello": 7,
        "clarinet": 4,
        "guitar": 8,
        "saxophone": 3,
        "drum": 6
    },
    {
        "timestamp": "2019-09-05T14:00:04.240Z",
        "piano": 6,
        "cello": 8,
        "clarinet": 9,
        "guitar": 10,
        "saxophone": 6,
        "drum": 7
    },
    {
        "timestamp": "2019-09-05T14:08:44.107Z",
        "piano": 10,
        "cello": 10,
        "clarinet": 7,
        "guitar": 10,
        "saxophone": 10,
        "drum": 10
    },
    {
        "timestamp": "2019-09-05T15:33:16.092Z",
        "piano": 10,
        "cello": 6,
        "clarinet": 6,
        "guitar": 10,
        "saxophone": 5,
        "drum": 10
    },
    {
        "timestamp": "2019-09-05T15:50:10.489Z",
        "piano": 10,
        "cello": 9,
        "clarinet": 8,
        "guitar": 10,
        "saxophone": 9,
        "drum": 10
    },
    {
        "timestamp": "2019-09-06T06:27:14.694Z",
        "piano": 10,
        "cello": 8,
        "clarinet": 8,
        "guitar": 10,
        "saxophone": 5,
        "drum": 5
    }
]

function averageNum(instruments){
  //create a new list to store the dadta
  let mainData = [];
  //get all the names of the instruments
  let keys = Object.keys[instruments[0]];
  //console.log(keys);
  for (let i = 0; i < keys.length; i++){
    //get the name of each instrument
    let insname = keys[i];
    let sum = 0;
    let num = 0;
    for(let j = 0; j < instruments.length;j++){
      //get to the specific response of each interviewee
      let datapoint = instruments[j];
      if (insname in datapoint){
        sum += datapoint[insname];
        num++;
      }
    }
    let avg = sum/num
    if(!isNaN)
  }
}
