'use strict';

import { fetchHeaderLinks } from './header.js';

const toggleBurgerMenu = () => {
    const burgerMenuButton = document.querySelector('.burgerMenuButton');
    const burgerMenuContent = document.querySelector('.burgerMenuContent');

    burgerMenuButton.classList.toggle('active');

    if (burgerMenuContent.classList.contains('show')) {
        burgerMenuContent.classList.add('hide');
        setTimeout(() => {
            burgerMenuContent.classList.remove('show', 'hide');
        }, 500);
    } else {
        burgerMenuContent.classList.add('show');
    }
};

const closeBurgerMenu = () => {
    const burgerMenuButton = document.querySelector('.burgerMenuButton');
    const burgerMenuContent = document.querySelector('.burgerMenuContent');

    burgerMenuButton.classList.remove('active');
    burgerMenuContent.classList.add('hide');
    setTimeout(() => {
        burgerMenuContent.classList.remove('show', 'hide');
    }, 500);
};


const setBurgerMenuLinks = (data) => {
    if (!Array.isArray(data)) {
        console.error('Expected data to be an array');
        return;
    }

    const menuItems = `<div class='burgerMenuItems'>${data
        .map((link) => `<a href="${link.url}">${link.linkItem}</a>`)
        .join('')}</div>`;

    const menuContent = document.querySelector('.burgerMenuContent');
    menuContent.innerHTML += menuItems;

    initBurgerMenuEvents();
};

const initBurgerMenuEvents = () => {
    const burgerMenuButton = document.querySelector('.burgerMenuButton');
    const closeButton = document.querySelector('.closeButton');

    closeButton.removeEventListener('click', closeBurgerMenu);

    burgerMenuButton.addEventListener('click', toggleBurgerMenu);
    closeButton.addEventListener('click', closeBurgerMenu);
};

const initBurgerMenu = async () => {
    initBurgerMenuEvents();

    try {
        const data = await fetchHeaderLinks();
        setBurgerMenuLinks(data);
    } catch (error) {
        console.error('Error initializing burger menu:', error.message);
    }
};

document.addEventListener('DOMContentLoaded', initBurgerMenu);
