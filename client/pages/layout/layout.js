Template.Layout.onCreated(function() {
  this.subscribe("collegeEvents");
  this.subscribe("collegeOfficers");

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
    setTimeout(function(){
       window.top.$("iframe").hide()
    },500);

  }

  // Hide the address bar on mobile devices (see https://davidwalsh.name/hide-address-bar)
  window.addEventListener("load", function() {
    setTimeout(function() {
      window.scrollTo(0, 1);
    }, 0);
  });
});

Template.Layout.helpers({
  isOfficer: function() {
    return CollegeOfficers.findOne({officers: Meteor.userId()});
  },
  highschoolsCounseled: function() {
    return Highschools.findOne({counselors: Meteor.userId()});
  },
  pageTitle: function() {
    return Session.get('pageTitle');
  },
  showImageHeader: function() {
    return dotGet(Router.current(), 'route.options.imageHeader');
  },
  headerBackgroundImage: function() {
    return Session.get('headerBackground') || '/landing-hero.jpg';
  },
  activeRoute: function(routeName) {
    var currentRoute = Router.current();
    if (!currentRoute || !currentRoute.route) {
      return false;
    }
    return currentRoute.route.getName() === routeName;
  },
  hideChat: function() {
    var isChat = Router.current().route.getName() == "chat";
    var isOfficer = !!CollegeOfficers.findOne({officers: Meteor.userId()});
    return isChat || isOfficer;
  },
  isSlashChat: function() {
    return Session.get('pageTitle') === 'Chat';
  },
  isOrganizer: function() {
    return CollegeEvents.find({
      organizers: Meteor.userId()
    }).count() > 0;
  }
});

Template.Layout.events({
  'click #ah-header-overflow-menu': function(e,t) {
    $('nav').toggleClass('open-nav');
  },
  'click nav a, click .ah-header-center :not(#ah-header-overflow-menu)': function(e,t) {
    $('nav').removeClass('open-nav');
  }
});
