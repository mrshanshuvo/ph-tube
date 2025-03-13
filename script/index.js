function removeActiveClass() {
  const activeButtons = document.getElementsByClassName("active");
  for (let btn of activeButtons) {
    btn.classList.remove("active");
  }
}

function loadCategories() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
}

function displayCategories(categories) {
  const categoryContainer = document.getElementById("category-container");
  for (let category of categories) {
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
        <button id="btn-${category.category_id}" onclick="loadCategoryVideos(${category.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${category.category}</button>
    `;
    categoryContainer.appendChild(categoryDiv);
  }
}

function loadVideos() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();
      document.getElementById("btn-all").classList.add("active");
      displayVideos(data.videos);
    });
}

const displayVideos = (videos) => {
  const videoContainer = document.getElementById("video-container");

  videoContainer.innerHTML = "";

  if (videos.length === 0) {
    videoContainer.innerHTML = `
    <div
          class="col-span-full text-center flex flex-col justify-center items-center py-20"
        >
          <img class="w-[120px]" src="./assets/Icon.png" alt="" />
          <h2 class="text-xl font-bold">
            Oops!! Sorry, There is no content here
          </h2>
    </div>`;
    return;
  }
  videos.forEach((video) => {
    const videoDiv = document.createElement("div");
    videoDiv.innerHTML = `
        <div class="card bg-base-100">
          <figure class="relative">
            <img class="w-full h-[150px] object-cover" src="${video.thumbnail}" alt="Shoes" />
            <span
              class="absolute bottom-2 right-2 text-white bg-black px-2 text-sm rounded"
              >3hrs 56 min ago</span
            >
          </figure>
          <div class="flex gap-3 px-0 py-5">
            <div class="profile">
              <div class="avatar">
                <div
                  class="ring-primary ring-offset-base-100 w-6 rounded-full ring ring-offset-2"
                >
                  <img
                    src="${video.authors[0].profile_picture}"
                  />
                </div>
              </div>
            </div>
            <div class="intro">
              <h2 class="card-title">${video.title}</h2>
              <p class="text-sm text-gray-400 flex gap-1">
              ${video.authors[0].profile_name}
                <img
                  class="w-5 h-5"
                  src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png"
                  alt=""
                />
              </p>
              <p class="text-sm text-gray-400">
              ${video.others.views}
              </p>
            </div>
          </div>
        </div>
    `;
    videoContainer.appendChild(videoDiv);
  });
};

const loadCategoryVideos = (id) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
  //   console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();
      const clickedButton = document.getElementById(`btn-${id}`);
      clickedButton.classList.add("active");
      displayVideos(data.category);
    });
};

loadCategories();
// loadVideos(); called by onclick()
