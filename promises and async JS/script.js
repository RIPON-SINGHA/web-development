// src = "/promises and async JS/app.js"



// // function loadScript(src) {
// //     let script = document.createElement("script")
// //     script.src = src
// //     document.body.append(script)
// // }

// // function loadScript(src, callback) {
// //   let script = document.createElement('script');
// //   script.src = src;

// //   script.onload = () => callback(script);

// //   document.body.append(script);
// // }

// function loadScript(src, callback) {
//   let script = document.createElement('script');
//   script.src = src;
//   script.onload = () => callback(script);
//   document.head.append(script);
// }

// loadScript(src, script => {
//   alert(`Cool, the script ${script.src} is loaded`);
//   alert( _ );
// });

// // Promise:

// let promise = new promise(function(resolve, reject){ // this is the syntax of simple general promise
//     // do something
// }) 

// // new promise is a constructor to make a promise object and it has an executor
// // An executor has two states resolve and reject. where resolve runs when the exwcutor obtain it's result, 
// // and reject runs when the executor does not obtain any result but error
// // An executor runs automatically to perform a job, when it finishes the attemp it calls either resolve or reject based on the result.
// // a promise object has these internal properties: 
// //state — initially "pending", then changes to either "fulfilled" when resolve is called or "rejected" when reject is called.
// //result — initially undefined, then changes to value when resolve(value) is called or error when reject(error) is called.
// //so the executor eventually moves the promise to one of these states: 
// promise = {
//     state: "fullfilled",
//     result: value
// }

// promise = {
//     state: "rejected",
//     result: error
// }


// when the work completes without an error, we call resolve
let promise1 = new Promise(function(resolve, reject){
    setTimeout(()=> resolve("done"), 1000)
})


// when a work is completed with an error, we call new reject
let promise2 = new Promise(function(resolve, reject) {
    setTimeout(() => reject(new Error("whoops, error!")), 1000)
})

