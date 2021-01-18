import yenv from 'yenv'

let envPath: string = "config/development.yaml";
if (process.env.NODE_ENV !== "development") {
  envPath = process.env.NODE_CONFIG_PATH;
}
const config = yenv(envPath, {env: process.env.NODE_ENV });
export default config;
