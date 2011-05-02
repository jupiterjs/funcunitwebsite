jQuery.Controller.extend('Feed',
/* @Static */
{
},
/* @Prototype */
{
	date_template: '{day}, {date} {month} {year}',
	days : ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
	months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
	linkify : function(text){
		var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
		return text.replace(exp,"<a href='$1'>$1</a>");
	},
	formatDate : function(date_string){
		var date = new Date(date_string);
		return $.String.sub(this.date_template, {
			day: this.days[date.getDay()],
			date: date.getDate(),
			month: this.months[date.getMonth()],
			year: date.getFullYear()
		});
	}
});


Feed.extend('TwitterFeed',
/* @Static */
{
},
/* @Prototype */
{
	template: "<li><p>{tweet}</p><div class='date'>{date}</div></li>",
	init : function(){
		var twitterUrl = 'http://twitter.com/status/user_timeline/funcunit.json?count=30';
		$.ajax({
			url: twitterUrl,
			dataType: 'jsonp',
			success: this.callback('insertTwitterFeed')
		});
	},
	insertTwitterFeed : function(data){
		var tweets = [];
		for(var i = 0, ii = data.length; i < ii; i++){ //Filter out direct replies
			var tweet = data[i];
			if(tweet.text.charAt(0) != '@' && tweets.length < 6){
				var formattedDate = this.formatDate(tweet.created_at);
				tweets.push($.String.sub(this.template, {tweet: this.linkify(tweet.text), date: formattedDate}));
			}
		}
		this.element.html('<ul>' + tweets.join('') + '</ul>');
	},
	linkify : function(text){
		var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
		return text.replace(exp,"<a href='$1'>$1</a>");
	}
});




$('#twitter-feed').twitter_feed();