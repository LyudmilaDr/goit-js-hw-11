import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchPhoto } from './fetchPhoto';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const Photogallery = document.querySelector('.gallery');
const searchForm = document.querySelector('#search-form');
const btnLoadMore = document.querySelector('.load-more');

btnLoadMore.style.display = 'none';
let page = 1;
let query = '';

let gallery = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });

  const onClickSubmit = e => {
    e.preventDefault();
    query = searchForm.searchQuery.value;
    if (!query) {
    btnLoadMore.style.display = 'none';
    Photogallery.innerHTML = '';
      return;
    }
   fetchPhoto(query)
   .then(data => {
      if (data.hits.length === 0) {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.'
        );
        Photogallery.innerHTML = '';
        return;
      } else if (data.totalHits > 40) {
        btnLoadMore.style.display = 'flex';
      }
      page = 1;
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
      Photogallery.innerHTML = galleryMarkup(data.hits);
      gallery.refresh();
    });
  };
  const onClickLoadMore = () => {
    page += 1;
    fetchPhoto(query, page).then(data => {
        Photogallery.insertAdjacentHTML('beforeend',  galleryMarkup(data.hits));
      gallery.refresh();
      if (page >= Math.ceil(data.totalHits / 40)) {
        page = 1;
        btnLoadMore.style.display = 'flex';
        Notiflix.Notify.warning(
          "We're sorry, but you've reached the end of search results."
        );
      }
    });
  };
  
  function galleryMarkup(arr) {
    return arr
      .map(({
          webformatURL,
          largeImageURL,
          tags,
          likes,
          views,
          comments,
          downloads,
        }) =>
          `<div class="photo-card" >
              <a href=${largeImageURL}><img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
              <div class="info">
              <p class="info-item">
                  <b>Likes:
                  ${likes}</b>
              </p>
              <p class="info-item">
                  <b>Views:
                  ${views}</b>
              </p>
              <p class="info-item">
                  <b>Comments:
                  ${comments}</b>
              </p>
              <p class="info-item">
                  <b>Downloads:
                  ${downloads}</b>
              </p>
              </div>
        </div>`
      )
      .join('');
  }
  searchForm.addEventListener('submit', onClickSubmit);
  btnLoadMore.addEventListener('click', onClickLoadMore);
