'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const productCardsContainer = document.querySelector('.productsCards');

  const fetchingProductsTitles = async () => {
    try {
      const request = await fetch('/data/products.json');
      
      if (!request.ok) {
        throw new Error(`HTTP error! status: ${request.status}`);
      }

      const contentType = request.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Response is not valid JSON");
      }

      const data = await request.json();
      return data;

    } catch (error) {
      console.error('Error fetching product titles:', error.message);
      return [];
    }
  };

  const setTitlesByProducts = (data) => {
    if (!Array.isArray(data)) {
      console.error('Expected data to be an array');
      return;
    }

    const productCards = document.querySelectorAll('.productCard');
    
    if (productCards.length === 0) {
      console.error('No product cards found');
      return;
    }

    productCards.forEach((card, index) => {
      if (index < data.length) {
        const existingTitle = card.querySelector('.cardTitle');
        
        if (existingTitle) {
          existingTitle.remove();
        }

        const titleElement = document.createElement('h4');
        titleElement.className = 'cardTitle';
        titleElement.textContent = data[index].productTitle || 'Untitled Product';

        const cardImageBlock = card.querySelector('.cardImageBlock');
        if (cardImageBlock) {
          cardImageBlock.insertAdjacentElement('afterend', titleElement);
        } else {
          console.error('Card image block not found for card index:', index);
        }
      }
    });
  };

  fetchingProductsTitles()
    .then((titles) => {
      setTitlesByProducts(titles);
    })
    .catch((error) => {
      console.error('Error setting product titles:', error.message);
    });
});
