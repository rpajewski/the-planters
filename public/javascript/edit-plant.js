// move plant to different room
async function editPlantHandler(event) {
    event.preventDefault()
  
    const room_id = document.querySelector('input[name="room-id"]').value.trim()
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ]

    const response = await fetch(`/api/userplants/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            room_id
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
  
// generate dropdown for rooms
const select = document.getElementById("select")

const getRooms = () => {
    fetch(`/api/rooms`)
        .then((response) => {
            if (response.ok) {
                response.json()
                    .then((roomData) => {
                        populateRooms(roomData)
                    })
            }
        })
        .catch(err => console.log(err));
};

const populateRooms = (rooms) => {
    for (let a = 0; a < rooms.length; a++) {
        let opt = rooms[a].room_name;
        let val = rooms[a].id;
        let el = document.createElement("option");
        el.text = opt;
        el.value = val;

        select.add(el);
    }
};

getRooms();