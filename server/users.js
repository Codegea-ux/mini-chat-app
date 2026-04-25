let users = [];

function addUser(id, username) {
    users.push({ id, username });
}

function removeUser(id) {
    const user = users.find(u => u.id === id);
    users = users.filter(u => u.id !== id);
    return user;
}

function getUser(id) {
    return users.find(u => u.id === id);
}

function getUsers() {
    return users;
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsers
};