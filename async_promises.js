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
                reject(new Error("Invalid user ID")); // Rejects with an error
            }
        }, 1500);
    });};

fetchUserData(1)
    .then(result => {
        console.log(JSON.stringify(result, null, 2)); // displays the user data using JSON string (Dominic - Adjusted)
    })
    .catch(console.error);

// TODO: Create a function that that fetches users and their posts in parallel
async function fetchUsersAndPosts(userIds) {
    return Promise.all( // Promises are executed in parallel
        userIds.map(async id =>{
            try{
                const user = await fetchUserData(id);

                try{
                    const posts = await fetchUserPosts(id);
                    return {...user, posts };
                } catch(postError){
                    return {... user, posts: [], error: postError.message}
                }

             } catch (userError){ // Error handling
                return {id, error: userError.message };
            }
        })
    );
}

fetchUserDataAndPosts(1)
    .then(result => {
        console.log(JSON.stringify(result, null, 2)); // displays the user data using JSON string
    })
    .catch(console.error);
    
// TODO: Create a Promise that simulates fetching user posts - Dominic
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
        }, 1000); // one second 
    });
};

// TODO: Create a function that chains multiple Promises together - Dominic
// - First fetch user data
// - Then fetch their posts
// - Combine the data into a single object
// - Handle any errors that occur in the chain

function fetchUserDataAndPosts(userId) {
    return fetchUserData(userId)
        .then(user => {
            return fetchUserPosts(userId)
                .then(posts => ({ ...user, posts }));
        });
}

fetchUserDataAndPosts(1)
    .then(result => {
        console.log(JSON.stringify(result, null, 2));
    })
    .catch(console.error);


// TODO: Convert the above Promise chain to use async/await - Dominic
// - Use try/catch for error handling
// - Log each step of the process
// - Return combined user and posts data

async function fetchUserDataAndPostsAsync(userId) {
    try {
        const user = await fetchUserData(userId);
        console.log("User data fetched:", user);

        const posts = await fetchUserPosts(userId);
        console.log(`Fetched ${posts.length} posts for user.`);

        const combinedData = { ...user, posts };
        console.log("Combined data:", combinedData);

        return combinedData;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

fetchUserDataAndPostsAsync(1)
    .then(result => console.log("Final result:", JSON.stringify(result, null, 2)))
    .catch(err => console.error("Error caught in usage:", err));



// TODO: Create a function that fetches multiple users in parallel - Marco
// - Take an array of userIds
// - Fetch all users simultaneously using Promise.all
// - Handle errors for individual user fetches
// - Return array of successfully fetched users

function fetchMultipleUsers(userIds) {
    return Promise.all(
        userIds.map(id =>
            fetchUserData(id).catch(error => ({ id, error: error.message }))
        )
    );
}

fetchMultipleUsers([1, 2, 3, 4])
    .then(results => {
        console.log(JSON.stringify(results, null, 2));
    })
    .catch(console.error);
    return true;


// TODO: Create a function that fetches users and their posts in parallel - Marco
// - Fetch user data for multiple users
// - Once user data is received, fetch all their posts in parallel
// - Combine user and posts data
// - Handle errors appropriately

function fetchUsersWithPostsParallel(userIds) {
    return Promise.all().
        userIds.map(async id => {
            try {fetchMultipleUsers

                const user = await fetchUserData(id);
                const posts = await fetchUserPosts(id);
                fetchUsersWithPostsParallel([1, 2, -3, 4])
    .then(results => {
        console.log(JSON.stringify(results, null, 2));
    }
)
    .catch(console.error)
                return { ...user, posts };
            } catch (error) {
                return { id, error: error.message };
            }
        })
};

// TODO: Test success cases - Marco
// - Test single user fetch
// - Test multiple user fetch
// - Test error handling

fetchUserData(2)
    .then(user => {
        console.log("Single User Fetch Success:", JSON.stringify(user, null, 2));
    })
    .catch(console.error);

fetchMultipleUsers([1, 2, -3, 4])
    .then(results => {
        console.log("Multiple Users Fetch Success:", JSON.stringify(results, null, 2));
    })
    .catch(console.error);

fetchUserData(-1)
    .then(user => {
        console.log("This should not log:", user);
    })
    .catch(console.error);
