// learning Date object to get real time date and time

//creating a date object
let date = new Date()
console.log(date)
// date object internally start from the day of 1.1.1970 and it gives difference in milliseceonds

// it gives us the first ever date which is 1.1.1970
let newDate = new Date(0)
console.log(newDate)

// this gives us 2 days before 1.1.1970
let nextDate = new Date(-48*3600*1000) // we can use negative value to go past in time
console.log(nextDate)

// this one gives us current date. explicitly mentioned BTW
let nowDate = new Date(2026, 0, 23)
console.log(nowDate)

// this one gives us all real time current values for different components like year, month, date, weekday, time etc
let today = new Date()
console.log(today.getFullYear(),today.getMonth(), today.getDate())
console.log(today.getHours(), today.getMinutes(), today.getSeconds())
console.log(today.getDay())

console.log()

let utcTime = new Date()
console.log(utcTime.getUTCFullYear(), utcTime.getUTCMonth(), utcTime.getUTCDate())
console.log(utcTime.getUTCHours(), utcTime.getUTCMinutes(), utcTime.getUTCSeconds())
console.log(utcTime.getDay())

// this one gives us the differents in time of two time zone. UTC and IST (mine)
console.log(new Date().getTimezoneOffset())

// we can go in future too by mentioning explicitly 
let todayTime = new Date()
todayTime.setFullYear(2070)
console.log(todayTime.getFullYear(), todayTime.getTime())
 
// Date.now() is the shortest version of creating an object to get the time
console.log(Date.now()) // it gives output in millisecends from 1.1.1970


// comparing difference of time while one process is being running
let start = new Date()

for (let i = 0; i<10000000; i++) {
    let dosomething = i*i*i
}

let end = new Date()

console.log(`look took ${end - start} ms`)


// this shows current day's or mentioned day's time and date
let date = Date.parse('2026-07-23T12:29:50.417+05:30')
console.log(date)



// setInterval() to perform a work based on time (milliseconds)
let timerId = setInterval(()=> {console.log("heyy")}, 2000)
// setTimeout() to perform a work after interval is finished
setTimeout(() => {clearInterval(timerId); console.log("stopped");}, 10000) 

// setInterval() works every seconds it is mentions or scheduled
// setTimeout() works once the interval is completed and performs only one time.


// we can use setTimeout as setInterval but with better precisions over operations
let timerId = setTimeout(function tick() {
  console.log('tick');
  timerId = setTimeout(tick, 2000); // (*)
}, 2000);

//setTimeout() always runs once whole script is ran successfully
setTimeout(() => {console.log("world")})
console.log("hello")+


// printing numbers by range using setInterval() 
function printNumber(from, to) {
    let current = from;
    let timerId = setInterval(function() {
        if (current === to) {
            clearInterval(timerId)
        }

        console.log(current)
        current++
    }, 1000)
}

printNumber(1, 20)


// printing numbers using setTimeout()
function printNumbers(from, to) {
    let current = from;
    let timerId = setTimeout(function go() { 
        console.log(current)
        current++
        if (current <= to) {
            setTimeout(go, 1000)
        }
    })
}

printNumbers(1, 10)

let timerId = setInterval(()=>console.log("heyy"), 1000)