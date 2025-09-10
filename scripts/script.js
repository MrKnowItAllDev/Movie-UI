'use strict';

const watchedMovies = [];
const unwatchedMovies = [];

const movies = [];

function Movie(title, director, year, genre, desc, watched) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.director = director;
    this.year = year;
    this.genre = genre;
    this.desc = desc;
    this.watched = watched;
}

Movie.prototype.setWatched = function() {
    this.watched = !this.watched;
}

function addMovie(movies) {
    const form = document.querySelector('form');
    const submit = document.querySelector('#add');
    const formData = new FormData(form, submit);
    const movie = new Movie();

    if (!submit) return;

    for (const [key, val] of formData) {
        if (key !== 'genre' || key !== 'director') // Temporary conditional
        movie[key] = val;
    }

    const status = document.querySelector('#watched');
    movie['watched'] = status.checked;
    console.log(formData);
    movies.push(movie);
}

movies[0] = new Movie('The Shawshank Redemption 1', 'Guy', '1942', 'Action', 'Test description', false);
movies[1] = new Movie('The Shawshank Redemption 2', 'Guy', '1942', 'Action', 'Test description', false);
movies[2] = new Movie('The Shawshank Redemption 3', 'Guy', '1942', 'Action', 'Test description', false);
movies[3] = new Movie('The Shawshank Redemption 4', 'Guy', '1942', 'Action', 'Test description', false);

// TODO: Attach event listeners to dialog DOM elements
function renderUI() {
    const parent = document.querySelector('.content');
    clear(parent);

    for (const movie of movies) {
        createCard(parent, movie);
    }
}

// TODO: Add object state button element
function createCard(parent, movie) {
    const card = document.createElement('section');
    const info = document.createElement('section');

    const img = document.createElement('img');
    const heading = document.createElement('h2');
    const pYear = document.createElement('p');
    const pDesc = document.createElement('p');

    const stateBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');

    deleteBtn.classList.add('btn');
    deleteBtn.classList.add('btn-delete');
    card.classList.add('card');
    info.classList.add('card-info');
    pYear.classList.add('year');
    stateBtn.classList.add('btn');

    setState(movie, stateBtn);

    img.src = `./assets/cover.jpeg`;
    img.alt = `cover image`;
    deleteBtn.textContent = 'Remove';

    card.dataset.id = movie.id;
    heading.textContent = movie.title;
    pYear.textContent = movie.year;
    pDesc.textContent = movie.desc;

    stateBtn.addEventListener('click', (e) => {
        movie.setWatched();
        setState(movie, e.target);
    });

    deleteBtn.addEventListener('click', (e) => {
        movies.splice(movies.indexOf(movie), 1);
        clear(parent, movie);
    });

    info.appendChild(heading);
    info.appendChild(pYear);
    info.appendChild(pDesc);
    info.appendChild(stateBtn);
    info.appendChild(deleteBtn);
    card.appendChild(img);
    card.appendChild(info);
    parent.appendChild(card);
}

function setState(movie, target) {
    if (movie.watched) {
        target.classList.remove('btn-default');
        target.classList.add('btn-active');
        target.textContent = `Watched`;
        return;
    }
    target.classList.remove('btn-active');
    target.classList.add('btn-default');
    target.textContent = `Not Watched`;
}

function clear(parent, movie) {
    if (movie === undefined && parent.children) {
        // for (const node of parent.children) {
        //     parent.remove(node);
        // }
        // return;
        parent.innerHTML = ``;
    }

    Array.from(parent.children).forEach((node) => {
        if (node.dataset.id === movie.id)
            parent.removeChild(node);
    });
}

function displayModal() {
    document.querySelector('.overlay').style.display = `block`;
}

function closeModal() {
    document.querySelector('.overlay').style.display = `none`;
}

const addBtn = document.querySelector('#add');
const openBtn = document.querySelector('.btn-add');
const closeBtn = document.querySelector('.close-btn');

openBtn.addEventListener('click', displayModal);
closeBtn.addEventListener('click', closeModal);
addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    addMovie(movies);
    renderUI();
});

renderUI();