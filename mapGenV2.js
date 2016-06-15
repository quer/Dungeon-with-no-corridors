function genRoom (arraySize, maxTrin, debug) {
	this.arraySize = arraySize;
	this.debugStatus = debug;
	//pre settings
	this.way = {
		way1 : [7,8,9,10],
		way2 : [2,3,4,5,11,16],
		way3 : [12,13,14,15],
		way4 : [6],
		up: [2,5,6,9,11,12,13,14],
		down: [3,4,6,7,11,12,14,15],
		right: [2,4,6,10,12,13,15,16],
		left: [3,5,6,8,13,14,15,16]
	}
	this.tile = {size: 10, fullSize: 50};
	this.fullArrayOfMap = [];
	this.maxTrin = maxTrin;
	this.debug = function(data) {
		if (this.debugStatus) {
			console.log(data);
		};
	}
	this.gen = function() {
		this.fullArrayOfMap = new Array(Math.floor(this.arraySize));
		for (var i = 0; i < this.fullArrayOfMap.length; i++) {
			this.fullArrayOfMap[i] = new Array(Math.floor(this.arraySize));
		}
		var w = Math.floor(this.arraySize/2);
		var h = Math.floor(this.arraySize/2);
		//var startT = 10;
		//while(startT == 10){
		var startT = Math.floor((Math.random() * 15) + 2);
		//}
		this.fullArrayOfMap[w][h] = new Room(startT);
		this.getNext(w, h, startT, 0);
		
	}
	this.getNext = function (w, h ,t, maxTrin) {
		this.debug(maxTrin);
		var move = {r: false, rt: false, l:false, lt: false, u:false, ut: false, d:false, dt: false};
		if(this.way.right.indexOf(t) > -1 && this.fullArrayOfMap[w+1][h] == null) {
			var newTileType = this.getThisTile(w+1, h);
			if (newTileType != null) {
				this.fullArrayOfMap[w+1][h] = new Room(newTileType);
				this.debug("w:" + (w+1) + " h:" + h + " t:" + newTileType);
				//renderTile(w+1, h, newTileType);
				if (this.way.way1.indexOf(newTileType) == -1 && maxTrin < this.maxTrin) {
					move.r = true;
					move.rt = newTileType;
					//getNext(w+1,h, newTileType, ++maxTrin);
				};
			};
		};
		if(this.way.left.indexOf(t) > -1 && this.fullArrayOfMap[w-1][h] == null) {
			var newTileType = this.getThisTile(w-1, h);
			if (newTileType != null) {
				this.fullArrayOfMap[w-1][h] = new Room(newTileType);
				this.debug("w:" + (w-1) + " h:" + h + " t:" + newTileType);
				//renderTile(w-1, h, newTileType);
				if (this.way.way1.indexOf(newTileType) == -1 && maxTrin < this.maxTrin) {
					move.l = true;
					move.lt = newTileType;
					//getNext(w-1,h, newTileType, ++maxTrin);
				};
			}
		};
		if(this.way.up.indexOf(t) > -1 && this.fullArrayOfMap[w][h-1] == null) {
			var newTileType = this.getThisTile(w, h-1);
			if (newTileType != null) {
				this.fullArrayOfMap[w][h-1] = new Room(newTileType);
				this.debug("w:" + w + " h:" + (h-1) + " t:" + newTileType);
				//renderTile(w, h-1, newTileType);
				if (this.way.way1.indexOf(newTileType) == -1 && maxTrin < this.maxTrin) {
					move.u = true;
					move.ut = newTileType;
					//getNext(w, h-1, newTileType, ++maxTrin);
				};
			}
		};
		if(this.way.down.indexOf(t) > -1 && this.fullArrayOfMap[w][h+1] == null) {
			var newTileType = this.getThisTile(w, h+1);
			if (newTileType != null) {
				this.fullArrayOfMap[w][h+1] = new Room(newTileType);
				this.debug("w:" + w + " h:" + (h+1) + " t:" + newTileType);
				//renderTile(w, h+1, newTileType);
				if (this.way.way1.indexOf(newTileType) == -1 && maxTrin < this.maxTrin) {
					move.d = true;
					move.dt = newTileType;
					//getNext(w, h+1, newTileType, ++maxTrin);
				};
			}
		};
		this.debug("move: " + JSON.stringify(move));
		if (move.r) {
			this.getNext(w+1,h, move.rt, maxTrin);
		};
		if (move.l) {
			this.getNext(w-1,h, move.lt, maxTrin);
		};
		if (move.d) {
			this.getNext(w,h+1, move.dt, maxTrin);
		};
		if (move.u) {
			this.getNext(w,h-1, move.ut, maxTrin);
		};
	}
	this.getWays = function(search) {
		if(this.way.way1.indexOf(search) > -1){
			return 1;
		}
		else if(this.way.way2.indexOf(search) > -1){
			return 2;
		}
		else if(this.way.way3.indexOf(search) > -1){
			return 3;
		}
		else if(this.way.way4.indexOf(search) > -1){
			return 4;
		}
		return false;
	}
	this.getTileWhitWays = function (haveWay, blackList) {
		var arrayBlacklistNr = [];
		var testWay = [];
		var up = true;
		var down = true;
		var right = true;
		var left = true;
		for (var i = 0; i < haveWay.length; i++) {
			if (haveWay[i] == "left") {
				testWay = this.noArrayRemove(testWay, this.way.left);
			};
			if (haveWay[i] == "right") {
				testWay = this.noArrayRemove(testWay, this.way.right);
			};
			if (haveWay[i] == "up") {
				testWay = this.noArrayRemove(testWay, this.way.up);
			};
			if (haveWay[i] == "down") {
				testWay = this.noArrayRemove(testWay, this.way.down);
			};
		};
		//console.log(testWay);
		for (var i = 0; i < blackList.length; i++) {
			if (blackList[i] == "left") {
				arrayBlacklistNr = this.inArrayPush(arrayBlacklistNr, this.way.left);
			};
			if (blackList[i] == "right") {
				arrayBlacklistNr = this.inArrayPush(arrayBlacklistNr, this.way.right);
			};
			if (blackList[i] == "up") {
				arrayBlacklistNr = this.inArrayPush(arrayBlacklistNr, this.way.up);
			};
			if (blackList[i] == "down") {
				arrayBlacklistNr = this.inArrayPush(arrayBlacklistNr, this.way.down);
			};
		};
		//console.log("B: "+ arrayBlacklistNr + " H: " + testWay + " haveWay: "+ haveWay + " blackList: "+ blackList);
		//var saveRemove = testWay.splice(0,testWay.length);
		var newArrayList = testWay.slice();
		for (var i = 0; i < arrayBlacklistNr.length; i++) {
			
			var found = jQuery.inArray(arrayBlacklistNr[i], newArrayList);
			if (found >= 0) {
				newArrayList.splice(found, 1);
			}
		};
		//console.log("getTileWhitWays: " + newArrayList);
		return newArrayList;
	}
	this.inArrayPush = function(arrayList, searchArray) {
		var newArrayList = arrayList.slice();
		for (var i = 0; i < searchArray.length; i++) {
			var found = jQuery.inArray(searchArray[i], newArrayList);
			if (found < 0) {
			    newArrayList.push(searchArray[i]);
			}
		};
		return newArrayList;
	}
	this.noArrayRemove = function(arrayList, searchArray) {
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
	this.getThisTile = function(w, h) {
		var blackList = [];
		var haveWay = [];
		this.debug("h b:" + w + " " + h)
		if (this.fullArrayOfMap[w+1][h] != null) {
			if(this.way.left.indexOf(this.fullArrayOfMap[w+1][h].type) > -1){
				haveWay.push("right");
			}
			else
			{
				blackList.push("right");
			}
		};
		if (this.fullArrayOfMap[w][h+1] != null) {
			if(this.way.up.indexOf(this.fullArrayOfMap[w][h+1].type) > -1){
				haveWay.push("down");
			}
			else
			{
				blackList.push("down");
			}
		};
		if (this.fullArrayOfMap[w-1][h] != null) {
			if(this.way.right.indexOf(this.fullArrayOfMap[w-1][h].type) > -1){
				haveWay.push("left");
			}
			else
			{
				blackList.push("left");
			}
		};
		if (this.fullArrayOfMap[w][h-1] != null) {
			if(this.way.down.indexOf(this.fullArrayOfMap[w][h-1].type) > -1){
				haveWay.push("up");
			}
			else
			{
				blackList.push("up");
			}
		};
		if (haveWay.length > 0) {
			var thisTypeTile = this.getTileWhitWays(haveWay, blackList);
			this.debug("thisTypeTile: " + thisTypeTile);
			var returnType = Math.floor((Math.random() * (thisTypeTile.length-1)) + 0);
			return thisTypeTile[returnType];
		}else{
			this.debug("fail");
			//renderTile(w, h, 25);
			return null;
		}
	}
	this.getThisTileEnd = function(w, h) {
		var blackList = [];
		var haveWay = [];
		this.debug("h b:" + w + " " + h)
		if (this.fullArrayOfMap[w+1][h] != null) {
			if(this.way.left.indexOf(this.fullArrayOfMap[w+1][h].type) > -1){
				haveWay.push("right");
			}
			else
			{
				blackList.push("right");
			}
		};
		if (this.fullArrayOfMap[w][h+1] != null) {
			if(this.way.up.indexOf(this.fullArrayOfMap[w][h+1].type) > -1){
				haveWay.push("down");
			}
			else
			{
				blackList.push("down");
			}
		};
		if (this.fullArrayOfMap[w-1][h] != null) {
			if(this.way.right.indexOf(this.fullArrayOfMap[w-1][h].type) > -1){
				haveWay.push("left");
			}
			else
			{
				blackList.push("left");
			}
		};
		if (this.fullArrayOfMap[w][h-1] != null) {
			if(this.way.down.indexOf(this.fullArrayOfMap[w][h-1].type) > -1){
				haveWay.push("up");
			}
			else
			{
				blackList.push("up");
			}
		};
		if (haveWay.length > 0) {
			var thisTypeTile = getTileWhitWays(haveWay, blackList);
			this.debug("thisTypeTile: " + thisTypeTile);
			var returnType = thisTypeTile.length-1;
			return thisTypeTile[returnType];
		}else{
			//renderTile(w, h, 25);
			return null;
		}
	}
	this.loadMob = function (tileFullSize, mobSize) {
		if(this.fullArrayOfMap != null){
			for (var xi = 0; xi < this.fullArrayOfMap.length; xi++) {
		        for (var yi = 0; yi < this.fullArrayOfMap[xi].length; yi++) {
		          if (this.fullArrayOfMap[xi][yi] != null) {
		            
		            this.fullArrayOfMap[xi][yi].load(tile.fullSize, tile.mob);
		            console.log("done load mobs");
		          };
		        }
	        }
	    }
	}
	this.mobUpdate = function () {
		if(this.fullArrayOfMap != null){
			for (var xi = 0; xi < this.fullArrayOfMap.length; xi++) {
		        for (var yi = 0; yi < this.fullArrayOfMap[xi].length; yi++) {
		          if (this.fullArrayOfMap[xi][yi] != null) {
		            
		            this.fullArrayOfMap[xi][yi].update();
		            
		          };
		        }
	        }
	    }
	}
}