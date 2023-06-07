console.log('Js Loaded')

const form = document.querySelector('form')
const input = document.querySelector('input.location')
const errormsg = document.querySelector('.error')
const forecastmsg = document.querySelector('.forecast')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/weather?location='+input.value).then((response) => {
        response.json().then((data) => {
            console.log(data.forecast)
            if(data.error){
                errormsg.textContent = data.error
            }else{
                forecastmsg.textContent = data.forecast
            }
        })
    })
})