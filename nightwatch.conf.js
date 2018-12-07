const seleniumServer = require('selenium-server')
const chromedriver = require('chromedriver')
const PKG = require('./package.json') // so we can get the version of the project
const SCREENSHOT_PATH = './node_modules/nightwatch/screenshots/' + PKG.version + '/'

const config = { // we use a nightwatch.conf.js file so we can include comments and helper functions
  'src_folders': [
    'test'
  ],
  'output_folder': './node_modules/nightwatch/reports', // reports (test outcome) output by Nightwatch
  'custom_commands_path': 'custom_commands',
  'selenium': {
    'start_process': false,
    'server_path': seleniumServer.path,
    'log_path': '',
    'host': '127.0.0.1',
    'port': 4444,
    'cli_args': {
      'webdriver.chrome.driver': chromedriver.path
    }
  },
  'test_workers': { 'enabled': true, 'workers': 'auto' }, // perform tests in parallel where possible
  'test_settings': {
    'default': {
      'launch_url': 'http://localhost', // we're testing a Public or "staging" site on Saucelabs
      'selenium_port': 80,
      'selenium_host': 'ondemand.saucelabs.com',
      'silent': true,
      'screenshots': {
        'enabled': true, // save screenshots to this directory (excluded by .gitignore)
        'path': SCREENSHOT_PATH
      },
      'filter': '/**/*.test.js',
      'username': '${SAUCE_USERNAME}', // if you want to use Saucelabs remember to
      'access_key': '${SAUCE_ACCESS_KEY}', // export your environment variables
      'globals': {
        'waitForConditionTimeout': 5000 // wait for content on the page before continuing
      }
    },
    'local': {
      'launch_url': 'http://localhost',
      'selenium_port': 4444,
      'selenium_host': '127.0.0.1',
      'silent': true,
      'screenshots': {
        'enabled': true, // save screenshots taken here
        'path': SCREENSHOT_PATH
      }, // this allows us to control the
      'globals': {
        'waitForConditionTimeout': 8000 // on localhost sometimes internet is slow so wait...
      },
      'skip_testcases_on_fail': false,
      'desiredCapabilities': {
        'browserName': 'chrome',
        'chromeOptions': {
          'args': [
            `Mozilla/5.0 (iPhone; CPU iPhone OS 5_0 like Mac OS X) AppleWebKit/534.46
            (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3`,
            '--window-size=640,1136' // iphone 5
          ]
        },
        'javascriptEnabled': true,
        'acceptSslCerts': true
      }
    },
    'chrome': { // your local Chrome browser (chromedriver)
      'desiredCapabilities': {
        'browserName': 'chrome',
        'javascriptEnabled': true,
        'acceptSslCerts': true
      }
    },
    'chromemac': { // browsers used on saucelabs:
      'desiredCapabilities': {
        'browserName': 'chrome',
        'platform': 'OS X 10.11',
        'version': '47.0'
      }
    },
    'ie11': {
      'priority': 1,
      'desiredCapabilities': {
        'browserName': 'internet explorer',
        'platform': 'Windows 10',
        'version': '11.0'
      }
    },
    'firefox': {
      'priority': 2,
      'desiredCapabilities': {
        'platform': 'Windows 10',
        'browserName': 'firefox',
        'version': '33.0'
      }
    },
    'internet_explorer_10': {
      'priority': 3,
      'desiredCapabilities': {
        'platform': 'Windows 7',
        'browserName': 'internet explorer',
        'version': '10'
      }
    },
    'android_s4_emulator': {
      'priority': 4,
      'desiredCapabilities': {
        'browserName': 'android',
        'deviceOrientation': 'portrait',
        'deviceName': 'Samsung Galaxy S4 Emulator',
        'version': '4.4'
      }
    }
  }
}
module.exports = config

function padLeft (count) { // theregister.co.uk/2016/03/23/npm_left_pad_chaos/
  return count < 10 ? '0' + count : count.toString()
}

var FILECOUNT = 0 // "global" screenshot file count

function imgpath (browser) {
  var a = browser.options.desiredCapabilities
  var meta = [a.platform]
  meta.push(a.browserName ? a.browserName : 'any')
  meta.push(a.version ? a.version : 'any')
  meta.push(a.name) // this is the test filename so always exists.
  var metadata = meta.join('~').toLowerCase().replace(/ /g, '')
  return SCREENSHOT_PATH + metadata + '_' + padLeft(FILECOUNT++) + '_'
}

module.exports.imgpath = imgpath
module.exports.SCREENSHOT_PATH = SCREENSHOT_PATH
