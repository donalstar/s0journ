#!/bin/sh
cd ../src/s0journ
GOOS=linux GOARCH=386 CGO_ENABLED=0 go build -o ../../out/s0journ
cd ../../bin

