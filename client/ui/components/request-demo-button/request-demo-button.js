Template.RequestDemoButton.helpers({
  href: function() {
    if (this.type === 'submit') {
      // Don't link to external contact form when button is used to submit a form directly
      return null;
    } else {
      return '#chatbot'
    }
  }
});

Template.RequestDemoButton.events({
  'click': function() {
    analytics.track('Request Demo Button Clicked', {
      trackingId: this.trackingId
    })
  }
});
