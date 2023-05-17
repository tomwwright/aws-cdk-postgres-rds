import {
  CfnDBCluster,
  DatabaseCluster,
  DatabaseClusterProps,
} from "aws-cdk-lib/aws-rds";
import { Construct } from "constructs";

interface ServerlessClusterProps extends DatabaseClusterProps {
  instanceProps: Omit<DatabaseClusterProps["instanceProps"], "instanceType">;
}

export class ServerlessCluster extends DatabaseCluster {
  constructor(scope: Construct, id: string, props: ServerlessClusterProps) {
    super(scope, id, {
      ...props,
      instanceProps: {
        ...props.instanceProps,
        instanceType: "serverless" as any,
      },
    });

    (
      this.node.findChild("Resource") as CfnDBCluster
    ).serverlessV2ScalingConfiguration = {
      minCapacity: 1,
      maxCapacity: 2,
    };
  }
}
