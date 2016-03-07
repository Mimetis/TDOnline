var router = require('../gulp-webserver-routing');


var videos = [
    {
        id: "F39AC1D9-38D7-4F1A-B644-AA686C30CCF2",
        eventId: "42085cb2-38a1-4e79-9530-d9f63679c802",
        title: "Cordova et Office : Une combo gagnante pour créer une application hybride d'entreprise",
        description: "This week on Channel 9, Mark and Seth discuss the week's top developer news, including;[00:43] After 25 years...",
        spotLight: 5,
        score: 5, isAvailable: true,
        callToActions: [{
            id: "84d669a5-1cf2-4092-963e-754a78947803",
            eventId: "42085cb2-38a1-4e79-9530-d9f63679c802",
            title: "my cta",
            url: "htp://www.bing.com",
            callToActionTypeId: "5542adcc-bf2d-447c-b5ca-cf69bb5a1c55",
            callToActionType: null,
            channels: [],
            videos: [],
            tags: [],
            speakers: []
        }],
        tags: [{
            id: "bd1d3c03-871b-412d-912c-f16e891d666d",
            eventId: "42085cb2-38a1-4e79-9530-d9f63679c802",
            title: "Azure",
            description: "azure",
            image: null,
            isSerie: false,
            weight: 5,
            callToActions: [],
            twitterTags: [],
            videos: [],
            speakers: []
        }],
        speakers: [{
            id: "fd7c8801-9d39-4c08-8f22-21bc7606ae58",
            eventId: "42085cb2-38a1-4e79-9530-d9f63679c802",
            firstname: "Thibaut",
            lastname: "Ranise",
            mail: "tranise@mail.com",
            company: null,
            description: null,
            isTopSpeaker: false,
            modificationDate: "2016-02-17T13:43:02.6149849+00:00",
            creationDate: "2016-02-17T08:55:49.1458616+00:00",
            callToActions: [],
            tags: [],
            videos: [],
            photo: "97c132a9-ec45-45f0-9592-5c8f5a94992d.png"
        }],
        channelId: "df971bfa-5f92-4e1a-90bf-fabe7506a0e9",
        channel: null,
        image: "https://highway.blob.core.windows.net:443/share/cordova.office.png"


    },
    {
        id: "97a6dbdd-fe77-4f74-a61b-4b4841e09145",
        eventId: "42085cb2-38a1-4e79-9530-d9f63679c802",
        title: "Les nouveautées de IIS",
        description: "This week on Channel 9, Mark and Seth discuss the week's top developer news, including;[00:43] After 25 years...",
        spotLight: 5,
        score: 5,
        isAvailable: true,
        callToActions: [],
        tags: [],
        speakers: [{
            id: "fd7c8801-9d39-4c08-8f22-21bc7606ae58",
            eventId: "42085cb2-38a1-4e79-9530-d9f63679c802",
            firstname: "Thibaut",
            lastname: "Ranise",
            mail: "tranise@mail.com",
            company: null,
            description: null,
            isTopSpeaker: false,
            modificationDate: "2016-02-17T13:43:02.6149849+00:00",
            creationDate: "2016-02-17T08:55:49.1458616+00:00",
            callToActions: [],
            tags: [],
            videos: [],
            photo: "97c132a9-ec45-45f0-9592-5c8f5a94992d.png"
        }],
        channelId: "df971bfa-5f92-4e1a-90bf-fabe7506a0e9",
        channel: null,
        image: "https://highway.blob.core.windows.net:443/share/iis10.png"

    },
    {
        id: "AF893347-DCCE-42F1-B71F-CA3DFF4D391F",
        eventId: "42085cb2-38a1-4e79-9530-d9f63679c802",
        title: "Microsoft Graph : Comment tirer parti de toutes les informations de votre entreprise",
        description: "This week on Channel 9, Mark and Seth discuss the week's top developer news, including;[00:43] After 25 years...",
        speakers: [{
            id: "fd7c8801-9d39-4c08-8f22-21bc7606ae58",
            eventId: "42085cb2-38a1-4e79-9530-d9f63679c802",
            firstname: "Thibaut",
            lastname: "Ranise",
            mail: "tranise@mail.com",
            photo: "97c132a9-ec45-45f0-9592-5c8f5a94992d.png"
        }],
        channelId: "df971bfa-5f92-4e1a-90bf-fabe7506a0e9",
        channel: null,
        image: "https://highway.blob.core.windows.net:443/share/microsoft.graph.png"

    },
    {
        id: "8838B942-700F-4A18-9239-93D4C3756655",
        eventId: "42085cb2-38a1-4e79-9530-d9f63679c802",
        title: "Le web contre attaque : Une vision sur l évolution du web chez Microsoft",
        description: "This week on Channel 9, Mark and Seth discuss the week's top developer news, including;[00:43] After 25 years...",
        speakers: [{
            id: "fd7c8801-9d39-4c08-8f22-21bc7606ae58",
            eventId: "42085cb2-38a1-4e79-9530-d9f63679c802",
            firstname: "Thibaut",
            lastname: "Ranise",
            mail: "tranise@mail.com",
            photo: "97c132a9-ec45-45f0-9592-5c8f5a94992d.png"
        }],
        channelId: "df971bfa-5f92-4e1a-90bf-fabe7506a0e9",
        channel: null,
        image: "https://highway.blob.core.windows.net:443/share/microsoft.graph.png"

    },
    {
        id: "9618D1B5-3E40-404B-A024-4A87889C7E05",
        eventId: "42085cb2-38a1-4e79-9530-d9f63679c802",
        title: "Le web contre attaque : Une vision sur l'évolution du web chez Microsoft",
        description: "This week on Channel 9, Mark and Seth discuss the week's top developer news, including;[00:43] After 25 years...",
        speakers: [{
            id: "fd7c8801-9d39-4c08-8f22-21bc7606ae58",
            eventId: "42085cb2-38a1-4e79-9530-d9f63679c802",
            firstname: "Thibaut",
            lastname: "Ranise",
            mail: "tranise@mail.com",
            photo: "97c132a9-ec45-45f0-9592-5c8f5a94992d.png"
        }],
        channelId: "df971bfa-5f92-4e1a-90bf-fabe7506a0e9",
        channel: null,
        image: "https://highway.blob.core.windows.net:443/share/webpremium.png"

    }


];

var api = {

    searchVideos: function (req, res, next) {
        var searchName = req.params.name;
        res.end(JSON.stringify(videos));
        next();
    }
}

router.get('/api/videos/:name', api.searchVideos);


module.exports = router;