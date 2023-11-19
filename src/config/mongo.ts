import { connect } from "mongoose";
import "dotenv/config";

const URL = <string>process.env.URL;
const URL_MONGOATLAS = <string>process.env.URL_MONGOATLAS;

async function createConnection(): Promise<void> {
  try {
    const connectionDone = await connect(URL_MONGOATLAS);
    if (connectionDone) console.log("CONNECTION TO MONGO DONE");
  } catch (error) {
    console.log(error);
  }
}

export { createConnection };
