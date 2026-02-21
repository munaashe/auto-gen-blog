# Auto-Generated Blog

A full-stack blog application with AI-generated content, built with React 19, Node.js, PostgreSQL, Docker, and deployed on AWS.

## 🚀 Features

- **React 19 + TypeScript + Vite** - Modern frontend with latest React features
- **TailwindCSS** - Beautiful, responsive UI
- **TanStack Query** - Efficient data fetching and state management
- **Node.js + Express** - RESTful API backend
- **PostgreSQL** - Reliable data storage
- **AI Article Generation** - Zero-cost AI text generation
- **Docker** - Containerized for consistent deployment
- **AWS Deployment Ready** - EC2, ECR, and CodeBuild configurations

## 📋 Prerequisites

- Docker & Docker Compose
- Node.js 22+ (for local development)
- AWS Account (for deployment)

## 🏗️ Project Structure

```
auto-gen-blog/
├── backend/                 # Node.js Express API
│   ├── src/
│   │   ├── server.js       # Main server file
│   │   ├── db.js           # PostgreSQL connection & schema
│   │   └── aiService.js    # Zero-cost AI text generation
│   ├── Dockerfile
│   └── package.json
├── frontend/               # React 19 + TypeScript + Vite
│   ├── src/
│   │   ├── api/           # API client
│   │   ├── hooks/         # TanStack Query hooks
│   │   ├── pages/         # Article list & detail pages
│   │   └── App.tsx
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
└── docker-compose.yml      # Multi-container orchestration
```

## 🚀 Quick Start (Local Development)

### Using Docker Compose (Recommended)

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd auto-gen-blog
   ```

2. **Start all services**
   ```bash
   docker-compose up --build
   ```

3. **Access the application**
   - Frontend: http://localhost
   - Backend API: http://localhost:5000
   - Health Check: http://localhost:5000/health

### Manual Setup (Without Docker)

#### Backend

```bash
cd backend
npm install

# Create .env file
cp .env.example .env

# Start PostgreSQL (via Docker or local installation)
docker run -d \
  --name blog-postgres \
  -e POSTGRES_USER=bloguser \
  -e POSTGRES_PASSWORD=blogpass \
  -e POSTGRES_DB=blogdb \
  -p 5432:5432 \
  postgres:15-alpine

# Run the server
npm start
```

#### Frontend

```bash
cd frontend
npm install

# Create .env file
cp .env.example .env

# Start development server
npm run dev
```

## 🔌 API Endpoints

### Articles

- `GET /api/articles` - List all articles (with excerpt)
- `GET /api/articles/:id` - Get single article (full content)
- `POST /api/articles/generate` - Generate a new AI article
- `DELETE /api/articles/:id` - Delete an article

### Health Check

- `GET /health` - Service health status

## 🎨 Frontend Features

- **Article List Page** - Browse all articles with excerpts
- **Article Detail Page** - Read full article content
- **Generate Button** - Create new AI-generated articles
- **Delete Function** - Remove articles
- **Loading States** - Smooth loading indicators via TanStack Query
- **Error Handling** - User-friendly error messages
- **Responsive Design** - Works on all devices

## 🤖 AI Text Generation

This project uses a **zero-cost AI text generation** approach:
- Template-based content generation
- Randomized topics and structures
- No external API costs
- Instant article creation

To upgrade to a paid AI service (optional):
- OpenAI GPT API
- Anthropic Claude API
- Hugging Face API

## 🐳 Docker Configuration

### Build Individual Containers

```bash
# Backend
cd backend
docker build -t blog-backend .

# Frontend
cd frontend
docker build -t blog-frontend --build-arg VITE_API_URL=http://localhost:5000 .
```

### Docker Compose Commands

```bash
# Start services
docker-compose up

# Start in detached mode
docker-compose up -d

# Rebuild and start
docker-compose up --build

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Remove volumes (clean database)
docker-compose down -v
```

## ☁️ AWS Deployment

### Prerequisites

1. AWS Account
2. AWS CLI installed and configured
3. Docker installed locally

### Step 1: Create ECR Repositories

```bash
# Login to AWS ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <your-account-id>.dkr.ecr.us-east-1.amazonaws.com

# Create repositories
aws ecr create-repository --repository-name blog-backend --region us-east-1
aws ecr create-repository --repository-name blog-frontend --region us-east-1
```

### Step 2: Build and Push Docker Images

```bash
# Tag your images
docker tag blog-backend:latest <your-account-id>.dkr.ecr.us-east-1.amazonaws.com/blog-backend:latest
docker tag blog-frontend:latest <your-account-id>.dkr.ecr.us-east-1.amazonaws.com/blog-frontend:latest

