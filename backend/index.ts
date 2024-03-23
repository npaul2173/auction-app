import { envVar } from "@envVar/env";
import "dotenv/config";
import App from "./src/api/app/app";

const app = new App(envVar.PORT);
app.listen();
