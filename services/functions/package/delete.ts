import AWS from "aws-sdk";
import { Table } from "@serverless-stack/node/table";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

import { APIGatewayProxyHandlerV2 } from "aws-lambda";

export const main: APIGatewayProxyHandlerV2 = async (event) => {
  const params = {
    TableName: Table.Package.tableName,
    Key: {
      packageId: event.pathParameters?.packageId,
    },
  };
  await dynamoDb.delete(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify({ status: true }),
  };
};
