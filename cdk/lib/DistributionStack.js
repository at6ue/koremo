// @ts-check

const { Stack } = require("aws-cdk-lib");
const {
  Certificate,
  CertificateValidation,
} = require("aws-cdk-lib/aws-certificatemanager");
const {
  Distribution,
  AllowedMethods,
  CachedMethods,
  CachePolicy,
  ViewerProtocolPolicy,
  PriceClass,
} = require("aws-cdk-lib/aws-cloudfront");
const { S3Origin } = require("aws-cdk-lib/aws-cloudfront-origins");
const { ARecord, RecordTarget } = require("aws-cdk-lib/aws-route53");
const { CloudFrontTarget } = require("aws-cdk-lib/aws-route53-targets");
const { DotEnv } = require("./DotEnv");

class DistributionStack extends Stack {
  /** @readonly */
  distribution;

  constructor(
    scope,
    id,
    /** @type import("./types").DistributionStackProps */ props
  ) {
    super(scope, id, props);
    const { originBucket, bucketDomainName, hostedZone } = props;

    const certificate = new Certificate(this, "BucketCertificate", {
      domainName: bucketDomainName,
      validation: CertificateValidation.fromDns(hostedZone),
    });

    const distribution = new Distribution(this, "Distribution", {
      defaultBehavior: {
        allowedMethods: AllowedMethods.ALLOW_GET_HEAD,
        cachedMethods: CachedMethods.CACHE_GET_HEAD,
        cachePolicy: CachePolicy.CACHING_OPTIMIZED,
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        origin: new S3Origin(originBucket, {
          customHeaders: {
            Referer: DotEnv.DISTRIBUTION_REFERER,
          },
        }),
      },
      priceClass: PriceClass.PRICE_CLASS_200,
      certificate,
      domainNames: [bucketDomainName],
    });

    new ARecord(this, "ARecord", {
      recordName: bucketDomainName,
      zone: hostedZone,
      target: RecordTarget.fromAlias(new CloudFrontTarget(distribution)),
    });

    this.distribution = distribution;
  }
}

module.exports = { DistributionStack };
