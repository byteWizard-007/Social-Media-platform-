const postBtn = document.getElementById("postBtn");
const postInput = document.getElementById("postInput");
const postsContainer = document.getElementById("postsContainer");

/* Load Saved Posts */

window.addEventListener("DOMContentLoaded", () => {
    const savedPosts = JSON.parse(localStorage.getItem("connecthub_posts")) || [];

    savedPosts.forEach(post => {
        createPost(post.text, post.time);
    });
});

/* Create New Post */

postBtn.addEventListener("click", () => {

    const text = postInput.value.trim();

    if(text === ""){
        alert("Please write something...");
        return;
    }

    const postData = {
        text: text,
        time: new Date().toLocaleString()
    };

    savePost(postData);

    createPost(postData.text, postData.time);

    postInput.value = "";

});

function savePost(post){

    const posts =
        JSON.parse(localStorage.getItem("connecthub_posts"))
        || [];

    posts.unshift(post);

    localStorage.setItem(
        "connecthub_posts",
        JSON.stringify(posts)
    );
}

/* Create Post Card */

function createPost(text,time){

    const card = document.createElement("div");

    card.classList.add("post-card");

    card.innerHTML = `
    
    <div class="post-header">

        <img
        src="https://i.pravatar.cc/100?img=12"
        alt=""
        >

        <div>
            <h3>You</h3>
            <p>${time}</p>
        </div>

    </div>

    <p class="post-text">
        ${text}
    </p>

    <div class="post-actions">

        <button class="like-btn">
            ❤️ Like
        </button>

        <button class="comment-btn">
            💬 Comment
        </button>

        <button class="share-btn">
            🔁 Share
        </button>

        <button class="delete-btn">
            🗑 Delete
        </button>

    </div>

    <div class="comment-section"></div>

    `;

    postsContainer.prepend(card);

    setupPostActions(card);
}

/* Post Actions */

function setupPostActions(card){

    const likeBtn =
        card.querySelector(".like-btn");

    const commentBtn =
        card.querySelector(".comment-btn");

    const shareBtn =
        card.querySelector(".share-btn");

    const deleteBtn =
        card.querySelector(".delete-btn");

    const commentSection =
        card.querySelector(".comment-section");

    let liked = false;
    let likes = 0;

    likeBtn.addEventListener("click", () => {

        liked = !liked;

        if(liked){
            likes++;
            likeBtn.innerHTML =
                `❤️ Liked (${likes})`;
        }
        else{
            likes--;
            likeBtn.innerHTML =
                `❤️ Like (${likes})`;
        }

    });

    commentBtn.addEventListener("click", () => {

        const comment =
            prompt("Enter Comment");

        if(comment){

            const p =
                document.createElement("p");

            p.innerHTML =
                `💬 ${comment}`;

            p.style.marginTop = "10px";

            commentSection.appendChild(p);
        }

    });

    shareBtn.addEventListener("click", () => {

        navigator.clipboard.writeText(
            window.location.href
        );

        alert("Post Link Copied!");
    });

    deleteBtn.addEventListener("click", () => {

        card.remove();

    });

}

/* Dark Mode */

const darkBtn = document.createElement("button");

darkBtn.innerText = "🌙";

darkBtn.style.position = "fixed";
darkBtn.style.bottom = "20px";
darkBtn.style.right = "20px";
darkBtn.style.width = "55px";
darkBtn.style.height = "55px";
darkBtn.style.border = "none";
darkBtn.style.borderRadius = "50%";
darkBtn.style.cursor = "pointer";
darkBtn.style.fontSize = "22px";
darkBtn.style.zIndex = "999";

document.body.appendChild(darkBtn);

let dark = true;

darkBtn.addEventListener("click", () => {

    if(dark){

        document.body.style.background =
            "#f1f5f9";

        document.body.style.color =
            "#000";

        darkBtn.innerText = "☀️";

        dark = false;
    }
    else{

        document.body.style.background =
            "#0f172a";

        document.body.style.color =
            "#fff";

        darkBtn.innerText = "🌙";

        dark = true;
    }

});