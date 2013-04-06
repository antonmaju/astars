define({
	ManhattanDistance: function(start, end){
		return Math.abs(end.row-start.row) + Math.abs(end.column-start.column);
	}
});