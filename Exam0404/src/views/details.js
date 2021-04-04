import { html } from '../../node_modules/lit-html/lit-html.js';

import {deleteArticles, getArticlesById} from '../api/data.js';

const detailsTemplate = (art, isOwner, onDelete) => html`
<section id="details-page" class="content details">
    <h1>${art.title}</h1>
        <div class="details-content">
            <strong>Published in category ${art.category}</strong>
                <p>
                 ${art.content}
                </p>
                ${isOwner 
                ? html`
                <div class="buttons">
                    <a @click=${onDelete} href="/" class="btn delete">Delete</a>
                    <a href="/edit/${art._id}" class="btn edit">Edit</a>
                </div>`
                : ''}
            <a href="/" class="btn edit">Back</a>
        </div>
</section>`;

export async function detailsPage(ctx) {
    const userId = sessionStorage.getItem('userId');
    const artId = ctx.params.id;
    const art = await getArticlesById(artId);
    const isOwner = userId === art._ownerId;

    ctx.render(detailsTemplate(art, isOwner, onDelete));

    async function onDelete() {
        const confirmed = confirm('Are you sure you want to delete these Article?');
        if(confirmed) {
            await deleteArticles(artId);
            ctx.page.redirect('/');
        }
    }
}