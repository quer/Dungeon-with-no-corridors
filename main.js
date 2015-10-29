var canvas = document.getElementsByTagName('canvas')[0];
var tileSprit = document.getElementById('tile');
canvas.width = 1020;
canvas.height = 660;
var ctx = canvas.getContext('2d');
var tile = {size: 10, fullSize: 50};
var way = {
	way1 : [7,8,9,10],
	way2 : [2,3,4,5],
	way3 : [12,13,14,15],
	way4 : [6],
	up: [2,5,6,9,12,13,14],
	down: [3,4,6,7,12,14,15],
	right: [2,4,6,10,12,13,15],
	left: [3,5,6,8,13,14,15]
}
var arraySize = canvas.width/tile.fullSize;
ctx.mozImageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.msImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;
var fullArrayOfMap;
function render () {
  for (var xi = 0; xi < fullArrayOfMap.length; xi++) {
	for (var yi = 0; yi < fullArrayOfMap[xi].length; yi++) {

	  var tilePlace = rendertile2(fullArrayOfMap[xi][yi]);
	  ctx.drawImage(tileSprit, tilePlace.x, tilePlace.y, tile.size, tile.size, xi*tile.fullSize, yi*tile.fullSize, tile.fullSize, tile.fullSize);
	}
  }
}

//var maxTrin = 0;
jQuery(function($) {
	//done();
	//render();
	$( "#reload" ).click(function() {
	  done();
	});
});
function done () {
	fullArrayOfMap = [];
	fullArrayOfMap = new Array(Math.floor(arraySize));
	for (var i = 0; i < fullArrayOfMap.length; i++) {
		fullArrayOfMap[i] = new Array(Math.floor(arraySize));
	}
	//ctx.save();
    //ctx.translate(0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
	var w = Math.floor(arraySize/2);
	var h = Math.floor(arraySize/2);
	var startT = Math.floor((Math.random() * 15) + 1);
	console.log("w:" + (w) + " h:" + h + " t:" + startT);
	fullArrayOfMap[w][h] = startT;
	renderTile(w, h, startT);
	getNext(w, h, startT,0);
	ctx.fillStyle="#FF0000";
	ctx.fillRect((w *tile.fullSize)+10,(h*tile.fullSize)+10,tile.fullSize-20,tile.fullSize-20);
	console.log(fullArrayOfMap.join('\n'));
	//ctx.restore();
}
function rendertile2 (px) {
	if (px > 10) {
		return {x: (px*10)-110, y: 20};
	}else if (px > 5) {
		return {x: (px*10)-60, y: 10};
	}else{
		return {x: (px*10)-10, y: 0};
	}
}
function getNext(w, h ,t, maxTrin){
	console.log(maxTrin);
	var move = {r: false, rt: false, l:false, lt: false, u:false, ut: false, d:false, dt: false};
	if(way.right.indexOf(t) > -1 && fullArrayOfMap[w+1][h] == null) {
		var newTileType = getThisTile(w+1, h);
		if (newTileType != null) {
			fullArrayOfMap[w+1][h] = newTileType;
			console.log("w:" + (w+1) + " h:" + h + " t:" + newTileType);
			renderTile(w+1, h, newTileType);
			if (way.way1.indexOf(newTileType) == -1 && maxTrin < 10) {
				move.r = true;
				move.rt = newTileType;
				//getNext(w+1,h, newTileType, ++maxTrin);
			};
		};
	};
	if(way.left.indexOf(t) > -1 && fullArrayOfMap[w-1][h] == null) {
		var newTileType = getThisTile(w-1, h);
		if (newTileType != null) {
			fullArrayOfMap[w-1][h] = newTileType;
			console.log("w:" + (w-1) + " h:" + h + " t:" + newTileType);
			renderTile(w-1, h, newTileType);
			if (way.way1.indexOf(newTileType) == -1 && maxTrin < 10) {
				move.l = true;
				move.lt = newTileType;
				//getNext(w-1,h, newTileType, ++maxTrin);
			};
		}
	};
	if(way.up.indexOf(t) > -1 && fullArrayOfMap[w][h-1] == null) {
		var newTileType = getThisTile(w, h-1);
		if (newTileType != null) {
			fullArrayOfMap[w][h-1] = newTileType;
			console.log("w:" + w + " h:" + (h-1) + " t:" + newTileType);
			renderTile(w, h-1, newTileType);
			if (way.way1.indexOf(newTileType) == -1 && maxTrin < 10) {
				move.u = true;
				move.ut = newTileType;
				//getNext(w, h-1, newTileType, ++maxTrin);
			};
		}
	};
	if(way.down.indexOf(t) > -1 && fullArrayOfMap[w][h+1] == null) {
		var newTileType = getThisTile(w, h+1);
		if (newTileType != null) {
			fullArrayOfMap[w][h+1] = newTileType;
			console.log("w:" + w + " h:" + (h+1) + " t:" + newTileType);
			renderTile(w, h+1, newTileType);
			if (way.way1.indexOf(newTileType) == -1 && maxTrin < 10) {
				move.d = true;
				move.dt = newTileType;
				//getNext(w, h+1, newTileType, ++maxTrin);
			};
		}
	};
	console.log("move: " + JSON.stringify(move));
	if (move.r) {
		getNext(w+1,h, move.rt, maxTrin);
	};
	if (move.l) {
		getNext(w-1,h, move.lt, maxTrin);
	};
	if (move.d) {
		getNext(w,h+1, move.dt, maxTrin);
	};
	if (move.u) {
		getNext(w,h-1, move.ut, maxTrin);
	};
	//return;
	
}
function renderTile (w, h ,t) {
	if (t >= 20) {
		ctx.fillStyle="#FFFF00";
		ctx.fillRect(w *tile.fullSize, h*tile.fullSize ,tile.fullSize, tile.fullSize);
	}else{
		var tilePlace = rendertile2(t);
		ctx.drawImage(tileSprit, tilePlace.x, tilePlace.y, tile.size, tile.size, w*tile.fullSize, h*tile.fullSize, tile.fullSize, tile.fullSize);
	}
}

