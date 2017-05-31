class Utils {
	constructor(name){
		this.name = name;
	}

	sayHello(){
		console.log('Hi! I\' m ' + this.name + '.');
	}
}

module.exports = Utils;