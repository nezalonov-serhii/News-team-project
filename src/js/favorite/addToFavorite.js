export function btnAddToFavorite(event) {
  const btn = event.target.closest(`.item-news__add-to-favorite`);

  if (!btn) return;

  let newLocalStorage = [];
  const data = localStorage.getItem('news');

  if (data) {
    newLocalStorage = JSON.parse(localStorage.getItem('news'));
  }

  let uri =
    btn.parentNode.nextElementSibling.nextElementSibling.lastElementChild
      .textContent;
  console.log(uri);
  if (!btn.classList.contains('hidden-span')) {
    btn.classList.add('hidden-span');

    addToFavoriteLocal(btn);
    return;
  }
  btn.classList.remove('hidden-span');
  for (let i = 0; i < newLocalStorage.length; i += 1) {
    if (newLocalStorage[i].uri === uri) {
      newLocalStorage.splice(i, 1);
    }
  }
  localStorage.setItem(`news`, JSON.stringify(newLocalStorage));
}

function addToFavoriteLocal(btn) {
  const data = localStorage.getItem('news');
  let newLocalStorage = [];

  if (data) {
    newLocalStorage = JSON.parse(localStorage.getItem('news'));
  }

  const newsSection = {
    id: btn.parentNode.parentNode.dataset.id,
    media: btn.parentNode.childNodes[1].attributes.src.nodeValue,
    section: btn.parentNode.childNodes[3].innerText,
    title: btn.parentNode.parentNode.childNodes[3].children[0].innerText,
    abstract: btn.parentNode.parentNode.childNodes[3].children[1].innerText,
    published_date:
      btn.parentNode.parentNode.lastElementChild.children[0].innerText,
    url: btn.parentNode.parentNode.lastElementChild.children[1].href,
    favorite: 'true',
    uri: btn.parentNode.nextElementSibling.nextElementSibling.lastElementChild
      .textContent,
  };

  for (let i = 0; i < newLocalStorage.length; i += 1) {
    if (newLocalStorage[i].uri === newsSection.uri) return;
  }

  newLocalStorage.push(newsSection);
  localStorage.setItem(`news`, JSON.stringify(newLocalStorage));
}
