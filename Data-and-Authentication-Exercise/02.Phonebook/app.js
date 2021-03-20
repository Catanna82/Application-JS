function attachEvents() {
    document.getElementById('btnLoad').addEventListener('click', loadPhonebook);
    document.getElementById('btnCreate').addEventListener('click', createPhone);
}

attachEvents();

async function request(url, options) {
    const response = await fetch(url, options);
    if (response.ok != true) {
        const error = await response.json();
        alert(error.message);
        throw new Error(error.message);
    }
    const data = await response.json();
    return data;
}

async function createPhone(event) {
    event.preventDefault();
    const person = document.getElementById('person').value;
    const phone = document.getElementById('phone').value;
    if (person && phone) {
        const record = {
            person,
            phone
        };
        const result = await request('http://localhost:3030/jsonstore/phonebook/phonebook', {
            method: 'post',
            headers: { 'Content-Type': 'aplication/json' },
            body: JSON.stringify(record)
        });
    }
    loadPhonebook();
}

async function loadPhonebook() {
    const data = await request('http://localhost:3030/jsonstore/phonebook');
    const ulElement = document.getElementById('phonebook');
    ulElement.innerHTML = '';
    const result = Object.keys(data.phonebook).map(v => {
        const liElement = document.createElement('li');
        liElement.setAttribute('id', v);
        liElement.textContent = `${data.phonebook[v].person}: ${data.phonebook[v].phone}`;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        liElement.appendChild(deleteBtn);
        ulElement.appendChild(liElement);
        deleteBtn.addEventListener('click', deleteData);
    });
}

async function deleteData(event) {
    event.preventDefault();
    const id = event.target.parentNode.id;
    const result = await request('http://localhost:3030/jsonstore/phonebook/phonebook/' + id, {
        method: 'delete',
    });
    loadPhonebook();
}
