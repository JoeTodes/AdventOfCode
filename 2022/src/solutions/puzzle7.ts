import { parseInputBySymbol } from "../util";

const input = parseInputBySymbol("07.txt", "$ ")
	.filter((line) => line)
	.map((line) => {
		line = line.trim();
		if (line.startsWith("cd")) {
			return line.split(" ");
		} else if (line.startsWith("ls")) {
			return line.split("\n");
		}
	});

let flat: {
	path: string;
	parent: string;
	files: { name: string; size: number }[];
	dirs: string[];
	totalSize?: number;
}[] = [];
let current: string[] = ["/"];

input.forEach((line) => {
	if (line[0] == "cd") {
		switch (line[1]) {
			case "/":
				current = ["/"];
				break;
			case "..":
				current.pop();
				break;
			default:
				current.push(line[1]);
				break;
		}
	} else if (line[0] == "ls") {
		flat.push({
			path: "/" + current.slice(1).join("/"),
			parent: "/" + current.slice(1, -1).join("/"),
			files: line
				.slice(1)
				.filter((file) => !file.startsWith("dir "))
				.map((file) => {
					let [size, name] = file.split(" ");
					return { name, size: Number(size) };
				}),
			dirs: line
				.slice(1)
				.filter((file) => file.startsWith("dir "))
				.map(
					(dir) => "/" + [...current, dir.slice(4)].slice(1).join("/")
				),
		});
	}
});

function getDirSize(path: string): number {
	let dir = flat.find((dir) => dir.path == path);
	let filesSize = dir.files.reduce((acc, cur) => acc + cur.size, 0);
	let totalSize =
		filesSize +
		dir.dirs.reduce((acc, cur) => acc + getDirSize(cur), 0);
	dir.totalSize = totalSize;
	return totalSize;
}

const usedSpace = getDirSize("/");

// part1 answer:
// console.log(
// 	flat
// 	.filter((dir) => dir.totalSize <= 100000)
// 	.reduce((acc, cur) => acc + cur.totalSize, 0);
// );
const totalSpace = 70000000;
const requiredSpace = 30000000;
const amountNeeded = requiredSpace - (totalSpace - usedSpace);

//part2 answer:
console.log(
	flat
		.filter((dir) => dir.totalSize >= amountNeeded)
		.sort((a, b) => a.totalSize - b.totalSize)[0].totalSize
);
