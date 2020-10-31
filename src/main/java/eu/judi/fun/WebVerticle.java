package eu.judi.fun;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.Future;
import io.vertx.core.Promise;
import io.vertx.core.http.HttpServer;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;
import io.vertx.ext.web.handler.*;
import io.vertx.ext.web.sstore.LocalSessionStore;
import io.vertx.ext.web.sstore.SessionStore;

public class WebVerticle extends AbstractVerticle {

    @Override
    public void start(Promise<Void> startPromise) throws Exception {
        configureRouter()
                .compose(this::startHttpServer);
    }

    Future<Void> startHttpServer(Router router) {
        JsonObject http = config().getJsonObject("http");
        int httpPort = http.getInteger("port");
        HttpServer server = vertx.createHttpServer().requestHandler(router);
        return Future.future(promise -> server.listen(httpPort)).mapEmpty();
    }

    Future<Router> configureRouter() {
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


    private void helloVertx(RoutingContext ctx) {
        vertx.eventBus().request("hello.vertex.addr", "", reply -> {
            ctx.request().response().end((String) reply.result().body());
        });
    }

    private void helloName(RoutingContext ctx) {
        String name = ctx.pathParam("name");
        vertx.eventBus().request("hello.named.addr", name, reply -> {
            ctx.request().response().end((String) reply.result().body());
        });
    }
}
