class TopBar {
  constructor(topBar) {
    this.topBar = topBar;
    this.nav = topBar.querySelector('.nav__linklist');
    this.logo = topBar.querySelector('.top-bar__logo');
  }

  navStyleCheck() {
    const topBarWidth = this.topBar.clientWidth;
    // rough guess as we're using rems
    const topBarPadding = 30;
    // hack because calculating width with css grid is weird
    const navWidth = this.nav.scrollWidth;
    const logoWidth = this.logo.scrollWidth;
    console.log(topBarWidth, navWidth, logoWidth);

    if (navWidth + logoWidth >= topBarWidth) {
      this.nav.classList.add('hide');
    }
  }
}

export default TopBar;
