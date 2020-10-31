mvn io.reactiverse:vertx-maven-plugin::setup

launch program
mvn clean compile vertx:run

mvn clean package

for the cluster part
java -jar .\target\vertx-fun-demo-1.0-SNAPSHOT.jar -cluster -Djava.net.preferIPV4Stack -Dhttp.port=8090
