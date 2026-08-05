(function()  {
    const hour = document.querySelector(".hour-time")
    const minute = document.querySelector(".minute-time")
    const second = document.querySelector(".second-time")
    const AmPm = document.querySelector(".AM-PM")


    function showTime() {
        let time = new Date()
        let hours = null
        let dayNightDivider = time.getHours() >= 12 ? "PM" : "AM"
        
        if (time.getHours() === 0) {
            hours = "12"
        } else if (time.getHours() > 12) {
            hours = String(time.getHours() - 12).padStart(2, "0")
        } else {
            hours = String(time.getHours()).padStart(2, "0")
        }

        hour.textContent = hours
        minute.textContent = String(time.getMinutes()).padStart(2, "0")
        second.textContent = String(time.getSeconds()).padStart(2, "0")
        AmPm.textContent = dayNightDivider

    }
    setInterval(showTime, 1000)
}) ();


