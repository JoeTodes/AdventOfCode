let options = Konva.stages[0].children[0].children[1].children[4].children;

let data = options.map((o) => {
	return {
		title: o.children[3].textArr[0].text,
		rank: Number(o.children[1].textArr[0].text.slice(0, -2)),
	};
});
