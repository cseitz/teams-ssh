#!/usr/bin/env bash

USER=$1

if ! id "$USER" &>/dev/null; then
    echo "creating user $USER"
    adduser --disabled-password --gecos "" $USER
    passwd -d $USER
    mkdir /home/$USER/.ssh
    chown -R $USER /home/$USER
    chmod 0700 /home/$USER/.ssh
    echo "user $USER has been created"
fi

if [[ -p /dev/stdin ]]
    then
    PIPE=$(cat -)
    echo $PIPE > /home/$USER/.ssh/authorized_keys
    chown -R $USER /home/$USER
    chmod 0700 /home/$USER/.ssh
fi
