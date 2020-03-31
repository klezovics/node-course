console.log('Client side js loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {

            console.log(data)
            if (data.error) {
                messageOne.textContent = data.error
                messageTwo.textContent = ''
                return 
            }

            messageOne.textContent = data.place_name
            messageTwo.textContent = data.result.summary+' '+data.result.temperature+' C'
        })
    })

})