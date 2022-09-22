import * as sst from "@serverless-stack/resources";
import { ViteStaticSite } from "@serverless-stack/resources";

export function FrontendStack({ stack, app }: sst.StackContext) {
  const site = new ViteStaticSite(stack, "ReactSite", {
    path: "frontend",
    environment: {
      REACT_APP_REGION: app.region,
    },
  });

  stack.addOutputs({
    SiteUrl: site.url,
  });
}
