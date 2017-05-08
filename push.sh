#!/bin/sh

BRANCH=$(git rev-parse --abbrev-ref HEAD)

if [ "development" != ${BRANCH} ]; then
    echo "you are not on development branch"
    exit 0
fi

npm run deploy:prod

LC=$(git rev-parse --short HEAD)

docker build -f Dockerfile -t 356349293049.dkr.ecr.us-west-2.amazonaws.com/blitz-frontend:${LC} .

AWS_LOGIN=$(aws ecr get-login --region us-west-2)
eval ${AWS_LOGIN}
docker push 356349293049.dkr.ecr.us-west-2.amazonaws.com/blitz-frontend:${LC}

# rm dist folder after build
rm -rf dist/

# replace LAST_COMMIT with latest commit hash output the result to a tmp file
sed "s/blitz-frontend:LAST_COMMIT/blitz-frontend:$LC/g" ecs/task-definitions/frontend.json > frontend.json.tmp

# register the new task definition and delete the tmp file
aws ecs register-task-definition --cli-input-json file://frontend.json.tmp
rm frontend.json.tmp

# update the service
aws ecs update-service --service frontend --task-definition frontend --desired-count 1 --cluster blitz-monitoring
