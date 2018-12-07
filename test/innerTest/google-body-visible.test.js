const conf = require('../../nightwatch.conf.js')

module.exports = {
  'Google body is present': function (browser) {
    browser
      .url('google.com') // visit the url
      .waitForElementVisible('body') // wait for the body to be rendered
    browser.element('css selector', '.switch-to-desktop', function (result) {
      if (result.status != -1) { // Element exists, do something
        browser.click('.switch-to-desktop')
          .waitForElementVisible('body') // wait for the body to be rendered
      }
    })
    // part two:
    browser
      .saveScreenshot(conf.imgpath(browser) + 'google.png')
      .end()
  },
  afterEach: function (client, done) {
    client.customSauceEnd()

    setTimeout(function () {
      done()
    }, 1000)
  }
}
