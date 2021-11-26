import * as fs from 'fs';

console.info("\n###### Challenge 1 #######")
console.time("execution")

const input = fs.readFileSync('input1.txt','utf8');
const lines = input.split(',')

const result = lines
console.log("RESULT :", result)
console.timeEnd("execution")
console.log("##########################")  
 