import { DynamoDB } from "aws-sdk";
import { Table } from "@serverless-stack/node/table";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";

const dynamoDb = new DynamoDB.DocumentClient();

export const main: APIGatewayProxyHandlerV2 = async (event) => {
  const params = {
    TableName: Table.Package.tableName,

    Key: {
      packageId: event.pathParameters?.packageId,
    },
  };
  const results = await dynamoDb.get(params).promise();

  return results.Item
    ? {
        statusCode: 200,
        body: JSON.stringify(results.Item),
      }
    : {
        statusCode: 404,
        body: JSON.stringify({ error: true }),
      };
};
