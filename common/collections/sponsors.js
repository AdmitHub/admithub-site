Sponsors = new Mongo.Collection("sponsors");
Sponsors.attachSchema(new SimpleSchema({
  name: {
    type: String,
    label: 'Name',
    optional: false
  },
  image_url: {
    type: String,
    label: 'Image URL',
    optional: false
  },
  url: {
    type: String,
    label: 'URL',
    optional: false
  },
  description: {
    type: String,
    label: 'Description',
    optional: true
  },
  visible_on: {
    type: [String],
    label: 'Visible on',
    autoform: {
      options: [
        {label: 'www.admithub.com', value: 'www.admithub.com'},
        {label: 'college.admithub.com', value: 'college.admithub.com'}
      ],
      allowedValues: ['www.admithub.com', 'college.admithub.com']
    }
  }
}));
