MyMovie.Views.EditMovie = Yii.View.extend({

	template : JST['movies/edit_movie'],

	id : 'movies',

	initialize : function() {
		var that = this;

		this.subscribe('editMovie', function(attributes) {
			that.model = attributes;
			that.render();
		});
	},

	events : {
		"click #edit-edit" : "updateMovie",
		"click #edit-cancel" : "cancelMovie"
	},

	updateMovie : function() {
		var that = this;

		var movie = new MyMovie.Models.Movie();

		movie.setURL(this.model.id);

		movie.update({
			form : '#edit-movie-form',

			attributes : {
				access_token : access_token
			},

			success : function() {
				Yii.navigator.navigate('#movie/' + that.model.id, true, false);
			},

			error : function() {
				alert('Movie cannot be updated');
			}
		});

		return false;
	},

	cancelMovie : function() {
		Yii.navigator.navigate('#movie/' + this.model.id, true, false);

		return false;
	}
});
