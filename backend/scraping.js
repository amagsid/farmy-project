import fs from 'fs';
import axios from 'axios';
import cheerio from 'cheerio';

const bundles = [
  {
    name: '',
    image: '',
    description: '',
    status: '',
    category: '',
    price: 0,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
  },
  {
    name: '',
    image: '',
    description: '',
    status: '',
    category: '',
    price: 0,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
  },
  {
    name: '',
    image: '',
    description: '',
    status: '',
    category: '',
    price: 0,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
  },
];

// This is a sample website to scrape data from it, we could change it later...
const prepareBundlesData = () => {
  axios.get('https://shop.mindfulchef.com/').then((res) => {
    const $ = cheerio.load(res.data);

    $('.grid__item')
      .find('.collection-item__title')
      .each((index, element) => {
        bundles[index].name = $(element).text();
      });

    $('.grid__item')
      .find('.lazyload-blur-wrapper')
      .each((index, element) => {
        const link = $(element).children('img').attr('src').replace(/150x/g, '1000x1000');
        if (link.includes('collections')) {
          bundles[index].image = link;

          bundles[index].category = link
            .split('/collections/')
            .pop()
            .split('_650x650_')[0]
            .replace(/_/g, ' ')
            .toUpperCase();
        }
      });
  });
};

const prepareBundlesDescription = () => {
  axios.get('https://shop.mindfulchef.com/collections/healthy-ready-meals').then((res) => {
    const $ = cheerio.load(res.data);

    bundles[0].description = $('.collection-sidebar__description')
      .last('p')
      .last('span')
      .text()
      .replace(/\s\s+/g, '')
      .split('\n')[0];

    bundles[0].status = $('.collection-sidebar__description')
      .last('p')
      .last('span')
      .text()
      .replace(/\s\s+/g, '')
      .split('\n')[1];
  });

  axios.get('https://shop.mindfulchef.com/collections/smoothies').then((res) => {
    const $ = cheerio.load(res.data);

    bundles[1].description = $('.collection-sidebar__description')
      .last('p')
      .last('span')
      .text()
      .replace(/\s\s+/g, '')
      .split('\n')[0];

    bundles[1].status = $('.collection-sidebar__description')
      .last('p')
      .last('span')
      .text()
      .replace(/\s\s+/g, '')
      .split('\n')[1];
  });

  axios
    .get('https://shop.mindfulchef.com/collections/gift-vouchers')
    .then((res) => {
      const $ = cheerio.load(res.data);

      bundles[2].description = $('.collection-sidebar__description')
        .last('p')
        .last('span')
        .text()
        .replace(/\s\s+/g, '')
        .split('\n')[0];
      if (!bundles[2].description) {
        bundles[2].description = 'Default Description';
      }
      bundles[2].status = $('.collection-sidebar__description')
        .last('p')
        .last('span')
        .text()
        .replace(/\s\s+/g, '')
        .split('\n')[1];
      if (!bundles[2].status) {
        bundles[2].status = 'Default Status';
      }
    })
    .then(() => {
      fs.writeFile('./data/bundles.json', JSON.stringify(bundles, null, 4), (error) => {
        if (error) {
          throw new Error(error);
        }
      });
    });
};

prepareBundlesData();
prepareBundlesDescription();
