'use strict';
/**
 * 前提：1.七位数
 * 		 2.不重复
 */
var fs = require('fs');
var readLine = require('lei-stream').readLine;
var BitArray = require('bit-array');


var genPhoneNumbersFile = require('./utils/genPhoneNumbersFile');

var MAX_LENGTH = 10000000;

var getSortedBitArrayWithFile = function(path , cb){
	//promise mode
	if(!cb){
		return new Promise(function(resolve, reject){
			getSortedBitArrayWithFile(path , function(e, r){
				if(e){
					return reject(e);
				}
				return resolve(r);
			});
		});
	}

	console.time('sort-with-bit-array');

	var bitArray = new BitArray(MAX_LENGTH);
		// readLineStream第一个参数为ReadStream实例，也可以为文件名 
	var s = readLine(fs.createReadStream(path), {
	  // 换行符，默认\n 
	  newline: '\n',
	  // 是否自动读取下一行，默认false 
	  autoNext: false
	});
	 
	// 读取到一行数据时触发data事件 
	s.on('data', function (line) {
		// console.log(line);
		bitArray.set(+line, true);
		process.nextTick(function () {
			s.next();
		});
	});
	 
	// 流结束时触发end事件 
	s.on('end', function () {
	  	console.log('getSortedBitArrayWithFile complete');
		cb(null, bitArray);
	});
}

var writeSortedFileWithBitArray = function(path, bitArray ,cb){
	//promise mode
	if(!cb){
		return new Promise(function(resolve, reject){
			writeSortedFileWithBitArray(path, bitArray, function(e, r){
				if(e){
					return reject(e);
				}
				return resolve(r);
			});
		});
	}
	var result = [];
	for (var i = 0; i < MAX_LENGTH; i++){

		if(bitArray.get(i)){
			//console.log(i);
			result.push(i)
			//fs.appendFileSync(path, i+'\n', 'utf8');
		}
	}

	fs.writeFile(path, result.join('\n'), 'utf8', function(e, r){
		console.log('sort with bit array complete');
		console.timeEnd('sort-with-bit-array');
		cb(e,r)
	});
}

var sortWithBitArray = function(){
	return getSortedBitArrayWithFile(__dirname + '/numberList.txt').then(function(bitArray){
			return writeSortedFileWithBitArray(__dirname + '/numberList.sorted.txt',bitArray)
	});
}

var getSortedArrayWithFile = function(path, cb){

	//promise mode
	if(!cb){
		return new Promise(function(resolve, reject){
			getSortedArrayWithFile(path, function(e, r){
				if(e){
					return reject(e);
				}
				return resolve(r);
			});
		});
	}


	console.time('sort-with-array-sort');	
	var array = [];
		// readLineStream第一个参数为ReadStream实例，也可以为文件名 
	var s = readLine(fs.createReadStream(path), {
	  // 换行符，默认\n 
	  newline: '\n',
	  // 是否自动读取下一行，默认false 
	  autoNext: false
	});
	 
	// 读取到一行数据时触发data事件 
	s.on('data', function (line) {
		// console.log(line);
		array.push(+line);
		process.nextTick(function () {
			s.next();
		});
	});
	 
	// 流结束时触发end事件 
	s.on('end', function () {
		console.time('array.sort');
		array.sort(function(a, b){
			return a - b;
		});
		console.timeEnd('array.sort');
		cb(null, array);
	});
}

var writeSortedFileWithArray = function(path, array, cb){
	//promise mode
	if(!cb){
		return new Promise(function(resolve, reject){
			writeSortedFileWithArray(path, array, function(e, r){
				if(e){
					return reject(e);
				}
				return resolve(r);
			});
		});
	}
	fs.writeFile(path, array.join('\n'), 'utf8', function(e, r){
		console.log('sort with array.sort complete');
		console.timeEnd('sort-with-array-sort');
		cb(e,r)
	});
}


var sortWithArraySort = function(){

	return getSortedArrayWithFile(__dirname + '/numberList.txt')
			.then(function(array){
				return writeSortedFileWithArray(__dirname + '/numberListSortWithArray.sorted.txt', array);
			});
}

var main = function(){
	//genarage 1000000 phone numbers
	genPhoneNumbersFile(__dirname + '/numberList.txt').then(function(){
		var sort = [];
		sort.push(sortWithBitArray());
		sort.push(sortWithArraySort());
		return Promise.all(sort);

	}).catch(function(e){
		console.error(e.stack);
	})
}

main();
