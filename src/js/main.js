import "../css/style.scss";

const accessKey = 'i_AYyQbbsuN9ZU5Et7njTZsiObnftEurcnL7RjQx6fo';

const searchForm = document.getElementById('search-form');
const searchBox = document.getElementById('search-box');
const searchResult = document.getElementById('search-result');
const showMoreBtn = document.getElementById('show-more-btn');

let kw = '';
let page = 1;

async function searchImg() {
    kw = searchBox.value;
    checkInput()
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${kw}&client_id=${accessKey}&per_page=12`;

    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    if(page === 1){
        searchResult.innerHTML = '';
    }

    const results = data.results;

    if(data.total === 0){
        const error = document.createElement('h4');
        error.innerHTML = 'No Search Result Found =( Try again';
        error.style.color = 'red';
        searchResult.appendChild(error);
        showMoreBtn.style.display = 'none';
    }else{
        results.map((result) => {
            const image = document.createElement('img');
            image.src = result.urls.small;
            const imageLink = document.createElement('a');
            imageLink.href = result.links.html;
            imageLink.target = '_blank';
    
            imageLink.appendChild(image);
            searchResult.appendChild(imageLink);
        });
        showMoreBtn.style.display = 'block';
    }
}

searchForm,addEventListener('submit', (e) => {
    e.preventDefault();
    page = 1;
    searchImg();
})

showMoreBtn.addEventListener('click', () => {
    page++;
    searchImg()
})

function checkInput(){
    if(kw === ''){
        alert('Please input anything')
    }
    showMoreBtn.style.display = 'none';
}

