module.exports = {
  'I shouldnt run': function (browser) {
    browser
      .url('http://www.google.com')
      .waitForElementVisible('body', 1000)
      .click('#hptl>a:nth-of-type(2)')
    browser.assert.urlContains('store')
      .end()
  },
  afterEach: function (client, done) {
    client.customSauceEnd()

    setTimeout(function () {
      done()
    }, 1000)
  }
}
