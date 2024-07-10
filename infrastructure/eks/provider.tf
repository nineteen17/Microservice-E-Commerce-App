provider "aws" {
  region = local.region
}

locals {
  region         = "ap-southeast-2"
  name           = "beer-and-more-cluster"
  vpc_cidr       = "10.123.0.0/16"
  azs            = ["ap-southeast-2a", "ap-southeast-2b"]
  public_subnets = ["10.123.1.0/24", "10.123.2.0/24"]
  private_subnets = ["10.123.3.0/24", "10.123.4.0/24"]
  intra_subnets  = ["10.123.5.0/24", "10.123.6.0/24"]
  tags = {
    Project     = "BeerAndMore"
    Environment = "Dev"
  }
}
