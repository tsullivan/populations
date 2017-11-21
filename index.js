const { readFileSync } = require('fs');
const { Parser } = require('tsv');
const moment = require('moment');

const file = readFileSync('./countries-populations.tsv', 'utf8');
const tsv = new Parser('\t', { header: false });

const result = tsv.parse(file);

result.forEach(([country, population, collectionDate, percentageOfWorld, report]) => {
  if (country !== '') {
    console.log('{ "index" : { "_index" : "countries", "_type" : "doc" } }');
    console.log(JSON.stringify({
      country,
      population: String(population).replace(/,/g, ''),
      collection_date: moment.utc(collectionDate).format(),
      percentage_of_world: percentageOfWorld,
      report,
    }));
  }
});
