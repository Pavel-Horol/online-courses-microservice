#!/bin/bash


start_redis() {
  echo "Checking if Redis is already running..."
  if docker ps | grep -q redis-container; then
    echo "Redis is already running."
  else
    echo "Starting Redis in Docker..."
    docker run -d --name redis-container -p 6379:6379 redis:latest || echo "Failed to start Redis, continuing..."
  fi
}

start_redis


cp ./env-examples/getaway.env .env
cp ./env-examples/auth.env .env
cp ./env-examples/profile.env .env