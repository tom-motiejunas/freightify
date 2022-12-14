import { Api, StackContext, Table } from "@serverless-stack/resources";

export function ForumStack({ stack }: StackContext) {
  const table = new Table(stack, "Forum", {
    fields: {
      forumId: "string",
      forumTitle: "string",
      commentId: "string",
    },
    primaryIndex: { partitionKey: "forumId" },
  });

  const api = new Api(stack, "ForumApi", {
    defaults: {
      function: {
        bind: [table],
      },
    },
    routes: {
      "GET /": "functions/forum/get.main",
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
