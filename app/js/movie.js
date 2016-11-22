$(function() {

    var DOM = {
        $movieList: $('#movie-list'),
        //$loader: $('#loader')
    };

    var Storage = {
        movies: []
    };

    var View = {
        render: function() {
            _(Storage.movies).each(function(movie) {

                var template = '<li class="row panel panel-default"> \
                    <div class="panel-body bg-primary"> \
                        <div class="col-md-3"> \
                            <img class="img-responsive thumbnail" src="' + movie.Poster + '"> \
                        </div> \
                        <div class="col-md-7"> \
                            <div class="row panel-body"> \
                                <div class="col-md-12"><h2>' + movie.Title + '</h2>' + ' (' + movie.Year + ')</div> \
                                <div class="col-md-12">' + 'Director: ' + movie.Director.join(', ') + '</div> \
                            </div> \
                            <div class="row panel-body"> \
                                <div class="col-md-12">' + movie.Plot + '</div> \
                            </div> \
                        </div> \
                        <div class="col-md-2"> \
                            <div class="row panel-body rate"> \
                                <div class="col-md-12 panel-body"><span class="glyphicon glyphicon-star"></span>' + movie.imdbRating + '</div> \
                                <div class="col-md-12 panel-body">' + 'Votes: ' + movie.imdbVotes + '</div> \
                            </div> \
                        </div>\
                    </div> \
                </li>';

                var $li = $(template);

                DOM.$movieList.append($li);
            });
        }
    };

    var API = {
        getMovies: function() {
            $.ajax({
                url: '/app/js/movies.json',
                method: 'GET',
                dataType: 'json',
            }).done(function(data) {
                _(data).each(function(movie) {
                    Storage.movies.push(movie);
                });

                View.render();

            }).fail(function(error) {
                console.log('error');

            }).always(function() {
                console.log('completed');

            });
        }
    };

    var App = {
        init: function() {
            API.getMovies();
        }
    };

    App.init();

    $('#myTabs a').click(function(e) {
        e.preventDefault()
        $(this).tab('show')
    })
});