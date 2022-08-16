import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import searchData from './js/dataAPI';
import render from './js/dataCard';
import infinite from 'infinite-scroll';

const refs = {
  form: document.querySelector('.search-form'),
  container: document.querySelector('.gallery'),
};

const lightbox = new SimpleLightbox('.img-link', {
  captionsData: 'alt',
  captionDelay: '250',
});

refs.form.addEventListener('submit', e => {
  e.preventDefault();
  searchData(e.target.searchQuery.value)
    .then(response => {
      if (response.data.total === 0) {
        return Notify.failure('bebtaaaaa');
      }
      Notify.info(`Hooray! We found ${response.data.totalHits} images.`);
      refs.container.innerHTML = render(response.data.hits);
      lightbox.refresh();
    })
    .catch(error => {
      console.log(error);
    });
});

const { height: cardHeight } = document
  .querySelector('.gallery')
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: 'smooth',
});
