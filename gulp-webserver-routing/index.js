"use strict";
var url = require('url');
var Response = require('./response.js');
var Router = (function () {
    function Router() {
    }
    Router.CreateResponse = function () {
        var r = new Response();
        return r;
    };
    /**
     Middleware, use it as gulp-webserver middleware
     */
    Router.getRoute = function (req, res, next) {
        var parsedUrl = url.parse(req.url);
        console.log(parsedUrl);
        try {
            var route = Router.matchRoute(parsedUrl.pathname, req.method);
            // if no route available, go next middleware
            if (!route) {
                next();
                return;
            }
            // Get all the path parameters
            var params = Router.getParameterValues(route, parsedUrl.pathname);
            // Add req as the last parameter of the function
            req.params = params;
            // Call the action
            console.log('req available');
            console.log(req);
            route.action(req, res, next);
        }
        catch (e) {
            next();
        }
    };
    Router.getParameterValues = function (route, path) {
        var routeParts = route.name.split('/');
        var pathParts = path.split('/');
        var paramIdentifiers = [];
        var values = {};
        routeParts.forEach(function (part, index) {
            if (part.charAt(0) === ':') {
                var parameterName = part.match(/([a-zA-Z0-9]+)/);
                var identifier = {
                    name: parameterName[1],
                    index: index
                };
                paramIdentifiers.push(identifier);
            }
        });
        paramIdentifiers.forEach(function (identifier) {
            values[identifier.name] = pathParts[identifier.index];
        });
        return values;
    };
    Router.matchRoute = function (path, method) {
        var foundRoute;
        Router.routes.forEach(function (r) {
            var matches = r.matcher.exec(path);
            if (matches && matches[0] === path && r.method === method) {
                foundRoute = r;
            }
        });
        return foundRoute;
    };
    Router.addRoute = function (method, route, action) {
        // check params
        if (typeof action === 'undefined') {
            action = route;
            route = method;
            method = 'GET';
        }
        var routeMatcher = Router.buildRouteMatcher(route);
        Router.routes.push({
            method: method.toUpperCase(),
            name: route,
            action: action,
            matcher: routeMatcher
        });
    };
    Router.buildRouteMatcher = function (route) {
        // Strip first '/' if present
        if (route.charAt(0) === '/') {
            route = route.slice(1, route.length);
        }
        var parts = route.split('/');
        var customMatcherFinder = /(?:\()(.+)(?:\))/;
        var ending = '\/?';
        var matcherParts = parts.map(function (routePart, index) {
            var beginning = index === 0 ? '\/' : '';
            if (routePart.charAt(0) === ':') {
                var customMatcher = routePart.match(customMatcherFinder);
                if (customMatcher) {
                    // Custom matcher defined
                    return beginning + customMatcher[1] + ending;
                }
                else {
                    // Set default matcher for parameter
                    return beginning + '([a-zA-Z0-9]+)' + ending;
                }
            }
            else {
                return beginning + routePart + ending;
            }
        });
        return new RegExp(matcherParts.join(''));
    };
    Router.getMethods = function () {
        return [
            'get',
            'post',
            'put',
            'head',
            'delete',
            'options',
            'trace',
            'copy',
            'lock',
            'mkcol',
            'move',
            'purge',
            'propfind',
            'proppatch',
            'unlock',
            'report',
            'mkactivity',
            'checkout',
            'merge',
            'm-search',
            'notify',
            'subscribe',
            'unsubscribe',
            'patch',
            'search',
            'connect'
        ];
    };
    Router.routes = [];
    /**
     Adding all http methods
     */
    Router._constructor = (function () {
        Router.getMethods().forEach(function (method) {
            Router[method] = function () {
                var params = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    params[_i - 0] = arguments[_i];
                }
                var methodAlias = method;
                var route = params.length < 2 ? "/" : params[0];
                var fn = params.length < 2 ? params[0] : params[1];
                Router.addRoute(methodAlias, route, fn);
            };
        });
    })();
    return Router;
}());
module.exports = Router;
//# sourceMappingURL=index.js.map