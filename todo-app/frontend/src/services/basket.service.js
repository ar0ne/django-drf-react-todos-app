import { userService } from './user.service';

export const basketService = {
    getAll,
};

function getAll() {
    const requestOptions = {
        method: "GET",
        headers: userService.getAuthHeaders()
    }

    return fetch('/api/basket/', requestOptions)
        .then(response => response.json())
        .catch(error => {
            console.log(error.message);
            return [];
        });
}