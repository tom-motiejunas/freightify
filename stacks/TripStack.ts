import { Api, StackContext, Table } from "@serverless-stack/resources";

export function TripStack({ stack }: StackContext) {
  const table = new Table(stack, "Trip", {
    fields: {
      tripId: "string",
      stopId: "string",
      truckId: "string",
      packageId: "string",
      tripName: "string",
      tripDescription: "string",
      tripStartAddress: "string",
      tripEndAddress: "string",
    },
    primaryIndex: { partitionKey: "tripId" },
  });

  const api = new Api(stack, "TripApi", {
    defaults: {
      function: {
        bind: [table],
      },
    },
    routes: {
      "GET    /trip": "functions/trip/list.main",
      "POST   /trip": "functions/trip/create.main",
      "GET    /trip/{tripId}": "functions/trip/get.main",
      "PATCH  /trip/{tripId}": "functions/trip/update.main",
      "DELETE /trip/{tripId}": "functions/trip/delete.main",
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
