const { parse } = require("csv-parse");
const addresses = [];
const output = [];
const fs = require("fs");
const axios = require("axios");

//write out data
function done(output = "") {
  console.log(output);
  process.exit(0);
}

function validateAddress(addresses) {
  // create endpoints based on addresses
  const endpoints = [];
  const keys = [];
  for (let i = 0; i < Object.keys(addresses).length; i++) {
    keys.push(
      `${addresses[i]["Street Address"]}, ${addresses[i]["City"]}, ${addresses[i]["Postal Code"]}`
    );
    endpoints.push(
      axios.get(
        `https://api.address-validator.net/api/verify?StreetAddress=${addresses[i]["Street Address"]}&City=${addresses[i]["City"]}&PostalCode=${addresses[i]["Postal Code"]}&CountryCode=US&APIKey=av-aaf93692c38cbf1e4013fc393152cdca`
      )
    );
  }

  Promise.all(endpoints).then((allResults) => {
    allResults = allResults.map((result) => result.data);
    for (let i = 0; i < allResults.length; i++) {
      if (allResults[i].status === "VALID") {
        output.push(`${keys[i]} -> ${keys[i]}`);
      } else if (allResults[i].status === "INVALID") {
        output.push(`${keys[i]} -> ${allResults[i].formattedaddress}`);
      } else {
        output.push(`${keys[i]} -> Couldn't validate address`);
      }
    }
    done(output);
  });
}

if (process.argv.length === 2) {
  // of type 'node jest'
  fileUrl = "test.csv";
} else {
  //  of type 'node index.js test.csv'
  // Reading our test file
  fileUrl = process.argv[2];
}
fs.createReadStream(fileUrl)
  .pipe(parse({ columns: true, trim: true }))
  .on("data", (data) => {
    addresses.push(data);
  })
  .on("end", () => {
    validateAddress(addresses);
  });

// module.exports = addresses;
