const axios = require('axios');

console.log('Script started...');

var date = new Date();
var today = date.toISOString().slice(0, 10);

var ydayDate = new Date(date.setDate(date.getDate() - 1));
var yesterday = ydayDate.toISOString().slice(0, 10);

var todayATHs = [];
var ydayATHs = [];

axios
  .get('https://api.coingecko.com/api/v3/coins/markets', {
    params: {
      vs_currency: 'usd',
      order: 'market_cap_desc',
    },
  })
  .then((resp) => {
    const { data } = resp;

    data.map((elem) => {
      var ath = elem.ath_date.slice(0, 10);
      if (ath === today) todayATHs.push(elem.id);
      if (ath === yesterday) ydayATHs.push(elem.id);
    });

    console.log(`
Today's ${today} ATHs:
------------------------------
`);
    todayATHs.map((ath) => console.log(ath));
    console.log(`

Yesterday's ${yesterday} ATHs:
------------------------------
`);
    ydayATHs.map((ath) => console.log(ath));
    console.log(`
------------------------------
------------------------------`);
  });
