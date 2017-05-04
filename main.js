$(document).ready(function () {
    console.log("ready!");

    // Hakunappuloiden toiminnot
    $('#searchbutton').click(function () {
        console.log('artistilista');
        getID();
    });

    $('#seek').click(function () {
        console.log('artistilista');
        findArtists();
    });

    // Haetaan artistin ID
    function getID() {
        artistID = $('#artistMenu').find(":selected").val();
        getArtists(artistID);
    }

    // Haetaan samankaltaiset artistit
    function getArtists(id) {
        console.log(id);
        url = 'https://api.spotify.com/v1/artists/' + id + '/related-artists';
        console.log(url);

        $.ajax({
            'url': url,
            'dataType': 'json',
            'success': printRelatedArtists
        });

        $('#artistContainer').empty();
    }

    // Käydään läpi samankaltaiset artistit ja tulostetaan näytölle
    function printRelatedArtists(data) {
        $.each(data.artists, function (key, value) {
            var p = $('<p />').val(value.id).text(value.name);
            $('#artistContainer').append(p);
        });
    }

    // Etsitään artisteja syötteen perusteella
    function findArtists() {
        input = $('#userinput').val();
        searchUrl = "https://api.spotify.com/v1/search?q=" + input + "&type=artist";

        $.ajax({
            'url': searchUrl,
            'dataType': 'json',
            'success': getSearchID
        });
    }

    // Etsitään syötteen perusteella haetun artistin ID
    function getSearchID(data) {
        getArtists(data.artists.items[0].id);
        console.log(data);
    }
});