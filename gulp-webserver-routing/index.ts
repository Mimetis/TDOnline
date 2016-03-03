var url = require('url');
var Response = require('./response.js');



class Router {

    private static routes: any[] = [];

    /**
     Adding all http methods
     */
    private static _constructor = (() => {
        Router.getMethods().forEach(method => {
            Router[method] = (...params: any[]) => {
                var methodAlias = method;
                var route = params.length < 2 ? "/" : params[0];
                var fn = params.length < 2 ? params[0] : params[1];
                Router.addRoute(methodAlias, route, fn);
            }
        });
    })();

    
    public static CreateResponse(){
        var r = new Response();
        return r;
    }
    
    /**
     Middleware, use it as gulp-webserver middleware
     */
    public static getRoute(req, res, next) {

        var parsedUrl = url.parse(req.url);

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
            route.action(req, res, next);
        } catch (e) {
            next();
        }
    }

    private static getParameterValues(route, path) {
        var routeParts = route.name.split('/');
        var pathParts = path.split('/');
        var paramIdentifiers = [];
        var values = {};

        routeParts.forEach((part, index) => {
            if (part.charAt(0) === ':') {
                var parameterName = part.match(/([a-zA-Z0-9]+)/);

                var identifier = {
                    name: parameterName[1],
                    index: index
                };

                paramIdentifiers.push(identifier);
            }
        });

        paramIdentifiers.forEach((identifier) => {
            values[identifier.name] = pathParts[identifier.index];
        });

        return values;
    }


    private static matchRoute(path, method) {
        var foundRoute;

        Router.routes.forEach((r) => {
            var matches = r.matcher.exec(path);

            if (matches && matches[0] === path && r.method === method) {
                foundRoute = r;
            }
        });

        return foundRoute;
    }

    private static addRoute(method, route, action) {
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
    }

    private static buildRouteMatcher(route) {
        // Strip first '/' if present
        if (route.charAt(0) === '/') {
            route = route.slice(1, route.length);
        }

        var parts = route.split('/');
        var customMatcherFinder = /(?:\()(.+)(?:\))/;
        var ending = '\/?';

        var matcherParts = parts.map((routePart, index) => {
            var beginning = index === 0 ? '\/' : '';

            if (routePart.charAt(0) === ':') {
                var customMatcher = routePart.match(customMatcherFinder);

                if (customMatcher) {
                    // Custom matcher defined
                    return beginning + customMatcher[1] + ending;
                } else {
                    // Set default matcher for parameter
                    return beginning + '([a-zA-Z0-9]+)' + ending;
                }
            } else {
                return beginning + routePart + ending;
            }
        });

        return new RegExp(matcherParts.join(''));
    }

    private static getMethods(): string[] {
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
    }
}

export = Router;

