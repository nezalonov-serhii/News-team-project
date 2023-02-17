import {newsSearch} from '../api/news';
import Notiflix from 'notiflix';

const searchForm = document.querySelector('.search')

searchForm.addEventListener('submit', handleSubmit );


async function handleSubmit(e){
    e.preventDefault();
    let inputValue = form.value.trim();
    if(inputValue === ''){
        return
      };
      try{
        const pages = await newsSearch(inputValue);
        let totalPage = pages.data.totalHits;

        Notiflix.Notify.success(`Hooray! We found ${totalPage} images.`)
      }catch (error) {
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
      }
}