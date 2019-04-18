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
        .then(response => response.json())
        .catch(error => {
            console.log(error.message);
            return []; // todo: fix
        });
}

function addTask(basket_id, task) {
    const requestOptions = {
        method: "POST",
        headers: userService.getAuthHeaders(),
        body: JSON.stringify(task)
    }

    return fetch(`/api/basket/${basket_id}/add/`, requestOptions)
        .then(response => response.json())
        .catch(error => {
            console.log(error.message);
            return []; // todo: fix
        });
}


function updateTasks(basket_id, task) {
    const requestOptions = {
        method: "PUT",
        headers: userService.getAuthHeaders(),
        body: JSON.stringify(task)
    }

    return fetch(`/api/basket/${basket_id}/tasks/${task.id}/`, requestOptions)
        .then(response => response.json())
        .catch(error => {
            console.log(error.message);
            return []; // todo: fix
        });
}


function removeTask(basket_id, task_id) {
    const requestOptions = {
        method: "DELETE",
        headers: userService.getAuthHeaders(),
    }

    return fetch(`/api/basket/${basket_id}/tasks/${task_id}/`, requestOptions)
        .then(response => response.json())
        .catch(error => {
            console.log(error.message);
            return []; // todo: fix
        });
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
        .then(response => response.json())
        .catch(error => {
            console.log(error.message);
            return []; // todo: fix
        });
}

function removeBasket(basket_id) {
    const requestOptions = {
        method: "DELETE",
        headers: userService.getAuthHeaders(),
    }

    return fetch(`/api/basket/${basket_id}/`, requestOptions)
        .then(response => response.json())
        .catch(error => {
            console.log(error.message);
            return []; // todo: fix
        });

}