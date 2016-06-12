module.exports = function(l, b, callback){
	try{
		if (l < 0 || b < 0){
			throw new Error("value must be greater than 0");
		}
		else {
			callback(null, {
				perimeter: function(){
					return (2*(l+b));
				},

				area: function(){
					return (l*b);
				}
			})
		}
	}
	catch(error){
		callback(error, null);
	}
}