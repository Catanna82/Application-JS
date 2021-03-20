// eventListener on window to show students info onLoad
// window.addEventListener('onLoad', studentsRow);

// get data from the server
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
// create new rows with students data
async function studentsRow() {
    const students = await request('http://localhost:3030/jsonstore/collections/students');
    const rows = Object.entries(students).map(createElements).join('');
    document.getElementById('results').children[1].innerHTML = rows;
}
document.getElementById('submit').addEventListener('click', createForm);
studentsRow()
// html data
function createElements([id, student]) {
    const result = `
    <tr data-id=${id}>
    <td>${student.firstName}</td>
    <td>${student.lastName}</td>
    <td>${student.facultyNumber}</td>
    <td>${student.grade}</td>
    </tr>`;
    return result;
}
// students tabs with submit button
async function createForm(event) {
    event.preventDefault();
    const formData = new FormData(event.target.parentNode);
    const student = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        facultyNumber: formData.get('facultyNumber'),
        grade: formData.get('grade')
    };
    const result = await request('http://localhost:3030/jsonstore/collections/students', {
        method: 'post',
        headers: { 'Content-Type': 'aplication/json' },
        body: JSON.stringify(student)
    });
    event.target.parentNode.reset();
    studentsRow();
    return result;
}
// createForm();