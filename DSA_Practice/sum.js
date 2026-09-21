// const prompt = require("prompt-sync")();

// let t = prompt("Enter a String: ");


let s = "yo|uar|e**|b|e***au|tifu|l"
let count = 0
let inside = false

for (let i = 0; i < s.length; i++) {
    if (s[i] === "|") {
      inside = !inside;
    } else if (s[i] === "*" && !inside) {
      count++;
    }
  }


console.log("count",count)
console.log("inside",inside = !inside)

