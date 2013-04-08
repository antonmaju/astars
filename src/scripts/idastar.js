define(function(){

	function samePosition(pos1,pos2){
		return pos1.row==pos2.row && pos1.column == pos2.column;
	}

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


	function idastar(grid, start, end, heuristic){
		

		function depthLimitedSearch(path,costLimit){
			var point = path[path.length-1];
			var minCost = (path.length-1)+heuristic(point, end); 
			if (minCost > costLimit)
				return {path:null, minCost: minCost};
			if  (samePosition(point, end))
				return {path:path, minCost: costLimit};

			nextCostLimit = Infinity;
			solutions = [];

			neighbours = getPossiblePositions(grid, point);
			for(var i=0; i<neighbours.length; i++){
				var neighbour = neighbours[i];
				//var newCost = path.length + heuristic(neighbour,end);
				var solution = depthLimitedSearch(path.concat(neighbour), costLimit);
				if(solution.path)
					solutions.append(solution);
				if (nextCostLimit > minCost)
					nextCostLimit = minCost;

			}

			var minSolution = null;

			if(solutions.length > 0)
			{
				for(var i=0; i<solutions.length; i++)
				{
					if(minSolution == null || (solutions[i].path && minSolution.path.length > solutions[i].path.length))
						minSolution = solutions[i];
				}
			}

			if(minSolution == null)
				minSolution = {path:null, minCost: costLimit};

			console.log(minSolution);
			return minSolution;
		}

		var startCost = heuristic(start,end);
		//while(true)
		//{
			var solution = depthLimitedSearch([start],Infinity);
			console.log(solution);
			if (solution.path)
				return solution.path;
			if (solution.minCost == Infinity)
				return null;
		//}

	}

	

	return idastar;
});