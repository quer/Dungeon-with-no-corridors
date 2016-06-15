var canvas = document.getElementsByTagName('canvas')[0];
var tileSprit = document.getElementById('maze');
canvas.width = 1020;
canvas.height = 660;
var ctx = canvas.getContext('2d');
ctx.mozImageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.msImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;
var room1MaxSize = 100;
var room1 = new genRoom(room1MaxSize, 3, debug);
var fullArrayOfMap = null;
var offset = {x : 0 , y : 0 , zoom : 0 };
var tile = {size: 10, fullSize: 50, playerScale: 20, mob: 30};
var playerSpeed = 4.0;
var debug = false;
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
	  		if (fullArrayOfMap[xi][yi] == null) {
	  			ctx.fillStyle="orange";
  				ctx.fillRect(x, y, tile.fullSize, tile.fullSize);
	  		}else if(fullArrayOfMap[xi][yi].type == 100){
          ctx.fillStyle="black";
			    ctx.fillRect(x, y, tile.fullSize, tile.fullSize);
	  		}else{
		  		var tilePlace = rendertile(fullArrayOfMap[xi][yi].type);
		  		ctx.drawImage(tileSprit, tilePlace.x, tilePlace.y, tile.size, tile.size, x, y, tile.fullSize, tile.fullSize);
          // render mobs
          for (var mobI = 0; mobI < fullArrayOfMap[xi][yi].mobs.length; mobI++) {
            var mob = fullArrayOfMap[xi][yi].mobs[mobI];
            ctx.fillStyle=mob.color;
            ctx.fillRect(x+mob.x+mob.offset.x, y+mob.y+mob.offset.y, tile.mob, tile.mob);
          }
          ctx.fillText(fullArrayOfMap[xi][yi].mobs.length, x+10, y+tile.fullSize - 10);
				}
			}
	 	}
  };
	//center room
  //ctx.fillStyle="black";
  //ctx.fillRect((canvas.width/2)+((tile.fullSize/100)*tile.playerScale)-1, (canvas.height/2)+((tile.fullSize/100)*tile.playerScale)-1, tile.fullSize-((tile.fullSize/100)*(tile.playerScale*2))+2, tile.fullSize-((tile.fullSize/100)*(tile.playerScale*2))+2);
  
	ctx.fillStyle="#FF0000";
  ctx.fillRect((canvas.width/2)+((tile.fullSize/100)*tile.playerScale), (canvas.height/2)+((tile.fullSize/100)*tile.playerScale), tile.fullSize-((tile.fullSize/100)*(tile.playerScale*2)), tile.fullSize-((tile.fullSize/100)*(tile.playerScale*2)));
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
function collision (type) {
  var offsetX = 0;
  var offsetY = 0;
  if (type == "right") {
    offsetX = playerSpeed;
    offsetY = 0;
  }else if (type == "left") {
    offsetX = -playerSpeed;
    offsetY = 0;
  }else if (type == "up") {
    offsetX = 0;
    offsetY = -playerSpeed;
  }else if (type == "down") {
    offsetX = 0;
    offsetY = playerSpeed;
  }
    ctx.font = '16px sans-serif'
    ctx.textAlign = 'left';
    var imageData = ctx.getImageData((canvas.width/2)+((tile.fullSize/100)*tile.playerScale)+offsetX, (canvas.height/2)+((tile.fullSize/100)*tile.playerScale)+offsetY, tile.fullSize-((tile.fullSize/100)*(tile.playerScale*2))+offsetX, tile.fullSize-((tile.fullSize/100)*(tile.playerScale*2))+offsetY);
    var data = imageData.data;
    for(var i = 0, n = data.length; i < n; i += 4) {
    	var red = data[i];
    	var green = data[i + 1];
    	var blue = data[i + 2];
    	var alpha = data[i + 3];
    	if(red == 40 && green == 40 && blue == 40){
    		ctx.fillText('collision!', 10 , canvas.height - 20);
    		return true;
    	}
    }
    ctx.fillText('no collision', 10 , canvas.height - 20);
    return false;
}
var gameMove = {up: false, down: false, right: false, left: false, zoomOut: false, zoomIn: false};
jQuery(function($) {
	$( "#reload" ).click(function() {
	  loadNewRoom();
	});
  $( "#mazesheat" ).click(function() {
    tileSprit = document.getElementById('maze');
  });
  $( "#tilesheat" ).click(function() {
    tileSprit = document.getElementById('tile');
  });
  $( "#smallplayer" ).click(function() {
    tile.playerScale = 45;
  });
  $( "#normalplayer" ).click(function() {
    tile.playerScale  = 20;
  });
  $( "#bigmapsize" ).click(function() {
    tile.fullSize = 200;
  });
  $( "#normalmapsize" ).click(function() {
    tile.fullSize = 50;
  });
  $( "#game" ).click(function () {
    tile.playerScale = 45;
    tile.mob = 30;
    tile.fullSize = 300;
    room1.loadMob(tile.fullSize, tile.mob);
  });
  loop();
  function loop () {
    if(gameMove.up)
    {
      if (!collision("up")) {
        offset.y -= playerSpeed;
      };
    }
    if(gameMove.left)
    {
      if (!collision("left")) {
        offset.x -= playerSpeed;
      };
    }
    if(gameMove.down)
    {
      if (!collision("down")) {
        offset.y += playerSpeed;
      };
    }
    if(gameMove.right)
    {
      if (!collision("right")) {
        offset.x += playerSpeed;
      };
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
    room1.mobUpdate();
    render();
    var end = Date.now();
    ctx.font = '16px sans-serif'
    ctx.textAlign = 'center';
    ctx.fillText('Rendered in ' + (end - start) + ' ms', canvas.width / 2, canvas.height - 20);
    collision();
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
	debugFun(fullArrayOfMap.join('\n'));
	render();
}
function debugFun (data) {
  if (debug) {
    console.log(data);
  };
}