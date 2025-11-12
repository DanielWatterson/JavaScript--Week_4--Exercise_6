// TODO: Create a Promise that simulates fetching user data
// - The Promise should resolve after 1.5 seconds
// - If userId is positive, resolve with user data object
// - If userId is negative or zero, reject with an error
// - User data should include: id, name, email, and registrationDate

let fetchUserData = (userId) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve({
                    id: userId,
                    name: `User${userId}`,
                    email: `user${userId}@example.com`,
                    registrationDate: new Date(),
                });
            } else {
                reject(new Error("Invalid user ID"));
            }
        }, 1500);
    });};

// TODO: Create a function that that fetches users and their posts in parallel
function fetchUsersAndPosts(userIds) {
    return Promise.all(userIds.map(id => 
        fetchUserData(id)
            .then(user => {
                return fetchUserPosts(id)
                    .then(posts => ({ ...user, posts }))
                    .catch(err => ({ ...user, posts: [], error: err.message }));
            })
            .catch(err => ({ id, error: err.message }))
    ));
}

// TODO: Create a Promise that simulates fetching user posts
// - Should resolve after 1 second
// - Return an array of post objects
// - Each post should have: id, title, content, and userId
// - If userId doesn't exist, reject with error

let fetchUserPosts = (userId) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve([
                    { id: 1, title: "Post 1", content: "This is post 1", userId },
                    { id: 2, title: "Post 2", content: "This is post 2", userId },
                    { id: 3, title: "Post 3", content: "This is post 3", userId },
                ]);
            } else {
                reject(new Error("Invalid user ID"));
            }
        }, 1000);
    });
};

// TODO: Create a function that chains multiple Promises together

function fetchUserDataAndPosts(userId) {
    return fetchUserData(userId)
        .then(user => {
            return fetchUserPosts(userId)
                .then(posts => ({ ...user, posts }));
        });
}
