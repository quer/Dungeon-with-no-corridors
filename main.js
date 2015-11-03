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
var offset = {x : 0 , y : 0 , zoom : 0 };
var tile = {size: 10, fullSize: 50};

function render () {
	//clear old render
	ctx.save();
    ctx.translate(0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  	//show all rooms
  	if (fullArrayOfMap != null) {
	  	for (var xi = 0; xi < fullArrayOfMap.length; xi++) {
			for (var yi = 0; yi < fullArrayOfMap[xi].length; yi++) {
		  		var x = xi*tile.fullSize-((room1MaxSize/2)*tile.fullSize)+(canvas.width/2)-offset.x;
		  		var y = yi*tile.fullSize-((room1MaxSize/2)*tile.fullSize)+(canvas.height/2)-offset.y;

		  		if (fullArrayOfMap[xi][yi] == 100) {
		  			ctx.fillStyle="black";
					ctx.fillRect(x, y, tile.fullSize, tile.fullSize);
		  		}else if(fullArrayOfMap[xi][yi] == null){
		  			/*ctx.beginPath();
	                ctx.strokeStyle="orange";
	                ctx.rect(xi*tile.fullSize-((room1MaxSize/2)*tile.fullSize)+(canvas.width/2), yi*tile.fullSize-((room1MaxSize/2)*tile.fullSize)+(canvas.height/2), tile.fullSize, tile.fullSize);
	                ctx.stroke();*/
					ctx.fillStyle="orange";
					ctx.fillRect(x, y, tile.fullSize, tile.fullSize);
		  		}else{
			  		var tilePlace = rendertile(fullArrayOfMap[xi][yi]);
			  		ctx.drawImage(tileSprit, tilePlace.x, tilePlace.y, tile.size, tile.size, x, y, tile.fullSize, tile.fullSize);
				}
			}
	  	}
  	};
  	//center room
  	ctx.fillStyle="#FF0000";
	ctx.fillRect((canvas.width/2)+((tile.fullSize/100)*20)-offset.x, (canvas.height/2)+((tile.fullSize/100)*20)-offset.y ,tile.fullSize-((tile.fullSize/100)*40),tile.fullSize-((tile.fullSize/100)*40));
	
  	ctx.restore();
}

function rendertile (px) {
	if (px > 15) {
		return {x: (px*10)-160, y: 30};
	}else if (px > 10) {
		return {x: (px*10)-110, y: 20};
	}else if (px > 5) {
		return {x: (px*10)-60, y: 10};
	}else{
		return {x: (px*10)-10, y: 0};
	}
}
var gameMove = {up: false, down: false, right: false, left: false, zoomOut: false, zoomIn: false};
jQuery(function($) {
	$( "#reload" ).click(function() {
	  loadNewRoom();
	});
  loop();
  function loop () {
    if(gameMove.up)
    {
      offset.y -= 4.0;
    }
    if(gameMove.left)
    {
      offset.x -= 4.0;
    }
    if(gameMove.down)
    {
      offset.y += 4.0;
    }
    if(gameMove.right)
    {
      offset.x += 4.0;
    }
    if(gameMove.zoomOut)
    {
      //offset.zoom += 1;
      tile.fullSize -= 1;
    }
    if(gameMove.zoomIn)
    {
    	tile.fullSize += 1;
      //offset.zoom += 1;
    }
    var start = Date.now();
    render();
    var end = Date.now();
    ctx.font = '16px sans-serif'
    ctx.textAlign = 'center';
    ctx.fillText('Rendered in ' + (end - start) + ' ms', canvas.width / 2, canvas.height - 20);

    window.setTimeout(loop, 33);
  }
});

$(window).keyup(function(key) {
  	if(key.keyCode == 38)
  	{
    	gameMove.up = false;
  	}
  	if(key.keyCode == 37)
  	{
    	gameMove.left = false;
  	}
  	if(key.keyCode == 39)
  	{
    	gameMove.right = false;
  	}
  	if(key.keyCode == 40)
  	{
    	gameMove.down = false;
	}
	if(key.keyCode == 107)
  	{
    	gameMove.zoomIn = false;
	}
	if(key.keyCode == 109)
  	{
    	gameMove.zoomOut = false;
	}
});
$(window).keydown(function(key) {
	if(key.keyCode == 38)
  	{
    	gameMove.up = true;
  	}
  	if(key.keyCode == 37)
  	{
    	gameMove.left = true;
  	}
  	if(key.keyCode == 39)
  	{
    	gameMove.right = true;
  	}
  	if(key.keyCode == 40)
  	{
    	gameMove.down = true;
	}
	if(key.keyCode == 107)
  	{
    	gameMove.zoomIn = true;
	}
	if(key.keyCode == 109)
  	{
    	gameMove.zoomOut = true;
	}
});
function loadNewRoom() {
	room1.gen();
	offset.x = 0;
	offset.y = 0;
	fullArrayOfMap = room1.fullArrayOfMap;
	console.log(fullArrayOfMap.join('\n'));
	render();
}