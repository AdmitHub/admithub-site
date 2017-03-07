FlowRouter.route('/about', {
  name: 'AboutUs',

  meta: {
    pageTitle: 'About Us'
  },

  action: function() {
    BlazeLayout.render('Layout', {
      pageContent: 'AboutUsPage',
    });
  }
});
