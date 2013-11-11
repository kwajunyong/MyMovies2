MyMovie.Models.Reviews = Yii.Model.extend({
	setURL : function(movie_id) {
		this.url = 'http://cs3213.herokuapp.com/movies/' + movie_id + '/reviews.json';
	}
}); 