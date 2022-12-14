import { Api, StackContext, Table } from "@serverless-stack/resources";

export function StopStack({ stack }: StackContext) {
  const table = new Table(stack, "Stop2", {
    fields: {
      stopId: "string",
      stopName: "string",
      stopDescription: "string",
      stopAddress: "string",
    },
    primaryIndex: { partitionKey: "stopId" },
  });

  const api = new Api(stack, "StopApi", {
    defaults: {
      function: {
        bind: [table],
      },
    },
    routes: {
      "GET    /stop": "functions/stop/list.main",
      "POST   /stop": "functions/stop/create.main",
      "GET    /stop/{stopId}": "functions/stop/get.main",
      "PATCH  /stop/{stopId}": "functions/stop/update.main",
      "DELETE /stop/{stopId}": "functions/stop/delete.main",
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
