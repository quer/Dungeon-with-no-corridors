var canvas = document.getElementsByTagName('canvas')[0];
var tileSprit = document.getElementById('tile');
canvas.width = 1020;
canvas.height = 660;
var ctx = canvas.getContext('2d');
ctx.mozImageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.msImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;
var room1MaxSize = 100;
var room1 = new genRoom(room1MaxSize);
var fullArrayOfMap = null;
var tile = {size: 10, fullSize: 50};

function render () {
	ctx.save();
    ctx.translate(0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  	
  	for (var xi = 0; xi < fullArrayOfMap.length; xi++) {
		for (var yi = 0; yi < fullArrayOfMap[xi].length; yi++) {
	  		var tilePlace = rendertile(fullArrayOfMap[xi][yi]);
	  		ctx.drawImage(tileSprit, tilePlace.x, tilePlace.y, tile.size, tile.size, xi*tile.fullSize-((room1MaxSize/2)*tile.fullSize)+(canvas.width/2), yi*tile.fullSize-((room1MaxSize/2)*tile.fullSize)+(canvas.height/2), tile.fullSize, tile.fullSize);
		}
  	}
  	ctx.restore();
}

function rendertile (px) {
	if (px > 10) {
		return {x: (px*10)-110, y: 20};
	}else if (px > 5) {
		return {x: (px*10)-60, y: 10};
	}else{
		return {x: (px*10)-10, y: 0};
	}
}
jQuery(function($) {
	$( "#reload" ).click(function() {
	  loadNewRoom();
	});
});
function loadNewRoom() {
	room1.gen();
	fullArrayOfMap = room1.fullArrayOfMap;
	console.log(fullArrayOfMap.join('\n'));
	render();
}