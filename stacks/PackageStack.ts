import { Api, StackContext, Table } from "@serverless-stack/resources";

export function PackageStack({ stack }: StackContext) {
  const table = new Table(stack, "Package", {
    fields: {
      packageId: "string",
      packageName: "string",
      packageDescription: "string",
      packageWeight: "number",
      packageVolume: "number",
    },
    primaryIndex: { partitionKey: "packageId" },
  });

  const api = new Api(stack, "PackageApi", {
    defaults: {
      function: {
        bind: [table],
      },
    },
    routes: {
      "GET    /package": "functions/package/list.main",
      "POST   /package": "functions/package/create.main",
      "GET    /package/{packageId}": "functions/package/get.main",
      "PATCH  /package/{packageId}": "functions/package/update.main",
      "DELETE /package/{packageId}": "functions/package/delete.main",
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
