import fs from 'fs';
import axios from 'axios';
import cheerio from 'cheerio';
// import { LOADIPHLPAPI } from 'dns';

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

// prepareBundlesData();
// prepareBundlesDescription();

const ingredients = [
  {
    name: '',
    image: '',
    bundles: [],
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
    bundles: [],
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
    bundles: [],
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
    bundles: [],
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
    bundles: [],
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
    bundles: [],
    description: '',
    status: '',
    category: '',
    price: 0,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
  },
];

const prepareIngredientsData = () => {
  axios
    .get('https://shop.mindfulchef.com/collections/healthy-ready-meals')
    .then((res) => {
      const $ = cheerio.load(res.data);

      $('.grid__item')
        .find('.product-grid--title')
        .each((index, element) => {
          if (index < 6) {
            ingredients[index].name = $(element).text().replace(/\s\s+/g, '');
          }
        });

      $('.grid__item')
        .find('.lazyload-blur-wrapper')
        .each((index, element) => {
          if (index < 6) {
            const link = $(element).children('img').attr('src').replace(/150x/g, '1000x1000');
            if (link.includes('products')) {
              ingredients[index].image = link;
            }
            if (link.includes('products')) {
              ingredients[index].category = link
                .split('/products/')
                .pop()
                .split('_1000x1000')[0]
                .replace(/_/g, ' ')
                .toUpperCase();
            }
          }
        });

      $('.grid__item')
        .find('.pricing-unit')
        .children('span')
        .each((index, element) => {
          if (index < 6) {
            ingredients[index].price = $(element)
              .text()
              .replace(/\s\s+/g, '')
              .replace(/Regular price/g, '')
              .replace(/Sale price/g, '')
              .replace(/\s\s+/g, '');
            if (!ingredients[index].price) {
              ingredients[index].price = '£9.99';
            }
            ingredients[index].bundles = '609fd06c86cb5c3b84e18bc8';
          }
        });
    })
    .then(() => {
      fs.writeFile('./data/ingredients.json', JSON.stringify(ingredients, null, 4), (error) => {
        if (error) {
          throw new Error(error);
        }
      });
    });
};

const prepareFirstIngredientsDescription = () => {
  axios
    .get(
      'https://shop.mindfulchef.com/collections/healthy-ready-meals/products/spicy-panang-chicken-curry-with-black-rice',
    )
    .then((res) => {
      const $ = cheerio.load(res.data);

      ingredients[0].description = $('.product-description')
        .last('p')
        .last('span')
        .text()
        .replace(/\s\s+/g, '')
        .split('\n')[0];
    })
    .then(() => {
      fs.writeFile('./data/ingredients.json', JSON.stringify(ingredients, null, 4), (error) => {
        if (error) {
          throw new Error(error);
        }
      });
    });

  axios
    .get(
      'https://shop.mindfulchef.com/collections/healthy-ready-meals/products/creamy-coconut-fish-pie-with-sweet-potato-mash',
    )
    .then((res) => {
      const $ = cheerio.load(res.data);

      ingredients[1].description = $('.product-description')
        .last('p')
        .last('span')
        .text()
        .replace(/\s\s+/g, '')
        .split('\n')[0];
    })
    .then(() => {
      fs.writeFile('./data/ingredients.json', JSON.stringify(ingredients, null, 4), (error) => {
        if (error) {
          throw new Error(error);
        }
      });
    });
  axios
    .get(
      'https://shop.mindfulchef.com/collections/healthy-ready-meals/products/chicken-tikka-masala-with-brown-rice',
    )
    .then((res) => {
      const $ = cheerio.load(res.data);

      ingredients[2].description = $('.product-description')
        .last('p')
        .last('span')
        .text()
        .replace(/\s\s+/g, '')
        .split('\n')[0];
    })
    .then(() => {
      fs.writeFile('./data/ingredients.json', JSON.stringify(ingredients, null, 4), (error) => {
        if (error) {
          throw new Error(error);
        }
      });
    });
  axios
    .get(
      'https://shop.mindfulchef.com/collections/healthy-ready-meals/products/veggie-shepherds-pie-with-chestnuts',
    )
    .then((res) => {
      const $ = cheerio.load(res.data);

      ingredients[3].description = $('.product-description')
        .last('p')
        .last('span')
        .text()
        .replace(/\s\s+/g, '')
        .split('\n')[0];
    })
    .then(() => {
      fs.writeFile('./data/ingredients.json', JSON.stringify(ingredients, null, 4), (error) => {
        if (error) {
          throw new Error(error);
        }
      });
    });
  axios
    .get(
      'https://shop.mindfulchef.com/collections/healthy-ready-meals/products/lentil-moussaka-creamy-coconut-bechamel?variant=29230485864557',
    )
    .then((res) => {
      const $ = cheerio.load(res.data);

      ingredients[4].description = $('.product-description')
        .last('p')
        .last('span')
        .text()
        .replace(/\s\s+/g, '')
        .split('\n')[0];
    })
    .then(() => {
      fs.writeFile('./data/ingredients.json', JSON.stringify(ingredients, null, 4), (error) => {
        if (error) {
          throw new Error(error);
        }
      });
    });
  axios
    .get('https://shop.mindfulchef.com/collections/healthy-ready-meals/products/lamb-tagine')
    .then((res) => {
      const $ = cheerio.load(res.data);

      ingredients[5].description = $('.product-description')
        .last('p')
        .last('span')
        .text()
        .replace(/\s\s+/g, '')
        .split('\n')[0];
    })
    .then(() => {
      fs.writeFile('./data/ingredients.json', JSON.stringify(ingredients, null, 4), (error) => {
        if (error) {
          throw new Error(error);
        }
      });
    });
};

prepareIngredientsData();
prepareFirstIngredientsDescription();
