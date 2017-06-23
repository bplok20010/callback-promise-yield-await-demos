'use strict';

var idx = 1
function loadData(callback){
	setTimeout(()=>{
		callback(idx++)
	}, 1000);
}

function  main(){
	loadData(function(data){
		console.log('load success A:',data);
		loadData(function(data){
			console.log('load success B:',data);
			loadData(function(data){
				console.log('load success C:',data);
				loadData(function(data){
					console.log('load success D:',data);
					loadData(function(data){
						console.log('load success E:',data);
						console.log('load complete');
					})
				})
			})
		})
	})
}

main();
