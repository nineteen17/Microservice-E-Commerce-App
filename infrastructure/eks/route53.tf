resource "aws_route53_zone" "main" {
  name = "beerandmore.store"
}

resource "aws_route53_record" "eks" {
  zone_id = aws_route53_zone.main.zone_id
  name    = "eks"
  type    = "CNAME"
  ttl     = 300
  records = [module.eks.cluster_endpoint]
}
