
let editingPostId = null;

// Function to fetch and display posts
function fetchPosts() {
  fetch("/post")
    .then((response) => response.json())
    .then((posts) => {
      const postsList = document.getElementById("posts-list");
      postsList.innerHTML = ""; // Clear existing posts
      posts.forEach((post) => {
        const postDiv = document.createElement("div");
        postDiv.innerHTML = `
          <h3>${post.title}</h3>
          <p>${post.content}</p>
          <button onclick="deletePost(${post.id})">Delete</button>
          <button onclick="startEditPost(${post.id}, '${post.title}', '${post.content}')">Edit</button>`
        ;
        postsList.appendChild(postDiv);
      });
    });
}

// Create or update a post
document.getElementById("post-form").onsubmit = function (event) {
  event.preventDefault(); // Prevent default form submission
  const title = document.getElementById("post-title").value;
  const content = document.getElementById("post-content").value;

  if (editingPostId) {
    // Update existing post
    fetch(`/post/${editingPostId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    }).then(() => {
      fetchPosts(); // Refresh the post list
      resetForm(); // Clear form inputs
    });
  } else {
    // Create new post
    fetch("/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content, userId: 1 }), // Assuming userId is 1
    }).then(() => {
      fetchPosts(); // Refresh the post list
      resetForm(); // Clear form inputs
    });
  }
};

// Start editing a post
function startEditPost(id, title, content) {
  editingPostId = id; // Set the ID of the post to be edited
  document.getElementById("post-title").value = title;
  document.getElementById("post-content").value = content;
}

// Reset form for new post creation
function resetForm() {
  document.getElementById("post-title").value = "";
  document.getElementById("post-content").value = "";
  editingPostId = null; // Reset the editing post ID
}

// Delete a post
function deletePost(id) {
  fetch(`/post/${id}`, { method: "DELETE" }).then(() => fetchPosts()); // Refresh the post list
}


//  document.addEventListener("DOMContentLoaded", () => {
//    const commentsContainer = document.getElementById("comments");
//    const commentForm = document.getElementById("commentForm");

//    // Fetch and display comments
//  const fetchComments = async () => {
//    const response = await fetch("/comments"); // Update with your actual endpoint
//    const comments = await response.json();
//    commentsContainer.innerHTML = "";
//    comments.forEach((comment) => {
//      commentsContainer.innerHTML += 
//         <div class="comment" data-id="${comment.id}">
//           <p>${comment.content}</p>
//           <button onclick="editComment(${comment.id})">Edit</button>
//           <button onclick="deleteComment(${comment.id})">Delete</button>
//         </div>
//       ;
//    });
//  };
//    // Handle comment form submission
//    commentForm.addEventListener("submit", async (event) => {
//      event.preventDefault();
//      const content = document.getElementById("content").value;
//      const postId = document.getElementById("postId").value;
//      const userId = document.getElementById("userId").value;

//      try {
//        const response = await fetch("/comments", {
//          method: "POST",
//          headers: {
//            "Content-Type": "application/json",
//          },
//          body: JSON.stringify({ content, postId, userId }),
//        });

//        if (response.ok) {
//          document.getElementById("content").value = ""; // Clear the form
//          fetchComments(); // Refresh the comments
//        } else {
//          alert("Failed to add comment");
//        }
//      } catch (error) {
//        console.error("Error adding comment:", error);
//      }
//    });

//    // Initial fetch of comments
//    fetchComments();
//  });

// // Edit a comment
//   window.editComment = async (id) => {
//     const newContent = prompt('Enter new content:');
//     if (newContent) {
//       const response = await fetch(`/comments/${id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ content: newContent })
//       });

//       if (response.ok) {
//         fetchComments(); // Refresh the comments
//       } else {
//         alert('Failed to update comment');
//       }
//     }
// };
  
// // Delete a comment
//   window.deleteComment = async (id) => {
//     const response = await fetch(`/comments/${id}`, {
//       method: 'DELETE'
//     });

//     if (response.ok) {
//       fetchComments(); // Refresh the comments
//     } else {
//       alert('Failed to delete comment');
//     }
//   };
// Fetch posts on page load
window.onload = fetchPosts;