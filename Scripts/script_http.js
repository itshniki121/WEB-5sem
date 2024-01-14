document.addEventListener("DOMContentLoaded", async function () {
  let flag = false;
  const limit = 6;
  const refreshButton = document.getElementById("refresh");
  refreshButton.addEventListener("click", function () {
    flag = !flag;
    updateRequest(flag, limit);
  });
  await updateRequest(flag, limit);
});

async function updateRequest(firstCall, limit) {
  const preloader = document.getElementById("preloader");
  const errorPlaceholder = document.createElement("div");
  let url = "https://jsonplaceholder.typicode.com/comments";
  if (firstCall) {
    const randomStart = Math.floor(Math.random() * limit);
    url += "?_start=${randomStart}&_limit=${limit}";
  } else {
    url += "?_start=${limit}&_limit=${limit}";
  }
  try {
    preloader.style.display = "block";
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("ERROR");
    }
    const postsList = await response.json();
    console.log("Данные:", postsList);
    renderPosts(postsList);
    preloader.style.display = "none";
  } catch (error) {
    console.error("Error:", error);
    preloader.style.display = "none";
    errorPlaceholder.textContent = "⚠️ Что-то пошло не так";
    document.getElementById("postsList").appendChild(errorPlaceholder);
  }
}

function renderPosts(postsList) {
  const postsListElement = document.getElementById("postsList");
  postsListElement.innerHTML = "";
  const template = document.getElementById("postTemplate");
  postsList.forEach((post) => {
    const postElement = document.importNode(template.content, true);
    postElement.querySelector(".email").textContent = "Email: " + post.email;
    postElement.querySelector(".body").textContent = "Body: " + post.body;
    postsListElement.appendChild(postElement);
  });
}
