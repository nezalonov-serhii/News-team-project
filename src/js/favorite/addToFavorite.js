export function btnAddToFavorite(event) {
  const btn = event.target.closest(`.item-news__add-to-favorite`);

  if (!btn) return;
  isLocalEmpty();
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
  localStorage.setItem(`newsSection`, JSON.stringify(newLocalStorage));
}

function isLocalEmpty() {
  if (JSON.parse(localStorage.getItem('newsSection')) === null) {
    newLocalStorage = [];
    return;
  }
  newLocalStorage = JSON.parse(localStorage.getItem('newsSection'));
}

function addToFavoriteLocal(btn) {
  const newsSection = {
    id: btn.parentNode.parentNode.id,
    media: btn.parentNode.childNodes[1].attributes.src.nodeValue,
    section: btn.parentNode.childNodes[3].innerText,
    title: btn.parentNode.parentNode.childNodes[3].children[0].innerText,
    abstract: btn.parentNode.parentNode.childNodes[3].children[1].innerText,
    published_date:
      btn.parentNode.parentNode.lastElementChild.children[0].innerText,
    url: btn.parentNode.parentNode.lastElementChild.children[1].attributes[1]
      .value,
    favorite: 'true',
    uri: btn.parentNode.nextElementSibling.nextElementSibling.lastElementChild
      .textContent,
  };
  for (let i = 0; i < newLocalStorage.length; i += 1) {
    if (newLocalStorage[i].uri === newsSection.uri) return;
  }

  newLocalStorage.push(newsSection);
  localStorage.setItem(`newsSection`, JSON.stringify(newLocalStorage));
}
