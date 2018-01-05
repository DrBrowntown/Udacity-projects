/*
 * Programming Quiz: Laugh (5-4)

 Stores function in variable called laugh and outputs the number of "ha's"
 that you pass in as an argument.
 */

var laugh = function(max) {
    var ha = "";
    for (var i = 0; i < max; i++) {
        ha += "ha";
    }
    return ha + "!";
}

console.log(laugh(10));
