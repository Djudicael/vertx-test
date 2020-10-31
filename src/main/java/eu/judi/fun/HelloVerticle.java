package eu.judi.fun;

import io.vertx.core.AbstractVerticle;

import java.util.UUID;

public class HelloVerticle extends AbstractVerticle {

    @Override
    public void start() throws Exception {

        String verticleId = UUID.randomUUID().toString();
        vertx.eventBus().consumer("hello.vertex.addr", msg -> {
            msg.reply("hello vertx world");
        });

        vertx.eventBus().consumer("hello.named.addr", msg -> {

            String name = (String) msg.body();
            msg.reply(String.format("Hello %s!, from %s!", name, verticleId));
        });
    }
}
