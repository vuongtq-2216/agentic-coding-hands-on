# Agentic Coding

## Prerequisites

- Node.js v24.x
- Docker (for running Supabase)
- Yarn v1.22.22 (package manager)

### Tech Stack

- **Next.js** – A React framework for building full-stack web applications
- **Supabase** – A Backend-as-a-Service (BaaS) platform providing database, authentication, and real-time features
- **Cloudflare Workers** – An edge computing platform for deploying and running applications
- **TailwindCSS** – A utility-first CSS framework for quickly building responsive user interfaces

## Development

```sh
# create .env file:
cp .env.example .env

# start local containers:
make up

# start dev server:
make dev

# stop development containers:
make down
```
