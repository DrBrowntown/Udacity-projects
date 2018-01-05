var myArray = [1, 2, 3, 4, 5];
var newArray = myArray.map(function(elem) {
    elem = elem + 100;
    return elem;
})

//newArray: [101, 102, 103, 104, 105];