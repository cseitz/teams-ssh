#!/usr/bin/env bash

USER=$1

# Remove user from sudo
usermod -aG sudo $USER