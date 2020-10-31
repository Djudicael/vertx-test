 vertx.eventBus().consumer("hello.vertex.addr", function(msg){
            msg.reply("hello vertx world amazing");
        });