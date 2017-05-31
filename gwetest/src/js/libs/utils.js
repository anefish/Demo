class Utils {
	constructor(name){
		this.name = name;
	}

	sayHello(){
		console.log('Hello! I\' m ' + this.name + '.');
	}
}

module.exports = Utils;