var Room = function (type) {
	this.type = type;
	this.mobsAmount = 0;
	this.mobs = [];
	this.load = function (roomSize, mobSize) {
		this.mobsAmount = Math.floor((Math.random() * 3) + 0);
		for (var i = 0; i < this.mobsAmount; i++) {
			this.mobs.push(new Mob(roomSize, mobSize));
		};
	}
	this.update = function () {
		for (var i = 0; i < this.mobs.length; i++) {
			this.mobs[i].update();
		};
	}
	this.render = function (canvas, x, y) {
		// body...
	}
}