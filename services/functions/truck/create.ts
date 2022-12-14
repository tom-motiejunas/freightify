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
    TableName: Table.Truck2.tableName,
    Item: {
      truckId: uuid.v4(),
      truckModel: data.truckModel,
      truckName: data.truckName,
      truckDescription: data.truckDescription,
      truckLoadCapacity: data.truckLoadCapacity,
      createdAt: Date.now(),
    },
  };
  await dynamoDb.put(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(params.Item),
  };
};
