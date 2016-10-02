'use strict'

const num = [0,1,2,3,4,5,6,7,8,9]
const low = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
const up = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
const alphanum = num.concat(low, up)

module.exports = {

	random: ()=>{
		var result = [];
		while (result.length<10){
			result.push(alphanum[Math.floor(Math.random()*alphanum.length)]);
		}
		return result.join('');
	}
}