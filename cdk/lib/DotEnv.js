// @ts-check

require("dotenv").config();

const {
  APPLICATION_ID,
  HOSTED_ZONE_ID,
  ZONE_NAME,
  API_SUBDOMAIN,
  BUCKET_SUBDOMAIN,
  DISTRIBUTION_REFERER,
} = process.env;

if (
  typeof APPLICATION_ID !== "string" ||
  typeof HOSTED_ZONE_ID !== "string" ||
  typeof ZONE_NAME !== "string" ||
  typeof API_SUBDOMAIN !== "string" ||
  typeof BUCKET_SUBDOMAIN !== "string" ||
  typeof DISTRIBUTION_REFERER !== "string"
) {
  throw new Error("Missing environment variables");
}

const DotEnv = {
  APPLICATION_ID,
  HOSTED_ZONE_ID,
  ZONE_NAME,
  API_SUBDOMAIN,
  BUCKET_SUBDOMAIN,
  DISTRIBUTION_REFERER,
};

module.exports = { DotEnv };
