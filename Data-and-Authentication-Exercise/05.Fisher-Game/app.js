// add eventListeners on buttons
function attachEvents() {
    document.getElementsByClassName('load')[0].addEventListener('click', loadAllCatches);
    document.getElementsByClassName('add')[0].addEventListener('click', createCatches);
}
attachEvents();

//load all fish from the server with get request on load button
async function loadAllCatches() {
    const response = await fetch('http://localhost:3030/data/catches');
    const data = await response.json();
    const ownerLogged = sessionStorage.getItem('id');
    if(ownerLogged) {
        document.getElementsByClassName('add')[0].disabled = false;
    }
    const result = data.map(({
        angler,
        weight,
        species,
        location,
        bait,
        captureTime,
        _ownerId,
        _id
    }) => {
        const disabled = ownerLogged === _ownerId ? '' : 'disabled';
        return `
            <div id="${_id}" ownerId="${_ownerId}" class="catch">
                <label>Angler</label>
                <input type="text" class="angler" value="${angler}" />
                <hr>
                <label>Weight</label>
                <input type="number" class="weight" value="${weight}" />
                <hr>
                <label>Species</label>
                <input type="text" class="species" value="${species}" />
                <hr>
                <label>Location</label>
                <input type="text" class="location" value="${location}" />
                <hr>
                <label>Bait</label>
                <input type="text" class="bait" value="${bait}" />
                <hr>
                <label>Capture Time</label>
                <input type="number" class="captureTime" value="${captureTime}" />
                <hr>
                <button ${disabled} class="update">Update</button>
                <button ${disabled} class="delete">Delete</button>
            </div>`;
    }).join('');
    document.getElementById('catches').innerHTML = result;
    Array.from(document.getElementsByClassName('update')).map(b => b.addEventListener('click', updateCatches));
    Array.from(document.getElementsByClassName('delete')).map(b => b.addEventListener('click', deleteCatches));
}
// update information with put request on update button
async function updateCatches(event) {
    event.preventDefault();
    const angler = document.getElementsByClassName('angler')[0].value;
    const weight = document.getElementsByClassName('weight')[0].value;
    const species = document.getElementsByClassName('species')[0].value;
    const location = document.getElementsByClassName('location')[0].value;
    const bait = document.getElementsByClassName('bait')[0].value;
    const captureTime = document.getElementsByClassName('captureTime')[0].value;
    const fish = {
        angler,
        weight,
        species,
        location,
        bait,
        captureTime
    }
    const response = await fetch('http://localhost:3030/data/catches/' + event.target.parentNode.id, {
        method: 'put',
        headers: {
            'Content-Type': 'aplication/json',
            'X-Authorization': sessionStorage.getItem('userToken')
        },
        body: JSON.stringify(fish)
    });
    if(response.ok) {
        alert('Successfully updated!');
    } else {
        const error = await response.json();
        return alert(error.message);
    }
}
// delete fish from the loading page and from the server /only if it is owner! with delete button
async function deleteCatches(event) {

    const confirmed = confirm('Are you sure you want to delete this record?');
    if (confirmed) {
        await fetch('http://localhost:3030/data/catches/' + event.target.parentNode.id, {
            method: 'delete',
            headers: {
                'Content-Type': 'aplication/json',
                'X-Authorization': sessionStorage.getItem('userToken')
            }
        });
        loadAllCatches();
    }
}
// add a new catch pressing add button
async function createCatches() {
    const formElement = document.getElementById('addForm');
    const angler = formElement.getElementsByClassName('angler')[0].value;
    const weight = formElement.getElementsByClassName('weight')[0].value;
    const species = formElement.getElementsByClassName('species')[0].value;
    const location = formElement.getElementsByClassName('location')[0].value;
    const bait = formElement.getElementsByClassName('bait')[0].value;
    const captureTime = formElement.getElementsByClassName('captureTime')[0].value;
    const fish = {
        angler,
        weight,
        species,
        location,
        bait,
        captureTime
    }
    const response = await fetch('http://localhost:3030/data/catches', {
        method: 'post',
        headers:
        {
            'Content-Type': 'aplication/json',
            'X-Authorization': sessionStorage.getItem('userToken')
        },
        body: JSON.stringify(fish)
    });
    if(response.ok) {
        alert('Successfully created!');
    } else {
        const error = await response.json();
        return alert(error.message);
    }
    formElement.getElementsByClassName('angler')[0].value = '';
    formElement.getElementsByClassName('weight')[0].value = '';
    formElement.getElementsByClassName('species')[0].value = '';
    formElement.getElementsByClassName('location')[0].value = '';
    formElement.getElementsByClassName('bait')[0].value = '';
    formElement.getElementsByClassName('captureTime')[0].value = '';
    loadAllCatches();
}

