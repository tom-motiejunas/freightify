import AWS from "aws-sdk";
import { Table } from "@serverless-stack/node/table";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const main: APIGatewayProxyHandlerV2 = async (event) => {
  const params = {
    TableName: Table.Truck2.tableName,
  };
  const results = await dynamoDb.scan(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(results.Items),
  };
};
