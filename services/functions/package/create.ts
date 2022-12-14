import AWS from "aws-sdk";
import * as uuid from "uuid";
import { Table } from "@serverless-stack/node/table";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

import { APIGatewayProxyHandlerV2 } from "aws-lambda";

export const main: APIGatewayProxyHandlerV2 = async (event) => {
  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: true, message: "Missing body" }),
    };
  }

  const data = JSON.parse(event.body);

  const params = {
    TableName: Table.Package.tableName,
    Item: {
      packageId: uuid.v4(),
      packageName: data.packageName,
      packageDescription: data.packageDescription,
      packageWeight: data.packageWeight,
      packageVolume: data.packageVolume,
      createdAt: Date.now(),
    },
  };
  await dynamoDb.put(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(params.Item),
  };
};
