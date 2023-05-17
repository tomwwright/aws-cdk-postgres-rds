import {
  CfnDBCluster,
  DatabaseCluster,
  DatabaseClusterProps,
} from "aws-cdk-lib/aws-rds";
import { Construct } from "constructs";

interface ServerlessClusterProps extends DatabaseClusterProps {
  instanceProps: Omit<DatabaseClusterProps["instanceProps"], "instanceType">;
  minCapacity: number;
  maxCapacity: number;
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
      minCapacity: props.minCapacity ?? 0.5,
      maxCapacity: props.maxCapacity ?? 1,
    };
  }
}
