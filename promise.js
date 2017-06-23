'use strict';
var idx = 1
function loadData(){
	return new Promise(resolve => {
		setTimeout(()=>{
			resolve(idx++)
		}, 1000);
	})
}

function main(){
	loadData()
		.then((data)=>{
			console.log('load success A:',data);
			return loadData();
		})
		.then((data)=>{
			console.log('load success B:',data);
			return loadData();
		})
		.then((data)=>{
			console.log('load success C:',data);
			return loadData();
		})
		.then((data)=>{
			console.log('load success D:',data);
			return loadData();
		})
		.then((data)=>{
			console.log('load success E:',data);
			console.log('load complete');
		})
}

main();
