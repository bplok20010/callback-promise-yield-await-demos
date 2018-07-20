const Promise = require('./Promise-es6.dist.js').default;

const p1 = new Promise((resolve, reject) => {
	console.log(0);
	//setTimeout(() => {
	resolve(5);
	//}, 1000);


	console.log(1);
});
p1.then(d => {
	console.log(d, 'a');

	return new Promise(r => setTimeout(() => r('done1'), 2000));
})
	.then((d) => {
		console.log(d, 'b');
		return Promise.resolve('test'); //wrong
	})
	.then(d => {
		console.log(d, 'c');

		return new Promise(r => setTimeout(() => r('done2'), 2000));
	})
	.then(console.log);
console.log(3)
