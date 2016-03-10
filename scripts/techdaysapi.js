
var tdapis = (function() {

    var apiUrl = "https://techdaysstream.azurewebsites.net/api/videos/";

    function tdapis() {

    }
    tdapis.prototype.getvideos = function(search) {

        var deferred = $.Deferred();
        var url = apiUrl + search;

        var jqxhr = $.ajax({
            type: 'GET',
            url: url
        }).done(function(data) {
            deferred.resolve(data.data);
        }).fail(function(error) {
            deferred.reject("getvideos api failed with error : " + error);
        });

        return deferred.promise();
    }
    tdapis.prototype.formatVideo = function(video) {
        var resultHtml = "";
        var authorsName = "";
        if (video.speakers && video.speakers.length > 0) {
            video.speakers.forEach(function(speaker) {
                authorsName += speaker.firstname + " " + speaker.lastname + ", ";
            }, this);
            authorsName = authorsName.substr(0, authorsName.length - 2);
        }

        resultHtml += "<li class='ms-ListItem is-selectable' id='" + video.id + "'>";
        resultHtml += " <span class='ms-ListItem-primaryText'>" + video.title + "</span>";
        if (authorsName !== "") {
            resultHtml += " <span class='ms-ListItem-secondaryText'>" + authorsName + "</span>";
        }
        resultHtml += " <span class='ms-ListItem-tertiaryText'>" + video.description + "</span>";
        resultHtml += "<img class='ms-ListItem-image' src='" + video.image + "' />";
        resultHtml += "</li>";

        return resultHtml;

    }
    tdapis.prototype.formatBodyMail = function(video) {

        var authorsName = "";
        if (video.speakers && video.speakers.length > 0) {
            video.speakers.forEach(function(speaker) {
                authorsName += speaker.firstname + " " + speaker.lastname + ", ";
            }, this);
            authorsName = authorsName.substr(0, authorsName.length - 2);
        }

        var resultHtml = "<div id='" + video.id + "'>";
        resultHtml += " <h1>" + video.title + "</h1>";
        if (authorsName !== "") {
            resultHtml += " <h2>" + authorsName + "</h2>";
        }
        resultHtml += " <p>" + video.description + "</p>";
        resultHtml += "<p><img style='width:auto;height:200px' src='" + video.image + "' /></p>";
        resultHtml += "</div>";

        return resultHtml;
    }




    return tdapis;
} ());
