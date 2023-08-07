# blog-posts-fullstack

To run the development version simply run

```sh
docker compose up
```

To run the production version first set the following envs

```bash
BLOG_POSTS_SERVER_URL=http://server:8080
NEXT_PUBLIC_BLOG_POSTS_SERVER_URL=http://localhost:8080
NEXT_PUBLIC_S3_SECRET_ACCESS_KEY=miniosecret
NEXT_PUBLIC_S3_ACCESS_KEY_ID=miniokey
NEXT_PUBLIC_S3_ENDPOINT=http://localhost:9000
NEXT_PUBLIC_S3_BUCKET_NAME=blog-posts
NEXT_PUBLIC_S3_REGION=us-east-1
PORT=8080
ACCESSTOKENTTL=15m
REFRESHTOKENTTL=1y
JWT_SECRET=thisasecret
MINIO_ACCESS_KEY=key
MINIO_SECRET_KEY=secret
MONGO_INITDB_ROOT_USERNAME:root
MONGO_INITDB_ROOT_PASSWORD:password
```

then run

```
docker compose -f docker-compose-prod.yml up
```

checkout the deployed version at http://65.2.71.246:3000/dashboard/
