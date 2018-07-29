const _express = require('express');
const _phantom = require('phantom');

const main = async () => {
    const app = _express();
    app.use(_express.static('assets'));
    const server = await app.listen(8080);

    await _phantom.create()
           .then((instance) => {
               return instance.createPage('localhost:8080');
           })
           .then((page) => {
               page.property('plainText').then(function(content) {
                   console.log(content);
               });
           });

    await server.close();
};

main();
