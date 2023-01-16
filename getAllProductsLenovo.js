import axios from 'axios';
import cheerio from 'cheerio';

getAllProducts();

export async function getAllProducts() {
  const websiteUrl = 'https://www.asus.com/';
  const productLinks = await getProducts(websiteUrl);

  for (let index = 0; index < productLinks.length; index++) {
    if (
      productLinks[index] ===
      'https://www.asus.com/laptops/for-home/all-series/'
    ) {
      const productSpecs = await getProductInfo(
        websiteUrl,
        productLinks[index]
      );
    }
  }

  //return productLinks;
}

async function getProducts(url) {
  try {
    const { data: html } = await axios.get(url);
    const $ = cheerio.load(html);
    const linkObjects = $(
      '.Footer__productLineListContainer__2GV2W.Footer__themeWhite__wXGyx a'
    );
    const links = [];
    linkObjects.each(async (index, element) => {
      links.push($(element).attr('href'));
    });
    return links;
  } catch (e) {
    console.error(e);
  }
}

async function getProductInfo(url, productLink) {
  try {
    const { data: productHtml } = await axios.get(productLink);
    const $ = cheerio.load(productHtml);
    const productSpecs = [];
    const results = $('.LevelTwoSeriesPage__seriesRightBody__2DRzz a');
    results.each(async (index, element) => {
      productSpecs.push($(element).attr('href'));
    });

    const itemLink = productSpecs[2];
    const { data: itemHtml } = await axios.get(itemLink);
    const itemData = cheerio.load(itemHtml);
    const itemResults = itemData('.productListContainer div');
    itemResults.each((index, element) => {
      console.log(itemResults(element).text());
    });

    /*
    if (results.text().trim() !== '') {
      const productInfo = {
        link: productLink,
        features: [],
      };
      $('.tech-spacs')
        .find('div > ul > li > dl > dt')
        .each(function (index, element) {
          productInfo.features.push({
            feature: $(element).text().trim(),
          });
        });
      $('.tech-spacs')
        .find('div > ul > li > dl > dd')
        .each(function (index, element) {
          productInfo.features[index].value = $(element).text().trim();
        });
    } else {
      /// multi results page
      const multiLinks = $('.result-box a');
      multiLinks.each(async (index, element) => {
        const multiLink = $(element).attr('href');
        if (multiLink.indexOf('/')) {
          console.log('$$$$$$$1');
          console.log(multiLink);
          //const { data: nestedProductHtml } = await axios.get(url + multiLink);
          // const nestedHtml = cheerio.load(nestedProductHtml);
          console.log('$$$$$$$2');
          //console.log(nestedHtml.html());
          //const nestedResults = nestedHtml('.tech-spacs');
        }
      });
    }
    */
    return productSpecs;
  } catch (e) {
    console.error(e);
  }
}
