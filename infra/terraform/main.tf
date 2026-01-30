terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# ------------------------
# VPC
# ------------------------
resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
  tags = { Name = "shopping-cart-vpc" }
}

# ------------------------
# Public Subnet (for load balancer)
# ------------------------
resource "aws_subnet" "public" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "10.0.1.0/24"
  tags       = { Name = "public-subnet" }
}

# ------------------------
# Private Subnet (for app containers)
# ------------------------
resource "aws_subnet" "private" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "10.0.2.0/24"
  tags       = { Name = "private-subnet" }
}

# ------------------------
# Security Group for the API
# ------------------------
resource "aws_security_group" "app_sg" {
  name        = "shopping-cart-app-sg"
  description = "Allow traffic to shopping cart API"
  vpc_id      = aws_vpc.main.id

  # Allow only VPC internal traffic to API (example)
  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }

  # Allow all outbound traffic
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# ------------------------
# ECS Cluster
# ------------------------
resource "aws_ecs_cluster" "main" {
  name = "shopping-cart-cluster"
}
