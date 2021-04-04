import { html } from '../../node_modules/lit-html/lit-html.js';
import { getSearchArticles } from '../api/data.js';

const searchTemplate = (searchText) => html`
<section id="search-page" class="content">
    <h1>Search</h1>
    <form @submit=${searchText} id="search-form">
        <p class="field search">
            <input type="text" placeholder="Search by article title" name="search">
        </p>
        <p class="field submit">
            <input class="btn submit" type="submit" value="Search">
        </p>
    </form>
    <div class="search-container">
    </div>
</section>`;

const matchTemplate = (arr) => `
<a class="article-preview" href="#">
    <article>
        <h3>Topic: <span>${arr.title}</span></h3>
        <p>Category: <span>${arr.category}</span></p>
    </article>
</a>`;

export async function searchPage(ctx) {

    ctx.render(searchTemplate(searchText));

    async function searchText(ev) {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        const searchStr = formData.get('search');
        const divElement = document.getElementsByClassName('search-container')[0];
        const result = await getSearchArticles(searchStr);
        divElement.innerHTML = result.length > 0
        ? result.map(matchTemplate)
        : `<h3 class="no-articles">No matching articles</h3>`;
    }
}