function getWays (search) {
	if(way.way1.indexOf(search) > -1){
		return 1;
	}
	else if(way.way2.indexOf(search) > -1){
		return 2;
	}
	else if(way.way3.indexOf(search) > -1){
		return 3;
	}
	else if(way.way4.indexOf(search) > -1){
		return 4;
	}
	return false;
}

function getTileWhitWays (haveWay, blackList) {
	var arrayBlacklistNr = [];
	var testWay = [];
	var up = true;
	var down = true;
	var right = true;
	var left = true;
	for (var i = 0; i < haveWay.length; i++) {
		if (haveWay[i] == "left") {
			testWay = noArrayRemove(testWay,way.left);
		};
		if (haveWay[i] == "right") {
			testWay = noArrayRemove(testWay,way.right);
		};
		if (haveWay[i] == "up") {
			testWay = noArrayRemove(testWay,way.up);
		};
		if (haveWay[i] == "down") {
			testWay = noArrayRemove(testWay,way.down);
		};
	};
	//console.log(testWay);
	for (var i = 0; i < blackList.length; i++) {
		if (blackList[i] == "left") {
			arrayBlacklistNr = inArrayPush(arrayBlacklistNr, way.left);
		};
		if (blackList[i] == "right") {
			arrayBlacklistNr = inArrayPush(arrayBlacklistNr, way.right);
		};
		if (blackList[i] == "up") {
			arrayBlacklistNr = inArrayPush(arrayBlacklistNr, way.up);
		};
		if (blackList[i] == "down") {
			arrayBlacklistNr = inArrayPush(arrayBlacklistNr, way.down);
		};
	};
	console.log("B: "+ arrayBlacklistNr + " H: " + testWay + " haveWay: "+ haveWay + " blackList: "+ blackList);
	//var saveRemove = testWay.splice(0,testWay.length);
	var newArrayList = testWay.slice();
	for (var i = 0; i < arrayBlacklistNr.length; i++) {
		
		var found = jQuery.inArray(arrayBlacklistNr[i], newArrayList);
		if (found >= 0) {
			newArrayList.splice(found, 1);
		}
	};
	console.log("getTileWhitWays: " + newArrayList);
	return newArrayList;
}

