import { render } from '../../../node_modules/lit-html/lit-html.js';
import * as api from './data.js';
import { layoutTemplate } from './main.js'

const onSubmit = {
    'add-form': onCreateSubmit,
    'edit-form': onEditSubmit
};

const ctx = {
    list: [],
    load: async () => {
        ctx.list = await api.getAllBooks();
        update();
    },
    onEdit(id) {
        const book = ctx.list.find(b => b._id == id);
        update(book);
    },
    async onDelete(id) {
        const confirmed = confirm('Are you sure?');
        if(confirmed) {
            await api.deleteBook(id);
            await ctx.load();
        }
    }
};

document.body.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    onSubmit[event.target.id](formData, event.target);
});

start();
async function start() {

    update();
}

function update(bookToEdit) {
    const result = layoutTemplate(ctx, bookToEdit);
    render(result, document.body);
}

async function onCreateSubmit(formData) {
    const book = {
        title: formData.get('title'),
        author: formData.get('author')
    }
    if(book.title && book.author) {
        await api.createBook(book);
    }

}
async function onEditSubmit(formData, form) {
    const id = formData.get('_id');
    const book = {
        title: formData.get('title'),
        author: formData.get('author')
    }

    await api.updateBook(id, book);
    form.reset();
    update()
}
