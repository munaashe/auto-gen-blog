#!/bin/bash

set -e

echo "=== Auto-Generated Blog - EC2 Deployment Script ==="

echo "Updating system packages..."
sudo yum update -y

echo "Installing Docker..."
sudo yum install docker -y
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -a -G docker ec2-user

echo "Installing Docker Compose..."
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

echo "Installing Git..."
sudo yum install git -y

EC2_PUBLIC_IP=$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)
echo "EC2 Public IP: $EC2_PUBLIC_IP"

echo "Cloning repository..."
read -p "Enter your repository URL: " REPO_URL
git clone $REPO_URL
cd auto-gen-blog

echo "Configuring environment variables..."
cat > frontend/.env << EOF
VITE_API_URL=http://${EC2_PUBLIC_IP}:5000
EOF

echo "Updating docker-compose.yml with EC2 IP..."
sed -i "s|VITE_API_URL:.*|VITE_API_URL: http://${EC2_PUBLIC_IP}:5000|" docker-compose.yml

echo "Starting Docker containers..."
docker-compose up -d --build

echo ""
echo "=== Deployment Complete! ==="
echo ""
echo "Your application is now running at:"
echo "Frontend: http://${EC2_PUBLIC_IP}"
echo "Backend API: http://${EC2_PUBLIC_IP}:5000"
echo ""
echo "To view logs: docker-compose logs -f"
echo "To stop: docker-compose down"
echo "To restart: docker-compose restart"
echo ""
echo "Note: Make sure your EC2 Security Group allows inbound traffic on ports 80 and 5000"
