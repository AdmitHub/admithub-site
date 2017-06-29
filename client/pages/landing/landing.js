import {chatBot, data} from "../../js/chat-bot.js";
import { Email } from 'meteor/email';

FlowRouter.route('/', {
  name: 'Home',

  meta: {
    pageTitle: 'Home'
  },

  action: function() {
    BlazeLayout.render('Layout', {
      pageContent: 'LandingPage',
    });
  }
});

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

FlowRouter.route('/:scrollTo', {
  name: 'Home_scroll',
  meta: {
    pageTitle: 'Home'
  },
  action: function(params, queryParams) {
    BlazeLayout.render('Layout', {
      main: "Home",
      pageContent: 'LandingPage'
    });
    setTimeout(() => {
      $("#ah-site-content").animate({scrollTop: $("div.chatbot").offset().top - 120}, 400)
    }, 2000)
  }
});


Template.LandingPage.onCreated(function() {
  this.textSent = new ReactiveVar(false);
  this.sendingText = new ReactiveVar(false);
  this.errorText = new ReactiveVar(null);
  this.showCaptcha = new ReactiveVar(false);
  this.phoneNumber = new ReactiveVar("");

  // Enable facebook "Message Us" plugin
//   window.fbAsyncInit = function() {
//     window.FB.init({
//       // TODO Add App ID from facebook dev console to Meteor settings
//       appId: "1729695877303019",
//       xfbml: true,
//       version: "v2.6"
//     });
//   };
//   (function(d, s, id){
//     var js, fjs = d.getElementsByTagName(s)[0];
//     if (d.getElementById(id)) { return; }
//     js = d.createElement(s); js.id = id;
//     js.src = "//connect.facebook.net/en_US/sdk.js";
//     fjs.parentNode.insertBefore(js, fjs);
//   }(document, 'script', 'facebook-jssdk'));
});

Template.LandingPage.onRendered(function() {
  var pageInitialized = false;

  // Track page scroll height
  this.scrollPercentage = new ReactiveVar(0);

  Tracker.afterFlush(() => {
    $('#ah-site-content').scroll(_.debounce(() => {
      var scrollPercentage, scrollPosition;
      scrollPosition = $('#ah-site-content').scrollTop() + $('#ah-site-content').height();
      scrollPercentage = scrollPosition / $('#ah-site-content-main').height() * 100;
      if (scrollPercentage < 25) {
        this.scrollPercentage.set(0);
      }
      else if (scrollPercentage < 50) {
        this.scrollPercentage.set(25);
      }
      else if (scrollPercentage < 75) {
        this.scrollPercentage.set(50);
      }
      else if (scrollPercentage < 99) {
        this.scrollPercentage.set(75);
      }
      else {
        this.scrollPercentage.set(100);
      }
    }, 300));
  });

  this.autorun(() => {
    this.scrollPercentage.get();
    if (pageInitialized) {
      analytics.track('Landing Page Scrolled', {
        scrollPercentage: this.scrollPercentage.get()
      });
    }
  });

  pageInitialized = true;

  // Initialize facebook "Message Us" plugin
  // window.fbAsyncInit();
});


