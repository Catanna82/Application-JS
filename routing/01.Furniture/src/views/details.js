import { getFurnitureDetails, deleteFurniture } from '../api/data.js'
import { html, render } from 'https://unpkg.com/lit-html?module';
import { setActive } from '../navbar.js';


let detailsTemplate = (product, onDelete, userId) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Furniture Details</h1>
    </div>
</div>
<div class="row space-top">
    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                <img src=${product.img.charAt(0) == '.' ? product.img.substring(1) : product.img} />
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <p>Make: <span>${product.make}</span></p>
        <p>Model: <span>${product.model}</span></p>
        <p>Year: <span>${product.year}</span></p>
        <p>Description: <span>${product.description}</span></p>
        <p>Price: <span>${product.price}</span></p>
        <p>Material: <span>${product.material}</span></p>
        <div>
            <a style="visibility: ${userId == product._ownerId ? 'visible' : 'hidden'};" href="/edit/${product._id}" class="btn btn-info">Edit</a>
            <a style="visibility: ${userId == product._ownerId ? 'visible' : 'hidden'};" @click=${(e) => onDelete(e, product._id)} href="#" class="btn btn-red">Delete</a>
        </div>
    </div>
</div>`;

let container = document.querySelector('.container');

export async function detailsPage(ctx) {
    setActive();
    let page = ctx.page;
    let id = ctx.params.id;
    let details = await getFurnitureDetails(id);
    
    render(detailsTemplate(details, onDelete, sessionStorage.getItem('userId')), container);

    async function onDelete(e, furnitureId){
        e.preventDefault();
        if(!confirm('Are you sure you want to delete that product?')) return;
        try{
            await deleteFurniture(furnitureId);
            page.redirect('/dashboard');
        }
        catch(err){
            console.log(err.message);
        }
       
    }
}