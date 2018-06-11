import twilio from 'twilio';
import Api from './api';

Api.addRoute('analytics', {
  post: function() {
    if (!authenticateTwilio(this.request, this.response)) {
      return {
        statusCode: 401,
        body: "Authentication failed"
      }
    }

    _.each(["track", "identify", "page", "alias", "group"], (action) => {
      if (this.request.body[action]) {
        try {
          var params = JSON.parse(this.request.body.track);
        } catch (e) {
          return {
            statusCode: 400,
            body: "Invalid JSON for parameter: " + action
          }
        }
        analytics[action](params);
      }
    });

    return {
      statusCode: 200,
      body: "OK"
    }
  }
});

/**
 * Express middleware to authenticate requests using twilio's authentication
 * strategy. See https://www.twilio.com/docs/security
 */
function authenticateTwilio(request) {
  const twilioAuthToken = (Meteor.settings.twilio && Meteor.settings.twilio.authToken) || '1234';
  const twilioSignature = request.headers && request.headers['x-twilio-signature'];
  var valid = twilio.validateRequest(
    twilioAuthToken,
    twilioSignature,
    Meteor.absoluteUrl(request.url.substring(1)), // strip leading "/"
    request.body
  );

  if (Meteor.isDevelopment) {
    if (typeof logger !== "undefined") {
      logger.error("Twilio auth failed; but allowing anyway, because isDevelopment is true");
    } else {
      console.error("Twilio auth failed; but allowing anyway, because isDevelopment is true");
    }
    return true;
  } else {
    return valid;
  }
}

/**
 * Injects GTM script and iframe directly into top of head and body before loading meteor packages
 * 
 */

Inject.rawHead('headGA', `
<!-- Google Tag Manager -->  
  <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-P7LXZX');</script>
<!-- End Google Tag Manager -->
<!-- Facebook Pixel -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '197227914338060');
  fbq('track', 'BotStart');
</script>
<noscript><img height="1" width="1" style="display:none"
  src="https://www.facebook.com/tr?id=197227914338060&ev=PageView&noscript=1"
/></noscript>
`);

Inject.rawBody('bodyGA', `
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-P7LXZX"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
`);
