import SimpleLightbox from 'simplelightbox';
import infinite from 'infinite-scroll';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import searchData from './js/dataAPI';
import render from './js/dataCard';

const refs = {
  form: document.querySelector('.search-form'),
  container: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
};

const lightbox = new SimpleLightbox('.img-link', {
  captionsData: 'alt',
  captionDelay: '250',
});

async function renderData(value, page) {
  return await searchData(value, page)
    .then(response => {
      if (response.data.total === 0) {
        return Notify.failure('bebraaaaa');
      }

      Notify.info(`Hooray! We found ${response.data.totalHits} images.`);
      refs.container.innerHTML += render(response.data.hits);

      if (response.data.totalHits > 40) {
        refs.loader.classList.remove('block');
      } else {
        refs.loader.classList.add('block');
      }
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      lightbox.refresh();
    });
}

let pageCounter;

refs.form.addEventListener('submit', e => {
  e.preventDefault();
  refs.container.innerHTML = '';
  pageCounter = 1;
  renderData(e.target.searchQuery.value, pageCounter);
});

refs.loader.addEventListener('click', () => {
  pageCounter += 1;
  renderData(refs.form.searchQuery.value, pageCounter);
});
