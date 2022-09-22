import { App } from "@serverless-stack/resources";
import { FrontendStack } from "./FrontendStack";

import { MyStack } from "./MyStack";

export default function main(app: App) {
  app.setDefaultFunctionProps({
    runtime: "nodejs16.x",
    srcPath: "backend",
  });
  app.stack(MyStack).stack(FrontendStack);
}
