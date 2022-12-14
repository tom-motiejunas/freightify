import { Api, StackContext, Table } from "@serverless-stack/resources";

export function UserStack({ stack }: StackContext) {
  const table = new Table(stack, "User", {
    fields: {
      userId: "string",
      firstName: "string",
      lastName: "string",
      role: "string",
      contactInfo: "string",
      dateOfBirth: "string",
      medicalCertificateKey: "string",
      knowledgeCertificateKey: "string",
    },
    primaryIndex: { partitionKey: "userId" },
  });

  const api = new Api(stack, "UserApi", {
    defaults: {
      function: {
        bind: [table],
      },
    },
    routes: {
      "GET /": "functions/user/get.main",
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
