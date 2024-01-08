let blockStart = 3204387391;
let blockRange = 23376095;

let case1 = {
	start: 3171914694,
	range: 34259798,
	dest: 1138228493,
};

let offset = case1.dest - case1.start;
let newStart1 = blockStart + offset;
console.log(blockStart + offset);
let newRange1 = case1.start + case1.range - blockStart;
console.log(case1.start + case1.range - blockStart);
let newStart2 = blockStart + newRange1;
console.log(blockStart + newRange1);
let newRange2 = blockRange - newRange1;
console.log(newRange2);
