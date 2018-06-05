class NavDrawer {
  constructor(drawer, trigger) {
    this.drawer = drawer;
    this.trigger = trigger;
    this.bodyOverlay = document.querySelector('.body-overlay');
    this.siteBody = document.querySelector('body');

    this.trigger.addEventListener('click', this.toggleDrawer.bind(this));
    this.bodyOverlay.addEventListener('click', this.closeDrawer.bind(this));
  }

  toggleDrawer() {
    if (this.drawer.classList.contains('nav-open')) {
      this.closeDrawer();
    } else {
      this.openDrawer();
    }
  }

  openDrawer() {
    this.drawer.classList.add('nav-open');
    this.trigger.classList.add('nav-open');
    this.siteBody.classList.add('nav-open');
    this.bodyOverlay.classList.add('open');
  }

  closeDrawer() {
    this.drawer.classList.remove('nav-open');
    this.trigger.classList.remove('nav-open');
    this.siteBody.classList.remove('nav-open');
    this.bodyOverlay.classList.remove('open');
    console.log('close drawer');
  }
}

export default NavDrawer;
