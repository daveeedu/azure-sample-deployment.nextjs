let users = [
    { id: 1, name: "Alice Bob", email: "alice@example.com" },
    { id: 2, name: "Bo Samson", email: "bob@example.com" },
]

export const getUsers = () => users

export const getUserById = (id) => users.find((user) => user.id === parseInt(id, 10));

export const addUser = (user) => {
   const newUser = { ...user, id: users.length + 1};
   users.push(newUser);
    return newUser;
}

export const updateUserById = (id, data) => {
    const index = users.findIndex((user) => user.id === parseInt(id, 10));
    if(index !== -1) {
        users[index] = {...users[index], ...data };
        return users[index];
    }
    return null;
};

export const deleteUserById = (id) => {
    const index = users.findIndex((user) => user.id === parseInt(id, 10));
    if(index !== -1) {
       const deletedUser = users.splice(index, 1);
        return deletedUser[0];
    }
    return null;
}