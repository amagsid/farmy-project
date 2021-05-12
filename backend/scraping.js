import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'fs';

  let name;
let image;
let description;
let status;
let category;
let price;
let countInStock;
let rating;
let numReviews;
  const json = [{
    name: '',
    image: '',
    description: '',
    status: '',
    category: '',
    price: 0,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
  }, {
    name: '',
    image: '',
    description: '',
    status: '',
    category: '',
    price: 0,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
  }, {
    name: '',
    image: '',
    description: '',
    status: '',
    category: '',
    price: 0,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
  }];

// const bundlesNames = [];
// const bundlesImages = [];
// const bundlesCategories = [];
// const bundlesDescriptions = [];
// const writeStream = fs.createWriteStream('test.js');
// This is a sample website to scrape data from it, we could change it later...
const prepareBundlesData = () => {
  axios.get('https://shop.mindfulchef.com/').then((res) => {
    const $ = cheerio.load(res.data);

    $('.grid__item')
      .find('.collection-item__title')
      .each((index, element) => {
         name = $(element).text();
         json[index].name = name;
         console.log(index);
        // bundlesNames[index] = { name };
        // writeStream.write(`${bundlesNames}`);
      });

    $('.grid__item')
      .find('.lazyload-blur-wrapper')
      .each((index, element) => {
         image = $(element).children('img').attr('src').replace(/150x/g, '1000x1000');
        if (image.includes('collections')) {
          json[index].image = image;

           category = image
            .split('/collections/')
            .pop()
            .split('_650x650_')[0]
            .replace(/_/g, ' ')
            .toUpperCase();
          json[index].category = category;
        }
      });
  });
};

const prepareBundlesDescription = () => {
  axios.get('https://shop.mindfulchef.com/collections/healthy-ready-meals').then((res) => {
    const $ = cheerio.load(res.data);

    json[0].description = $('.collection-sidebar__description')
        .last('p')
        .last('span')
        .text()
        .replace(/\s\s+/g, '')
        .split('\n')[0];

      json[0].status = $('.collection-sidebar__description')
        .last('p')
        .last('span')
        .text()
        .replace(/\s\s+/g, '')
        .split('\n')[1];
  });

  axios.get('https://shop.mindfulchef.com/collections/smoothies').then((res) => {
    const $ = cheerio.load(res.data);

    json[1].description = $('.collection-sidebar__description')
        .last('p')
        .last('span')
        .text()
        .replace(/\s\s+/g, '')
        .split('\n')[0];

      json[1].status = $('.collection-sidebar__description')
        .last('p')
        .last('span')
        .text()
        .replace(/\s\s+/g, '')
        .split('\n')[1];
  });

  axios.get('https://shop.mindfulchef.com/collections/gift-vouchers').then((res) => {
    const $ = cheerio.load(res.data);

    json[2].description = $('.collection-sidebar__description')
        .last('p')
        .last('span')
        .text()
        .replace(/\s\s+/g, '')
        .split('\n')[0];

      json[2].status = $('.collection-sidebar__description')
        .last('p')
        .last('span')
        .text()
        .replace(/\s\s+/g, '')
        .split('\n')[1];
  })
  .then(() => {
      fs.writeFile('./data/bundels.json', JSON.stringify(json, null, 4), (error) => {
      console.log('success');
    });
  });
};

prepareBundlesData();
prepareBundlesDescription();
