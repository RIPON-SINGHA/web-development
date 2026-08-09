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
    setTimeout(() => reject(new Error("whoops")), 1000)
})


//showing the value or the error based on the function above
async function isError() {
    try {
        let answer = await promise2;
    } catch(error) {
        console.log("it seems there's an error occured! " + error.message)
    }
}

isError()


// Another example of resolve and reject of a promise.

// resolve with .then
let myPromise = new Promise(function (resolve, reject) {
    setTimeout(() => {
        resolve("promise is resolved")
    }, 3000)
})

myPromise.then((result) => console.log(result))


// resolve with async/await
let myPromise1 = new Promise(function (resolve, reject) {
    setTimeout(() => {
        resolve("promise is resolved")
    }, 3000)
})

async function showData() {
    let data = await myPromise1
    console.log(data)
}


// Reject with .catch
let myPromise2 = new Promise(function(resolve, reject) {
    setTimeout(()=> {
        reject(new Error("data is corrupted"))
    }, 3000)
})

myPromise2.then((result) => console.log(result)) // we can also not add this line cause we know this promise always returns reject.
            .catch((error) => console.log(error.message))


// Reject with async/await
async function iserror() {
    try{
        let data = await myPromise2
        console.log(data)
    } catch (error) { // this error can be any kind of error.
        console.log(error.message) 
    }
}
// here error can be server error which has be be manually handled which we detect by (response.ok === true). it also could be no network kind of error.
// also can be .json() error or data convertion error.


