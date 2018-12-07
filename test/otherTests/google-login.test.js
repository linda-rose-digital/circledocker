module.exports = {
  'log-in to google': function (browser) {
    browser
      .url('http://www.google.com')
      .waitForElementVisible('body', 1000)
      .click('#gb_70')
    try {
      browser.assert.urlContains('accounts')
        .end()
    } catch (error) {
      console.error(error)
      // expected output: SyntaxError: unterminated string literal
      // Note - error messages will vary depending on browser
    }
  },
  afterEach: function (client, done) {
    client.customSauceEnd()

    setTimeout(function () {
      done()
    }, 1000)
  }
}
