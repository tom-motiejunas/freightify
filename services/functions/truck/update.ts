import AWS from "aws-sdk";
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
    Key: {
      truckId: event.pathParameters?.truckId,
    },
    UpdateExpression:
      "SET truckModel = :truckModel, truckName = :truckName, truckDescription = :truckDescription, truckLoadCapacity = :truckLoadCapacity",
    ExpressionAttributeValues: {
      ":truckModel": data.truckModel || null,
      ":truckName": data.truckName || null,
      ":truckDescription": data.truckDescription || null,
      ":truckLoadCapacity": data.truckLoadCapacity || null,
    },
    ReturnValues: "ALL_NEW",
  };

  const results = await dynamoDb.update(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(results.Attributes),
  };
};
