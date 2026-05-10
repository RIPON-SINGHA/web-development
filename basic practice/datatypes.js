// There is 8 types of data types in java script divided into two
// 1. Primitive data types (number, string, bigint, boolean, null, undefined, symbol)
// 2. Object (function, array, date, map etc)

// Numbers: Number datatype is for the integer values. Numbers in Javascript stored in 64 bit format.

let num = 23254;
let number = 9230;
let age = 21;

let billion = 1000000000;
billion = 1_000_000_000; // underscoprs are ignored by the broser in execution

billion = 1e9 // e represents how many 0's next to the number at left side. its 1000000000 for this one.

let microsec = 0.000001
microsec = 1e-6 // 5 0's left from 1 to represent as decimal number.

let a = 0b11111111 // binary form of 255
let b = 0o377 // octal form of 255
let c = 0xff // hexadecimal form of 255 (used in colors most of the cases)


// some of the common instance methods that can be use with numbers:

//toSrting(base)

let n = 255
console.log(n.toString())
console.log(n.toString(2)) // toString(base) uses base form of a number to convert and make them string.
console.log(n.toString(16))
console.log(n.toString(32))

//toFixed(digit)

let Num = 23.543
console.log(Num.toFixed(2)) // Formats a number with a specific number of digits after the decimal point. 

//toPrecision(lenght)

let x = 123.456
console.log(x.toPrecision(4)) // it returns a number string as the length specified. rounded if needed.


// Some of the common static methods that can be used with numbers:
// these are defined by like this : Number.methodNane(value)

//Number.isInteger(value)

let y = 342.32
console.log(Number.isInteger(y)) // Returns true if the passed value is an integer; otherwise, returns false.

//Number.isNaN(value)
let p = 432.4
console.log(Number.isNaN(p)) // Checks if the value is exactly NaN and of the type Number.

// Number.isSafeInteger(value)
let m = 34442
console.log(Number.isSafeInteger(m))


// One of the most used operations when working with numbers is rounding.
// There are several built-in functions for rounding:

//Math.floor()
let i = 3.3
console.log(Math.floor(i)) // Rounds down 

//Math.ceil()
let k = 3.4
console.log(Math.ceil(k)) // Rounds Up

//Math.round()
let j = 3.6
console.log(Math.round(j)) // Rounds to the nearest integer

//Math.trunc()
let h = 6.3
console.log(Math.trunc(h)) // removes everything from decimal point.


//Powers and roots

//Math.pow(base, exponent)
console.log(Math.pow(2, 4)) // returns power of a number

//Math.sqrt(num)
console.log(Math.sqrt(49)) // returns square root of a number

//Math.cbrt(num)
console.log(Math.cbrt(789)) // returns cube root of a number


// Comparison and sign

//Math.abs(num)
console.log(Math.abs(-345)) // Returns the absolute positive of a number

//Math.max(....args) and Math.min(....args)
console.log(Math.max(2, 4, 6, 8, 99, 34, 76, 67))
console.log(Math.min(3, 2, 0, -34, -56, 99, 23))

// To take random number from 0 to 1(excluded)
console.log(Math.random())

// to get actual number from 1 to 100 or more use this:
console.log(Math.floor(Math.random() * 10) +1)


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



// ARRAY
// An array is a high-level, list-like object used to store an ordered collection of multiple values under a single variable name
// An array can hold multiple datas. Even different types of data / values and functions too. also we can store an object itself.

let array = [] // empty array
let fruits = ["apple", "banana", "mango", "lichi"] // array of strings
let arr = [ // array with multiple values of different data types.
    "Ripon",
    21,
    "BCA",
    true,
    {name:"Ripon"},
    function(){
        return "this is multi a valued array";
    },
];

console.log(arr[3]); // accessing string or normal values
console.log(arr[4].name); // accessing an object
console.log(arr[5]()); // accessing a function


// arrow function in array
let arrowFuncs = [
    () => console.log("This is a arrow func array"),
    (name) => console.log(`Hello ${name}`),
    (a, b) => a + b,
]

arrowFuncs[0]();
arrowFuncs[1]("Ripon");
console.log(arrowFuncs[2](2, 3));


// One of the most used array property is array.length
let arrayNum = [2, 43, 5, 6, 87, 4, 234, 6, 2, 89, 67 ,34, 2]
console.log(arrayNum.length)

//to get the last element of an array
let lastEl = ["Ripon", "samrat", "deep", "rishav", "abhijeet", "parash", "raghab"];

console.log(lastEl[lastEl.length-1]) // this is a way to access the lst element
console.log(lastEl.at(-1)) // this is another way to access the last element. {at(-1)} to access the last element using negative index


// Some of the most used Array methods are

// Adding and removing elements

//arr.push(item)
let exmplArr = [32, 45, 76, 23, 76, 67]
exmplArr.push(69) // to add an element at the end of an array
console.log(exmplArr)

//arr.pop()
exmplArr.pop() // removes the last element
console.log(exmplArr)

//arr.unshift(item)
exmplArr.unshift(69) // adds an element at the first of an array
console.log(exmplArr)

//arr.shift()
exmplArr.shift() // deletes an element from the start of an array
console.log(exmplArr)


// Array is an object so when we copy it to make another array it is copied by reference and not literal.
let copyArr = exmplArr
console.log(exmplArr === copyArr) // true as both share the same memory
copyArr[2] = "copied"
console.log(exmplArr) // exmplArr also changed


// numeric arrays can be converted t ostring too
let nums = [34, 23, 67]
console.log(nums.toString())

// we can try this also
console.log(String(nums) === "34,23,67") // returns true 


