// plant id
const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
]

// new date to compare to
const currentDay = new Date()

// calls database when page is loaded to store plant information in array
const getPlant = () => {
    fetch(`/api/plants/${id}`)
    .then((response) => {
        if (response.ok) {
            response.json().then((data) => {
                console.log(data)
                lastWatered(plant)
            })
        } 
    })
    .catch(err => {
        console.log(err)
    })
}

// determine last watered
const lastWatered = (plant) => {
    const wateredOn = plant[0].last_watered

    if (!plant) {
        return
    }
    else {
        // compare dates
        const diffTime = Math.abs(currentDay - wateredOn)
        // convert answer to days 
        const diffDays = Math.round(diffTime / (1000 * 60 * 60 *24))

        waterNext(plant, diffDays)
    }
}

// decide if that plant needs to be watered 
const waterNext = (plant, diffDays) => {
    const waterSchedule = plant[0].water

    switch(waterSchedule) {
        case 'daily':
            console.log('Water Today!')
            break
        case 'weekly':
            const water = diffDays / 7

            if (water === 1) {
                console.log('Water Today!')
            }
            break
        case 'bi-weekly':
            const water = diffDays / 14

            if (water === 1) {
                console.log('Water Today!')
            }
            break
        default:
            console.log('No plant found!')
    }
}

getPlant()