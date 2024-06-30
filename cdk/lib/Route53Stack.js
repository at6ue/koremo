// @ts-check

const { Stack } = require("aws-cdk-lib");
const { HostedZone } = require("aws-cdk-lib/aws-route53");
const { DotEnv } = require("./DotEnv");

class Route53Stack extends Stack {
  /** @readonly */
  hostedZone;
  /** @readonly */
  apiDomainName;
  /** @readonly */
  bucketDomainName;

  constructor(scope, id, props) {
    super(scope, id, props);

    const { HOSTED_ZONE_ID, ZONE_NAME, API_SUBDOMAIN, BUCKET_SUBDOMAIN } =
      DotEnv;

    this.hostedZone = HostedZone.fromHostedZoneAttributes(this, "HostedZone", {
      hostedZoneId: HOSTED_ZONE_ID,
      zoneName: ZONE_NAME,
    });

    this.apiDomainName = `${API_SUBDOMAIN}.${ZONE_NAME}`;
    this.bucketDomainName = `${BUCKET_SUBDOMAIN}.${ZONE_NAME}`;
  }
}

module.exports = { Route53Stack };
