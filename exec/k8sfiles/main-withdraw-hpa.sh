#!/bin/bash
NAME=main-withdraw

kubectl delete hpa $NAME
kubectl autoscale deployment $NAME --cpu-percent=50 --min=1 --max=3
