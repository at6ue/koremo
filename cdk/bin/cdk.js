#!/usr/bin/env node

// @ts-check

const cdk = require("aws-cdk-lib");
const { ApiStack } = require("../lib/ApiStack");
const { Route53Stack } = require("../lib/Route53Stack");
const { BucketStack } = require("../lib/BucketStack");
const { DeployStack } = require("../lib/DeployStack");
const { DistributionStack } = require("../lib/DistributionStack");

const defaultEnv = { region: process.env.CDK_DEFAULT_REGION };
const cloudFrontEnv = { region: "us-east-1" };
const app = new cdk.App();

const { hostedZone, apiDomainName, bucketDomainName } = new Route53Stack(
  app,
  "Route53Stack"
);

new ApiStack(app, "ApiStack", {
  hostedZone,
  apiDomainName,
  bucketDomainName,
});

const { bucket } = new BucketStack(app, "BucketStack", {
  env: defaultEnv,
});

const distributionStack = new DistributionStack(app, "DistributionStack", {
  originBucket: bucket,
  bucketDomainName,
  hostedZone,
  crossRegionReferences: true,
  env: cloudFrontEnv,
});

new DeployStack(app, "DeployStack", {
  distribution: distributionStack.distribution,
  destinationBucket: bucket,
  crossRegionReferences: true,
  env: defaultEnv,
});
