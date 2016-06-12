var rect = require("./rectangle-1");

function solveRect(l, b){
	console.log("Solving for rectangle with l =", l, "and b =", b);
	if (l < 0 || b < 0){
		console.error(new Error("value must be greater than 0"));
	}
	else {
		console.log("The area of rectangle is", rect.area(l, b));
	}

}

solveRect(2, 4);
solveRect(3, 5);
solveRect(-3, 5);