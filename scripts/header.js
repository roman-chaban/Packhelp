'use strict';

const fetchHeaderLinks = async () => {
  try {
    const response = await fetch('./data/header.json');

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      throw new Error(`Response is not JSON: ${text}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching header links:', error.message);
    return [];
  } finally {
    console.log('Links fetching is complete');
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

const initHeaderMenu = async () => {
  const headerNav = document.querySelector('.headerNav');

  if (!headerNav) {
    console.error('Header navigation container not found');
    return;
  }

  try {
    const data = await fetchHeaderLinks();
    const headerLinksHTML = setHeaderLinksByNavMenu(data);

    headerNav.innerHTML = headerLinksHTML;
  } catch (error) {
    console.error('Error initializing header menu:', error.message);
  }
};

document.addEventListener('DOMContentLoaded', initHeaderMenu);
