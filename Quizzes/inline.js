/*
 * Programming Quiz: Inline Functions (5-6)
 */

// Calls emotion functions and prints output. 
//Instead of passing laugh() as an argument,
//passes as an inline function expression

//2. Arguments fed into parameters of emotions function.
//3. myFunc passes arguments back into parameter.
//5. Completed work from function(num) is returned to myFunc and logged to the console.
function emotions(myString, myFunc) {
    console.log("I am " + myString + ", " + myFunc(2));
}

//1. Call emotions function and pass arguments.
//4. function(num) takes arguments from myFunc in emotions fuction and completes inline function.

emotions('happy', function(num) {
    var ha = "";
    for (var i = 0; i < num; i++) 
        ha = ha + "ha";    
    return ha + "!";
});