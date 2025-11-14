function fetchUser(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId > 0) {
        resolve({
          id: userId,
          name: "Bungcwalisa Magobiyane",
          email: "magobiyanebungcwalisa@gmail.com",
          registrationDate: "2025-11-14"
        });
      } else {
        reject(new Error("Invalid userId. Must be positive."));
      }
    }, 1500);
  });
}

function generateUserHTML(user) {
  return `
    <div class="user-card">
      <h2>${user.name}</h2>
      <p><strong>ID:</strong> ${user.id}</p>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Registered:</strong> ${user.registrationDate}</p>
    </div>
  `;
}

function fetchUserPosts(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId <= 0) {
        reject(new Error("Cannot fetch posts: userId does not exist."));
        return;
      }

      resolve([
        {
          id: 1,
          title: "My First Wedpage",
          content: "This is my first webage!",
          userId: userId
        },
        {
          id: 2,
          title: "Another Story",
          content: "Here's another interesting story.",
          userId: userId
        }
      ]);
    }, 1000);
  });
}

function getUserAndPosts(userId) {
  return fetchUser(userId)
    .then(user => {
      console.log("User fetched:", user);

      return fetchUserPosts(user.id).then(posts => {
        return {
          user,
          posts,
          userHTML: generateUserHTML(user)
        };
      });
    })
    .catch(err => {
      console.error("Error:", err.message);
      throw err; 
    });
}

getUserAndPosts(1)
  .then(result => {
    console.log("Combined data:", result);

  
    console.log("Generated HTML:");
    console.log(result.userHTML);
  })
  .catch(err => {
    console.log("Final catch:", err.message);
  });

  async function fetchMultipleUsers(userIds) {
  console.log("Fetching multiple users in parallel...");

  const promises = userIds.map(id => fetchUser(id));

  const results = await Promise.allSettled(promises);

  const successfulUsers = results
    .filter(r => r.status === "fulfilled")
    .map(r => r.value);

  const failed = results.filter(r => r.status === "rejected");

  if (failed.length > 0) {
    console.warn(`${failed.length} users failed to load.`);
  }

  return successfulUsers;
}