window.MyMovie = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var movieRouter = new MyMovie.Routers.MovieRouter();
	Yii.navigator.start();
  }
};

$(document).ready(function(){
  MyMovie.initialize();
});