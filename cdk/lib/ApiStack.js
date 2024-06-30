// @ts-check

const { Stack } = require("aws-cdk-lib");
const {
  CfnApi,
  CfnIntegration,
  CfnStage,
  CfnRoute,
  CfnDomainName,
  CfnApiMapping,
} = require("aws-cdk-lib/aws-apigatewayv2");
const { DotEnv } = require("./DotEnv");
const { ARecord, RecordTarget } = require("aws-cdk-lib/aws-route53");
const {
  ApiGatewayv2DomainProperties,
} = require("aws-cdk-lib/aws-route53-targets");
const {
  Certificate,
  CertificateValidation,
} = require("aws-cdk-lib/aws-certificatemanager");

class ApiStack extends Stack {
  constructor(scope, id, /** @type import("./types").ApiStackProps */ props) {
    super(scope, id, props);
    const { apiDomainName, bucketDomainName, hostedZone } = props;

    const api = new CfnApi(this, "Api", {
      name: "KoremoApi",
      protocolType: "HTTP",
      corsConfiguration: {
        allowOrigins: [`https://${bucketDomainName}`],
        allowMethods: ["GET", "POST", "OPTIONS"],
      },
    });

    // GET
    const integration = new CfnIntegration(this, "RakutenApiIntegration", {
      apiId: api.ref,
      integrationType: "HTTP_PROXY",
      integrationMethod: "GET",
      integrationUri:
        "https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706",
      requestParameters: {
        "append:querystring.applicationId": DotEnv.APPLICATION_ID,
      },
      payloadFormatVersion: "1.0",
    });
    new CfnRoute(this, "ApiRoute", {
      apiId: api.ref,
      routeKey: "GET /search",
      target: `integrations/${integration.ref}`,
    });

    // POST JSON
    const postIntegration = new CfnIntegration(
      this,
      "RakutenPostApiIntegration",
      {
        apiId: api.ref,
        integrationType: "HTTP_PROXY",
        integrationMethod: "POST",
        integrationUri:
          "https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706",
        requestParameters: {
          "append:querystring.applicationId": DotEnv.APPLICATION_ID,
        },
        payloadFormatVersion: "1.0",
      }
    );
    new CfnRoute(this, "PostApiRoute", {
      apiId: api.ref,
      routeKey: "POST /search",
      target: `integrations/${postIntegration.ref}`,
    });

    const stage = new CfnStage(this, "ApiDefaultStage", {
      apiId: api.ref,
      stageName: "$default",
      autoDeploy: true,
      defaultRouteSettings: {
        throttlingRateLimit: 1,
        throttlingBurstLimit: 1,
      },
    });

    const { certificateArn } = new Certificate(this, "ApiCertificate", {
      domainName: apiDomainName,
      validation: CertificateValidation.fromDns(hostedZone),
    });

    const domainName = new CfnDomainName(this, "ApiDomain", {
      domainName: apiDomainName,
      domainNameConfigurations: [
        {
          certificateArn,
        },
      ],
    });
    new CfnApiMapping(this, "ApiMapping", {
      apiId: api.ref,
      domainName: apiDomainName,
      stage: stage.stageName,
    });

    new ARecord(this, "ARecord", {
      recordName: apiDomainName,
      zone: hostedZone,
      target: RecordTarget.fromAlias(
        new ApiGatewayv2DomainProperties(
          domainName.attrRegionalDomainName,
          domainName.attrRegionalHostedZoneId
        )
      ),
    });
  }
}

module.exports = { ApiStack };
