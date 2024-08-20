'use strict';

const sustainabilityMenu = document.querySelector('.sustainabilityMenu');
const designMenu = document.querySelector('.designMenu');
const companyMenu = document.querySelector('.companyMenu');
const resourcesMenu = document.querySelector('.resourcesMenu');
const contactMenu = document.querySelector('.contactMenu');

const fetchFooterMenuItems = async () => {
    try {
        const response = await fetch('./data/footer.json');

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
        console.error('Error fetching footer menu items', error.message);
        return [];
    } finally {
        console.log('Items fetching is complete');
    }
}

const setMenuItems = (menuData, menuElement) => {
    if (!menuData || !menuElement) {
        console.error('Menu data or element not provided');
        return;
    }

    const { title, items } = menuData;

    if (!Array.isArray(items)) {
        console.error(`Expected items to be an array`);
        return;
    }


    const menuHTML = `
    <h5 id='title'>${title}</h5>
    <ul class='menuFlex'>
        ${items.map(item => `
            <li class='${item === "Careers" ? "footerListItemCareers" : "footerMenuListItem"}'>
                ${item} ${item === "Careers" ? `<span id='hiringSubMark'>We\'re hiring</span>` : ''}
            </li>
        `).join('')}
    </ul>
`;


    menuElement.innerHTML = menuHTML;
}

const initFooterMenuItems = async () => {
    try {
        const data = await fetchFooterMenuItems();

        setMenuItems(data[0]?.sustainability, sustainabilityMenu);
        setMenuItems(data[0]?.design, designMenu);
        setMenuItems(data[0]?.company, companyMenu);
        setMenuItems(data[0]?.resources, resourcesMenu);
        setMenuItems(data[0]?.contact, contactMenu);

    } catch (error) {
        console.error('Error initializing footer menus:', error.message);
    }
}

document.addEventListener('DOMContentLoaded', initFooterMenuItems);
