// Add Plant to Userplant (this is what's displayed on user dashboard)
async function addPlantToDashboard(event) {
    event.preventDefault();

    const plant = document.getElementById('select');
    const plant_id = plant.options[plant.selectedIndex].value;
    console.log(plant_id)

    // post to dashboard
    const response = await fetch(`/api/userplants`, {
        method: 'POST',
        body: JSON.stringify({
            plant_id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    console.log(response);

    if (response.ok) {
        document.location.replace('/dashboard')
    } else {
        alert(response.statusText)
    }
}

async function addPlantFromInfo(plantID) {
    const plant_id = plantID
    console.log(plant_id)

    // post to dashboard
    const response = await fetch(`/api/userplants`, {
        method: 'POST',
        body: JSON.stringify({
            plant_id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    console.log(response);

    if (response.ok) {
        document.location.replace('/dashboard')
    } else {
        alert(response.statusText)
    }
}

document.querySelector('#addPlant').addEventListener('click', addPlantToDashboard)