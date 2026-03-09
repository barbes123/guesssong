import fs from 'fs';
import os from 'os';
import { io } from 'socket.io-client';

// 1. Load Configurations
let config;
try {
    config = JSON.parse(fs.readFileSync('./configBuzz.json', 'utf8'));
} catch (e) {
    console.error("❌ ERROR: Could not find configBuzz.json");
    process.exit(1);
}

// 2. Extract the IP we WANT to use from the config
const configUrl = new URL(config.SOCKET_URL);
const targetIP = configUrl.hostname;

// 3. Get all available IPs on this laptop
const networkInterfaces = os.networkInterfaces();
const availableIPs = [];
for (const interfaceName in networkInterfaces) {
    for (const iface of networkInterfaces[interfaceName]) {
        if (iface.family === 'IPv4' && !iface.internal) {
            availableIPs.push(iface.address);
        }
    }
}

console.log(`\n--- 🔍 NOVABUZZER SYSTEM CHECK ---`);
console.log(`⚙️  Target IP (from config): ${targetIP}`);

// 4. Validation Logic: Does this laptop actually have the target IP?
const isIpOwnedByLaptop = availableIPs.includes(targetIP);

if (isIpOwnedByLaptop) {
    console.log(`✅ MATCH: This laptop owns ${targetIP}. All devices on this network can see you.`);
} else {
    console.log(`❌ MISMATCH: Your laptop does NOT own ${targetIP}.`);
    console.log(`   Your current IPs are: ${availableIPs.join(', ')}`);
    console.log(`   Action: Run your bash script again to sync the IP.`);
    // We don't exit here, so we can still try to connect via localhost/internal routes
}

// 5. Active Connection Test (The "Handshake")
console.log(`\n📡 Attempting to connect to the Buzzer Engine at ${config.SOCKET_URL}...`);
const socket = io(config.SOCKET_URL, { 
    timeout: 3000,
    transports: ['websocket'] 
});

socket.on('connect', () => {
    console.log("✅ SERVER REACHABLE: Socket.io connection established.");
    console.log("🔑 Sending test 'host' registration...");
    socket.emit('register', { name: 'DIAGNOSTIC_TOOL', role: 'host', code: '' });
});

socket.on('registered', (data) => {
    if (data.success) {
        console.log("✅ HANDSHAKE SUCCESS: Server accepted the Host role.");
        console.log(`   Gate Code is currently: ${data.gateCode}`);
    } else {
        console.log(`❌ HANDSHAKE FAILED: Server rejected registration. Error: ${data.error}`);
    }
    socket.disconnect();
    process.exit(0);
});

socket.on('connect_error', (err) => {
    console.log("❌ SERVER UNREACHABLE: Is server.js running on port 3001?");
    console.log(`   Error Detail: ${err.message}`);
    process.exit(1);
});