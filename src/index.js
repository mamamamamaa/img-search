import SimpleLightbox from 'simplelightbox';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import searchData from './js/dataAPI';

const refs = {
  form: document.querySelector('.search-form'),
  container: document.querySelector('.container'),
};

refs.form.addEventListener('submit', e => {
  e.preventDefault();
  searchData(e.target.searchQuery.value).then(response => {
    if (response.data.total === 0) {
      return Notify.failure('bebtaaaaa');
    }
    console.log(response);
  });
});
