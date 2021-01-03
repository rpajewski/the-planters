async function newHomeHandler(event) {
    event.preventDefault()
  
    const home_name = document.querySelector('input[name="home-name"]').value
  
    const response = await fetch(`/api/homes`, {
        method: 'POST',
        body: JSON.stringify({
            home_name
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
  
    
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText)
    }
}
  
document.querySelector('#createHomeButton').addEventListener('click', newHomeHandler)