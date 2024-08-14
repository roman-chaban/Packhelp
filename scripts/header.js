'use strict';

const fetchHeaderLinks = async () => {
  try {
    const request = await fetch('../json/header.json');
    const data = await request.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    return [];
  } finally {
    console.log('Links is fetching');
  }
};

const setHeaderLinksByNavMenu = (data) => {
  if (!Array.isArray(data)) {
    console.error('Expected data to be an array');
    return '';
  }

  const menuItems = data
    .map(
      (link) =>
        `<li class='menuListItem'><a class="menuListLink" href="#!">${link.linkItem}</a></li>`
    )
    .join('');

  const menu = document.createElement('ul');
  menu.classList.add('headerNavMenu');
  menu.innerHTML = menuItems;

  return menu.outerHTML;
};

fetchHeaderLinks()
  .then((data) => {
    const headerLinksHTML = setHeaderLinksByNavMenu(data);
    document.querySelector('.headerNav').innerHTML = headerLinksHTML;
  })
  .catch((error) => {
    console.error('Error fetching header links:', error);
  });
