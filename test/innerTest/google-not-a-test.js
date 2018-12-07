module.exports = {
  'not a test': function (browser) {
    browser
      .url('http://www.google.com')
      .waitForElementVisible('body', 1000)
      .click('a')
    browser.assert.urlContains('about')
      .end()
  },
  afterEach: function (client, done) {
    client.customSauceEnd()

    setTimeout(function () {
      done()
    }, 1000)
  }
}
