require(['maps', 'astar','idastar','heuristics'], function(maps,astar,idastar,heuristics){

	function drawGrid(grid){
		var $tbody = $('tbody','#grid').empty();
		for(var i=0; i<grid.length; i++)
		{
			var $tr= $('<tr></tr>');
			
			for(var j=0; j< grid[i].length; j++)
			{
				var className = grid[i][j]==1?'wall':'';
				var $td = $('<td><div class="'+className+'">&nbsp;</div></td>').appendTo($tr);
			}
				
			$tbody.append($tr);
		}
	}

	function drawClass(node, className){
		$('tr:eq('+node.row+') td:eq('+node.column+')','#grid').addClass(className);
	}

	function convertPathStringsToPositions(positions){
		var posList = positions.split(';');
		var points =[];
		for(var i=0; i<posList.length; i++){
			var pos = posList[i].split(',');
			points.push({row:parseInt(pos[0],10), column:parseInt(pos[1], 10)});
		}	
		return points;
	}

	function drawMarker(paths,index){
		$('td','#grid').removeClass('active');
		var to= paths[index];
		$('tr:eq('+to.row+') td:eq('+to.column+')','#grid').addClass('active');
		
		if(index < paths.length -1)
			setTimeout(function(){
				drawMarker(paths, index+1)
			}, 500);	
	}


	var map = maps.Map1;
	var start = {row:0, column:5};
	var end =  {row:2, column:4};

	drawGrid(map);
	drawClass(start,'start'); drawClass(end,'end');


	var startTime = + new Date;
	var result = astar(map, start, end, heuristics.ManhattanDistance);
	var endTime = + new Date;
	var totalTime = endTime - startTime;
	$('#total').val(totalTime);
	if(result){
		result = convertPathStringsToPositions(result);
		drawMarker(result,0);
	}

	/*
	var result = idastar(map, start, end, heuristics.ManhattanDistance);
	console.log(result);
	*/
});