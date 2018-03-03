function menuForm(form) {
  const createMenuForm = document.getElementById('createMenuForm');
  const newMenuBtn = document.getElementById('addMenuItem');
  const saveMenuBtn = document.querySelector('input[type="submit"]');

  const addNewMenu = function() {
    const menuItem = `
      <div class="cell grid-x grid-margin-x menu-item">
        <div class="cell small-12 medium-5">
          <label for="item_1_name">Name</label>
          <input type="text" name="linkName" placeholder="Add a menu name">
        </div>
        <div class="cell small-8 medium-5">
          <label for="item_1_url">Url</label>
          <input type="text" name="linkUrl" placeholder="Add a menu url">
        </div>
        <div class="cell small-4 medium-2">
          <button class="button hollow alert expanded remove-menu-item-btn" onclick="this.parentElement.parentElement.remove()">Remove</button>
        </div>
      </div>
    `;
    const newDiv = document.createElement('div');
    newDiv.innerHTML = menuItem;
    createMenuForm.appendChild(newDiv);
  };

  const moveTitle = function() {
    const titleInput = document.querySelector('input[name="title"]');
    const saveTitleInput = document.querySelector('input[name="titleToSave"]');
    saveTitleInput.value = titleInput.value;
  };

  const makeMenu = function() {
    let menuItems = document.querySelectorAll('.menu-item');
    const menuInput = document.querySelector('input[name="menuItemsToSave"]');
    let currentItem = 0;

    menuItems.forEach(function(item) {
      currentItem++;
      let name = item.querySelector('input[name="linkName"]');
      let url = item.querySelector('input[name="linkUrl"]');

      name.name = `${currentItem}-name`;
      url.name = `${currentItem}-url`;
    });
  };

  const saveMenu = function(e) {
    e.preventDefault();
    // moveTitle();
    makeMenu();
    document.querySelector('#menuForm').submit();
  };

  newMenuBtn.addEventListener('click', addNewMenu);
  saveMenuBtn.addEventListener('click', saveMenu);
}

export default menuForm;
