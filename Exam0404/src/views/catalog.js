import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllArticles } from '../api/data.js';

const catalogTemplate = (articles) => html`
<section id="catalog-page" class="content catalogue">
    <h1>All Articles</h1>
        ${articles.length == 0 
            ? html`<h3 class="no-articles">No articles yet</h3>` 
            : articles.map(artTemplate)}
</section>`;

const artTemplate = (art) => html`
<a class="article-preview" href="/details/${art._id}">
    <article>
        <h3>Topic: <span>${art.title}</span></h3>
        <p>Category: <span>${art.category}</span></p>
    </article>
</a>`;

export async function catalogPage(ctx) {

    const articles = await getAllArticles();

    ctx.render(catalogTemplate(articles));
}
