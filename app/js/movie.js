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

                var template = '<li class="row panel panel-default panel-body"> \
                    <div class="panel-body"> \
                        <div class="col-md-3"> \
                            <img class="img-responsive" src="' + movie.Poster + '"> \
                        </div> \
                        <div class="col-md-9"> \
                            <div class="row bg-primary"> \
                                <div class="col-md-9">' + movie.Title + ' (' + movie.Year + ')</div> \
                                <div class="col-md-3"><span class="glyphicon glyphicon-star"></span>' + movie.imdbRating + '</div> \
                            </div> \
                            <div class="row panel-body"> \
                                <div class="col-md-9">' + 'Director: ' + movie.Director.join(', ') + '</div> \
                                <div class="col-md-3">' + movie.Genre.join(', ') + '</div> \
                            </div> \
                            <div class="row panel-body"> \
                                <div class="col-md-12">' + 'Actors: ' + movie.Actors.join(', ') + '</div> \
                            </div> \
                            <div class="row panel-body"> \
                                <div class="col-md-9 text-primary">' + movie.Plot + '</div> \
                                <div class="col-md-3"> \
                                    <iframe width="100%" src="https://www.youtube.com/embed/' + movie.Trailer + '" frameborder="0" allowfullscreen></iframe> \
                                </div> \
                            </div> \
                        </div> \
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