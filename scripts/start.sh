#!/bin/bash
cd /home/ubuntu/Banana-market/server

export DATABASE_USERNAME=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_USERNAME --query Parameters[0].Value | sed 's/"//g')
export DATABASE_PASSWORD=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_PASSWORD --query Parameters[0].Value | sed 's/"//g')
export DATABASE_PORT=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_PORT --query Parameters[0].Value | sed 's/"//g')
export DATABASE_HOST=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_HOST --query Parameters[0].Value | sed 's/"//g')
export DATABASE_NAME=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_NAME --query Parameters[0].Value | sed 's/"//g')

export HTTP_PORT=$(aws ssm get-parameters --region ap-northeast-2 --names HTTP_PORT --query Parameters[0].Value | sed 's/"//g')

export ACCESS_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names ACCESS_SECRET --query Parameters[0].Value | sed 's/"//g')
export REFRESH_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names REFRESH_SECRET --query Parameters[0].Value | sed 's/"//g')

export GOOGLE_CLIENT_ID=$(aws ssm get-parameters --region ap-northeast-2 --names GOOGLE_CLIENT_ID --query Parameters[0].Value | sed 's/"//g')
export GOOGLE_CLIENT_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names GOOGLE_CLIENT_SECRET --query Parameters[0].Value | sed 's/"//g')
export GOOGLE_REDIRECT_URI=$(aws ssm get-parameters --region ap-northeast-2 --names GOOGLE_REDIRECT_URI --query Parameters[0].Value | sed 's/"//g')

export EMAIL=$(aws ssm get-parameters --region ap-northeast-2 --names EMAIL --query Parameters[0].Value | sed 's/"//g')
export PASSWORD=$(aws ssm get-parameters --region ap-northeast-2 --names PASSWORD --query Parameters[0].Value | sed 's/"//g')

export AKEY=$(aws ssm get-parameters --region ap-northeast-2 --names AKEY --query Parameters[0].Value | sed 's/"//g')
export ASECRET=$(aws ssm get-parameters --region ap-northeast-2 --names ASECRET --query Parameters[0].Value | sed 's/"//g')


sleep 10s && pm2 status // pm2????????? ?????? - ????????? ???????????????, codedeploy ->?????? ??????
echo $DATABASE_HOST     // ??????????????? DATABASE_HOST??? ?????? ???????????? ??????
node check.js           // ????????? check.js??? ????????? ????????? ??????????????? ?????? console.log??? ??????????????? ??????

authbind --deep pm2 start index.js