FlowRouter.route('/privacy', {
  name: 'Privacy',

  meta: {
    pageTitle: 'Privacy'
  },

  action: function() {
    BlazeLayout.render('Layout', {
      pageContent: 'PrivacyPolicyPage',
    });
  }
});
