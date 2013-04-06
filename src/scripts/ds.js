define(function(){

	var DS ={};

	function PriorityQueue(){
		this._items = [];
	} 

	PriorityQueue.prototype = {
		_swap : function(index1, index2){
			var temp = this._items[index1];
			this._items[index1]= this._items[index2];
			this._items[index2]= this._items[index1];
		},
		_heapifyUp: function(index){
			var item = this._items[index];
			while(index > 0){
				var parentIndex = Math.floor((index -1)/2);
				var parentItem = this._items[parentIndex];
				if(parentItem.priority <= item.priority)
					break;
				this._swap(index, parentIndex);
				index = parentIndex;
			}
		},
		_heapifyDown : function(index){
			var length = this._items.length;
			if(index >= length) return;

			while(true){
				var smallestIndex = index;
				var leftIndex = 2 * index + 1;
				var rightIndex = 2 * index + 2;

				if(leftIndex < length &&  this._items[smallestIndex].priority > this._items[leftIndex].priority)
					smallestIndex = leftIndex;
				if(rightIndex < length &&  this._items[smallestIndex].priority > this._items[rightIndex].priority)
					smallestIndex = rightIndex;

				if(smallestIndex != index)
				{
					this._swap(index, smallestIndex);
					index = smallestIndex; 
				}	
				else break;
			}
		},
		enqueue : function(item, priority){
			this._items.push({item:item, priority: priority});
			this._heapifyUp(this._items.length -1);		
		},
		dequeue : function(){
			var length = this._items.length;
			if(length == 0) return null;

			var frontItem = this._items[0];		
			var lastItem = this._items[length-1];
			this._items[0] = lastItem;
			this._items.splice(length-1,1);

			this._heapifyDown(0);
			return frontItem;
		},
		size : function(){
			return this._items.length;
		}
	};

	DS.PriorityQueue = PriorityQueue;
	
	return DS;

});