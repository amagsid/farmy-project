import axios from 'axios';
import cheerio from 'cheerio';

//  This is a sample website to scrape data from it, we could change it later...
axios.get('https://shop.mindfulchef.com/').then((res) => {
  const $ = cheerio.load(res.data);
  //   const bundles = [];
  //   $('.grid__item')
  //     .find('.collection-item__title')
  //     .each((index, element) => {
  //       const name = $(element).text();
  //       bundles[index] = { name };
  //     });
  //   console.log(bundles);
  //   $('.grid__item')
  //     .find('.lazyload-blur-wrapper')
  //     .each((index, element) => {
  //       const image = $(element).children('img').attr('src');
  //       bundles[index] = { image };
  //     });
  //   console.log(bundles);
  const bundles = [];
  $('.grid__item').each((index, element) => {
    const name = $(element).find('.collection-item__title').text();
    // bundles[index] = { name };
    const image = $(element).find('.lazyload-blur-wrapper').children('img').attr('src');
    bundles[index] = { name, image };
  });
  console.log(bundles);
});
