MyMovie.Models.User = Yii.Model.extend({
	url : 'http://cs3213.herokuapp.com/users/current.json',

	setURL : function(access_token) {
		this.url = 'http://cs3213.herokuapp.com/users/current.json?access_token=' + access_token;
	}
});
