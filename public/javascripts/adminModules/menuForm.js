function menuForm(form) {
  const createMenuForm = document.getElementById('createMenuForm');
  const newMenuBtn = document.getElementById('addMenuItem');
  const saveMenuBtn = document.querySelector('input[type="submit"]');
  const menuItemDiv = document.querySelector('.menu-item-new');
  const linkTypeSelects = document.querySelectorAll('.link-type-select');

  const addNewMenu = function() {
    const newMenuItemDiv = menuItemDiv.cloneNode(true);
    newMenuItemDiv.classList.add('menu-item');
    newMenuItemDiv
      .querySelector('.link-type-select')
      .addEventListener('change', changeLinkType);
    createMenuForm.appendChild(newMenuItemDiv);
  };

  const changeLinkType = function() {
    const container = this.parentElement.parentElement;
    const linkType = this.value;
    const inputToShow = container.querySelector(`[data-link-type-${linkType}]`);
    container.querySelectorAll('[data-link-type]').forEach(el => {
      el.classList.add('hide');
      el.querySelector('[data-link-url]').name = '';
    });
    inputToShow.classList.remove('hide');
    inputToShow.querySelector('[data-link-url]').name = 'linkUrl';
  };

  newMenuBtn.addEventListener('click', addNewMenu);
  linkTypeSelects.forEach(select =>
    select.addEventListener('change', changeLinkType)
  );
}

export default menuForm;
