import AWS from "aws-sdk";
import { Table } from "@serverless-stack/node/table";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

import { APIGatewayProxyHandlerV2 } from "aws-lambda";

export const main: APIGatewayProxyHandlerV2 = async (event) => {
  const params = {
    TableName: Table.Truck2.tableName,
    Key: {
      truckId: event.pathParameters?.truckId,
    },
  };
  await dynamoDb.delete(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify({ status: true }),
  };
};
