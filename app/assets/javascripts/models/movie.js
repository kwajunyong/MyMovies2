MyMovie.Models.Movie = Yii.Model.extend({	
	setURL : function(id) {
		this.url = 'http://cs3213.herokuapp.com/movies/' + id + '.json';
	}
});