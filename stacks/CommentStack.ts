import { Api, StackContext, Table } from "@serverless-stack/resources";

export function CommentStack({ stack }: StackContext) {
  const table = new Table(stack, "Comment", {
    fields: {
      commentId: "string",
      commentText: "string",
    },
    primaryIndex: { partitionKey: "commentId" },
  });

  const api = new Api(stack, "CommentApi", {
    defaults: {
      function: {
        bind: [table],
      },
    },
    routes: {
      "GET /": "functions/comment/get.main",
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
