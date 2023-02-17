import _ from 'lodash';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import PixabayApiService from './js/photoApiService';
import { createCardMarkup } from './js/renders';

import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  input: document.getElementById('search-form'),
  gallery: document.querySelector('.gallery'),
};

const queryParams = {
  orientation: 'horizontal',
  image_type: 'photo',
  safesearch: true,
  per_page: 40,
};

const lightboxConfig = {
  sourceAttr: 'data-src',
  overlayOpacity: 0.90,
  nav: true,
  close: true,
};

let currentQueryTotalHits;

const photoApi = new PixabayApiService(queryParams);
let gallery = new SimpleLightbox('.gallery div', lightboxConfig)


refs.input.addEventListener('submit', onFormSubmit);
refs.gallery.addEventListener('click', onPhotoClick);

window.addEventListener('scroll', _.throttle(onScroll, 300));


async function onFormSubmit(evt) {
  evt.preventDefault();

  photoApi.searchQuery = evt.currentTarget.elements.searchQuery.value.trim();

  if (!photoApi.searchQuery) {
    return alert('Empty input field');
  }

  photoApi.resetPage();

  clearGallery();

  fetchAndRenderPhotos();
}

async function onScroll() {
  if(checkPosition() && refs.gallery.children.length < currentQueryTotalHits) {
    await fetchAndRenderPhotos();
    scroll();
  }
}

async function fetchAndRenderPhotos() {
  const data = await photoApi.getPhotos();
  
  currentQueryTotalHits = data.totalHits;

  const markup = data.hits.map(item => createCardMarkup(item)).join('');

  refs.gallery.insertAdjacentHTML('beforeend', markup);

  gallery.refresh();
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}

function checkPosition() {
  const height = document.body.offsetHeight;
  const screenHeight = window.innerHeight;

  const threshold = height - screenHeight / 6;
  const position = window.scrollY + screenHeight;

  return position >= threshold;
}

function onPhotoClick(evt) {
  evt.preventDefault()

  gallery.open(evt.target);
}

function scroll() {
  const { height: cardHeight } =
    refs.gallery.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}