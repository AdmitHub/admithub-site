FlowRouter.route('/press', {
  name: 'Press',

  meta: {
    pageTitle: 'Press'
  },

  action: function() {
    BlazeLayout.render('Layout', {
      pageContent: 'PressPage',
    });
  }
});
