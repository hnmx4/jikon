const phantom = require('phantom');
const express = require('express');

module.exports = class Generator {
  static createServer() {
    const app = express();

    app.use(express.static('assets'));
    const server = app.listen(8080, () => {});

    return server;
  }

  static async render() {
    const server = await Generator.createServer();

    const instance = await phantom.create();
    const page = await instance.createPage();

    page.property('viewportSize', {width: 1000, height: 570}).then(() => {});
    await page.open('http://localhost:8080');
    await page.render('./hoge.jpg', {format: 'jpeg', quality: '1024'});

    await instance.exit();
    await server.close();
  }
};
