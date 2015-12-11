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

var getSortedBitArrayWithFile = function(path , callback){

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
	  s.next();
	});
	 
	// 流结束时触发end事件 
	s.on('end', function () {
	  	console.log('getSortedBitArrayWithFile complete');
		callback(bitArray);
	});
}

var writeSortedFileWithBitArray = function(path, bitArray){

	for (var i = 0; i < MAX_LENGTH; i++){

		if(bitArray.get(i)){
			console.log(i);
			fs.appendFileSync(path, i+'\n', 'utf8');
		}
	}
}

var main = function(){
	//genarage 1000000 phone numbers
	genPhoneNumbersFile(__dirname + '/numberList.txt', function(){
		//transform phone numbers to bit array
		getSortedBitArrayWithFile(__dirname + '/numberList.txt', function(bitArray){

			//transform bit array to sorted phone numbers
			writeSortedFileWithBitArray(__dirname + '/numberList.sorted.txt',bitArray)

		})

	});
	
}

main();
