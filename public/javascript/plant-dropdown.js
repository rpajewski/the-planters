const select = document.getElementById("select")

// calls database when page is loaded to store plant information in array
const getPlants = () => {
    fetch(`/api/plants`)
        .then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    populateDropdown(data)
                })
            }
        })
        .catch(err => {
            console.log(err)
        })
}

const populateDropdown = (plants) => {
    for (let i = 0; i < plants.length; i++) {
        let opt = plants[i].common_name
        let val = plants[i].id
        let el = document.createElement("option")
        el.text = opt
        el.value = val

        select.add(el)
    }
}

getPlants()