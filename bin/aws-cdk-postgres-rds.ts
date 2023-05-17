#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { SubnetType, Vpc } from "aws-cdk-lib/aws-ec2";
import {
  DatabaseCluster,
  DatabaseClusterEngine,
  AuroraPostgresEngineVersion,
  CfnDBCluster,
  SubnetGroup,
} from "aws-cdk-lib/aws-rds";
import { ServerlessCluster } from "../lib/serverless-cluster";

const app = new cdk.App();
const stack = new cdk.Stack(app, "postgres-rds");

const vpc = new Vpc(stack, "Vpc", {
  natGateways: 0,
});

const database = new ServerlessCluster(stack, "Database", {
  engine: DatabaseClusterEngine.auroraPostgres({
    version: AuroraPostgresEngineVersion.VER_15_2,
  }),
  subnetGroup: new SubnetGroup(stack, "Subnets", {
    vpc,
    description: "Isolated subnets",
    vpcSubnets: {
      subnetType: SubnetType.PRIVATE_ISOLATED,
    },
  }),
  instanceProps: {
    vpc: vpc,
  },
});