Template.LandingPage.helpers({
  needsPhone: function() {
    return !( dotGet( Meteor.users.findOne( Meteor.userId() ), "profile.phone") );
  },

  isOfficer: function() {
    return CollegeOfficers.findOne({officers: Meteor.userId()});
  },

  highschoolsCounseled: function() {
    return Highschools.findOne({counselors: Meteor.userId()});
  },

  isStudent: function() {
    return !CollegeOfficers.findOne({officers: Meteor.userId()}) &&
           !Highschools.findOne({counselors: Meteor.userId()});
  },

  sponsors: function() {
    return Sponsors.find().fetch();
  },

  testimonials: function() {
    return Testimonials.find().fetch();
  },

  textSent: function() {
    return Template.instance().textSent.get();
  },

  disableGetStarted: function() {
    return Template.instance().sendingText.get() || !Template.instance().phoneNumber.get();
  },

  errorText: function() {
    return Template.instance().errorText.get();
  },

  showCaptcha: function() {
    return Template.instance().showCaptcha.get();
  },

  emailFromUrl: function () {
    return Session.get('userInputtedEmail');
  },

  subsectionDetailsStudentSuccess: function() {
    return [ {
      icon: '/landingIcons/icon-whistle.png',
      title: 'Individual Coaching',
      description: 'Each student controls the conversation to get the help they want when it\'s needed most. There\'s no spammy, one-way communication.'
    }, {
      icon: '/landingIcons/icon-comment.png',
      title: 'Simple Communication',
      description: 'There\'s no app to download, no form to complete, no login info to remember – students get help anytime, anywhere, via text message.'
    }, {
      icon: '/landingIcons/icon-hand.png',
      title: 'Personal Support',
      description: 'When students want to talk to someone, their questions are routed to the right advisor, mentor or staff member who can offer a human touch.'
    } ];
  },

  subsectionDetailsKeyOutcomes: function() {
    return [ {
      icon: '/landingIcons/icon-timer.png',
      title: 'Timely Nudges',
      description: 'Reminding students to complete vital tasks ahead of deadlines can have a big impact on yield, retention, and graduation rates.'
    }, {
      icon: '/landingIcons/icon-chart.png',
      title: 'Actionable Data',
      description: 'Gain deeper understanding of your student body by surveying groups, gathering key info and checking the pulse of individual students.'
    }, {
      icon: '/landingIcons/icon-magnified-user.png',
      title: 'Early Intervention',
      description: 'Data-driven analysis and real-time insights enable staff to identify and serve at-risk students more efficiently and effectively.'
    } ];
  },

  subsectionDetailsOptimizeResources: function() {
    return [ {
      icon: '/landingIcons/icon-pages.png',
      title: 'Reduced Busywork',
      description: 'Your virtual coach answers FAQs, collects student data and automates inquiry and event registration, looping in staff only when necessary.'
    }, {
      icon: '/landingIcons/icon-arrows-in-circle.png',
      title: 'Streamlined Outreach',
      description: 'Get the right info to each student at the right time. Be confident your message is heard, and be able to measure outcomes.'
    }, {
      icon: '/landingIcons/icon-integrations.png',
      title: 'Seamless Integration',
      description: 'Our technology works with your CRM, information services and email. There\'s no new platform to learn or dashboard to manage.'
    } ];
  }
});

