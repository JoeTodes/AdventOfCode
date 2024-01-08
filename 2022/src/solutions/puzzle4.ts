import { parseInputBySymbol, range } from "../util";

const partA = parseInputBySymbol("04.txt")
	.filter((line) => line)
	.map((pair) => {
		let [first, second] = pair
			.split(",")
			.map((side) => side.split("-").map((e) => Number(e)))
			.map((side) => range(side[0], side[1]));
		return [first, second];
	})
	.filter((pair) =>
		pair[0].some((i) => i >= pair[1][0] && i <= pair[1].at(-1))
	);

console.log(partA.length);
