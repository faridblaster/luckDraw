App.accessRule('*');
// This section sets up some basic app metadata,
// the entire section is optional.
App.info({
  id: 'com.example.lucky.draw',
  name: 'luckyDraw',
  description: 'This is lucky draw',
  author: 'Silent Code',
  email: 'contact@faridblaster.com',
  website: 'http://faridblaster.com'
});

// Set up resources such as icons and launch screens.
App.icons({
  'iphone': 'icons/icon-60.png',
  'iphone_2x': 'icons/icon-60@2x.png'
  // ... more screen sizes and platforms ...
});

App.launchScreens({
  'iphone': 'splash/Default~iphone.png',
  'iphone_2x': 'splash/Default@2x~iphone.png'
  // ... more screen sizes and platforms ...
});

// Set PhoneGap/Cordova preferences
App.setPreference('BackgroundColor', '0xff0000ff');
App.setPreference('HideKeyboardFormAccessoryBar', true);

// Pass preferences for a particular PhoneGap/Cordova plugin
App.configurePlugin('com.phonegap.plugins.facebookconnect', {
  APP_ID: '1043527789013909',
  API_KEY: '722da3cded8fefed2f23ab8bb95f6e10'
});