export function buildApi(hostURL) {

    let serviceEndpoints = {
        LOGIN: '/users/login',
        REGISTER: '/users/register',
        LOGOUT: '/users/logout'
    };

    return {
        getOptions(headers) {
            let token = sessionStorage.getItem('authToken');

            let options = { headers: headers || {} };

            if (token != null) {
                Object.assign(options.headers, { 'X-Authorization': token });
            }
            return options;
        },

        host(endpoint) {
            return hostURL + endpoint;
        },

        async request(endpoint, options) {
            let response;
            try {
                response = await fetch(endpoint, options);
                if (response.ok) {
                    return await response.json();
                }
                else {
                    throw new Error((await response.json()).message);
                }
            }
            catch (e) {
                if (e instanceof SyntaxError)
                    return response;
                else if (e.message == 'Invalid access token') {
                    console.log(e.message);
                    sessionStorage.removeItem('authToken');
                    sessionStorage.removeItem('userId');
                    window.location.pathname = '/';
                }
                else {
                    throw e;
                }
            }
        },

        async get(endpoint) {
            return this.request(this.host(endpoint), this.getOptions());
        },

        async post(endpoint, content) {
            let options = this.getOptions({ 'Content-Type': 'application/json' });
            options.method = 'POST';
            options.body = JSON.stringify(content);
            return this.request(this.host(endpoint), options);
        },
        async put(endpoint, content) {
            let options = this.getOptions({ 'Content-Type': 'application/json' });
            options.method = 'PUT';
            options.body = JSON.stringify(content);
            return this.request(this.host(endpoint), options);
        },
        async delete(endpoint) {
            let options = this.getOptions();
            options.method = 'DELETE';
            return this.request(this.host(endpoint), options);
        },

        async login(email, password) {
            let response = await this.post(serviceEndpoints.LOGIN, { email, password });
            sessionStorage.setItem('authToken', response.accessToken);
            sessionStorage.setItem('email', response.email);
            sessionStorage.setItem('userId', response._id);
            return response;
        },
        async register(email, password) {
            let response = await this.post(serviceEndpoints.REGISTER, { email, password });
            sessionStorage.setItem('authToken', response.accessToken);
            sessionStorage.setItem('email', response.email);
            sessionStorage.setItem('userId', response._id);
            return response;
        },
        async logout() {
            let result = await this.get(serviceEndpoints.LOGOUT);
            sessionStorage.removeItem('authToken');
            sessionStorage.removeItem('email');
            sessionStorage.removeItem('userId');
            return result;
        }
    };
}