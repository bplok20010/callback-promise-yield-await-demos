'use strict';
var idx = 1
function loadData(){
	return new Promise(resolve => {
		setTimeout(()=>{
			resolve(idx++)
		}, 1000);
	})
}
//node 8.0+ 
async function main(){
	var data1 = await loadData();
	console.log('load success A:',data1);
	var data2 = await loadData();
	console.log('load success B:',data2);
	var data3 = await loadData();
	console.log('load success C:',data3);
	var data4 = await loadData();
	console.log('load success D:',data4);
	var data5 = await loadData();
	console.log('load success E:',data5);
	console.log('load complete');
}

main();