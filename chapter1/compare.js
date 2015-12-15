/**
 * 比较一下各种排序的性能
 * 
 */

var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;
var faker = require('faker');
var BitArray = require('bit-array');

//生成 100,000个7位数
var numbers = new Set();

while(numbers.size < 10000000 ){
	var number = +faker.phone.phoneNumber('########')
	numbers.add(number);
}

//write to file

var array = Array.from(numbers)

suite.add('bit-array' ,function(){
	var bitArray = new BitArray(100000000);

	for(var i = 0 ; i < array.length ; i++){
		bitArray.set(i, true);
	}

	var result = [];

	for(var i = 0 ; i < 100000000 ; i++){
		if(bitArray.get(i)){
			result.push(i);
		}
	}

	
})
.add('Array.sort' ,function(){
	array.sort(function(a, b){
		return a - b;
	})
})
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
})
// run async
.run({ 'async': true });