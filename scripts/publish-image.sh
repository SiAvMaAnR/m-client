#!/bin/bash

if [ -z "$1" ]; then
  imageName="samarkinivan/messenger-client"
else
  imageName="$1"
fi

# npm run prettier

# build image from Dockerfile
docker buildx build -t $imageName .

# push to DockerHub
docker push $imageName

# cache clear
docker buildx prune -af
