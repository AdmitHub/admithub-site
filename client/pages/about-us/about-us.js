Template.AboutUsPage.onCreated(function() {

  if(Meteor.isClient) {
    window.fbAsyncInit = function() {
      FB.init({
        appId: '808939135876567', // Specify your app id here
        status: true,
        xfbml: true,
        version: 'v2.12' // Specify your version here
      });
    };
    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "https://connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
  }

  // Hide the address bar on mobile devices (see https://davidwalsh.name/hide-address-bar)
  window.addEventListener("load", function() {
    setTimeout(function() {
      window.scrollTo(0, 1);
    }, 0);
  });
});

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
