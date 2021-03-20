async function lockedProfile() {
    const profiles = await getData()
    document.getElementById('main').addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const profile = e.target.parentNode;
            const isLocked = profile.querySelector('input[type=radio]:checked').value === 'lock';
            if (isLocked) {
                return;
            }
            let div = profile.querySelector('div');
            let isVisible = div.style.display === 'block';
            div.style.display = isVisible ? 'none' : 'block';
            e.target.textContent = !isVisible ? 'Hide it' : 'Show more'
        }
    });

    let mainTag = document.getElementById('main');
    mainTag.children[0].remove();
    Object.values(profiles).map((p, i) => {
        mainTag.appendChild(createProfile(p, i));
    })

}

function createProfile({age, username, email}, i) {
    const prof = e('div', {},
        e('img', { src: './iconProfile2.png'}),
        e('label', {}, 'Lock'),
        e('input', { type: 'radio', name: `user${i}Locked`, value: 'lock', checked: true }),
        e('label', {}, 'Unlock'),
        e('input', { type: 'radio', name: `user${i}Locked`, value: 'unlock' }),
        e('br', {}),
        e('hr', {}),
        e('label', {}, 'Username'),
        e('input', { type: 'text', name: `user${i}Username`, value: username, disabled: true, readonly: true }),
        e('div', { id: `user${i}HiddenFields` },
            e('hr', {}),
            e('label', {}, 'Email:'),
            e('input', { type: 'email', name: `user${i}Email`, value: email, disabled: true, readonly: true }),
            e('label', {}, 'Age:'),
            e('input', { type: 'email', name: `user${i}Age`, value: age, disabled: true, readonly: true })
        ),
        e('button', {}, 'Show more')
    );
    prof.children[0].classList.add('userIcon')
    prof.classList.add('profile');
    return prof;
}

async function getData() {
    const url = 'http://localhost:3030/jsonstore/advanced/profiles';

    const response = await fetch(url);
    const data = await response.json();

    return data;
}

function e(type, attributes, ...content) {
    const result = document.createElement(type);

    for (let [attr, value] of Object.entries(attributes || {})) {
        if (attr.substring(0, 2) == 'on') {
            result.addEventListener(attr.substring(2).toLocaleLowerCase(), value);
        } else {
            result[attr] = value;
        }
    }

    content = content.reduce((a, c) => a.concat(Array.isArray(c) ? c : [c]), []);

    content.forEach(e => {
        if (typeof e == 'string' || typeof e == 'number') {
            const node = document.createTextNode(e);
            result.appendChild(node);
        } else {
            result.appendChild(e);
        }
    });

    return result;
}
