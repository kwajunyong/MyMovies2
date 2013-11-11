MyMovie.Views.UserInfo = Yii.View.extend({

	template : JST['movies/user_info'],

	id : 'user',

	initialize : function() {
		var that = this;

		this.subscribe('user', function(attributes) {
			that.model = attributes;
			that.render();
		});
	}
});
