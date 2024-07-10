output "s3_bucket_name" {
  value = aws_s3_bucket.my_bucket.bucket
}

output "iam_user_access_key" {
  value = aws_iam_access_key.app_user_key.id
}

output "iam_user_secret_key" {
  value     = aws_iam_access_key.app_user_key.secret
  sensitive = true
}
