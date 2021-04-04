import { html } from '../../node_modules/lit-html/lit-html.js';

import { createArticles} from '../api/data.js';

const createTemplate = (onSubmit) => html`
<section id="create-page" class="content">
            <h1>Create Article</h1>

            <form @submit=${onSubmit} id="create" action="#" method="">
                <fieldset>
                    <p class="field title">
                        <label for="create-title">Title:</label>
                        <input type="text" id="create-title" name="title" placeholder="Enter article title">
                    </p>

                    <p class="field category">
                        <label for="create-category">Category:</label>
                        <input type="text" id="create-category" name="category" placeholder="Enter article category">
                    </p>
                    <p class="field">
                        <label for="create-content">Content:</label>
                        <textarea name="content" id="create-content"></textarea>
                    </p>

                    <p class="field submit">
                        <input class="btn submit" type="submit" value="Create">
                    </p>

                </fieldset>
            </form>
        </section>`;


export async function createPage(ctx) {
    ctx.render(createTemplate(onSubmit));
    async function onSubmit(ev) {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        const title = formData.get('title');
        const content = formData.get('content');
        const category = formData.get('category');
        try {
            if (!title || !content || !category) {
                throw new Error('All fields are required!')
            }
            if(!['JavaScript','C#','Java','Python'].includes(category)) {
                throw new Error('Category must be one of JavaScript, C#, Java, Python');
            }
            const result = await createArticles({
                title,
                content,
                category
            });
            ctx.page.redirect('/');
            return result;
        } catch (err) {
            alert(err.message);
        }
    }
}
