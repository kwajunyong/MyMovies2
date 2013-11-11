MyMovie.Routers.MovieRouter = Yii.Router.extend({
	initialize : function() {
		this.models = {
			movies : new MyMovie.Models.Movies(),
			nextMovies : new MyMovie.Models.Movies(),
			movie : new MyMovie.Models.Movie(),
			user : new MyMovie.Models.User(),
			reviews : new MyMovie.Models.Reviews()
		};

		this.views = {
			movieList : new MyMovie.Views.MovieList(),
			userInfo : new MyMovie.Views.UserInfo(),
			movieDetails : new MyMovie.Views.MovieDetails(),
			reviewList : new MyMovie.Views.MovieReviews(),
			addMovie : new MyMovie.Views.AddMovie(),
			editMovie : new MyMovie.Views.EditMovie()
		};
	},

	routes : {
		"" : "movies",
		"movies" : "movies",
		"movies/:page" : "movies",
		"movie/:id" : "movie",
		"movie/:id/edit" : "editMovie",
		"new" : "newMovie"
	},

	movies : function(page) {
		var that = this;

		this.getUserInfo();

		this.views.reviewList.remove();

		page = (page) ? Number(page) : 1;

		this.models.movies.setURL(page);
		this.models.movies.fetch({
			success : function() {
				that.publish('movies', that.models.movies.attributes.collection, page);
			}
		});

		this.models.nextMovies.setURL(page + 1);
		this.models.nextMovies.fetch({
			success : function() {
				that.publish('nextMovies', that.models.nextMovies.attributes.collection.length != 0);
			}
		});
	},

	movie : function(id) {
		var that = this;

		this.getUserInfo();

		this.models.movie.setURL(id);
		this.models.movie.fetch({
			success : function() {
				that.publish('movie', that.models.movie.attributes);
			},

			error : function() {
				Yii.navigator.navigate('#', {
					trigger : true
				});
			}
		});

		this.models.reviews.setURL(id);
		this.models.reviews.fetch({
			success : function() {
				that.publish('reviews', that.models.reviews.attributes, id);
			},

			error : function() {
				Yii.navigator.navigate('#', {
					trigger : true
				});
			}
		});
	},

	newMovie : function() {
		this.checkUser();
		this.getUserInfo();

		this.views.reviewList.remove();

		this.views.addMovie.render();
	},

	editMovie : function(id) {
		var that = this;

		this.checkUser();
		this.getUserInfo();

		this.views.reviewList.remove();

		this.models.movie.setURL(id);
		this.models.movie.fetch({
			success : function() {
				that.publish('editMovie', that.models.movie.attributes);
			},

			error : function() {
				Yii.navigator.navigate('#', {
					trigger : true
				});
			}
		});
	},

	getUserInfo : function() {
		if (access_token) {
			var that = this;

			this.models.user.setURL(access_token);
			this.models.user.fetch({
				success : function() {
					that.publish('user', that.models.user.attributes);
				}
			});
		}
	},

	checkUser : function() {
		if (!access_token) {
			this.navigate('#', {
				trigger : true
			});
		}
	}
});
