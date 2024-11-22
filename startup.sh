#!/bin/bash



# Navigate to the getaway service, install dependencies, and start the dev server
cp ./env-examples/getaway.env .env
cd ./getaway || exit
bun install
bun dev &
cd ..

# Navigate to the auth-service, install dependencies, apply migrations, and start the dev server
cp ./env-examples/auth.env .env
cd ./auth-service || exit
bun install
bunx prisma migrate deploy
bun dev &
cd ..

# Navigate to the profile-service, install dependencies, apply migrations, and start the dev server
cp ./env-examples/profile.env .env
cd ./profile-service || exit
bun install
bunx prisma migrate deploy
bun dev &
cd ..
