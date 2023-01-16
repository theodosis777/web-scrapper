import axios from 'axios';
import cheerio from 'cheerio';

export async function getAllProducts() {
  const websiteUrl = 'https://www.lg.com';
  const productLinks = await getProducts(websiteUrl);
  const len = productLinks?.length || 0;
  if (len > 0) {
    for (let index = 0; index < len; index++) {
      const product = productLinks[index];

      const features = await getProductInfo(websiteUrl, product?.href);
      product.features = features;
    }
  }
  return productLinks;
}

async function getProducts(url) {
  try {
    const { data: html } = await axios.get(url + '/uk/sitemap');
    const $ = cheerio.load(html);
    const linkObjects = $('.inner a');
    const links = [];
    var continueLoop = true;
    linkObjects.each((index, element) => {
      if ($(element).text() === 'Support') {
        continueLoop = false;
      }
      if (continueLoop) {
        links.push({
          text: $(element).text(), // get the text
          href: $(element).attr('href') || '', // get the href attribute
          features: [],
        });
      }
    });
    return links;
  } catch (e) {
    console.error(e);
  }
}

async function getProductInfo(url, productLink) {
  try {
    const { data: productHtml } = await axios.get(url + productLink);
    const $ = cheerio.load(productHtml);
    const productSpecs = [];

    $('.tech-spacs')
      .find('div > ul > li > dl > dt')
      .each(function (index, element) {
        productSpecs.push({
          feature: $(element).text().trim(),
        });
      });
    $('.tech-spacs')
      .find('div > ul > li > dl > dd')
      .each(function (index, element) {
        productSpecs[index].value = $(element).text().trim();
      });
    return productSpecs;
  } catch (e) {
    console.error(e);
  }
}
