import { StackProps } from "aws-cdk-lib";
import { IDistribution, IOrigin } from "aws-cdk-lib/aws-cloudfront";
import { IHostedZone } from "aws-cdk-lib/aws-route53";

export type CertificateStackProps = StackProps & {
  apiDomainName: string;
  hostedZone: IHostedZone;
};

export type ApiStackProps = StackProps & {
  apiDomainName: string;
  bucketDomainName: string;
  hostedZone: IHostedZone;
};

export type DistributionStackProps = StackProps & {
  originBucket: IBucket;
  bucketDomainName: string;
  hostedZone: IHostedZone;
};

export type DeployStackProps = StackProps & {
  destinationBucket: IBucket;
  distribution: IDistribution;
};
