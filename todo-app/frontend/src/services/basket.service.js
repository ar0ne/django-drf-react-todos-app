import { userService } from './user.service';

export const basketService = {
    getAll,
    addTask,
    updateTasks,
    removeTask,
    addBasket,
    removeBasket,
};

function getAll() {
    const requestOptions = {
        method: "GET",
        headers: userService.getAuthHeaders()
    }
    return fetch('/api/basket/', requestOptions)
        .then(response => isSuccessful(response) && response.json())
        .catch(handleException);
}

function addTask(basket_id, task) {
    const requestOptions = {
        method: "POST",
        headers: userService.getAuthHeaders(),
        body: JSON.stringify(task)
    }

    return fetch(`/api/basket/${basket_id}/add/`, requestOptions)
        .then(response => isSuccessful(response) && response.json())
        .catch(handleException);
}


function updateTasks(basket_id, task) {
    const requestOptions = {
        method: "PUT",
        headers: userService.getAuthHeaders(),
        body: JSON.stringify(task)
    }

    return fetch(`/api/basket/${basket_id}/tasks/${task.id}/`, requestOptions)
        .then(response => isSuccessful(response) && response.json())
        .catch(handleException);
}


function removeTask(basket_id, task_id) {
    const requestOptions = {
        method: "DELETE",
        headers: userService.getAuthHeaders(),
    }

    return fetch(`/api/basket/${basket_id}/tasks/${task_id}/`, requestOptions)
        .then(response => isSuccessful(response) && response.json())
        .catch(handleException);
}

function addBasket(basket_name) {
    const requestOptions = {
        method: "POST",
        headers: userService.getAuthHeaders(),
        body: JSON.stringify({
            title: basket_name
        })
    }

    return fetch(`/api/basket/`, requestOptions)
        .then(response => isSuccessful(response) && response.json())
        .catch(handleException);
}

function removeBasket(basket_id) {
    const requestOptions = {
        method: "DELETE",
        headers: userService.getAuthHeaders(),
    }

    return fetch(`/api/basket/${basket_id}/`, requestOptions)
        .then(response => isSuccessful(response) && response.json())
        .catch(handleException);
}

function handleException(error) {
    if (error.message == 401) {
        handleUnauthorizedException();
    }
    return [];  // todo: fix
}

function isSuccessful(response) {
    if (response.status !== 200) {
        throw new Error(response.status);
    }
    return true;
}

function handleUnauthorizedException() {
    userService.logout();
}