module.exports = {
  'Google logo is present': function (browser) {
    browser
      .url('google.com') // visit the url
      .waitForElementVisible('body', 1000)
    browser.assert.elementPresent('#hplogo')
  },
  afterEach: function (client, done) {
    client.customSauceEnd()

    setTimeout(function () {
      done()
    }, 1000)
  }
}
