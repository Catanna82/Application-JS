// login
document.getElementsByTagName('button')[1].addEventListener('click', onLoginSubmit);

async function onLoginSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target.parentNode);

    const email = formData.get('email');
    const password = formData.get('password');


    const response = await fetch('http://localhost:3030/users/login', {
        method: 'post',
        headers: { 'Content-Type': 'aplication/json' },
        body: JSON.stringify({ email, password })
    });

    if (response.ok == false) {
        const error = await response.json();
        return alert(error.message);
    }

    const data = await response.json();
    sessionStorage.setItem('userToken', data.accessToken);
    sessionStorage.setItem('id', data._id);
    window.location.href = './index.html';


}


// register
document.getElementsByTagName('button')[0].addEventListener('click', onRegisterSubmit);

async function onRegisterSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target.parentNode);

    const email = formData.get('email');
    const password = formData.get('password');
    const rePass = formData.get('rePass');
    if (email == '' || password == '') {
        return alert('All fields are require!')
    } else if (password !== rePass) {
        return alert('Password don\'t match!')
    }

    const response = await fetch('http://localhost:3030/users/register', {
        method: 'post',
        headers: { 'Content-Type': 'aplication/json' },
        body: JSON.stringify({ email, password })
    });

    if (response.ok == false) {
        const error = await response.json();
        return alert(error.message);
    }

    const data = await response.json();
    sessionStorage.setItem('userToken', data.accessToken);

    window.location.href = './index.html';
}