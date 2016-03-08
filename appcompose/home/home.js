(function () {
    'use strict';

    var item;
    var query;
    var $searchInput;
    var $listResults;

    // The Office initialize function must be run each time a new page is loaded
    Office.initialize = function (reason) {
        console.log("reason : " + reason);
        item = Office.context.mailbox.item;

        $(document).ready(function () {
        
            // enable searchbox
            $('#query-SearchBox').SearchBox();

            $listResults = $('#list-results');

         
            // get the input box
            $searchInput = $('#query-SearchBox').find('.ms-SearchBox-field');

            $('#query-form').submit(searchForGifs);
            $('#loading-message').hide();

        });

    };


    /**
     * @name searchForGifs
     * @desc Gets the query from the form, searches for GIFs using the Giphy API,
     *       and updates the UI with the results.
     */
    function searchForGifs(event) {
        event.preventDefault();
    
        // Get search box and the query value.
        query = $searchInput.val();
    
        // Block empty queries.
        if (query.trim() === '') {
            return;
        }
    
        // Get results list and clear it.
        $listResults.empty();
            
    
        // Show loading message so user knows something is happening.
        $('#loading-message').show();
    
        // Make a request to Giphy API with query.
        // https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit=10&q=
        $.get('../../api/videos/' + encodeURIComponent(query), function (response) {
            // Handle case where query returns nothing.
            if (response === undefined || response === null || response === "") {
                // Hide loading message if there are no results.
                $('#loading-message').hide();

                $listResults.append('<p class="ms-font-l">No results for "' + query + '".</p>');
                return;
            }

            var jsonResponse = JSON.parse(response);

            if (jsonResponse.length === 0) {
                // Hide loading message if there are no results.
                $('#loading-message').hide();

                $listResults.append('<p class="ms-font-l">No results for "' + query + '".</p>');
                return;
            }
    
            // Build out the results list.
            for (var i = 0; i < jsonResponse.length; i++) {
                var video = jsonResponse[i];
                var resultHtml = "";

                var authorsName = "";
                if (video.speakers && video.speakers.length > 0) {
                    video.speakers.forEach(function (speaker) {
                        authorsName += speaker.firstname + " " + speaker.lastname + ", ";
                    }, this);
                    authorsName = authorsName.substr(0, authorsName.length - 3);
                }


                resultHtml += "<li class='ms-ListItem is-selectable' id='" + video.id + "'>";
                resultHtml += " <span class='ms-ListItem-primaryText'>" + video.title + "</span>";
                if (authorsName !== "") {
                    resultHtml += " <span class='ms-ListItem-secondaryText'>" + authorsName + "</span>";
                }
                resultHtml += " <span class='ms-ListItem-tertiaryText'>Today we discussed the importance of a, b, and c in regards to d.</span>";
                resultHtml += " <span class='ms-ListItem-metaText'>2:42p</span>";
                resultHtml += "<img class='ms-ListItem-image' src='" + video.image + "' />";
                resultHtml += "</li>";
    
    
                // Add results to containing div.
                $listResults.append(resultHtml);

                if ($.fn.ListItem) {
                    var $listItem = $('#' + video.id);

                    $listItem.on('click', video, function (event) {

                        setItemBody(event.data);
                    });
                }

            }

        });
    
        // // Clear the input and remove focus from search box.
        // $queryInput.val('');
        // $queryInput.blur();
    };

    function setItemBody(video) {

        console.log(event.data);

        item.body.getTypeAsync(function (result) {
            if (result.status === Office.AsyncResultStatus.Failed) {
                console.error(result.error.message);
                return;
            }

            if (result.value === Office.MailboxEnums.BodyType.Html) {

                var authorsName = "";
                if (video.speakers && video.speakers.length > 0) {
                    video.speakers.forEach(function (speaker) {
                        authorsName += speaker.firstname + " " + speaker.lastname + ", ";
                    }, this);
                    authorsName = authorsName.substr(0, authorsName.length - 3);
                }

                var resultHtml = "<div class='ms-ListItem is-selectable' id='" + video.id + "'>";
                resultHtml += " <h1>" + video.title + "</h1>";
                if (authorsName !== "") {
                    resultHtml += " <h2'>" + authorsName + "</h2>";
                }
                resultHtml += " <div>" + video.description + "</div>";
                resultHtml += "<img  src='" + video.image + "' />";
                resultHtml += "</div>";

                var options = {
                    coercionType: Office.CoercionType.Html,
                    asyncContext: null
                };

                item.setSelectedDataAsync(resultHtml, options, function (asyncResult) {
                    if (asyncResult.status === Office.AsyncResultStatus.Failed) {
                        console.error(asyncResult.error.message);
                    }
                });
            }

        });
    };



})();
