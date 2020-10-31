package eu.judi.fun;

import io.vertx.config.ConfigRetriever;
import io.vertx.config.ConfigRetrieverOptions;
import io.vertx.config.ConfigStoreOptions;
import io.vertx.core.*;
import io.vertx.core.json.JsonObject;

public class MainVerticle extends AbstractVerticle {

    final JsonObject loadedConfig = new JsonObject();

    @Override
    public void start(Promise<Void> start) {
        doConfig()
                .compose(this::storeConfig)
                .compose(this::deployOtherVerticles);
    }

    Future<Void> deployOtherVerticles(Void unused) {
        DeploymentOptions options = new DeploymentOptions().setConfig(loadedConfig);
        Future<String> webVerticle = Future.future(promise -> vertx.deployVerticle(new WebVerticle(), options, promise));
        Future<String> databaseVerticle = Future.future(promise -> vertx.deployVerticle(new DatabaseVerticle(), options, promise));
        Future<String> helloJavascript = Future.future(promise -> vertx.deployVerticle("Hello.js", options, promise));
        Future<String> helloGroovy = Future.future(promise -> vertx.deployVerticle("Hello.groovy", options, promise));
        return CompositeFuture.all(webVerticle, helloJavascript, helloGroovy, databaseVerticle).mapEmpty();
    }


    Future<Void> storeConfig(JsonObject config) {
        loadedConfig.mergeIn(config);
        return Future.succeededFuture();
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


}
