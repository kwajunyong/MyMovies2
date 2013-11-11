MyMovie.Views.MovieList = Yii.View.extend({
	template : JST['movies/movie_list'],

	id : 'movies',

	initialize : function() {
		var that = this;

		this.model = {
			movies : [],
			page : 1,
			next : true
		};

		this.subscribe('movies', function(movies, page) {
			if (movies.length < 1) {
				Yii.navigator.navigate('#', {
					trigger : true
				});
			}

			that.model.movies = movies;
			that.model.page = page;
			that.render();
		});

		this.subscribe('nextMovies', function(next) {
			that.model.next = next;
			that.render();
		});
	}
});
