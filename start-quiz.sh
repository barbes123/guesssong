#!/bin/bash

# 1. Get mode from parameter ($1), default to 1 (Local WiFi)
# Usage: ./start-quiz.sh    (Local)
# Usage: ./start-quiz.sh 2  (Tailscale)
MODE=${1:-1}

# 2. Detect IP based on choice
if [ "$MODE" == "2" ]; then
    # TAILSCALE MODE (Looks for 100.x.x.x)
    CURRENT_IP=$(hostname -I | tr ' ' '\n' | grep '^100\.' | head -n 1)
else
    # LOCAL MODE (Looks for 192.168.x.x or 10.x.x.x)
    CURRENT_IP=$(hostname -I | tr ' ' '\n' | grep -E '192\.168\.|^10\.' | head -n 1)
fi

# Fallback to first IP if specific detection fails
if [ -z "$CURRENT_IP" ]; then
    CURRENT_IP=$(hostname -I | awk '{print $1}')
fi

VITE_PORT=5174
BUZZER_PORT=3001

echo "------------------------------------------------"
echo "🚀 AUTO-CONFIGURING SYSTEM"
echo "📍 Current IP:   $CURRENT_IP"
echo "🌐 Vite Port:    $VITE_PORT"
echo "⚡ Buzzer Port:  $BUZZER_PORT"
echo "------------------------------------------------"

# 3. Update NGINX config variables (Only if file exists)
if [ -f /etc/nginx/sites-available/music-quiz ]; then
    echo "📝 Updating NGINX config..."
    sudo sed -i "s/default [0-9]\{4\};/default $VITE_PORT;/" /etc/nginx/sites-available/music-quiz
    sudo sed -i "s/default [0-9.]*;/default $CURRENT_IP;/" /etc/nginx/sites-available/music-quiz
    sudo systemctl restart nginx
fi

# 4. Update configBuzz.json with the new IP
echo "🔧 Updating configBuzz.json..."
# This targets any line starting with "SOCKET_URL" and replaces the whole value
sed -i "s|\"SOCKET_URL\": \".*\"|\"SOCKET_URL\": \"http://$CURRENT_IP:$BUZZER_PORT/\"|" configBuzz.json
# Optional: Also update the SERVER_IP line if you use it elsewhere
sed -i "s|\"SERVER_IP\": \".*\"|\"SERVER_IP\": \"$CURRENT_IP\"|" configBuzz.json

# 5. Show the QR Code BEFORE Vite starts (so it appears in the logs)
echo "📲 SCAN TO JOIN GAME:"
qrencode -t ansiutf8 "http://$CURRENT_IP:$VITE_PORT"
echo "------------------------------------------------"

# 6. Start the Vite App with --clearScreen false
# This prevents Vite from wiping the QR code off the screen
echo "🎮 Starting Game Engine..."
npm run dev -- --port $VITE_PORT --host --clearScreen false
