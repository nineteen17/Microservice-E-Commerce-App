output "vpc_id" {
  description = "VPC ID"
  value       = module.vpc.vpc_id
}

output "public_subnets" {
  description = "Public subnet IDs"
  value       = module.vpc.public_subnets
}

output "private_subnets" {
  description = "Private subnet IDs"
  value       = module.vpc.private_subnets
}

output "intra_subnets" {
  description = "Intra subnet IDs"
  value       = module.vpc.intra_subnets
}

output "cluster_name" {
  description = "EKS Cluster name"
  value       = module.eks.cluster_name
}

output "cluster_endpoint" {
  description = "EKS Cluster endpoint"
  value       = module.eks.cluster_endpoint
}

output "cluster_security_group_id" {
  description = "Security Group ID attached to the EKS cluster."
  value       = module.eks.cluster_security_group_id
}

output "node_security_group_id" {
  description = "Security Group ID applied to the EKS worker nodes."
  value       = module.eks.node_security_group_id
}

output "route53_zone_id" {
  description = "Route53 Zone ID"
  value       = aws_route53_zone.main.zone_id
}

output "route53_record_fqdn" {
  description = "Route53 Record FQDN"
  value       = aws_route53_record.eks.fqdn
}

output "secrets_arns" {
  value = { for k, v in aws_secretsmanager_secret.secrets : k => v.arn }
}

output "external_secrets_role_arn" {
  value = aws_iam_role.external_secrets_role.arn
}
