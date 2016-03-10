(function() {
    'use strict';

    var item;
    var $query;
    var $searchInput;
    var $listResults;
    var apis = new tdapis();



    $(document).ready(function() {

        // enable searchbox
        $('#query-SearchBox').SearchBox();

        $listResults = $('#list-results');

        $searchInput = $('#query-SearchBox').find('.ms-SearchBox-field');

        $('#query-form').submit(function(event) {
            event.preventDefault();

            // Get search box and the query value.
            $query = $searchInput.val();

            // Block empty queries.
            if ($query.trim() === '') {
                return;
            }

            searchForVideos($query);

        });
        $('#loading-message').hide();
        $('#no-video-message').hide();




    });


    // The Office initialize function must be run each time a new page is loaded
    Office.initialize = function(reason) {

        $(document).ready(function() {

            var videos = Office.context.mailbox.item.getRegExMatches().addressMatches;

            if (videos !== undefined && videos.length > 0) {
                $('#div-SearchBox').hide();

                var searchWord = videos[0].substr(1, videos[0].length - 1);
                searchForVideos(searchWord);
            }
        });
    };


    function searchForVideos(keyword) {

        console.log('Seaching for ' + keyword);
        // Get results list and clear it.
        $listResults.empty();

        // Show loading message so user knows something is happening.
        $('#loading-message').show();
        $('#no-video-message').hide();

        apis.getvideos(keyword).done(function(data) {
            $('#loading-message').hide();

            if (data === undefined || data.length < 1) {
                $('#no-video-message').show();
                return;
            }

            // Build out the results list.
            for (var i = 0; i < data.length; i++) {
                var video = data[i];

                var resultHtml = apis.formatVideo(video);

                // Add results to containing div.
                $listResults.append(resultHtml);

                var $listItem = $('#' + video.id);

                $listItem.on('click', video, function(event) {
                    window.open(event.data.url);

                });

            }
        });

    }

})();
