(function() {
    'use strict';

    var item;
    var query;
    var $searchInput;
    var $listResults;

    // The Office initialize function must be run each time a new page is loaded
    Office.initialize = function(reason) {

        $(document).ready(function() {

            // enable searchbox
            $('#query-SearchBox').SearchBox();


            $listResults = $('#list-results');
            // 
            //             $listResults.on('click', function (event) {
            //                 console.log(event);
            //                 console.log(event.currentTarget);
            //             });

            // get the input box
            $searchInput = $('#query-SearchBox').find('.ms-SearchBox-field');

            $('#query-form').submit(searchForGifs);
            $('#loading-message').hide();

            // Attach handlers to insert buttons.
            // $('#results').on('click', '#insert-gif', insertGif);
            // $('#results').on('click', '#insert-link', insertLink);

            // Hover styling on results list.
            $('#results').on('mouseenter', '#result', function(event) {
                $(event.currentTarget).addClass('hovering');
            });

            $('#results').on('mouseleave', '#result', function(event) {
                $(event.currentTarget).removeClass('hovering');
            });
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
        $.get('https://techdaysstream.azurewebsites.net/api/videos/' + encodeURIComponent(query), function(response) {
            // Handle case where query returns nothing.
            if (response === undefined || response === null || response === "") {
                // Hide loading message if there are no results.
                $('#loading-message').hide();

                $listResults.append('<p class="ms-font-l">No results for "' + query + '".</p>');
                return;
            }

            var jsonResponse = response;

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
                    video.speakers.forEach(function(speaker) {
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

                    $listItem.on('click', video, function(event) {
                        console.log(event.data);
                    });
                }

            }

        });

        // // Clear the input and remove focus from search box.
        // $queryInput.val('');
        // $queryInput.blur();
    }

    /**
     * @name insertGif
     * @desc Inserts the GIF (in image format) into the body of the email being
     *       composed.
     */
    function insertGif(event) {
        event.preventDefault();
        var src = event.currentTarget.parentElement.parentElement.children[0].src;
        setItemBody(src, 'gif');
    }

    /**
     * @name isnertLink
     * @desc Inserts the GIf (in hyperlink format) into the body of the email being
     *       composed.
     */
    function insertLink(event) {
        event.preventDefault();

        setItemBody(event.currentTarget.parentElement.parentElement.children[0].src, 'link');
    }

    /**
     * @name setItemBody
     * @desc Inserts a GIF into the body of the email being composed.
     * @param url The URL of the GIF.
     * @param type The type of insertion. Can be either 'gif' or 'link'.
     *
     * This function is mostly copied from "Insert data in the body when composing
     * an appointment or message in Outlook" (https://msdn.microsoft.com/library/office/dn574748.aspx).
     */


})();
