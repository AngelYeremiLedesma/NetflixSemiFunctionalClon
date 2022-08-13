let genres;
const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "f734f08e52d5990dc608ad31b28536d6";

async function getTop() {
    let movies = await axios.get(
        `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=es`
    );
    return movies.data.results
}

async function awaitResponseTop() {
    let response = await getTop();
    let moviesTop ="";
    for(let i=0;i<15;i++){
        moviesTop += `<h3 class="shadow-letter">${i+1}</h3>
        <img src="https://image.tmdb.org/t/p/w500/${response[i].poster_path}" id="${response[i].id}">`
    }
    document.getElementById("top-rated").innerHTML = moviesTop
}

async function getGenres() {
    let movies = await axios.get(
        `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=es-MX`
    );
    return movies.data.genres
}

async function awaitResponseGenres() {
    genres = await getGenres();
    awaitResponseLists();
}

async function getLists(genre) {
    let movies = await axios.get(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=es-MX&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=${genre}`
    );
    return movies.data.results
}

async function awaitResponseLists() {

    let moviesGenres ="";
    for(let j=0;j<genres.length;j++){
        let response = await getLists(genres[j].id);
        moviesGenres += `<div class="container"><h2>${genres[j].name}</h2><div class="inline-backdrop-size"> <img src="/src/right-arrow.png" class="turned-arrow"> <div class="carousel-container"><div id="${j}a" class="carrusel"> `
        for(let i=0;i<15;i++){
            moviesGenres += `<img src="https://image.tmdb.org/t/p/w500/${response[i].backdrop_path}" id="${response[i].id}">`
        }
        moviesGenres += `</div></div><img src="/src/right-arrow.png" class="arrow" id="${j}b"></div></div>`
    }
    document.getElementById("genres").innerHTML = moviesGenres
    init();
}

async function getResults() {
    let searcher = document.getElementById("searcher").value;
    let movies = await axios.get(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&language=es/&query=${searcher}`
    );
    return movies.data
}

async function awaitResponseResults() {
    let response = await getResults();
    console.log(response)
}

awaitResponseTop();
awaitResponseGenres();
