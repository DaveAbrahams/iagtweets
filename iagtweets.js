Tweet = new Meteor.Collection("tweet");

Notifications = new Meteor.Collection('notifications');


if (Meteor.isClient) {
Template.addTweet.events({
    'click #new-tweet': function (event, template) {
        var tweet = template.find('#newtweettext').value;
        if(tweet != ""){
            tweet._id = Tweet.insert({detail: tweet, dateCreated: new Date()});
            createTweetNotification(tweet); 
            template.find('#newtweettext').value = "";
        };
    }
  });

Template.listTweets.tweet = function(){
        return Tweet.find({}, {sort: { dateCreated: -1 }});        
    };

    createTweetNotification = function(tweet) { 
        Notifications.insert({
            tweetId: tweet._id,
            dateCreate: new Date(),
            read: false
        }); 
};

    Template.notifications.helpers({ 
    notifications: function() {
        return Notifications.find({read: false}); 
    },
    notificationCount: function(){
        return Notifications.find({read: false}).count();
    } 
});

    
    UI.registerHelper('formatDate', function(date) {
  return moment(date).format('DD-MM-YYYY HH:MM');
});

    
    
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
