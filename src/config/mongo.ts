import { connect } from "mongoose";
import "dotenv/config";

const URL = <string>process.env.URL;

async function createConnection(): Promise<void> {
  try {
    const connectionDone = await connect(URL);
    if (connectionDone) console.log("CONNECTION TO MONGO DONE");
  } catch (error) {
    console.log(error);
  }
}

export { createConnection };
