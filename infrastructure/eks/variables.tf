variable "region" {
  description = "The AWS region to deploy in"
  type        = string
  default     = "ap-southeast-2"
}

variable "name" {
  description = "The name of the cluster"
  type        = string
  default     = "beer-and-more-cluster"
}

variable "vpc_cidr" {
  description = "The CIDR block for the VPC"
  type        = string
  default     = "10.123.0.0/16"
}

variable "azs" {
  description = "A list of availability zones"
  type        = list(string)
  default     = ["ap-southeast-2a", "ap-southeast-2b"]
}

variable "public_subnets" {
  description = "A list of public subnet CIDR blocks"
  type        = list(string)
  default     = ["10.123.1.0/24", "10.123.2.0/24"]
}

variable "private_subnets" {
  description = "A list of private subnet CIDR blocks"
  type        = list(string)
  default     = ["10.123.3.0/24", "10.123.4.0/24"]
}

variable "intra_subnets" {
  description = "A list of intra subnet CIDR blocks"
  type        = list(string)
  default     = ["10.123.5.0/24", "10.123.6.0/24"]
}

variable "tags" {
  description = "A map of tags to add to all resources"
  type        = map(string)
  default     = {
    Project     = "BeerAndMore"
    Environment = "Dev"
  }
}
