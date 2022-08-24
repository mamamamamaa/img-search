import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import searchData from './js/dataAPI';
import render from './js/dataCard';

const throttle = require('lodash.throttle');
const lightbox = new SimpleLightbox('.img-link', {
  captionsData: 'alt',
  captionDelay: '250',
});

const refs = {
  form: document.querySelector('.search-form'),
  container: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
};

let pageCounter = null;
let query = null;

async function fetchData(value, page) {
  return await searchData(value, page)
    .then(response => {
      if (response.data.total === 0) {
        return Notify.failure('bebraaaaa');
      }

      Notify.info(`Hooray! We found ${response.data.totalHits} images.`);

      refs.container.innerHTML += render(response.data.hits);

      if (response.data.totalHits / 40 <= pageCounter) {
        window.removeEventListener('scroll', throttledScroll);
      }

      //               варіант з кнопкою Load more

      // if (response.data.totalHits > 40) {
      //   refs.loader.classList.remove('block');
      // } else {
      //   refs.loader.classList.add('block');
      // }
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      lightbox.refresh();
    });
}

function handleWindowScroll() {
  console.log('beeeeeebraaaa');
  const endOfPage =
    window.innerHeight + window.pageYOffset + 300 >= document.body.offsetHeight;

  if (endOfPage) {
    renderData();
  }
}

function crearConteiner() {
  return (refs.container.innerHTML = '');
}

function updateQuery(data) {
  return (query = data);
}

function renderData() {
  pageCounter += 1;
  fetchData(query, pageCounter);
}

const throttledScroll = throttle(handleWindowScroll, 300);

refs.form.addEventListener('submit', e => {
  e.preventDefault();
  if (
    e.target.searchQuery.value === '' ||
    query === e.target.searchQuery.value
  ) {
    return;
  }

  pageCounter = 1;
  updateQuery(e.target.searchQuery.value);
  crearConteiner();
  fetchData(query, pageCounter);
  window.addEventListener('scroll', throttledScroll);
});

//            варіант з кнопкою Load more

// refs.loader.addEventListener('click', renderData);
