class Hero {
  constructor(hero) {
    this.hero = hero;
    this.heroImage = hero.querySelector('.hero__image');
    this.borderBlock = hero.querySelector('.hero-blocks__border');
    this.solidBlock = hero.querySelector('.hero-blocks__solid-block');
    this.heading = hero.querySelector('.hero__text');
  }

  imageFadeIn(heroImage) {
    heroImage.classList.remove('hide');
    heroImage.classList.add('fade-hero-in');
  }

  contentIn() {
    this.borderBlock.classList.add('hero-blocks__border--show');
    this.heading.classList.add('hero__text--show');
    setTimeout(() => {
      this.solidBlock.classList.add('hero-blocks__solid-block--show');
    }, 500);
  }
}

function loadHeroSectionImage(heroContainer) {
  const HeroSection = new Hero(heroContainer);

  function showHero() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        HeroSection.imageFadeIn(HeroSection.heroImage);
        resolve();
      }, 10);
    });
  }
  showHero().then(() => {
    setTimeout(() => {
      HeroSection.contentIn();
    }, 100);
  });
}

export default loadHeroSectionImage;
