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
    TableName: Table.Trip.tableName,
    Key: {
      tripId: event.pathParameters?.tripId,
    },
    UpdateExpression:
      "SET stopId = :stopId, truckId = :truckId, packageId = :packageId, tripName = :tripName, tripDescription = :tripDescription, tripStartAddress = :tripStartAddress, tripEndAddress = :tripEndAddress",
    ExpressionAttributeValues: {
      ":stopId": data.stopId || null,
      ":truckId": data.truckId || null,
      ":packageId": data.packageId || null,
      ":tripName": data.tripName || null,
      ":tripDescription": data.tripDescription || null,
      ":tripStartAddress": data.tripStartAddress || null,
      ":tripEndAddress": data.tripEndAddress || null,
    },
    ReturnValues: "ALL_NEW",
  };

  const results = await dynamoDb.update(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(results.Attributes),
  };
};
