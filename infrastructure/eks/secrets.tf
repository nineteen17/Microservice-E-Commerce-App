locals {
  secrets = {
    VITE_BASE_URL                 = ""
    VITE_ACCESS_TOKEN_PRIVATE_KEY = ""
    PRODUCT_MONGO_URI             = ""
    USER_MONGO_URI                = ""
    ORDER_MONGO_URI               = ""
    ACCESS_TOKEN_PRIVATE_KEY      = ""
    REFRESH_TOKEN_PRIVATE_KEY     = ""
    AMQP_URL                      = ""
    STRIPE_SECRET_KEY             = ""
    STRIPE_WEBHOOK_SECRET         = ""
  }
}

# Create AWS Secrets Manager secrets
resource "aws_secretsmanager_secret" "secrets" {
  for_each = local.secrets

  name = each.key
}
# IAM Role and Policy for External Secrets Operator
data "aws_iam_policy_document" "external_secrets_policy" {
  statement {
    actions   = ["secretsmanager:GetSecretValue"]
    resources = values(aws_secretsmanager_secret.secrets)[*].arn
  }
}

resource "aws_iam_role" "external_secrets_role" {
  name = "external-secrets-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Principal = {
          Service = "eks.amazonaws.com"
        },
        Action = "sts:AssumeRole"
      }
    ]
  })
}

resource "aws_iam_role_policy" "external_secrets_policy" {
  name   = "external-secrets-policy"
  role   = aws_iam_role.external_secrets_role.id
  policy = data.aws_iam_policy_document.external_secrets_policy.json
}

