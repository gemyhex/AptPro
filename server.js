var StaticServer = require('static-server'),
    server = new StaticServer({
        rootPath: './dist/',
        port: 8000
    });

    server.start(function(){
        console.log("Server Started at Port ", server.port);
    });