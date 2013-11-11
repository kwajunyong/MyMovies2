MyMovie.Views.AddMovie = Yii.View.extend({
	template : JST['movies/add_movie'],

	id : 'movies',

	events : {
		"click #add-add" : "addMovie",
		"click #add-cancel" : "cancelMovie"
	},

	addMovie : function() {
		var movies = new MyMovie.Models.Movies();

		movies.save({
			form : '#add-movie-form',

			attributes : {
				access_token : access_token
			},

			success : function() {
				Yii.navigator.navigate('#', true, false);
			},

			error : function() {
				alert('Unable to add movie');
			}
		});

		return false;
	},

	cancelMovie : function() {
		Yii.navigator.navigate('#', true, false);
		
		return false;
	}
});
