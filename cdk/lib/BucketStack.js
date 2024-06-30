// @ts-check

const { Stack, RemovalPolicy } = require("aws-cdk-lib");
const {
  PolicyStatement,
  Effect,
  ArnPrincipal,
} = require("aws-cdk-lib/aws-iam");
const { Bucket, BlockPublicAccess } = require("aws-cdk-lib/aws-s3");
const { DotEnv } = require("./DotEnv");

class BucketStack extends Stack {
  /** @readonly */
  bucket;

  constructor(scope, id, props) {
    super(scope, id, props);

    const bucket = new Bucket(this, "Bucket", {
      removalPolicy: RemovalPolicy.DESTROY,
      blockPublicAccess: BlockPublicAccess.BLOCK_ACLS,
      publicReadAccess: true,
      websiteIndexDocument: "index.html",
      websiteErrorDocument: "404/index.html",
    });

    bucket.addToResourcePolicy(
      new PolicyStatement({
        actions: ["s3:GetObject"],
        effect: Effect.DENY,
        conditions: {
          StringNotEquals: { "aws:Referer": DotEnv.DISTRIBUTION_REFERER },
        },
        resources: [`${bucket.bucketArn}/*`],
        principals: [new ArnPrincipal("*")],
      })
    );

    this.bucket = bucket;
  }
}

module.exports = { BucketStack };
