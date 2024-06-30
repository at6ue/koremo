// @ts-check

const { Stack } = require("aws-cdk-lib");
const { BucketDeployment, Source } = require("aws-cdk-lib/aws-s3-deployment");

class DeployStack extends Stack {
  constructor(
    scope,
    id,
    /** @type import("./types").DeployStackProps */ props
  ) {
    super(scope, id, props);

    const { destinationBucket, distribution } = props;

    new BucketDeployment(this, "Deploy", {
      sources: [Source.asset("../app/out")],
      destinationBucket,
      distribution,
      distributionPaths: ["/*"],
    });
  }
}

module.exports = { DeployStack };
