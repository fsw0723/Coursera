var rect = require("./rectangle-2.js");

function solveRect(l, b){
	console.log("Solving for rectangle with l =", l, "and b =", b);

	rect(l, b, function(error, rectangle){
		if(error){
			console.log(error);
		}else {
			console.log("The area of rectangle is", rectangle.area());
			console.log("The perimeter of rectangle is", rectangle.perimeter());
		}
	})
}

solveRect(2, 4);
solveRect(3, 5);
solveRect(-3, 5);