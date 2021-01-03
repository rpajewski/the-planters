// change rooms light light_level
async function editRoomHandler(event) {
    event.preventDefault()
  
    const last_watered = document.querySelector('input[name="last-watered"]').value.trim()
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ]

    const response = await fetch(`/api/rooms/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            last_watered
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
  
