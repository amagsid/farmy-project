import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'fs';

const bundlesNames = [];
const bundlesImages = [];
const bundlesCategories = [];
const bundlesDescriptions = [];
const writeStream = fs.createWriteStream('test.js');
// This is a sample website to scrape data from it, we could change it later...
const prepareBundlesData = () => {
  axios.get('https://shop.mindfulchef.com/').then((res) => {
    const $ = cheerio.load(res.data);

    $('.grid__item')
      .find('.collection-item__title')
      .each((index, element) => {
        const name = $(element).text();
        bundlesNames[index] = { name };
        writeStream.write(`${bundlesNames}`);
      });

    $('.grid__item')
      .find('.lazyload-blur-wrapper')
      .each((index, element) => {
        const image = $(element).children('img').attr('src').replace(/150x/g, '1000x1000');
        if (image.includes('collections')) {
          bundlesImages[index] = { image };
          writeStream.write(`${bundlesImages}`);
          const category = image
            .split('/collections/')
            .pop()
            .split('_650x650_')[0]
            .replace(/_/g, ' ')
            .toUpperCase();
          bundlesCategories[index] = { category };
          writeStream.write(`${bundlesCategories}`);
        }
      });
    console.log('Bundles Names:', bundlesNames);
    console.log('Bundles Images:', bundlesImages);
    console.log('Bundles Category:', bundlesCategories);
    return { bundlesNames, bundlesImages, bundlesCategories };
  });
};

const prepareBundlesDescription = () => {
  axios.get('https://shop.mindfulchef.com/collections/healthy-ready-meals').then((res) => {
    const $ = cheerio.load(res.data);

    bundlesDescriptions[0] = {
      description: $('.collection-sidebar__description')
        .last('p')
        .last('span')
        .text()
        .replace(/\s\s+/g, '')
        .split('\n')[0],
      status: $('.collection-sidebar__description')
        .last('p')
        .last('span')
        .text()
        .replace(/\s\s+/g, '')
        .split('\n')[1],
    };
  });

  axios.get('https://shop.mindfulchef.com/collections/smoothies').then((res) => {
    const $ = cheerio.load(res.data);

    bundlesDescriptions[1] = {
      description: $('.collection-sidebar__description')
        .last('p')
        .last('span')
        .text()
        .replace(/\s\s+/g, '')
        .split('\n')[0],
      status: $('.collection-sidebar__description')
        .last('p')
        .last('span')
        .text()
        .replace(/\s\s+/g, '')
        .split('\n')[1],
    };
  });

  axios.get('https://shop.mindfulchef.com/collections/gift-vouchers').then((res) => {
    const $ = cheerio.load(res.data);

    bundlesDescriptions[2] = {
      description: $('.collection-sidebar__description')
        .last('p')
        .last('span')
        .text()
        .replace(/\s\s+/g, '')
        .split('\n')[0],
      status: $('.collection-sidebar__description')
        .last('p')
        .last('span')
        .text()
        .replace(/\s\s+/g, '')
        .split('\n')[1],
    };
    writeStream.write(`${bundlesDescriptions}`);

    console.log('Bundles Descriptions:', bundlesDescriptions);

    return { bundlesDescriptions };
  });
};

prepareBundlesData();
prepareBundlesDescription();
