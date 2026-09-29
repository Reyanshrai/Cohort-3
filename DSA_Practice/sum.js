// const prompt = require("prompt-sync")();

// let t = prompt("Enter a String: ");

// let mat = [
//   [1, 2, 3],
//   [4, 5, 6],
//   [7, 8, 9]
// ];

// let sum = 0;

// for (let i = 0; i < mat.length; i++) {
//   for (let j = 0; j < mat[i].length; j++) {

//     if (
//       i === j ||
//       i + j === mat[i].length - 1
//     ) {
//       sum += mat[i][j];
//     }

//   }
// }

// console.log(sum);


// const set = new Set(['a','b','c'])
// console.log(set.has('b'));

// let arr = [1,2,3,1,5,2,3,8]

// let set = new Set(arr)

// console.log(set);


let jewels = 'aA'
let stone = 'aAAbbb'

let set = new Set(stone)
let set1 = new Set(jewels)
console.log(set1);

let count = 0

for(let i = 0; i<stone.length;i++){
  if(set.has(i) == set1.has(i)) count++
}

console.log("count",count);








