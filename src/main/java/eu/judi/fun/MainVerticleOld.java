package eu.judi.fun;

import io.vertx.config.ConfigRetriever;
import io.vertx.config.ConfigRetrieverOptions;
import io.vertx.config.ConfigStoreOptions;
import io.vertx.core.*;
import io.vertx.core.http.HttpServer;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;
import io.vertx.ext.web.handler.*;
import io.vertx.ext.web.sstore.LocalSessionStore;
import io.vertx.ext.web.sstore.SessionStore;
import org.flywaydb.core.Flyway;
import org.flywaydb.core.api.FlywayException;

public class MainVerticleOld extends AbstractVerticle {

    final JsonObject loadedConfig= new JsonObject();

    @Override
    public void start(Promise<Void> start) {

        doConfig()
                .compose(this::storeConfig)
                .compose(this::configureRouter)
                .compose(this::startHttpServer)
                .compose(this::deployOtherVerticles)
                .setHandler(start::handle);

//        DeploymentOptions opts = new DeploymentOptions()
//                .setWorker(true)
//                .setInstances(8);
//        vertx.deployVerticle("eu.judi.fun.HelloVerticle",opts);

//        vertx.deployVerticle(new HelloVerticle());
        vertx.deployVerticle("Hello.js");
//        Handler<AsyncResult<Void>> dbMigrationResultHandler = result -> this.handleMigrationResults(start, result);
//        vertx.executeBlocking(this::doDatabaseMigration, dbMigrationResultHandler);

        //Handler<AsyncResult<Void>> dbMigrationResultHandler = result -> this.handleMigrationResults(start, result);
        //blocking code
//        vertx.executeBlocking(this::doDatabaseMigration, result ->{
//            if (result.failed()) {
//                start.fail(result.cause());
//            }
//        });
        Router router = Router.router(vertx);
        //session for the cluster
        //SessionStore store = ClusteredSessionStore.create(vertx);

        //for anyrequest it will log the request
        router.route().handler(LoggerHandler.create());
        //session on a slingle node
        SessionStore store = LocalSessionStore.create(vertx);
        router.route().handler(SessionHandler.create(store));
        router.route().handler(CSRFHandler.create("secret"));

        //CORS
        router.route().handler(CorsHandler.create("localhost"));

//        router.route().handler(ctx -> {
//            String authToken = ctx.request().getHeader("AUTH_TOKEN");
//            if (authToken != null && "testToken".contains(authToken)) {
//                ctx.next();
//            } else {
//                ctx.response().setStatusCode(401).setStatusMessage("UNAUTHORIZED").end();
//            }
//        });
        router.get("/api/v1/hello").handler(this::helloVertx);
        router.get("/api/v1/hello/:name").handler(this::helloName);
        router.route().handler(StaticHandler.create("web"));
//        router.route().handler(StaticHandler.create("web").setIndexPage("index.html"));
//        int httpPort;
//        try {
//            httpPort = Integer.parseInt(System.getProperty("http.port", "8080"));
//        } catch (NumberFormatException nfe) {
//            httpPort = 8080;
//        }

       // doConfig(start, router);

    }
    Future<Void> deployOtherVerticles(HttpServer server){
        Future<String> helloJavascript = Future.future(promise->vertx.deployVerticle("Hello.js",promise));
        Future<String> helloJavascript2 = Future.future(promise->vertx.deployVerticle("Hello.js",promise));
        return CompositeFuture.all(helloJavascript,helloJavascript2).mapEmpty();
    }

    Future<HttpServer> startHttpServer(Router router){
        JsonObject http = loadedConfig.getJsonObject("http");
        int httpPort = http.getInteger("port");
        HttpServer server = vertx.createHttpServer().requestHandler(router);

        return Future.future(promise->server.listen(httpPort,promise));
    }

    Future<Router> configureRouter(Void unused){
        Router router = Router.router(vertx);

        //for anyrequest it will log the request
        router.route().handler(LoggerHandler.create());
        //session on a slingle node
        SessionStore store = LocalSessionStore.create(vertx);
        router.route().handler(SessionHandler.create(store));
        router.route().handler(CSRFHandler.create("secret"));

        //CORS
        router.route().handler(CorsHandler.create("localhost"));


        router.get("/api/v1/hello").handler(this::helloVertx);
        router.get("/api/v1/hello/:name").handler(this::helloName);
        router.route().handler(StaticHandler.create("web"));
        return Future.succeededFuture(router);
    }

    Future<Void> storeConfig(JsonObject config) {
        loadedConfig.mergeIn(config);
        return Future.succeededFuture();
    }

    private void handleMigrationResults(Promise<Void> start, AsyncResult<Void> result) {
        if (result.failed()) {
            start.fail(result.cause());
        }
    }

    private void doDatabaseMigration(Promise<Object> promise) {
        Flyway flyway = Flyway.configure().dataSource("jdbc:postgresql://127.0.0.1:5432/todo", "postgres", "postgres").load();
        try {
            flyway.migrate();
            promise.complete();
        } catch (FlywayException flywayException) {
            promise.fail(flywayException);
        }
    }


    private Future<JsonObject> doConfig() {
        ConfigStoreOptions defaultConfig = new ConfigStoreOptions()
                .setType("file")
                .setFormat("json")
                .setConfig(new JsonObject().put("path", "config.json"));
        ConfigStoreOptions cliconfig = new ConfigStoreOptions()
                .setType("json")
                .setConfig(config());

        ConfigRetrieverOptions opts = new ConfigRetrieverOptions()
                .addStore(cliconfig)
                .addStore(defaultConfig);

        ConfigRetriever cfgRetriever = ConfigRetriever.create(vertx, opts);


        return Future.future(cfgRetriever::getConfig);
    }

//    private void doConfig(Promise<Void> start, Router router) {
//        ConfigStoreOptions defaultConfig = new ConfigStoreOptions()
//                .setType("file")
//                .setFormat("json")
//                .setConfig(new JsonObject().put("path", "config.json"));
//        ConfigStoreOptions cliconfig = new ConfigStoreOptions()
//                .setType("json")
//                .setConfig(config());
//
//        ConfigRetrieverOptions opts = new ConfigRetrieverOptions()
//                .addStore(cliconfig)
//                .addStore(defaultConfig);
//
//        ConfigRetriever cfgRetriever = ConfigRetriever.create(vertx, opts);
//
//        Handler<AsyncResult<JsonObject>> handler = asyncResult -> this.handleConfigResults(start, router, asyncResult);
//        cfgRetriever.getConfig(handler);
//    }

    private void handleConfigResults(Promise<Void> start,
                                     Router router,
                                     AsyncResult<JsonObject> jsonObjectAsyncResult
    ) {
        if (jsonObjectAsyncResult.succeeded()) {
            JsonObject config = jsonObjectAsyncResult.result();
            JsonObject http = config.getJsonObject("http");
            int httpPort = http.getInteger("port");
            vertx.createHttpServer().requestHandler(router).listen(httpPort);
            start.complete();
        } else {
            start.fail("unable to load  configuration");
        }
    }

    private void helloVertx(RoutingContext ctx) {
        vertx.eventBus().request("hello.vertex.addr", "", reply -> {
            ctx.request().response().end((String) reply.result().body());
        });
        //ctx.request().response().end("hello world");
    }

    private void helloName(RoutingContext ctx) {
        String name = ctx.pathParam("name");

        vertx.eventBus().request("hello.named.addr", name, reply -> {
            ctx.request().response().end((String) reply.result().body());
        });
        //ctx.request().response().end(String.format("Hello %s!", name));
    }

}
