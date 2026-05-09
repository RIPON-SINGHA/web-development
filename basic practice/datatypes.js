// // There is 8 types of data types in java script divided into two
// // 1. Primitive data types (number, string, bigint, boolean, null, undefined, symbol)
// // 2. Object (function, array, date, map etc)

// // Numbers: Number datatype is for the integer values. Numbers in Javascript stored in 64 bit format.

// let num = 23254;
// let number = 9230;
// let age = 21;

// let billion = 1000000000;
// billion = 1_000_000_000; // underscoprs are ignored by the broser in execution

// billion = 1e9 // e represents how many 0's next to the number at left side. its 1000000000 for this one.

// let microsec = 0.000001
// microsec = 1e-6 // 5 0's left from 1 to represent as decimal number.

// let a = 0b11111111 // binary form of 255
// let b = 0o377 // octal form of 255
// let c = 0xff // hexadecimal form of 255 (used in colors most of the cases)


// // some of the common instance methods that can be use with numbers:

// //toSrting(base)

// let n = 255
// console.log(n.toString())
// console.log(n.toString(2)) // toString(base) uses base form of a number to convert and make them string.
// console.log(n.toString(16))
// console.log(n.toString(32))

// //toFixed(digit)

// let Num = 23.543
// console.log(Num.toFixed(2)) // Formats a number with a specific number of digits after the decimal point. 

// //toPrecision(lenght)

// let x = 123.456
// console.log(x.toPrecision(4)) // it returns a number string as the length specified. rounded if needed.


// // Some of the common static methods that can be used with numbers:
// // these are defined by like this : Number.methodNane(value)

// //Number.isInteger(value)

// let y = 342.32
// console.log(Number.isInteger(y)) // Returns true if the passed value is an integer; otherwise, returns false.

// //Number.isNaN(value)
// let p = 432.4
// console.log(Number.isNaN(p)) // Checks if the value is exactly NaN and of the type Number.

// // Number.isSafeInteger(value)
// let m = 34442
// console.log(Number.isSafeInteger(m))


// // One of the most used operations when working with numbers is rounding.
// // There are several built-in functions for rounding:

// //Math.floor()
// let i = 3.3
// console.log(Math.floor(i)) // Rounds down 

// //Math.ceil()
// let k = 3.4
// console.log(Math.ceil(k)) // Rounds Up

// //Math.round()
// let j = 3.6
// console.log(Math.round(j)) // Rounds to the nearest integer

// //Math.trunc()
// let h = 6.3
// console.log(Math.trunc(h)) // removes everything from decimal point.


// //Powers and roots

// //Math.pow(base, exponent)
// console.log(Math.pow(2, 4)) // returns power of a number

// //Math.sqrt(num)
// console.log(Math.sqrt(49)) // returns square root of a number

// //Math.cbrt(num)
// console.log(Math.cbrt(789)) // returns cube root of a number


// // Comparison and sign

// //Math.abs(num)
// console.log(Math.abs(-345)) // Returns the absolute positive of a number

// //Math.max(....args) and Math.min(....args)
// console.log(Math.max(2, 4, 6, 8, 99, 34, 76, 67))
// console.log(Math.min(3, 2, 0, -34, -56, 99, 23))

// // To take random number from 0 to 1(excluded)
// console.log(Math.random())

// // to get actual number from 1 to 100 or more use this:
// console.log(Math.floor(Math.random() * 10) +1)


// String are sequence of characters. it can be alphabetical and numerical
// Some of the most used string methods are:

// Seraching and checking

//str.includes(substring)
let str = "ripon singha"
console.log(str.includes("pon")) // return true if the substring is present in the main string.

//str.indexOf(substring)
console.log(str.indexOf("ing")) // Returns the index of the first occurrence of a text, or -1 if not found.

// startsWith(value) / endsWith(value)
console.log(str.startsWith("r")) // Checks if a string begins or ends with specific characters.
console.log(str.endsWith("r"))

//str.charAt(index)
console.log(str.charAt(4)) // retuens the character at the given index position

//str.at(index)
console.log(str.at(-1)) // Similar to charAt, but supports negative indices (e.g., .at(-1) gets the last character).


// Extracting parts of a string

//str.slice(start, end)
console.log(str.slice(2, 9))  // Extracts a section and returns it as a new string. Most developers prefer this because it supports negative indices.

//str.substring(start, end)
console.log(str.substring(2, 7)) // Similar to slice but does not accept negative indices.


//str.split(separator)
console.log(str.split()) // Breaks a string into an array of substrings based on a separator (e.g., ", ")


// Modifying and Formatting

//toUpperCase() / toLowerCase()
console.log(str.toUpperCase()) // Changes the entire string's case.
console.log(str.toLowerCase())


//str.trim()
console.log(str.trim()) //  Removes whitespace from both the beginning and end of a string.

//str.replace(old, new)
console.log(str.replace("r", "x")) // Replaces the first occurrence of a value with a new one.

//str.replaceAll(old, new)
console.log(str.replaceAll("i", "u")) // Replaces all occurrences of a value.

//str.repeat(count)
console.log(str.repeat(3)) // Returns a new string with a specified number of copies of the original.








