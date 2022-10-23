terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
  cloud {
    organization = "zuedev"

    workspaces {
      name = "SteppenWauWau"
    }
  }
}

variable "aws_access_key" {
  type = string
}

variable "aws_secret_key" {
  type = string
}

provider "aws" {
  region     = "eu-west-1"
  access_key = var.aws_access_key
  secret_key = var.aws_secret_key
}

resource "aws_iam_user" "steppenwauwau" {
  name = "steppenwauwau"
}

resource "aws_iam_user_policy" "steppenwauwau" {
  user = aws_iam_user.steppenwauwau.name

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "dynamodb:*",
        ]
        Effect = "Allow"
        Resource = [
          aws_dynamodb_table.steppenwauwau-member-profiles.arn,
          aws_dynamodb_table.steppenwauwau-logs.arn,
        ]
      },
    ]
  })
}

resource "aws_dynamodb_table" "steppenwauwau-member-profiles" {
  name         = "steppenwauwau-member-profiles"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "DiscordUserId"

  attribute {
    name = "DiscordUserId"
    type = "S"
  }
}

resource "aws_dynamodb_table" "steppenwauwau-logs" {
  name         = "steppenwauwau-logs"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "Epoch"

  attribute {
    name = "Epoch"
    type = "S"
  }
}

resource "aws_dynamodb_table" "steppenwauwau-transactions" {
  name         = "steppenwauwau-transactions"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "Epoch"

  attribute {
    name = "Epoch"
    type = "S"
  }
}
