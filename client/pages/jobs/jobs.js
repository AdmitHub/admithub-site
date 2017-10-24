FlowRouter.route('/jobs', {
  name: 'Jobs',

  meta: {
    pageTitle: 'Jobs'
  },

  action: function() {
    BlazeLayout.render('Layout', {
      pageContent: 'JobsPage',
    });
  }
});
