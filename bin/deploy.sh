#!/bin/sh
echo "Deploy s0journ"

ENV=$1
if [ -z "$ENV" ]; then
  ENV="dev"
fi

if [ "$ENV" != "dev" ] && [ "$ENV" != "prod" ]; then
    echo "USAGE: deploy.sh [dev|prod]"
fi

echo "\tDeploying to $ENV..."

if [ "$ENV" == "dev" ]; then
    DEST_SERVER=ec2-184-72-216-160.compute-1.amazonaws.com
    KEY_FILE=trust_cloud_dev.pem
else
    DEST_SERVER=ec2-107-20-240-138.compute-1.amazonaws.com
    KEY_FILE=trust_cloud.pem
fi

KEYS_DIR=/Users/donal/TrustCloud/keys

./build.sh

ARCHIVE=s0journ.tar

tar cf application.tar ../*.html -C ../out s0journ -C .. Content app
tar cf $ARCHIVE ./application.tar  ./execute.sh

scp -i $KEYS_DIR/$KEY_FILE $ARCHIVE ubuntu@$DEST_SERVER:/tmp
ssh -i $KEYS_DIR/$KEY_FILE ubuntu@$DEST_SERVER << EOT

cd /home/ubuntu

mkdir -p deploy

cd deploy

rm -rf *

tar  xvf /tmp/$ARCHIVE

./execute.sh

EOT

rm *.tar

echo "Deploy completed"

exit;