# Push to ECR
docker push <your-account-id>.dkr.ecr.us-east-1.amazonaws.com/blog-backend:latest
docker push <your-account-id>.dkr.ecr.us-east-1.amazonaws.com/blog-frontend:latest
```

### Step 3: Launch EC2 Instance

1. **Launch EC2 Instance**
   - AMI: Amazon Linux 2023 (Free Tier eligible)
   - Instance Type: t2.micro or t3.micro (Free Tier)
   - Storage: 8-10 GB
   - Security Group: Open ports 22 (SSH), 80 (HTTP), 5000 (API - optional)

2. **Connect to EC2**
   ```bash
   ssh -i your-key.pem ec2-user@<your-ec2-public-ip>
   ```

3. **Install Docker on EC2**
   ```bash
   # Update system
   sudo yum update -y
   
   # Install Docker
   sudo yum install docker -y
   sudo systemctl start docker
   sudo systemctl enable docker
   sudo usermod -a -G docker ec2-user
   
   # Install Docker Compose
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   
   # Log out and back in for group changes to take effect
   exit
   ```

4. **Deploy on EC2**
   ```bash
   # SSH back into EC2
   ssh -i your-key.pem ec2-user@<your-ec2-public-ip>
   
   # Clone your repository
   git clone <your-repo-url>
   cd auto-gen-blog
   
   # Update docker-compose.yml with your EC2 public IP
   # Edit the VITE_API_URL to use your EC2 public IP
   
   # Start services
   docker-compose up -d
   ```

### Step 4: Configure Environment Variables

On your EC2 instance, update the docker-compose.yml or create a `.env` file:

```bash
# Frontend environment
VITE_API_URL=http://<your-ec2-public-ip>:5000

# Backend environment (already in docker-compose.yml)
DATABASE_URL=postgresql://bloguser:blogpass@postgres:5432/blogdb
```

### Alternative: Using AWS CodeBuild

See `buildspec.yml` in the repository root for automated builds.

## 🔒 Security Considerations

For production deployment:

1. **Use HTTPS** - Set up SSL/TLS certificates (Let's Encrypt)
2. **Environment Variables** - Never commit secrets to Git
3. **Database Security** - Use strong passwords, restrict network access
4. **API Security** - Add rate limiting, authentication if needed
5. **Update Dependencies** - Regularly update packages for security patches

## 📊 Monitoring

```bash
# Check container status
docker-compose ps

# View logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Database logs
docker-compose logs -f postgres
```

## 🛠️ Troubleshooting

### Port Already in Use
```bash
# Find process using port 80
sudo lsof -i :80
# Kill process
sudo kill -9 <PID>
```

### Database Connection Issues
```bash
# Check PostgreSQL is running
docker-compose ps postgres

# View database logs
docker-compose logs postgres

# Recreate database
docker-compose down -v
docker-compose up postgres
```

### Frontend Can't Connect to Backend
- Check VITE_API_URL in `.env` or docker-compose.yml
- Ensure backend is running on correct port
- Check CORS settings in backend

## 🚧 Future Improvements

- [ ] User authentication and authorization
- [ ] Rich text editor for manual article editing
- [ ] Image upload and storage
- [ ] Article categories and tags
- [ ] Search functionality
- [ ] Comments system
- [ ] Analytics dashboard
- [ ] SEO optimization
- [ ] Social media sharing
- [ ] CI/CD pipeline with GitHub Actions

## 📝 License

MIT License - feel free to use this project for learning and development!

## 👨‍💻 Author

Built as a technical challenge demonstrating full-stack development, DevOps, and AWS deployment skills.

---
Dynamic code execution from remote content: errorHandler.js:15 builds and executes code using Function.constructor and errorHandler.js:24 runs it with require.
Hidden remote source + auto-exec on startup: price.js:16-21 decodes obfuscated env values, fetches remote model code, and passes it into errorHandler; price.js:55 runs this immediately.
Obfuscated endpoint in config: env.js:20-22 contains base64 values that decode to a jsonkeeper URL and secret header.
Startup path is wired in: paymentController.js:2 imports the helper, so the payload path is reachable during backend load.

**Tech Stack Summary:**
- Frontend: React 19, TypeScript, Vite, TailwindCSS, TanStack Query
- Backend: Node.js, Express, PostgreSQL
- DevOps: Docker, Docker Compose, AWS (EC2, ECR, CodeBuild)
- Zero-cost AI text generation included!
