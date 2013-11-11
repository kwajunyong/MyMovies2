MyMovie.Views.MovieDetails = Yii.View.extend({

	template : JST['movies/movie_details'],

	id : 'movies',

	events : {
		"click #details-edit" : "updateMovie",
		"click #details-delete" : "removeMovie",
		"click #details-back" : "backMovie"
	},

	initialize : function(attributes) {
		var that = this;

		this.subscribe('movie', function(attributes) {
			that.model = attributes;
			that.render();
		});
	},

	updateMovie : function() {
		Yii.navigator.navigate('#movie/' + this.model.id + '/edit', true, false);

		return false;
	},

	removeMovie : function() {
		if (confirm('Are you sure?')) {
			var movie = new MyMovie.Models.Movie();

			movie.setURL(this.model.id);

			movie.destroy({
				form : '#delete-movie-form',

				attributes : {
					access_token : access_token
				},

				success : function() {
					Yii.navigator.navigate('#', true, false);
				},

				error : function() {
					alert('Movie cannot be deleted');
				}
			});
		}

		return false;
	},

	backMovie : function() {
		Yii.navigator.navigate('#', true, false);

		return false;
	}
}); 