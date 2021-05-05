console.log('This is from the client side')

const weatherForm = document.querySelector('form')
const searchData = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')




weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = searchData.value

    messageOne.textContent = 'loading...'
    messageTwo.textContent = ''

    //using the fetch API to make a request to our client endpoint
    fetch(`http://localhost:3000/weather?address=${location}`).then((response)=> {
    response.json().then((data)=> {
        if(data.error) {
            messageOne.textContent = data.error

        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast

        }

        
    })
}) 

})