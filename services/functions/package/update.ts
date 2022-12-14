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
    TableName: Table.Package.tableName,
    Key: {
      packageId: event.pathParameters?.packageId,
    },
    UpdateExpression:
      "SET packageName = :packageName, packageDescription = :packageDescription, packageWeight = :packageWeight, packageVolume = :packageVolume",
    ExpressionAttributeValues: {
      ":packageName": data.packageName || null,
      ":packageDescription": data.packageDescription || null,
      ":packageWeight": data.packageWeight || null,
      ":packageVolume": data.packageVolume || null,
    },
    ReturnValues: "ALL_NEW",
  };

  const results = await dynamoDb.update(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(results.Attributes),
  };
};
