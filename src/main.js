import fetch from 'node-fetch';

const BASE_URL = "http://jsonplaceholder.typicode.com";

const getUsers = async () => {
    const response = await fetch(`${BASE_URL}/users`);
    return response.json();
};

const getTodos = async () => {
    const response = await fetch(`${BASE_URL}/todos`);
    return response.json();
};

const isUserInFanCodeCity = (user) => {
    const lat = parseFloat(user.address.geo.lat);
    const lng = parseFloat(user.address.geo.lng);
    return lat >= -40 && lat <= 5 && lng >= 5 && lng <= 100;
};

const calculateCompletionPercentage = (userId, todos) => {
    const userTodos = todos.filter(todo => todo.userId === userId);
    const completedTodos = userTodos.filter(todo => todo.completed);
    return (completedTodos.length / userTodos.length) * 100;
};

const getFanCodeUsersWithCompletionPercentages = async () => {
    const [users, todos] = await Promise.all([getUsers(), getTodos()]);
    return users.filter(isUserInFanCodeCity).map(user => ({
        username: user.username,
        completionPercentage: calculateCompletionPercentage(user.id, todos)
    }));
};

export { getFanCodeUsersWithCompletionPercentages };

