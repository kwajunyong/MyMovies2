MyMovie.Models.Movies = Yii.Model.extend({
	url : 'http://cs3213.herokuapp.com/movies.json',
	
	setURL: function(page) {
		if (page) {
			this.url = 'http://cs3213.herokuapp.com/movies.json?page=' + page;
		} else {
			this.url = 'http://cs3213.herokuapp.com/movies.json';
		}
	}
});