const debounce = require('debounce');

function scrollShow() {
  let done = false;

  function onScroll() {
    if (done) return;
    const hiddenEls = document.querySelectorAll('.scroll-show--hidden');
    if (!hiddenEls.length) {
      done = true;
      return;
    }
    hiddenEls.forEach(function(el) {
      if (window.scrollY + window.innerHeight >= el.offsetTop) {
        el.classList.remove('scroll-show--hidden');
      }
    });
    console.log('running');
  }

  onScroll();

  const showContentsInWindow = debounce(onScroll, 25);
  window.addEventListener('scroll', showContentsInWindow);
}

export default scrollShow;
