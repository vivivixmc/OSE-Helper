import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.eclipse.jetty.websocket.api.WebSocketPartialListener;
import spark.Filter;
import spark.Request;
import spark.Response;
import spark.Service;

import java.io.FileInputStream;
import java.net.SocketOption;
import java.util.logging.*;


import static spark.Spark.*;

public class Main {
    static String currentName = "Null";
    static Logger LOGGER;
    static {
        try(FileInputStream ins = new FileInputStream("C:\\Users\\Дмитрий\\IdeaProjects\\asd\\log.config")){
            LogManager.getLogManager().readConfiguration(ins);
            LOGGER = Logger.getLogger(Main.class.getName());
        }catch (Exception ignore){
            ignore.printStackTrace();
        }
    }



    public static void main(String[] args) {
        LOGGER.log(Level.INFO,"Начало main");
        options("/*", (request, response) -> {

            String accessControlRequestHeaders = request.headers("Access-Control-Request-Headers");
            if (accessControlRequestHeaders != null) {
                response.header("Access-Control-Allow-Headers", accessControlRequestHeaders);
            }

            String accessControlRequestMethod = request.headers("Access-Control-Request-Method");
            if (accessControlRequestMethod != null) {
                response.header("Access-Control-Allow-Methods", accessControlRequestMethod);
            }

            return "OK";
        });

        after((Filter) (request, response) -> {
            response.header("Access-Control-Allow-Origin", "*");
            response.header("Access-Control-Allow-Methods", "*");
            response.header("Access-Control-Expose-Headers", "Name");

        });
        after("/", (Request request, Response response) -> {
                    Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();

                    JsonObject body;
                    if (response.body() != null) {
                        body = new JsonParser().parse(response.body()).getAsJsonObject();
                    } else {
                        body = new JsonObject();
                    }
            response.body(body.toString());
                });
        get("/getMyName", (req, res) -> {
            res.header("Name", currentName);
            LOGGER.log(Level.INFO,"Name getted = " + currentName);
            return currentName;
        });

        post("/setMyName", (req, res) -> {
            currentName = req.headers("Name");
            LOGGER.log(Level.INFO,"Name setted = " + currentName);
            return currentName;
        });

    }
}