// arrays are objects and not primitive datatype so normal comparison operatos like (==) and (===) wont work on array comparison
// they are compares memory reference for array comparison not values.
// so even though two arrays are same values and length == and === with return false everytime.
let arr1 = [1, 2, 3]
let arr2 = [1, 2, 3]
console.log(arr1 == arr2) // false 
console.log(arr1 === arr2) // false 



// normal delete arr[2] doen not work wit array. it deletes the value but not the space or index
let delArr = [1, 2, 3, 4]
delete delArr[3]
console.log(delArr[3], delArr.length) // see here the value is deleted but length is same as before

// to delete array element we use arr.splice() method. 
// using .splice() we can add and delete elements in array

let sampleArr = [1, 2, 4, 5]
removed = sampleArr.splice(2, 2) // delete 2 elemets from index 2 including index 2 element.
console.log(sampleArr) // returns [1, 2]
console.log(removed) // we can access the removed elements also

let samplearray = [1, 2, 4, 5]
samplearray.splice(2, 0, 3) // remove 0 element from index 2 and add 3.
console.log(samplearray) // returns [1, 2, 3, 4, 5]


// we can access the last elements usign negative indexing too
samplearray.splice(-1, 0, 67, 69)
console.log(samplearray) // returns [1, 2, 3, 4, 67, 69]

// to add elements at the end of an array
samplearray.splice(samplearray.length, 0, 99, 100)
console.log(samplearray) // returns [1, 2, 3, 4, 67, 69, 5, 99, 100]


// arr.slice(start, end)
let dummyarr = [1, 2, 3, 4, 5]
console.log(dummyarr.slice(0, 3)) // It returns a new array copying to it all items from index start to end (not including end).
console.log(dummyarr.slice(-3)) // we can use negative indexing also to access last elements.


//arr.concat(arg1.... arg2)
let arr0 = [1, 2]
console.log(arr0.concat([3, 4])) // create an array from: arr and [3,4]
console.log(arr0.concat([3, 4], [5, 6])) // create an array from: arr and [3,4] and [5,6]
console.log(arr0.concat([3, 4], 5, 6)) // create an array from: arr and [3,4], then add values 5 and 6


// Seaching in an array
let arr10 = [1, 22, true]
console.log(arr10.indexOf(1)) // returns index number if found else -1
console.log(arr10.indexOf("js")) // returns -1 cause it doesn't exist in the array

//arr.lastIndexOf(item)
let frut = ["apple", "mango", "banana", "papaya", "apple"]
console.log(frut.lastIndexOf("apple")) // returns last index of the element if it has duplicate else the first appeared index.

//arr.includes(item)
console.log(frut.includes("banana")) // returns if the element exist (true) or not (false)
let aa = [NaN]
console.log(aa.indexOf(NaN)) // returns -1, wrong it should be 0
console.log(aa.includes(NaN)) // returns true. inculdes() handles NaN correctly.


// find and findIndex/findLastIndex

//find(func)
let objArr = [
    {id: 1, name: "Ripon"},
    {id: 2, name: "Akshat"},
    {id: 3, name: "Rupal"},
    {id: 4, name: "humayun"},
    {id: 5, name: "Ripon"},
]
let res = objArr.find(name => name.id == 1) // returns the element if found
console.log(res.name)

//findIndex(func)
console.log(objArr.findIndex(name => name.id == 2)) // returns the index instead of the element if found else -1
console.log(objArr.findIndex(name => name.id == 67)) // returns -1 cause the element does not exist

//findLastIndex(func)
console.log(objArr.findLastIndex(item => item.name == "Ripon")) // returns the last index of the element if it has duplicates else returns the first appeared index.
// -1 if nothing is found


// The find method looks for a single (first) element that makes the function return true.
//If there may be many, we can use arr.filter(fn).
let result = objArr.filter(item => item.id < 4)
console.log(result.length) // return the array of first 3 object


// Transform an array
// The arr.map method is one of the most useful and often used.

//arr.map(func)
let arr69 = ["Ripon", "Bishal", "vyankur", "jackson"] // It calls the function for each element of the array and returns the array of results.
console.log(arr69.map(item => item.length))

// arr.reverse()
console.log(arr69.reverse()) // reverse the order of the elements of an array

//arr.split(delim)
let names = "ripon, singha, rakul"
let naam = names.split(', '); // The str.split(delim) method does exactly that. It splits the string into an array by the given delimiter delim.
console.log(naam)
for (let name of naam){
    console.log(`a sms for ${name}`)
}

let w = "world"
console.log(w.split('')) // The call to split(s) with an empty s would split the string into an array of letters:


//arr.join(glue)
let title = ["Ripon", "singha", "gambhir", "vladimir"] 
console.log(title.join(' * ')) // The call arr.join(glue) does the reverse to split. It creates a string of arr items joined by glue between them.


// Array.isArray()
// Arrays do not form a separate language type. They are based on objects. so type of does not help in that matter
console.log(typeof({})) // object
console.log(typeof([])) // same obejct, because in core array is an object

// Array.isArray(value). It returns true if the value is an array, and false otherwise.
console.log(Array.isArray({})) // false
console.log(Array.isArray([])) // true



// there are 3 types of loops that can be used on arrays
let call = ["Ripon", "singha", "sunday", "energy", "keyboard"]
// 1. normal for loop
for (let i = 0; i<call.length; i++){
    console.log(call[i])
}

// 2. for-of loop
for (let w of call){
    console.log(w)
}

// 3. for-each loop
call.forEach((word, index) => {
    console.log(word, index)
});

// also there is transformation loops present in different array methods such as 
// 1. arr.map()
//2. arr.filter()

