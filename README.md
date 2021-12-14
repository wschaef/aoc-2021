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

### day 9

#### technology
- lodash: used sum,uniq. Uniq worked as expected by comparing Objects by value
- type system cost me a lot of time, because even if I check if a value is undefined the assignment is blocked do to type. Especially array.find() functions provides this kind of disadvantage

#### solution
- part 1 quick and durty
- part 2 is optimzed for clear code, but there for sure further optimizations on execution runtime. I will not invest more time on it due to execution being < 40ms on Mac M1

### day 10

#### technology
- sort() on number[] does not work!
- Map is best for creating dictinaries, but I had to convice the compiler, that there is alwais a match. Hmm how to make it better without cast?
- array is also a stack (push,pop)

### day 11

#### technology
- no lodash today required
- had a look on some algorithm libraries in ts. Can be usefull, but bad documented. I doubt if using them cost me more time to understand how to use in comparison to time saved by using them.
- 2D board with neighbours is a good pattern to be reused  
- typing costs me to much time! e.g. array[x][y]
- Today I used Windows machine with windows keyboard. Switching between Mac and Windows is still not painless. 

#### solution
- mostly reuse the same structure as day 11
- second part was just a small modifcation of pfirst part.

## day12

#### technology
- lodash: uniq
- Map for dictinary requires cast even if it is 100% not possible having undefined as type. 
- I have spent 30 minutes on parsing data and put it to Vertexes -> again effort with dictionary syntax
- lookup on Set was 20 times more performant than lookup on list (25sec -> 1.2sec)
- ideas to improve: coloring braces plugin in vscode, quick log plugin in vscode, autoformat on save
- typing is still far too slow
- idea: first type the implementation of a function and then refactor it to be a separate function -> less work on typing the right signature

#### solutions
- create first vertexes then add neigbours is a good pattern. 
- saving neigbours in the vertex makes the algorithm more local and simpler
- the solution is basicaly a DFS (deep fist search) with custom visiting rules
- would a graph lib providing the default DFS save time?
- second part misuderstood twice -> lost 1,5 hours on working for solution for a wrong problem
- overall effort 2,5 hours

### Day 13

#### technology
- lodash: clone, uniq
- long split, map, .. lines are hard to debug
- pattern idea: print a board (2d array) by passing a closure
- pattern idea: transfer list of coordinates to 2d board
- colored braces helped a bit
- better log plugin used some times
- MS AI plugin was not helpfull -> lets keep it for while

#### solutions
- algorithm was easy to get, but debug and visualisation was an issue.
- I've lost time on parsing too much
- I did not implement an OCR on the output in second part ;-)