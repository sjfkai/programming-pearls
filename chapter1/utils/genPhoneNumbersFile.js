var faker = require('faker');
var fs = require('fs');
// faker.locale = 'zh_CN';

var genPhoneNumbersFile = function(filePath ,cb){
	//promise mode
	if(!cb){
		return new Promise(function(resolve, reject){
			genPhoneNumbersFile(filePath , function(e, r){
				if(e){
					return reject(e);
				}
				return resolve(r);
			});
		});
	}
	
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
