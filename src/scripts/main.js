require(['maps', 'astar','heuristics'], function(maps,astar,heuristics){

	var result = astar(maps.Map1, {row:0, column:5}, {row:2, column:4}, heuristics.ManhattanDistance);
	console.log(result);

});