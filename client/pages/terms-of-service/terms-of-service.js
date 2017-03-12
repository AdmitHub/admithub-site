FlowRouter.route('/terms', {
  name: 'Terms',

  meta: {
    pageTitle: 'Terms of Service'
  },

  action: function() {
    BlazeLayout.render('Layout', {
      pageContent: 'TermsOfServicePage',
    });
  }
});
