const fs = require('fs');

const fakeRequest = async stubfilename => {
  fs.readFile(`./${stubfilename}.json`, 'utf8', (err, data) => {
    if (err) return err;
    // Parse the data as JSON and put in the key entity (just like the request library does)
    return { entity: JSON.parse(data) };
  });
};
