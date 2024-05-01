#!/usr/bin/env bash

# Run the build
pnpm run build

# Restart the server
launchctl kickstart -k gui/`id -u`/org.pqrs.karabiner.karabiner_console_user_server
