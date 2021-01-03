async function deletePlantHandler(event) {
    event.preventDefault()
  
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ]
    
    const response = await fetch(`/api/userplants/${id}`, {
        method: 'DELETE'
    })
  
    if (response.ok) {
        document.location.replace('/dashboard')
    } else {
        alert(response.statusText);
    }
}

async function deletePlantDashboard(plant) {
    const id = plant

    const response = await fetch(`/api/userplants/${id}`, {
        method: 'DELETE'
    })
  
    if (response.ok) {
        document.location.replace('/dashboard')
    } else {
        alert(response.statusText);
    }
}