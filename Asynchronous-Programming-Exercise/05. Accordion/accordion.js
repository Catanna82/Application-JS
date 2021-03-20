async function solution() {

    const mainTag = document.getElementById('main');
    const title = await getData();
    title.map(t => {
        return mainTag.appendChild(createAccordion(t));
    })

}
solution();
function createAccordion({ title, _id }) {
    const acc = e('div', {},
        e('div', {},
            e('span', {}, title),
            e('button', { id: _id }, 'More')
        ),
        e('div', {},
            e('p', {}, '')
        )
    );
    acc.classList.add('accordion');
    acc.children[0].classList.add('head');
    acc.children[0].children[1].classList.add('button');
    acc.children[1].classList.add('extra');

    const button = acc.querySelector('button').addEventListener('click', async (ev) => {
        const divExtra = acc.children[1];
        divExtra.style.display = divExtra.style.display !== 'block'
            ? 'block'
            : 'none';
        ev.target.textContent = ev.target.textContent === 'More' ? 'Less' : 'More';
        let {content} = await getMore(ev.target.id);
        acc.children[1].children[0].textContent = content;
    });


    return acc;

}

async function getData() {
    const url = 'http://localhost:3030/jsonstore/advanced/articles/list';

    const response = await fetch(url);
    const list = await response.json();

    return list;
}

async function getMore(id) {
    const url = 'http://localhost:3030/jsonstore/advanced/articles/details/' + id;

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