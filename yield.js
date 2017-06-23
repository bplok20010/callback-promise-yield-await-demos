'use strict';
var idx = 1
function loadData(){
	return new Promise(resolve => {
		setTimeout(()=>{
			resolve(idx++)
		}, 1000);
	})
}

function *main(){
	var data1 = yield loadData();
	console.log('load success A:',data1);
	var data2 = yield loadData();
	console.log('load success B:',data2);
	var data3 = yield loadData();
	console.log('load success C:',data3);
	var data4 = yield loadData();
	console.log('load success D:',data4);
	var data5 = yield loadData();
	console.log('load success E:',data5);
	console.log('load complete');
}

co(main);

function co(gen){
	const fn = gen();
	function run(v){
		let ret = fn.next(v);
		if( ret.done ) return;
		ret.value.then(d => run(d));
	}
	run()
}