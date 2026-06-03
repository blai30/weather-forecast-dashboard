#! /bin/bash
docker build --platform linux/arm64 -t rtsp-to-onvif:arm64 https://github.com/p10tyr/rtsp-to-onvif.git

# Run this for dev
# docker build -t rtsp-to-onvif https://github.com/p10tyr/rtsp-to-onvif.git
