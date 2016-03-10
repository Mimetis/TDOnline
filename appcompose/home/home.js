(function() {
    'use strict';

    var $query;
    var $searchInput;
    var $listResults;
    var apis = new tdapis();
    var isInitialize = false;

    $(document).ready(function() {

        // enable searchbox
        $('#query-SearchBox').SearchBox();

        $listResults = $('#list-results');

        $searchInput = $('#query-SearchBox').find('.ms-SearchBox-field');

        $('#query-form').submit(searchForVideos);
        $('#loading-message').hide();
        $('#no-video-message').hide();

    });
    // The Office initialize function must be run each time a new page is loaded
    Office.initialize = function(reason) {
        isInitialize = true;
    };


    function searchForVideos(event) {
        event.preventDefault();

        // Get search box and the query value.
        $query = $searchInput.val();

        // Block empty queries.
        if ($query.trim() === '') {
            return;
        }

        // Get results list and clear it.
        $listResults.empty();

        // Show loading message so user knows something is happening.
        $('#loading-message').show();
        $('#no-video-message').hide();

        apis.getvideos($query).done(function(data) {
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
                    setItemBody(event.data);
                });

            }
        });

    }

    function setItemBody(video) {
        if (!isInitialize)
            return;

        var item = Office.context.mailbox.item;

        item.body.getTypeAsync(function(result) {
            if (result.status === Office.AsyncResultStatus.Failed) {
                console.error(result.error.message);
                return;
            }

            if (result.value === Office.MailboxEnums.BodyType.Html) {

                var resultHtml = apis.formatBodyMail(video);

                var options = {
                    coercionType: Office.CoercionType.Html,
                    asyncContext: null
                };

                item.body.setAsync(resultHtml, options, function(asyncResult) {
                    if (asyncResult.status === Office.AsyncResultStatus.Failed) {
                        console.error(asyncResult.error.message);
                    }
                });
            }

        });
    };



})();
