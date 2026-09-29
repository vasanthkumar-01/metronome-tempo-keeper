data "aws_vpc" "existing" {
  id = "vpc-073452db0bbf54ed6"
}

data "aws_subnet" "public" {
  id = "subnet-036c1268eaadda753"
}

data "aws_security_group" "metronome" {
  name = "metronome-sg"

  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.existing.id]
  }
}

data "aws_key_pair" "metronome" {
  key_name = "metronome-key"
}

resource "aws_instance" "kubernetes" {
  ami                         = "ami-0f918f7e67a3323f0"
  instance_type               = var.instance_type
  subnet_id                   = data.aws_subnet.public.id
  vpc_security_group_ids     = [data.aws_security_group.metronome.id]
  associate_public_ip_address = true
  key_name                    = data.aws_key_pair.metronome.key_name

  tags = {
    Name = var.instance_name
  }
}
