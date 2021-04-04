import { html } from '../../node_modules/lit-html/lit-html.js';
import { getHomeArticles } from '../api/data.js'

const homeTemplate = (articles) => html`
<section id="home-page" class="content">
    <h1>Recent Articles</h1>
    <section class="recent js">
        <h2>JavaScript</h2>
        ${artTemplate(articles.find(a => a.category === 'JavaScript'))}
    </section>
    <section class="recent csharp">
        <h2>C#</h2>
        ${artTemplate(articles.find(a => a.category === 'C#'))}
    </section>
    <section class="recent java">
        <h2>Java</h2>
            ${artTemplate(articles.find(a => a.category === 'Java'))}
    </section>
    <section class="recent python">
        <h2>Python</h2>
        ${artTemplate(articles.find(a => a.category === 'Python'))}
    </section>
</section>`;

const artTemplate = (art) => 
art 
    ? html`
    <article>
        <h3>${art.title}</h3>
        <p>${art.content}</p>
        <a href="/details/${art._id}" class="btn details-btn">Details</a>
    </article>` 
    : html`<h3 class="no-articles">No articles yet</h3>`;


export async function homePage(ctx) {
    const articles = await getHomeArticles();
    ctx.render(homeTemplate(articles));
}


