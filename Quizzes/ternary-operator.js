var isGoing = true;
var color;

if (isGoing) {
  color = "green";
} else {
  color = "red";
}

console.log(color);

//VS Ternary Operator
//Example 1

var isGoing = true;
var color = isGoing ? "green" : "red";
console.log(color);


//Example 2
var adult = true;
var preorder = true;

console.log("It costs $" + (adult ? "40.00" : "20.00") + 
    " to attend the concert. Pick up your tickets at the " + 
    (preorder ? "will call" : "the gate") + ".");