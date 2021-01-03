const plantTable = document.getElementById("plantTable")

// calls database when page is loaded to store plant information in array
const getPlants = () => {
    fetch(`/api/plants`)
    .then((response) => {
        if (response.ok) {
            response.json().then((data) => {
                populatePlants(data)
            })
        } 
    })
    .catch(err => {
        console.log(err)
    })
}

// display plants in table
const populatePlants = (plants) => {
    for (let i = 0; i < plants.length; i++) {
        let plant = plants[i].common_name
        let filters = plants[i].filters
        let plantID = plants[i].id
        let plantURL = `/plants/${plantID}`
        let trPlant = document.createElement('tr')
        let tdName = document.createElement('td')
        let tdFilters = document.createElement('td')

        tdName.innerHTML = `<a class="link-styling" href="${plantURL}"><p>${plant}</p></a>`
        tdFilters.innerHTML = filters

        trPlant.appendChild(tdName)
        trPlant.appendChild(tdFilters)
    
        plantTable.appendChild(trPlant)
    }
}

// plant search by name
const searchPlantsByName = () =>  {
    let input = document.getElementById('userInputName')
    let filter = input.value.toUpperCase()
    let table = document.getElementById('plantTable')
    let tr = table.getElementsByTagName('tr')
  
    // Loop through all table rows, and hide those who don't match the search query
    for (let i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName('td')[0]
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = ''
            } 
            else {
                tr[i].style.display = 'none'
            }
        }
    }
}

// plant search by filters
const searchPlantsByFilters = () =>  {
    let input = document.getElementById('userInputFilter')
    let filter = input.value.toUpperCase()
    let table = document.getElementById('plantTable')
    let tr = table.getElementsByTagName('tr')
  
    // Loop through all table rows, and hide those who don't match the search query
    for (let i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName('td')[1]
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = ''
            } 
            else {
                tr[i].style.display = 'none'
            }
        }
    }
}

// plant search by buttons
const searchPlantsByButtons = (button) =>  {
    let input = button
    let filter = input.toUpperCase()
    let table = document.getElementById('plantTable')
    let tr = table.getElementsByTagName('tr')
  
    // Loop through all table rows, and hide those who don't match the search query
    for (let i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName('td')[1]
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = ''
            } 
            else {
                tr[i].style.display = 'none'
            }
        }
    }
}

// reset table for new button search 
const resetSearch = () => {
    let table = document.getElementById('plantTable')
    let tr = table.getElementsByTagName('tr')

    for (let i = 0; i < tr.length; i++) {
        tr[i].style.display = ''
    }
}

// call getPlants to store data
getPlants()