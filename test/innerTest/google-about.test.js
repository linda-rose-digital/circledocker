const https = require('https')
const SauceLabs = require('saucelabs')

module.exports = {
  'click the about link': function (browser) {
    browser
      .url('http://www.google.com')
      .waitForElementVisible('body', 1000)
      .click('a')
    newFunction(browser)
  },
  afterEach: function (client, done) {
    client.customSauceEnd()

    setTimeout(function () {
      done()
    }, 1000)
  }
}
function newFunction (browser) {
  try {
    browser.assert.urlContains('about')
      .end()
  } catch (error) {
    console.error(error)
    // expected output: SyntaxError: unterminated string literal
    // Note - error messages will vary depending on browser
  }
}
