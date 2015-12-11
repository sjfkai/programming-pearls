var faker = require('faker');
var fs = require('fs');
// faker.locale = 'zh_CN';

var genPhoneNumbersFile = function(filePath ,cb){
	var numbers = new Set();

	while(numbers.size < 1000000 ){
		var number = +faker.phone.phoneNumber('#######')
		numbers.add(number);
	}

	//write to file
	
	var str = Array.from(numbers).join('\n');

	fs.writeFile(filePath, str, 'utf8', function(e){
		if(e){
			throw Error(e);
		}

		console.log('generate numbers complete');
		cb();
	});
};

module.exports = genPhoneNumbersFile;
//genPhoneNumbersFile();
