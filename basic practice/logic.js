// "use strict"; // for modern JavaScript

// let num = 5
// console.log(num)


// alert("ripon")


// let year = prompt("year: ", '');
// let cond = (year == 2026);
// if (cond){
//     console.log("truth");
// } else { 
//     console.log("false");
// }


// // usage of ternary function as many times it needs
// let age = 16;
// let msg = (age < 18) ? "Hi baby" : (age < 30) ? "hii man" : (age < 60) ? "Greetings" : (age < 100) ? "DIE MFS" : "why did not you die already?"
// console.log(msg)



// // usage of switch case
// let num1 = +prompt("enter a number: ", "") // (+prompt) making that string number to a integer. it also make number positive and negative using (-num)

//     switch(num1){
//         case 1:
//             alert(1)
//             break
//         case 2:
//             alert(2)
//             break
//         case 3:
//         case 4:
//             alert("3 or 4 maybe")
//             break
//         default:
//             alert("FUCK YOU")
//     }


// // simple function usage
// function showmsg(name){
//     name = "*"+name+"*"
//     console.log("FUCK YOU NIGGA " + name)
// }
// showmsg(name="bob")


// // a simple usage of arrow function
// let showMsg = (a, b) => (a + b)
// ans = showmsg(3, 4)
// console.log(ans)


// let Age = 18

// let welcome = (Age < 18) ?
//     () => console.log('Hello!') :
//     () => console.log("Greetings!");

// welcome();



// function wel(n=2){
//     if (n<18){
//         console.log("hello")
//     } else {
//         console.log("greetings")
//     }
// }
// wel(66)


// // small example of using function with user input
// function ask(question, yes, no) {
//       if (confirm(question)) yes();
//       else no();
//     }

//     ask(
//       "Do you agree?",
//       function() { alert("You agreed."); },
//       function() { alert("You canceled the execution."); }
//     );


// // samll example of using arrow functionv with the same code above
// function Ask(ques, right, wrong){
//     if(confirm(ques)) {
//         right()
//     } else {
//         wrong()
//     }
// }

// Ask(
//     "do you agree",
//     () => console.log("yes"),
//     () => console.log("no")
// )


// // same code snippet with arrow function and ternary operator
// let ASK = (ques, yes, no) => (confirm(ques)) ? yes() : no()

// ASK("Do you agree?", 
//     () => alert("yes"),
//     () => alert("no")
// )


// // simple operations on object
// let obj = {
//     firstName: "Ripon",
//     lastName: "Singha",
//     age: 21,
//     study: "BCA"
// };

// console.log(obj.lastName, obj.age, obj.firstName, obj.study)
// delete obj.firstName
// console.log(obj.lastName, obj.age, obj.firstName, obj.study)


// // the result will show [object Object] it is an object itself as a value
// let obj1 = {};
// obj.__proto__ = 5;
// alert(obj1.__proto__);


// // simple operation on object
// let Obj = {key:2}
// console.log(Obj.sex === undefined)
// let ans = "key" in Obj
// console.log(ans)


// // looping through object and showing them
// let longObj = {
//     firstName: "Ripon",
//     lastName : "Singha",
//     age: 21,
//     study: "BCA",
//     live: "Shyamnagar",
//     "likes cars": true, 
// }
// for (key in longObj){
//     console.log(key, ":", longObj[key])
// }

// // to show the object's key value pairs with comma (,) as ['name', 'ripon']
// console.log(Object.entries(longObj))


// // object sorts its numeric or integer key pairs when shwoing result
// let intObj = {
//     80: "jdjwd",
//     60: "fawff",
//     40: "fgjifi",
//     20: "fWIUdh",
//     10: "Uhddawd",
//     1: "kuhwdhd",
// }
// for (code in intObj){
//     console.log(code,":",intObj[code])
// }


// // key, value can be added outside of the object definition too
// let obj3 = {
//     name: "Ripon",
//     hobby: "Gaming",
// }

// obj3.age = 21

// for (key in obj3){
//     console.log(obj3[key])
// }


// // copying one object to another. this method works different than anything. A variable assigned to an object stores not the object itself, but its “address in memory” – in other words “a reference” to it.

// // in other words we can change one object and it will effect all the copied version of it because they share the same referance or memory address.
// let obj_ = {name: "ripon"}
// let obj2 = obj_
// obj2.name = "khanki"
// console.log(obj_.name)


