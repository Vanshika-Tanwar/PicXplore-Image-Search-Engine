const accessKey = "hkndYgSp9_qxFYBMeGXuRvzIyRJhXWVGfQ_dHp-b6Fs";
const formElem = document.querySelector("form");
const searchInput = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");

let page = 1;
let currentQuery = '';

async function fetchImages(query) {
    let source;
    if (query) {
        source = `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${accessKey}`;
    } else {
        source = `https://api.unsplash.com/photos/random?count=10&client_id=${accessKey}`;
    }

    const response = await fetch(source);
    const data = await response.json();

    const results = query ? data.results : data;

    if (page === 1) {
        searchResults.innerHTML = "";
    }
    results.map((result) => {
        const imgWrap = document.createElement("div");
        imgWrap.classList.add("search-result");
        const img = document.createElement("img");
        img.src = query ? result.urls.small : result.urls.regular;
        img.alt = result.alt_description;
        const imgLink = document.createElement("a");
        imgLink.href = result.links.html;
        imgLink.target = "_blank";
        imgLink.textContent = result.alt_description;

        imgWrap.appendChild(img);
        imgWrap.appendChild(imgLink);
        searchResults.appendChild(imgWrap);

        // Add click event listener to open link in new tab
        img.addEventListener('click', () => {
            window.open(result.links.html, '_blank');
        });
    });

    page++;
    if (page > 1) {
        showMore.style.display = "block";
    }
}

formElem.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    currentQuery = searchInput.value.trim();
    fetchImages(currentQuery);
});

searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim();
    if (!query) {
        page = 1;
        currentQuery = '';
        fetchImages();
    }
});

showMore.addEventListener("click", () => {
    fetchImages(currentQuery);
});

fetchImages();
