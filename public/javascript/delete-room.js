async function deleteRoomHandler(event) {
    event.preventDefault()
  
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ]
    
    const response = await fetch(`/api/rooms/${id}`, {
        method: 'DELETE'
    })
  
    if (response.ok) {
        document.location.replace('/dashboard')
    } else {
        alert(response.statusText);
    }
}
  
document.querySelector('.delete-room-btn').addEventListener('click', deleteRoomHandler)