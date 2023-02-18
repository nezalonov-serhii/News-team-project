import { refs } from '../refs/refs';

function showLoader() {
  refs.loader.style.display = 'block';
  refs.body.style.overflow = 'hidden';
}

function hideLoader() {
  refs.loader.style.display = 'none';
  refs.body.style.overflow = 'visible';
}

export { showLoader, hideLoader };
