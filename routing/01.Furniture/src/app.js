import page from "//unpkg.com/page/page.mjs";
import { logout } from './api/data.js';
import { html, render } from 'https://unpkg.com/lit-html?module';
import { setUserNav, setActive } from './navbar.js';

import { dashboardPage } from './views/dashboard.js';
import { detailsPage } from './views/details.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { createPage } from './views/create.js';
import { editPage } from "./views/edit.js";
import { myPage } from "./views/my-furniture.js";

let nav = document.querySelector('nav');

page('/dashboard', dashboardPage);
page('/details/:id', detailsPage);
page('/login', loginPage);
page('/create', createPage);
page('/edit/:id', editPage);
page('/register', registerPage);
page('/my-furniture', myPage);

page.redirect('/', '/dashboard');
page.start();

setUserNav();

nav.querySelector('#logoutBtn').addEventListener('click', async e => {
    e.preventDefault();
    await logout();
    setUserNav();
});


