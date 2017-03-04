Template.ExpandingSubsection.onCreated(function() {
  this.isExpanded = new ReactiveVar(false);
});


Template.ExpandingSubsection.helpers({
  isExpanded: function() {
    return Template.instance().isExpanded.get()
  }
});


Template.ExpandingSubsection.events({

  'click .ah-expanding-subsection-button': function(event, template) {
    template.isExpanded.set(!template.isExpanded.get());

    if (template.isExpanded.get()) {
      analytics.track('Key Benefit Details Expanded', {
        title: this.title,
        trackingId: this.trackingId
      });
    } else {
      analytics.track('Key Benefit Details Collapsed', {
        title: this.title,
        trackingId: this.trackingId
      });
    }
  }
});