function inArrayPush(arrayList, searchArray) {
	var newArrayList = arrayList.slice();
	for (var i = 0; i < searchArray.length; i++) {
		var found = jQuery.inArray(searchArray[i], newArrayList);
		if (found < 0) {
		    newArrayList.push(searchArray[i]);
		}
	};
	return newArrayList;
}
function noArrayRemove (arrayList, searchArray) {
	var testOutput = [];
  if (arrayList.length > 0) {
		for (var i = 0; i < searchArray.length; i++) {
			var found = jQuery.inArray(searchArray[i], arrayList);
			if (found != -1) {
			    testOutput.push(searchArray[i]);
			}
		};
	}
	else
	{
		testOutput = searchArray;
	}
	return testOutput;
}
function getThisTile (w, h) {
	var blackList = [];
	var haveWay = [];
	console.log("h b:" + w + " " + h)
	if (fullArrayOfMap[w+1][h] != null) {
		if(way.left.indexOf(fullArrayOfMap[w+1][h]) > -1){
			haveWay.push("right");
		}
		else
		{
			blackList.push("right");
		}
	};
	if (fullArrayOfMap[w][h+1] != null) {
		if(way.up.indexOf(fullArrayOfMap[w][h+1]) > -1){
			haveWay.push("down");
		}
		else
		{
			blackList.push("down");
		}
	};
	if (fullArrayOfMap[w-1][h] != null) {
		if(way.right.indexOf(fullArrayOfMap[w-1][h]) > -1){
			haveWay.push("left");
		}
		else
		{
			blackList.push("left");
		}
	};
	if (fullArrayOfMap[w][h-1] != null) {
		if(way.down.indexOf(fullArrayOfMap[w][h-1]) > -1){
			haveWay.push("up");
		}
		else
		{
			blackList.push("up");
		}
	};
	if (haveWay.length > 0) {
		var thisTypeTile = getTileWhitWays(haveWay, blackList);
		console.log("thisTypeTile: " + thisTypeTile);
		var returnType = Math.floor((Math.random() * (thisTypeTile.length-1)) + 0);
		return thisTypeTile[returnType];
	}else{
		console.log("fail");
		renderTile(w, h, 25);
		return null;
	}
}
function getThisTileEnd (w, h) {
	var blackList = [];
	var haveWay = [];
	console.log("h b:" + w + " " + h)
	if (fullArrayOfMap[w+1][h] != null) {
		if(way.left.indexOf(fullArrayOfMap[w+1][h]) > -1){
			haveWay.push("right");
		}
		else
		{
			blackList.push("right");
		}
	};
	if (fullArrayOfMap[w][h+1] != null) {
		if(way.up.indexOf(fullArrayOfMap[w][h+1]) > -1){
			haveWay.push("down");
		}
		else
		{
			blackList.push("down");
		}
	};
	if (fullArrayOfMap[w-1][h] != null) {
		if(way.right.indexOf(fullArrayOfMap[w-1][h]) > -1){
			haveWay.push("left");
		}
		else
		{
			blackList.push("left");
		}
	};
	if (fullArrayOfMap[w][h-1] != null) {
		if(way.down.indexOf(fullArrayOfMap[w][h-1]) > -1){
			haveWay.push("up");
		}
		else
		{
			blackList.push("up");
		}
	};
	if (haveWay.length > 0) {
		var thisTypeTile = getTileWhitWays(haveWay, blackList);
		console.log("thisTypeTile: " + thisTypeTile);
		var returnType = thisTypeTile.length-1;
		return thisTypeTile[returnType];
	}else{
		renderTile(w, h, 25);
		return null;
	}
}