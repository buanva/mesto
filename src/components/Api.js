export default class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    addNewCard(name, link) {
        return this._send('cards', 'POST', { name: name, link: link });
    }

    getCards() {
        return this._send('cards');
    }

    getUserInfo() {
        return this._send('users/me');
    }

    editProfile(obj) {
        return this._send('users/me', 'PATCH', obj);
    }

    requestDeleteCard(cardId) {
        return this._send(`cards/${cardId}`, 'DELETE');
    }

    requestLikeAction(like, cardId) {
        return this._send(`cards/${cardId}/likes`, like ? 'DELETE' : 'PUT');
    }

    editAvatar(link) {
        return this._send('users/me/avatar', 'PATCH', { avatar: link });
    }

    _send(path, method, body) {
        const options = {
            method: method ? method : "GET",
            headers: this._headers
        };
        if (body) {
            options.headers['Content-Type'] = 'application/json';
            options.body = JSON.stringify(body);
        };
        return fetch(`${this._baseUrl}/${path}`, options)
            .then(res => res.ok ? res.json() : Promise.reject(res))
    }
};