import { html, render } from 'https://unpkg.com/lit-html?module';
import { getAllFurniture } from '../api/data.js';
import { setActive } from '../navbar.js';

let dashboardTemplate = (products) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Welcome to Furniture System</h1>
        <p>Select furniture from the catalog to view details.</p>
    </div>
</div>
<div class="row space-top">${products}</div>`;

let productTemplate = (product) => html`
<div class="col-md-4">
    <div class="card text-white bg-primary">
        <div class="card-body">
            <img src=${product.img} />
            <p>${product.description}</p>
            <footer>
                <p>Price: <span>${product.price} $</span></p>
            </footer>
            <div>
                <a href="/details/${product._id}" class="btn btn-info">Details</a>
            </div>
        </div>
    </div>
</div>`;

let container = document.querySelector('.container');

export async function dashboardPage(ctx) {
    setActive('catalogLink');
    let furniture = await getAllFurniture();
    
    render(dashboardTemplate(furniture.map(productTemplate)), container);
}
