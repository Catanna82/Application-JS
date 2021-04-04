let nav = document.querySelector('nav');
export function setUserNav() {
    if (sessionStorage.getItem('authToken')) {
        nav.querySelector('#guest').style.display = 'none';
        nav.querySelector('#user').style.display = 'inline';
    }
    else {
        nav.querySelector('#guest').style.display = 'inline';
        nav.querySelector('#user').style.display = 'none';
    }
}

export function setActive(buttonId) {
    Array.from(nav.querySelectorAll('A')).forEach(e => e.classList.remove('active'));
    if (buttonId) {
        nav.querySelector(`#${buttonId}`).classList.add('active');
    }
}