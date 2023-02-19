export default class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    addNewCard(name, link, error) {
        return this._send('cards', 'POST', { name: name, link: link }, error);
    }

    getCards(error) {
        return this._send('cards', null, null, error);
    }

    getUserInfo(error) {
        return this._send('users/me', null, null, error);
    }

    editProfile(obj, error) {
        return this._send('users/me', 'PATCH', obj, error);
    }

    requestDeleteCard(cardId, error) {
        return this._send(`cards/${cardId}`, 'DELETE', null, error);
    }

    requestLikeAction(like, cardId, error) {
        return this._send(`cards/${cardId}/likes`, like ? 'DELETE' : 'PUT', null, error);
    }

    editAvatar(link, error) {
        return this._send('users/me/avatar', 'PATCH', { avatar: link }, error);
    }

    _send(path, method, body, error) {
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
            .catch(err => {
                console.error('Что-то пошло не так', err);
                if (error) {
                    error(err)
                };
            });
    }
};