async function deleteHomeHandler(event) {
    event.preventDefault()
  
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ]
    
    const response = await fetch(`/api/homes/${id}`, {
        method: 'DELETE'
    })
  
    if (response.ok) {
        document.location.replace('/dashboard')
    } else {
        alert(response.statusText);
    }
}