//button onclick function
function ctsquare() {
  //get value from input
  var num = document.getElementById("num").value;
  console.log(num);
  //console.log(num);
  var n;
  for(n = 0;n < num; n++){
    //create and customize the divs
    var div = document.createElement("div");
    div.setAttribute("class","divvv");
    //add divs to the container
    document.getElementById("squares").appendChild(div);
  }
}
