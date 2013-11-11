MyMovie.Views.MovieReviews = Yii.View.extend({

	template : JST['movies/movie_reviews'],

	id : 'reviews',

	events : {
		'click #review-delete' : 'removeReview',
		'click #review-add' : 'addReview'
	},

	initialize : function() {
		var that = this;

		this.subscribe('reviews', function(attributes, id) {
			that.model = attributes;
			that.id = id;

			that.render();
		});
	},

	removeReview : function(event) {
		if (confirm('Are you sure?')) {
			var that = this;

			var review = new MyMovie.Models.Review();

			review.setURL(that.id, event.currentTarget.getAttributeNode('value').value);

			review.destroy({
				form : '#delete-review-form',

				attributes : {
					access_token : access_token
				},

				success : function() {
					Yii.navigator.navigate('#movie/' + that.id, true, true);
				},

				error : function() {
					alert('Review cannot be deleted');
				}
			});
		}

		return false;
	},
	
	addReview : function() {
		var that = this;

		var reviews = new MyMovie.Models.Reviews();

		reviews.setURL(that.id);

		reviews.save({
			form : '#add-review-form',

			attributes : {
				access_token : access_token
			},

			success : function() {
				Yii.navigator.navigate('#movie/' + that.id, true, true);
			},

			error : function() {
				alert('Unable to add review');
			}
		});

		return false;
	}
});

