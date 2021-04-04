import { updateFurniture, getFurnitureDetails } from '../api/data.js'
import { html, render } from 'https://unpkg.com/lit-html?module';

let editTemplate = (product, onSubmit) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Edit Furniture</h1>
        <p>Please fill all fields.</p>
        <p style="display: none" class="wrong" id="makeAndModelError">• Make and Model must be at least 4 symbols long</p>
        <p style="display: none" class="wrong" id="yearError"Error>• Year must be between 1950 and 2050</p>
        <p style="display: none" class="wrong" id="descriptionError">• Description must be more than 10 symbols</p>
        <p style="display: none" class="wrong" id="priceError">• Price must be a positive number</p>
        <p style="display: none" class="wrong" id="imageError">• Image URL is required</p>
        <p style="display: none" class="wrong">• Material is optional</p>
    </div>
</div>
<form @submit=${onSubmit}>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-make">Make</label>
                <input class="form-control" id="new-make" type="text" name="make" value="${product.make}">
            </div>
            <div class="form-group has-success">
                <label class="form-control-label" for="new-model">Model</label>
                <input class="form-control is-valid" id="new-model" type="text" name="model" value="${product.model}">
            </div>
            <div class="form-group has-danger">
                <label class="form-control-label" for="new-year">Year</label>
                <input class="form-control is-invalid" id="new-year" type="number" name="year" value="${product.year}">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-description">Description</label>
                <input class="form-control" id="new-description" type="text" name="description" value="${product.description}">
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-price">Price</label>
                <input class="form-control" id="new-price" type="number" name="price" value="${product.price}">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-image">Image</label>
                <input class="form-control" id="new-image" type="text" name="img" value="${product.img}">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-material">Material (optional)</label>
                <input class="form-control" id="new-material" type="text" name="material" value="${product.material}">
            </div>
            <input type="submit" class="btn btn-info" value="Edit" />
        </div>
    </div>
</form>`;
let container = document.querySelector('.container');

export async function editPage(ctx){
    let id = ctx.params.id;
    let product = await getFurnitureDetails(id);
    render(editTemplate(product, onSubmit), container);

    let errorFields = {
        makeAndModelError: document.getElementById('makeAndModelError'),
        yearError: document.getElementById('yearError'),
        descriptionError: document.getElementById('descriptionError'),
        priceError: document.getElementById('priceError'),
        imageError: document.getElementById('imageError')
    }

    async function onSubmit(e) {
        e.preventDefault();
        let form = e.target;
        let formData = new FormData(form);
        let make = formData.get('make').trim();
        let model = formData.get('model').trim();
        let year = formData.get('year').trim();
        let description = formData.get('description').trim();
        let price = Number(formData.get('price').trim());
        let img = formData.get('img').trim();
        let material = formData.get('material').trim();

        Object.values(errorFields).forEach(f => f.style.display = 'none');
        let nonValid = validate(make, model, year, description, price, img);
        if(nonValid.length != 0){
            nonValid.forEach(e => errorFields[e].style.display = 'block')
            return;
        }

        updateFurniture(id, {make, model, year, description, price, img, material});
        
        ctx.page.redirect('/dashboard');
    }

    function validate(make, model, year, description, price, img){
        let wrong = [];
        if(make.length < 4 || model < 4){
            wrong.push('makeAndModelError');
        }
        if(year < 1950 || year > 2050){
            wrong.push('yearError');
        }
        if(description.length <= 10){
            wrong.push('descriptionError');
        }
        if(isNaN(price) || price <= 0){
            wrong.push('priceError');
        }
        if(!img){
            wrong.push('imageError');
        }
        return wrong;
    }
}