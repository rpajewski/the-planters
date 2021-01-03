async function newRoomHandler(event) {
    event.preventDefault()
  
    const room_name = document.querySelector('input[name="room-name"]').value
    // const light_level = document.querySelector('input[name="light-level]').value
    // const home_id = document.querySelector('input[name="home-id]').value
  
    const response = await fetch(`/api/rooms`, {
        method: 'POST',
        body: JSON.stringify({
            room_name,
            // light_level,
            // home_id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
  
    if (response.ok) {
        document.location.replace('/dashboard')
    } else {
        alert(response.statusText)
    }
}
  
document.querySelector('#addRoomButton').addEventListener('click', newRoomHandler)