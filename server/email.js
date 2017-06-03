import { Email } from 'meteor/email';

Meteor.methods({
  sendEmail(to, from, bcc, subject, text) {
    // Make sure that all arguments are strings.
    check([to, from, bcc, subject, text], [String]);
    // Let other method calls from the same client start running, without
    // waiting for the email sending to complete.
    this.unblock();
    Email.send({ to, from, bcc, subject, text });
  }
});
