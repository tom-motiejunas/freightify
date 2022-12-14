import { App } from "@serverless-stack/resources";
import { AuthStack } from "./AuthStack";
import { FrontendStack } from "./FrontendStack";
import { PackageStack } from "./PackageStack";
import { StopStack } from "./StopStack";
import { TripStack } from "./TripStack";
import { TruckStack } from "./TruckStack";

export default function main(app: App) {
  app.setDefaultFunctionProps({
    runtime: "nodejs16.x",
    srcPath: "services",
    bundle: {
      format: "esm",
    },
  });
  app
    .stack(FrontendStack)
    .stack(AuthStack)
    // .stack(UserStack)
    .stack(TruckStack)
    .stack(StopStack)
    .stack(PackageStack)
    .stack(TripStack);
}
