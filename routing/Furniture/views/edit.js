import { html } from '../node_modules/lit-html/lit-html.js';
import { getItemById, editRecord } from '../api/data.js';

const editTemplate = (item, onSubmit, {invalidMake, invalidModel, invalidYear, invalidDescription, invalidPrice, invalidImgURL} = {}) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Edit Furniture</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${onSubmit}>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-make">Make</label>
                <input class=${'form-control' + (invalidMake ? ' is-invalid' : '')} id="new-make" type="text" name="make" .value=${item.make}>
            </div>
            <div class="form-group has-success">
                <label class="form-control-label" for="new-model">Model</label>
                <input class=${'form-control' + (invalidModel ? ' is-invalid' : '')} id="new-model" type="text" name="model" .value=${item.model}>
            </div>
            <div class="form-group has-danger">
                <label class="form-control-label" for="new-year">Year</label>
                <input class=${'form-control' + (invalidYear ? ' is-invalid' : '')} id="new-year" type="number" name="year" .value=${item.year}>
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-description">Description</label>
                <input class=${'form-control' + (invalidDescription ? ' is-invalid' : '')} id="new-description" type="text" name="description" .value=${item.description}>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-price">Price</label>
                <input class=${'form-control' + (invalidPrice ? ' is-invalid' : '')} id="new-price" type="number" name="price" .value=${item.price}>
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-image">Image</label>
                <input class=${'form-control' + (invalidImgURL ? ' is-invalid' : '')} id="new-image" type="text" name="img" .value=${item.img}>
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-material">Material (optional)</label>
                <input class="form-control" id="new-material" type="text" name="material" .value=${item.material}>
            </div>
            <input type="submit" class="btn btn-info" value="Edit" />
        </div>
    </div>
</form>`;

export async function editPage(ctx) {
    const id = ctx.params.id;
    const item = await getItemById(id);

    ctx.render(editTemplate(item, onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const fields = {};
        const formData = new FormData(event.target);
        const data = [...formData.entries()].reduce((a, [k, v]) => Object.assign(a, {[k]: v}), {});
// validation logic for each fields
        if(Object.entries(data).filter(([k, v]) => k != 'material').some(([k, v])=> v == '')) {
            return alert('Please fill all mandatory fields!');
        }
        if(data.make.length < 4) {
            fields.invalidMake = true;
        }
        if(data.model.length < 4) {
            fields.invalidModel = true;
        }
        if(data.year < 1950 || data.year > 2050) {
            fields.invalidYear = true;
        }
        if(data.description.length < 10) {
            fields.invalidDescription = true;
        }
        if(data.img.length < 4) {
            fields.invalidImgURL = true;
        }
        if (Object.entries(fields).length > 0) {
            alert('Please check your data fields!');
            return ctx.render(editTemplate(item, onSubmit, fields));
        }
        data.year =Number(data.year);
        data.price =Number(data.price);

        await editRecord(item._id, data);

        ctx.page.redirect('/');
    }
}