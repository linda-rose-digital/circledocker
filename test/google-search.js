module.exports = {
  'search for Rose Digital on google': function (browser) {
    browser
      .url('http://www.google.com')
      .waitForElementVisible('body', 1000)
      .setValue('input[type=text]', 'rose digital')
      .pause(1000)
      .click('input[value="Google Search"]')
    browser.assert.urlContains('rose')
      .end()
  },
  afterEach: function (client, done) {
    client.customSauceEnd()

    setTimeout(function () {
      done()
    }, 1000)
  }
}
