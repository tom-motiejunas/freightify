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
    TableName: Table.Stop2.tableName,
    Key: {
      stopId: event.pathParameters?.stopId,
    },
    UpdateExpression:
      "SET stopName = :stopName, stopDescription = :stopDescription, stopAddress = :stopAddress",
    ExpressionAttributeValues: {
      ":stopName": data.stopName || null,
      ":stopDescription": data.stopDescription || null,
      ":stopAddress": data.stopAddress || null,
    },
    ReturnValues: "ALL_NEW",
  };

  const results = await dynamoDb.update(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(results.Attributes),
  };
};
