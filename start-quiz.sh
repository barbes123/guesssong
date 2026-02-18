#!/bin/bash

# 1. Detect local IP automatically
CURRENT_IP=$(hostname -I | awk '{print $1}')
VITE_PORT=5174
BUZZER_PORT=3001

echo "------------------------------------------------"
echo "🚀 AUTO-CONFIGURING SYSTEM"
echo "📍 Current IP:   $CURRENT_IP"
echo "🌐 Vite Port:    $VITE_PORT"
echo "⚡ Buzzer Port:  $BUZZER_PORT"
echo "------------------------------------------------"

# 2. Update NGINX config variables
echo "📝 Updating NGINX config..."
sudo sed -i "s/default [0-9]\{4\};/default $VITE_PORT;/" /etc/nginx/sites-available/music-quiz
sudo sed -i "s/default [0-9.]*;/default $CURRENT_IP;/" /etc/nginx/sites-available/music-quiz

# 3. Update configBuzz.json with the new IP
# This looks for "SOCKET_URL": "http://any-ip:port" and replaces the IP
echo "🔧 Updating configBuzz.json..."
sed -i "s|\"SOCKET_URL\": \"http://[0-9.]*:$BUZZER_PORT\"|\"SOCKET_URL\": \"http://$CURRENT_IP:$BUZZER_PORT\"|" configBuzz.json

# 4. Restart NGINX to apply changes
echo "♻️ Restarting NGINX..."
sudo systemctl restart nginx

# 5. Start the Vite App
echo "🎮 Starting Game Engine..."
npm run dev -- --port $VITE_PORT --host
