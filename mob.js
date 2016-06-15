var Mob = function (roomSize, mobSize) {
	this.speed = Math.floor((Math.random() * 5) + 2);
	this.realRoomSize = roomSize; 
	this.roomSize = roomSize*0.80;
	this.mobSize = mobSize;
	/**
	 * 1 small meli (skal røre ved dig)
	 * 2 mellem meli (skal røre ved dig)
	 * 3 stor meli (skal røre ved dig)
	 * 4 range kan kun skyde 1 skud
	 * 5 range kan kun skyde 2 skud
	 */
	this.type = Math.floor((Math.random() * 5) + 1);
	this.radius = 8; //pixels
	this.x = Math.floor(this.realRoomSize/2);
	this.y = Math.floor(this.realRoomSize/2);
	this.maxpludsSize = Math.floor(this.roomSize/2);
	this.maxminusSize = Math.floor(this.roomSize/2) - this.mobSize+1;
	this.offset = {
		x: Math.floor((Math.random() * (this.maxpludsSize+this.maxminusSize)) - (this.maxpludsSize)),
		y: Math.floor((Math.random() * (this.maxpludsSize+this.maxminusSize)) - (this.maxpludsSize))
	}
	this.colors = ["#00ff00","#0000ff","#ffff00","#ff00ff","#ff0066"];
	this.color = this.colors[this.type-1];
	this.moveTo = null;
	this.update = function () {
		if ((Math.random()*100) > 45) {
			if (this.moveTo != null) {
				if (this.offset.x < this.moveTo.x + 7 && 
					this.offset.x + 7 > this.moveTo.x &&
					this.offset.y < this.moveTo.y + 7 &&
					 this.offset.y + 7 > this.moveTo.y) {
					console.log("new poss");
					this.getNewPoss();
				}else{
					if (this.offset.x > this.moveTo.x) {
						this.offset.x -= this.speed;
					}else{
						this.offset.x += this.speed;
					}
					if (this.offset.y > this.moveTo.y) {
						this.offset.y -= this.speed;
					}else{
						this.offset.y += this.speed;
					}
					/*if (this.offset.x - this.moveTo.x >= 0 && this.offset.y - this.moveTo.y >= 0) {
						var height = this.offset.y - this.moveTo.y;
						var width = this.offset.x - this.moveTo.x;
						var yBigger = height / width;
						var xBigger = width / height;
						if (yBigger > 0) {
							this.offset.x -= this.speed;
							this.offset.y -= Math.floor(this.speed * yBigger);
						}else{
							this.offset.x -= Math.floor(this.speed * xBigger);
							this.offset.y -= this.speed;
						}
					}else if (this.offset.x - this.moveTo.x >= 0 && this.offset.y - this.moveTo.y <= 0) {
						var height = this.moveTo.y - this.offset.y;
						var width = this.offset.x - this.moveTo.x;
						var yBigger = height / width;
						var xBigger = width / height;
						if (yBigger > 0) {
							this.offset.x -= this.speed;
							this.offset.y += Math.floor(this.speed * yBigger);
						}else{
							this.offset.x -= Math.floor(this.speed * xBigger);
							this.offset.y += this.speed;
						}
					}else if (this.offset.x - this.moveTo.x <= 0 && this.offset.y - this.moveTo.y >= 0) {
						var height = this.offset.y - this.moveTo.y;
						var width = this.moveTo.x - this.offset.x;
						var yBigger = height / width;
						var xBigger = width / height;
						if (yBigger > 0) {
							this.offset.x += this.speed;
							this.offset.y -= Math.floor(this.speed * yBigger);
						}else{
							this.offset.x += Math.floor(this.speed * xBigger);
							this.offset.y -= this.speed;
						}
					}else if (this.offset.x - this.moveTo.x <= 0 && this.offset.y - this.moveTo.y <= 0) {
						var height = this.moveTo.y - this.offset.y;
						var width = this.moveTo.x - this.offset.x;
						var yBigger = height / width;
						var xBigger = width / height;
						if (yBigger > 0) {
							this.offset.x += this.speed;
							this.offset.y += Math.floor(this.speed * yBigger);
						}else{
							this.offset.x += Math.floor(this.speed * xBigger);
							this.offset.y += this.speed;
						}
					}else{
						this.getNewPoss();
					}*/
					//var xWidth = this.x - this.moveTo.x > 0 ? this.x - this.moveTo.x : this.moveTo.x - this.x;
					//var yheight = this.y - this.moveTo.y > 0 ? this.y - this.moveTo.y : this.moveTo.y - this.y;
					/*
					var lookUpX = this.offset.x + this.maxpludsSize;
					var ToX = this.moveTo.x + this.maxpludsSize;
					var lookUpY = this.offset.y + this.maxpludsSize;
					var ToY = this.moveTo.y + this.maxpludsSize;

					var height = lookUpY - ToY;
					var width = lookUpX- ToX;
					var yBigger = height / width;
					var xBigger = width / height;

					//console.log("height" + height + "width" + width + "yBigger" + yBigger + "xBigger" + xBigger);
					if (yBigger >= 1) {
						this.offset.x -= this.speed;
						this.offset.y -= Math.floor(this.speed * yBigger);
					}else{
						this.offset.x -= Math.floor(this.speed * xBigger);
						this.offset.y -= this.speed;
					}*/
				}
			}else{
				this.getNewPoss();
			}
		};
	}
	this.getNewPoss = function () {
		this.speed = Math.floor((Math.random() * 5) + 2);
		this.moveTo = {
			x: Math.floor((Math.random() * (this.maxpludsSize+this.maxminusSize)) - (this.maxpludsSize)),
			y: Math.floor((Math.random() * (this.maxpludsSize+this.maxminusSize)) - (this.maxpludsSize))
		}
	}
}