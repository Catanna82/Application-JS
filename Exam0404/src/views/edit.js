import { html } from '../../node_modules/lit-html/lit-html.js';
import { getArticlesById, updateArticles } from '../api/data.js';

const editTemplate = (art, onSubmit) => html`
<section id="edit-page" class="content">
    <h1>Edit Article</h1>

    <form @submit=${onSubmit} id="edit" action="#" method="">
        <fieldset>
            <p class="field title">
                <label for="title">Title:</label>
                <input type="text" name="title" id="title" placeholder="Enter article title" .value=${art.title}>
            </p>

            <p class="field category">
                <label for="category">Category:</label>
                <input type="text" name="category" id="category" placeholder="Enter article category"
                    .value=${art.category}>
            </p>
            <p class="field">
                <label for="content">Content:</label>
                <textarea name="content" id="content" .value=${art.content}></textarea>
            </p>

            <p class="field submit">
                <input class="btn submit" type="submit" value="Save Changes">
            </p>

        </fieldset>
    </form>
</section>`;

export async function editPage(ctx) {
    const artId = ctx.params.id;
    const art = await getArticlesById(artId);

    ctx.render(editTemplate(art, onSubmit));

    async function onSubmit(ev) {
        ev.preventDefault();

        const formData = new FormData(ev.target);
        const title = formData.get('title');
        const category = formData.get('category');
        const content = formData.get('content');
        try {
            if (!title || !category || !content) {
                throw new Error('All fields are required!');
            }
            if (!['JavaScript', 'C#', 'Java', 'Python'].includes(category)) {
                throw new Error('Category must be one of JavaScript, C#, Java, Python');
            }
            await updateArticles(artId, {
                title,
                content,
                category
            });

            ctx.page.redirect('/details/' + artId);
        } catch (err) {
            alert(err.message);
        }
    }
}