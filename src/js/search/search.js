import {newsSearch,getCategoryList,getDataByCategory,getSearchArticle} from '../api/news';

const searchForm = document.querySelector('.search')
const form = document.querySelector('.input')

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

      alert(`Hooray! We found ${totalPage} images.`)
      }catch (error) {
        alert("Sorry, there are no images matching your search query. Please try again.");
      }
}

async function handleSubmit(e){
  e.preventDefault();
  let inputValue = form.value.trim();
  if(inputValue === ''){
      return
    };
    try{
      const pages = await getSearchArticle(inputValue);
      let totalPage = pages.data.totalHits;

    alert(`Hooray! We found ${totalPage} images.`)
    }catch (error) {
      alert("Sorry, there are no images matching your search query. Please try again.");
    }
}
async function handleSubmit(e){
  e.preventDefault();
  let inputValue = form.value.trim();
  if(inputValue === ''){
      return
    };
    try{
      const pages = await getCategoryList(inputValue);
      let totalPage = pages.data.totalHits;

    alert(`Hooray! We found ${totalPage} images.`)
    }catch (error) {
      alert("Sorry, there are no images matching your search query. Please try again.");
    }
}
async function handleSubmit(e){
  e.preventDefault();
  let inputValue = form.value.trim();
  if(inputValue === ''){
      return
    };
    try{
      const pages = await getDataByCategory(inputValue);
      let totalPage = pages.data.totalHits;

    alert(`Hooray! We found ${totalPage} images.`)
    }catch (error) {
      alert("Sorry, there are no images matching your search query. Please try again.");
    }
}