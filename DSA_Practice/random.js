// const prompt = require("prompt-sync")();

// let t = Number(prompt("Enter search Element: "));

/// selection sort

let arr = [9, 8, 1, 4, 10, 23];

let n= arr.length

for(let i = 0; i < n-1;i++){
    let min = i
    for(let j = i +1 ; j < n ; j++){
        if(arr[j] < arr[min]){
            min = j
        }
    }
    if(min != i){
            temp = arr[min]
            arr[min] = arr[i]
            arr[i] = temp
        }
}

console.log(arr);


function checkPref(str){
    let strArr = str.split(" ")
    let ans = ""

    for(let i = 0; i < strArr.length;i++){
        let word = strArr[i]

        let first = word[0].toUpperCase()
        let mid = word.slice(1,word.length-1)
        let last = word[word.length -1].toUpperCase()

        ans += (first+mid+last + " ")
    }
    return ans.trim()
    
}

console.log(checkPref("Hello bhai kaise ho"))


function isAnagram(s1, s2) {

    if(s1.length !== s2.length) return false

    let freq1 ={}
    let freq2 = {}
    
    for(let i = 0; i < s1.length;i++){
        let ch1 = s1[i]
        if(freq1[ch1]){
            freq1[ch1]++
        }else{
            freq1[ch1] = 1
        }
    }

    for(let j = 0; j < s2.length;j++){
        let ch2 = s2[j]
        if(freq2[ch2]){
            freq2[ch2]++
        }else{
            freq2[ch2] = 1
        }
    }

    let char1 = Object.keys(freq1).sort()
    let char2 = Object.keys(freq2).sort()


    if (char1.join("") !== char2.join("")) {
        return false;
    }

    for (let ch of char1) {
        if (freq1[ch] !== freq2[ch]) {
            return false;
        }
    }

    return true;
    
    
}
console.log(isAnagram("listen","silent"))