'use strict';

const productCardsContainer = document.querySelector('.productsCards');

const fetchingProductsTitles = async () => {
  try {
    const request = await fetch('/data/products.json');
    const data = await request.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return [];
    }
  }
};

const setTitlesByProducts = (data) => {
    if (!Array.isArray(data)) {
      console.error('Expected data to be an array');
      return;
    }
    
    const productCards = [...document.querySelectorAll('.productCard')];
    productCards.forEach((card, index) => {
      if (index < data.length) {
        const titleElement = document.createElement('h4');
        titleElement.className = 'cardTitle';
        titleElement.textContent = data[index].productTitle;
  
        const cardImageBlock = card.querySelector('.cardImageBlock');
        if (cardImageBlock) {
          cardImageBlock.insertAdjacentElement('afterend', titleElement);
        }
      }
    });
  };
  

fetchingProductsTitles().then((titles) => {
  setTitlesByProducts(titles);
});
