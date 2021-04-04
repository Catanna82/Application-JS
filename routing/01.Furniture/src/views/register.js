import { html, render } from 'https://unpkg.com/lit-html?module';
import { register } from '../api/data.js';
import { setUserNav, setActive } from '../navbar.js';

let registerTemplate = (onSubmit) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Register New User</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${onSubmit}>
    <div class="row space-top">
        <div class="col-md-4">
            <div id="somethingWrong" style="display: none">Incorrect email or password</div>
            <div class="form-group">
                <label class="form-control-label" for="email">Email</label>
                <input class="form-control" id="email" type="text" name="email">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="password">Password</label>
                <input class="form-control" id="password" type="password" name="password">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="rePass">Repeat</label>
                <input class="form-control" id="rePass" type="password" name="rePass">
            </div>
            <input type="submit" class="btn btn-primary" value="Register" />
        </div>
    </div>
</form>`;
let container = document.querySelector('.container');

export async function registerPage(ctx) {
    setActive('registerLink');
    render(registerTemplate(onSubmit), container);

    async function onSubmit(e) {
        e.preventDefault();
        let somethingWrong = document.getElementById('somethingWrong');
        let formData = new FormData(e.target);
        let email = formData.get('email').trim();
        let password = formData.get('password').trim();
        let rePass = formData.get('rePass').trim();
        if (!email || !password || password != rePass) {
            somethingWrong.style.display = 'block';
            return;
        }
        e.target.reset();
        try {
            await register(email, password);
            setUserNav();
            ctx.page.redirect('/dashboard');
        }
        catch (error) {
            if (error.message == 'Login or password don\'t match')
                somethingWrong.style.display = 'block';
        }
    }
}