// // this is another way to copy or clone object that will not share the same memory. it will only copy the properties of an object
// let obj4 = {name: "Ripon", age: 21, study:"BCA"}
// let Obj2 = {}

// for (key in obj4){
//     Obj2[key] = obj4[key]
// }
// console.log(Obj2)
// console.log(obj4)
// Object.assign(Obj2, obj4)
// console.log(Obj2)


// // this is another way to clone an object to another without sharing the memory address
// let obj_3 = Object.assign(obj_3, obj4)


// // nested object also can be created like this
// let nesObj = {
//     name: "Ripon",
//     age: 21, 
//     study: "BCA",
//     lives: "Kolkata",
//     goal: {
//         personal: "world travel",
//         proffessional: "high paying job",
//         Hobby: "Gaming and Travelling",
//     }
// }

// // and this the way to clone nested object to an another object without sharing memory address
// let clone1 = structuredClone(nesObj)

// console.log(nesObj)
// console.log(clone1)
// clone1.name = "pawan"
// console.log(clone1.name)
// console.log(nesObj.name)
// console.log(nesObj === clone1)



// // this is the way to copy nested object to another one by memory address sharing but not the actual objects. in this case goal is the shared one not the nesObj and clone2. to make both related just use {clone2 = nesObj}
// let clone2 = {}

// for (let key in nesObj){
//     clone2[key] = nesObj[key]
// }

// console.log(clone2)
// console.log(nesObj)
// console.log(clone2 === nesObj)
// console.log(clone2.goal === nesObj.goal)


// // object's keys can reference to its own object, that calls circuler reference. When an object property reference the object itself makign a chain reference.
// let user = {}
// user.me = user
// console.log(user.me)


// method can be added with an object by several way. this is one of them.
// functios that are inside of a object or used by an object is called method.

// let User = {
//     name : "Ripon"
// };
// User.sayHi = function(){
//     alert("Hello");
// };
// User.sayHi()


// another way to create a method is to assign a pre-declared function to to it
function sayhi(){
    alert("Hello")
}
let user1 = {
    name: "Ripon"
}
user1.sayHi = sayhi
user1.sayHi()


// we can use method shorthand to make method declaration small and more readable

// this one is normal method declareation inside an object. Both works same
let person1 = {
    name : "Ripon",
    sayhi : function(){
        alert("Hello")
    }
};

person1.sayhi()


// now the shorthand version
let person2 = {
    name : "Ripon",
    sayhi(){
        alert("Helloww"+this.name)
    }
};

person2.sayhi()


// usage of {this} in object methods
// The value of {this} is evaluated during the run time, depend on the context
// To access the object, a method can use {this} keyword
let person3 = {
    name : "Jesus Christ",
    sayhi(){
        alert("hello " + this.name);
    }
};

person3.sayhi();



// without an object {this} is useless. {this} refers to the object itself means if {this.name} it becomes {object.name || user.name}
// so having a fumction with {this} but no use in any object is useless.

// here in {this} example first the function is created using this then it is used by two object and because of {this} both are getting the data they want.
function sayName(){
    alert(this.name)
}

let Ripon = {name : "Ripon"}
let Raghab = {name : "Raghab"}

Ripon.f = sayName
Raghab.f = sayName

Ripon.f()
Raghab.f()

Ripon['f']()

// If a function with {this} called without an object, its value will be 'undefined'


// we can use {this} in arrow function too.
// but arrow function dont have its own {this}. if we have to use {this} in a arrow function, we have to take it from an outer 'normal' function.

let Laptop = {
    brand : "LOQ",
    sayBrand(){
        let brandName = () =>{
            alert(this.brand);
        }
        brandName();
    }
};

Laptop.sayBrand()


// Constructor operator "new"
// regular function syntax allow us to create one object but when we need multiple similer objects like users, menu etc, we use constructor function.
// constructor functions are similer to the normal function but have some convention though - 
// 1. their name should have caps at their first character of the name.
// 2. They should be executed only with "new" operator.

function SayMyName(name, statement){
    this.name = name;
    this.statement = statement;
}

let heisengberg = new sayMyName("heisengberg", "You're GOD DAMN RIGHT");
alert(heisengberg.name)
alert(heisengberg.statement)


