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
