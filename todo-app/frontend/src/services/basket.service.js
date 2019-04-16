import { userService } from './user.service';

export const basketService = {
    getAll,
    addTask,
    updateTasks,
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
            return [];
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
            return [];
        });
}