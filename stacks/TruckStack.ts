import { Api, StackContext, Table } from "@serverless-stack/resources";

export function TruckStack({ stack }: StackContext) {
  const table = new Table(stack, "Truck2", {
    fields: {
      truckId: "string",
      truckModel: "string",
      truckName: "string",
      truckDescription: "string",
      truckLoadCapacity: "string",
    },
    primaryIndex: { partitionKey: "truckId" },
  });

  const api = new Api(stack, "TruckApi", {
    defaults: {
      function: {
        bind: [table],
      },
    },
    routes: {
      "GET    /truck": "functions/truck/list.main",
      "POST   /truck": "functions/truck/create.main",
      "GET    /truck/{truckId}": "functions/truck/get.main",
      "PATCH  /truck/{truckId}": "functions/truck/update.main",
      "DELETE /truck/{truckId}": "functions/truck/delete.main",
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
