#!/bin/sh
echo "Deploy s0journ..."

process_id=`ps -ef | grep ./s0journ | grep -v "grep" | awk '{print $2}'`

# make sure LOG_DIR exists
if [ $process_id ]; then
    echo "Got running process...: " $process_id
	echo "Killing process with id ..." $process_id
	kill -9 $process_id
fi

cd /home/ubuntu

DATE=`date  +"%Y%m%d-%H%M"`
ARCHIVE_DIR=archive/s0journ/$DATE

echo "Archiving current application to " $ARCHIVE_DIR
mkdir -p $ARCHIVE_DIR

mv s0journ/* ./$ARCHIVE_DIR

cd s0journ
tar xf /home/ubuntu/deploy/application.tar

echo "Re-start s0journ server"

nohup ./s0journ >startup.log 2>&1 </dev/null &

echo "s0journ Server Deploy Completed..."

exit;
