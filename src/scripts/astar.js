define(['./ds'], function(ds){

	function getPossiblePositions(grid, pos){
		var connections = [];
		var totalRow = grid.length;
		var totalColumn = grid[0].length;

		if(pos.row > 0 && grid[pos.row-1][pos.column]==0){
			connections.push({row:pos.row-1, column:pos.column});
		}
		if(pos.column > 0 && grid[pos.row][pos.column-1]==0){
			connections.push({row:pos.row, column:pos.column-1});
		}
		if(pos.row < totalRow-1  && grid[pos.row+1][pos.column]==0){
			connections.push({row:pos.row+1, column:pos.column});
		}
		if(pos.column < totalColumn-1 && grid[pos.row][pos.column+1]==0){
			connections.push({row:pos.row, column:pos.column+1});
		}
		return connections;
	}

	function stringifyPosition(pos){
		return ''+pos.row+','+pos.column;
	}

	function convertToPosition(posString){
		var arr = posString.split(',');
		return {row:parseInt(arr[0],10),column:parseInt(arr[1],10)};	
	}

	function samePosition(pos1,pos2){
		return pos1.row==pos2.row && pos1.column == pos2.column;
	}

	function reconstructPath(cameFrom, current){		
		var stringPos = current;
		if(cameFrom[stringPos]){
			paths = reconstructPath(cameFrom, cameFrom[stringPos])
			return paths + ";" + stringPos;
		}
		else{
			return stringPos;
		}
	}



	function astar(grid,start,end,heuristic){
		var closedHash = {};
		var openSet = new ds.PriorityQueue();
		var openHash = {};

		var gScore ={};
		var fScore = {}; 
		var cameFrom = {};

		var stringPos = stringifyPosition(start);
		gScore[stringPos] = 0;
		fScore[stringPos] = heuristic(start,end);
		openSet.enqueue(stringPos, fScore[stringPos]);
		openHash[stringPos]=true;

		while(openSet.size() > 0){
			stringPos = openSet.dequeue().item;
			var current = convertToPosition(stringPos);
			openHash[stringPos] = false;

			if(samePosition(current, end))
				return reconstructPath(cameFrom,stringPos);

			closedHash[stringPos]=true;


			var positions = getPossiblePositions(grid, current);	
			for(var i=0; i<positions.length; i++){
				var newPos = positions[i];
				var newStringPos = stringifyPosition(newPos);
				newGScore = gScore[stringPos] + 1;

				if(closedHash[newStringPos] && newGScore >= gScore[newStringPos])
					continue;
				

				if(! openHash[newStringPos] || newGScore < gScore[newStringPos])
				{
					cameFrom[newStringPos] = stringPos;
					gScore[newStringPos] = newGScore;
					fScore[newStringPos]= newGScore + heuristic(newPos, end);

					if(! openHash[newStringPos])
					{
						openSet.enqueue(newStringPos, fScore[newStringPos]);
						openHash[newStringPos]=true;
					}
				}
			}
		}
		return null;
	}

	return astar;
});