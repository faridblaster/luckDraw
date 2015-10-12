Router.route('/', {
  name: 'App',
  controller: 'AppCtrl'
});

Router.route('/login', {
  name: 'Login',
  controller: 'LoginCtrl'
});

Router.route('/create/account', {
  name: 'create.account',
  controller: 'CreateAccountCtrl'
});

Router.route('/personnel/:_id', {
  name: 'personnel.editor',
  controller: 'PersonnelEditorCtrl'
});

Router.route('/lucky/draw', {
  name: 'luck.draw',
  controller: 'LuckyDrawCtrl'
});