Template.LandingPage.events({
  'click .end': function() {
  
  },
  'click .get-started-btn': function(e, t) {
    var phoneNumber = $('.get-started-phone-number').val();
    t.sendingText.set(true);
    t.errorText.set(null);
    if (t.showCaptcha.get()) {
      var captchaData = grecaptcha.getResponse();
      Meteor.call('getStarted', phoneNumber, captchaData, function(err, res) {
        grecaptcha.reset();
        t.sendingText.set(false);
        t.showCaptcha.set(false);
        if (err || !res) {
          if (err && err.reason) {
            t.errorText.set(err.reason);
          }
          else {
            t.errorText.set('There was a problem sending a text to that number.');
          }
          return;
        }
        analytics.track('Homepage Bot Signup', {
          phoneNumber: phoneNumber
        });
        t.textSent.set(true);
        // TODO: Show confirmation in some way
      });
    }
    else {
      t.showCaptcha.set(true);
    }
  },
  'click .fb-messengermessageus': function() {
    analytics.track('Facebook Messenger Button Clicked');
  },
  'keypress .get-started-phone-number': function(e, t) {
    t.phoneNumber.set($('.get-started-phone-number').val());
  },
  'submit .conversations__form.phone': function(e, t) {
    e.preventDefault();
    var phone = $('.conversations__input').val();
    var canText = document.getElementById('form-can-text').checked;
    var cleanPhone = phone && fields.cleanPhone(phone);
    if (!phone || cleanPhone && !/^\d{10}$/.test(cleanPhone)) {
      t.errorText.set("Please enter a valid US phone number");
      return;
    } else {
      Meteor.call('isExistingUser', {phone: cleanPhone}, function(err, result) {
        if (err) { return console.log(err) }
        if (result.exists) {
          t.errorText.set("This number is already registered. Continue to chat with Oli on your phone or login with your phone number.");
        } else {
          Meteor.users.update(Meteor.userId(), {
            $set: { "profile.phone": cleanPhone, "profile.canText": canText }
          });
        }
      });
    }
  },
  'submit .conversations__form.email': function(e, t) {
    e.preventDefault();
    t.errorText.set(undefined);
    var email = $('.conversations__input').val();
    if(!email) {
      t.errorText.set("Please enter your email address");
      return;
    }
    if (Meteor.userId()) {
      t.errorText.set("You're already logged in!");
      return;
    }
    Meteor.call("isExistingUser", {email: email}, function(err, result){
      if (err) {
        t.errorText.set("There was a problem looking up that email.");
        console.log(err);
      } else if (result.hasEmail) {
        Session.set('userInputtedEmail', email);
        Router.go('/login');
        if (result.isOfficer) {
          Session.set('afterLoginRedirect', '/prospectives');
        }
        else if (result.isCounselor) {
          Session.set('afterLoginRedirect', '/highschool');
        }
        else {
          Session.set('afterLoginRedirect', '/welcome');
        }
      } else {
        if (!Meteor.userId() && email) {
          Meteor.call("createAccountWithEmail", email, Session.get("utm_medium"), function(err, userId){
            if (err) {
              t.errorText.set("There was a problem creating your account.");
              console.log(err);
              return;
            }
            if (userId) {
              // Have to call setUserId on client too:
              // https://github.com/meteor/meteor/issues/3912
              Meteor.connection.setUserId(userId);
              Router.go('/welcome');
              Segment.identifyUser();
              analytics.track('logged in', {
                location: "landing page",
                userId: Meteor.userId()
              });
            }
          });
        }
      }
    });
    return false;
  },
  "click form.ah-contact-us-form [type='submit']": function(e) {
    var $org = $("#contact-us-institution");
    var $name = $("#contact-us-name");
    var $title = $("#contact-us-title");
    var $email = $("#contact-us-email");
    var org = $org.val();
    var name = $name.val();
    var title = $title.val();
    var email = $email.val();
    var postProps = {
      "properties": [
        {
          "property": "email",
          "value": email
        },
        {
          "property": "firstname",
          "value": name
        },
        // TODO Add `title` property to HubSpot
        //{
        //  "property": "title",
        //  "value": title
        //},
        {
          "property": "company",
          "value": org
        }
      ]
    };

    if(!email || !name) {
      toastr.error("Please enter your name and email to request a demo");
      return false;
    }
    Meteor.call('sendToHubSpot', postProps, function(err) {
      if (err) {
        toastr.error(err);
        return false;
      } else {
        toastr.success('Demo requested. We will email you to follow up soon.');

        // Clear form
        $org.val('');
        $name.val('');
        $title.val('');
        $email.val('');

        analytics.track('College Lead Captured', {
          org: org,
          name: name,
          title: title,
          email: email
        });
        return true;
      }
    });
    return false;
  }
});

Template.Carousel.onCreated(function() {
  this.subscribe("sponsors");
  this.autorun(function() {
    if (this.subscriptionsReady()) {
      Meteor.defer(function() {
        if ($(window).width() < Meteor.settings.public.mobileThreshold) {
          $('#carousel').slick({
            arrows: false,
            slidesToShow: 2,
            slidesToScroll: 2,
            autoplay: true
          });
        } else {
          $('#carousel').slick({
            arrows: false,
            slidesToShow: 4,
            slidesToScroll: 4,
            autoplay: true
          });
        }
      });
    }
  }.bind(this));
});

Template.Carousel.helpers({
  sponsors: function() {
    return Sponsors.find().fetch();
  }
});

Template.landingQuestions.onCreated(function() {
  this.subscribe("recentlyAsked");
});

Template.landingQuestions.onRendered(function() {

  this.autorun(() => {
    if (this.subscriptionsReady()) {
      // TODO Slick is not loading sometimes, so for now we use a hacky race condition
      Tracker.afterFlush(function () {
        $('.ah-recently-asked-questions').slick({
          arrows: false,
          autoplay: true
        });
      });
    }
  });
});

Template.landingQuestions.helpers({
  landingQuestionsData: function() {
    return RecentlyAsked.find({}).fetch();
  },

  user: function() {
    return Meteor.users.findOne(this.userId);
  },

  targetBlank: function(html) {
    var $html = $("<div>" + html + "</div>");
    $html.find("a").each(function(i, el) {
      el.target = "_blank";
    });
    return $html.html();
  }
});

Template.ChatBot.onRendered(function() {
  chatBot();
});
