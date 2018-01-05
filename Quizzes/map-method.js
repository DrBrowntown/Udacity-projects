var myArray = [1, 2, 3, 4, 5];
var newArray = myArray.map(function(elem) {
    elem = elem + 100;
    return elem;
})

//newArray: [101, 102, 103, 104, 105];



var donuts = ["jelly donut", "chocolate donut", "glazed donut"];

var improvedDonuts = donuts.map(function(donut) {
  donut += " hole";
  donut = donut.toUpperCase();
  return donut;
});

//donuts array: ["jelly donut", "chocolate donut", "glazed donut"]
//improvedDonuts array: ["JELLY DONUT HOLE", "CHOCOLATE DONUT HOLE", "GLAZED DONUT HOLE"]