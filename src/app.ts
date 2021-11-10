import express, {Express} from "express";
import bodyParser from "body-parser";
import cors from "cors";
import DB from "./db";
import router from './routes';
import configs from './common/config.json';



const app: Express = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors(configs.server.cors));

router(app);

app.listen(configs.server.port, () => {
    DB.getInstance();
    return console.log(`server is listening on http://localhost:${configs.server.port}`);
});