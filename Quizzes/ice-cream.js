/*
 * Programming Quiz: Ice Cream (3-6)
 *
 * Write a single if statement that logs out the message:
 * 
 * "I'd like two scoops of __________ ice cream in a __________ with __________."
 * 
 * ...only if:
 *   - flavor is "vanilla" or "chocolate"
 *   - vessel is "cone" or "bowl"
 *   - toppings is "sprinkles" or "peanuts"
 *
 * We're only testing the if statement and your boolean operators. 
 * It's okay if the output string doesn't match exactly.
 */

// change the values of `flavor`, `vessel`, and `toppings` to test your code
var flavor = "vanilla";
var vessel = "cone";
var toppings = "sprinkles";

if ((flavor === "vanilla" || flavor === "chocolate") 
    && (vessel === "cone" || vessel === "bowl") 
    && (toppings === "sprinkles" || toppings === "peanuts")) {
  console.log("I'd like two scoops of " 
    + flavor + " ice cream in a " + vessel 
    + " with " + toppings +".");
}



var shirtWidth = 20;
var shirtLength = 29;
var shirtSleeve = 8.39;


if (shirtWidth < 20 && shirtLength < 29 && shirtSleeve < 8.38) {
    console.log("S");
} else if ((shirtWidth > 19 && shirtWidth < 22) 
    && (shirtLength > 28 && shirtLength < 30) 
    && (shirtSleeve > 8.38 && shirtSleeve < 8.63)) {
    console.log("M");
} else {
    console.log("N/A");
}
