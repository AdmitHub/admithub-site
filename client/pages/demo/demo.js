FlowRouter.route('/demo', {
    name: 'Demo',
  
    meta: {
      pageTitle: 'Georgia State Demo'
    },
  
    action: function() {
      BlazeLayout.render('Layout', {
        pageContent: 'GSUDemo',
      });
    }
  });
  