MyMovie.Models.Review = Yii.Model.extend({
	setURL : function(movie_id, review_id) {
		this.url = 'http://cs3213.herokuapp.com/movies/' + movie_id + '/reviews/' + review_id + '.json';
	}
}); 