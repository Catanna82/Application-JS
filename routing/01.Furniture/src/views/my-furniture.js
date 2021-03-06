import { getMyFurniture } from '../api/data.js'
import { html, render } from 'https://unpkg.com/lit-html?module';
import { setActive } from '../navbar.js';


let myFurnitureTemplate = (products) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>My Furniture</h1>
        <p>This is a list of your publications.</p>
    </div>
</div>
<div class="row space-top">
    ${products}
</div>`;

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

export async function myPage(ctx) {
    setActive('profileLink');
    let furniture = await getMyFurniture(sessionStorage.getItem('userId'));

    render(myFurnitureTemplate(furniture.map(productTemplate)), container);
}
