module.exports = {
  'what is in span': function (browser) {
    browser
      .url('google.com')
      .useCss()
      .waitForElementVisible('.szppmdbYutt__middle-slot-promo')
      .assert.containsText('span:nth-child(2)', 'PrivacyTermsSettings')
      .end()
  },
  afterEach: function (client, done) {
    client.customSauceEnd()

    setTimeout(function () {
      done()
    }, 1000)
  }
}
