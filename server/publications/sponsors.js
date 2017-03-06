Meteor.publish("sponsors", function() {
  return Sponsors.find({
    visible_on: "www.admithub.com"
  }, {
    fields: {
      name: 1,
      image_url: 1,
      url: 1,
      description: 1
    }
  });
});
