# My Resume

This repository implements a personal resume website following the Cloud Resume Challenge. It includes automated CI/CD, infrastructure-as-code, and a multi-environment deployment setup targeting AWS.

Read more about this project at [here](https://dev.to/urmajesty516/my-attempt-on-cloud-resume-challenge-in-2026-3dh).

## Multi-environment deployment

- Staging: Pull requests merged into `main` trigger the CI/CD pipeline and deploy the site to the `Staging` environment.
- Production: Commits that pass CI/CD are promoted to `Prod` by creating a `release/*` branch and tagging the release (for example, `v1.0.0`).

## CI/CD

The pipeline runs the following steps:

- Authenticate to AWS using OpenID Connect (OIDC).
- Upload website artifacts to Amazon S3.
- Invalidate the CloudFront distribution cache.
- Run smoke tests with Cypress to verify the deployment.

## Releases

Create a release branch:

```bash
git checkout -b release/v1.0.0
git push origin release/v1.0.0
```

Create and push a release tag:

```bash
git tag -a v1.0.0 <commit-sha> -m "Release v1.0.0"
git push origin v1.0.0
```

## Infrastructure as Code

The infrastructure is provisioned by the [janice-zhong-iac repository](https://github.com/qianzhong516/janice-zhong-iac), which uses Terraform-based pipelines to manage resources.

## TODOs

| Status | Item                                                            | Priority |
| ------ | --------------------------------------------------------------- | -------- |
| [ ]    | Allow manual triggering of the CI/CD pipeline for pull requests | Medium   |
| [ ]    | Create a visits-per-day graph                                   | Low      |
| [ ]    | Ensure database can be restored from backup after replacements  | High     |

## Suggested additions

Consider adding the following to improve documentation and operability:

- Local development: how to run the site locally (commands, dev server).
- Environment variables and secrets: list required variables and where to configure them (CI secrets, AWS roles).
- CI status badge: add pipeline status badges to the top of the README.
- Architecture diagram: simple diagram showing S3, CloudFront, CI, and IaC repo.
- Backup & restore: brief instructions for backing up and restoring the database.
- Monitoring & alerts: mention any metrics, logs, or alerting configured (CloudWatch, etc.).
- Cost estimate: ballpark monthly cost for the AWS resources used.
- Security notes: OIDC usage, least-privilege IAM roles, and any public-facing considerations.
- Contributing & license: add contribution guidelines and a license if applicable.
- Contact: where to reach you for issues or questions (email, GitHub profile).
