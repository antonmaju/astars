define(function(){

	var Utils = {};

	Utils.samePosition(pos1,pos2){
		return pos1.row==pos2.row && pos1.column == pos2.column;
	};

	return Utils;
});