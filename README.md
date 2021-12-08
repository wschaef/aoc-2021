# aoc-2021

## My learnings 

### day 01 & 02

#### technology
- A year not using Typescript forced me to search for right syntax!
- Participating in aoc in last years helps a lot. 
- Having good template is a key! 

### day 03

#### technology
- Lets try lodash! Does it really better than JS native collection API

### day 04

#### technology
- Having classes was a good idea, because the code was better readable and it was easier to reuse part 1 in part 2.
- Spending time for visualisation helped on debugging
- It is a trade of between having classes vs use collections only. Classes make code more readable, but there is an effort for visualisation and having a bit more complex code due to types.

#### solution
- the idea to save lastWonNumber was the key to reuse the solution of part 1

### day 05

#### technology
- not having classes was a good idea. Visualisation out of the box. 
- destructuring in JavaScript helped not having classes 
- lodash used (range)
- Still not sure about pattern how to use lodash: chain and stay with lowdash vs. use lodash locally. More tendence towards second option
- 
#### solution
- a hint about second part inside the first part helped having solution be easy extendable to sencond part 
- calculation of the board size can be improved by caculating from,to vertical and horizontal instead of widht only

### day 06

#### technology
- lodash helped today (range,chain,sum,groupBy) but more locally

#### solution
- Data structure matters! It is worth to spend few minutes more on having a good data structure.
- Try to calculate the result by Math only was to complicated.

### day 07

#### technology
- lodash used (sum,range)

#### solution
- the obvoius solution is good enough (35ms on a Mac M1)
- possible optimisation to reduce the rage of potential points by using math

### day 08

#### technology
- I got troubles with combination of Map, Tuple, Dictionary. Finaly having type validChannel was the key to get to readable code

#### solution
- was trying to solve part 1 without understanding that it was not required to translate, but just counting
- part 2 started solving by some analytics and then iterations by removing single signals from segments
- then got the idea using unique number of occurencies of b,e,f and then it was completly sovled without iterations
- spent about 3h