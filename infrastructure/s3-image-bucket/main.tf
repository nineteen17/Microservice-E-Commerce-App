resource "aws_s3_bucket" "my_bucket" {
  bucket = "beer-images-bucket"
}

resource "aws_s3_bucket_policy" "public_read_policy" {
  bucket = aws_s3_bucket.my_bucket.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action    = "s3:GetObject"
        Effect    = "Allow"
        Principal = "*"
        Resource  = "${aws_s3_bucket.my_bucket.arn}/*"
      }
    ]
  })
}

resource "aws_iam_policy" "s3_access_policy" {
  name        = "S3AccessPolicy"
  description = "Policy to allow access to S3 bucket"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action   = ["s3:GetObject"]
        Effect   = "Allow"
        Resource = ["${aws_s3_bucket.my_bucket.arn}/*"]
      }
    ]
  })
}

resource "aws_iam_user" "app_user" {
  name = "app-user"
}

resource "aws_iam_user_policy_attachment" "attach_policy" {
  user       = aws_iam_user.app_user.name
  policy_arn = aws_iam_policy.s3_access_policy.arn
}

resource "aws_iam_access_key" "app_user_key" {
  user = aws_iam_user.app_user.name
}

resource "aws_s3_bucket_cors_configuration" "cors" {
  bucket = aws_s3_bucket.my_bucket.id

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET"]
    allowed_origins = ["*"]
    max_age_seconds = 3000
  }
}

resource "aws_s3_bucket_public_access_block" "public_access_block" {
  bucket = aws_s3_bucket.my_bucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}
