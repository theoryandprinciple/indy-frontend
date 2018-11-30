'use strict';

const Inert = require('inert');
const Url = require('url');
const Path = require('path');
const Package = require('./package.json');

const internals = {};

module.exports = {
    name: Package.name,
    register: async (server, options) => {
        await server.register(Inert);

        server.route({
            method: 'GET',
            path: '/{path*}',
            config: {
                id: 'catchall',
                handler: {
                    directory: {
                        path: Path.join(__dirname, 'build'),
                        listing: false,
                        index: true
                    }
                }
            }
        });

        //fiddle with requests to make this work as a hapi plugin with
        //the React History API
        server.ext({
            type: 'onRequest',
            method: (request, h) => {
                const route = request.server.match(request.method, request.path);
                const noOtherRoute = !route || route.settings.id === 'catchall';
                const isGet = request.method === 'get';
                const takesHtml = internals.takesHtml(request.headers.accept);
                const looksLikeFile = request.path.indexOf('.') !== -1;

                if (noOtherRoute && !looksLikeFile && isGet && takesHtml) {
                    request.setUrl('/');
                    request.raw.req.url = Url.format(request.url);
                }

                return h.continue;
            }
        });
    }
};

internals.takesHtml = accept => {
    if (!accept) {
        return false;
    }

    return accept.indexOf('text/html') !== -1 || accept.indexOf('*/*') !== -1;
};
