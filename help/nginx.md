# 🎵 Music Quiz Nginx Reverse Proxy Guide (Ubuntu)

This documentation provides a professional-grade architecture for hosting your Music Quiz game on a local network. It ensures that your **Master Control Panel** is strictly private to your laptop while providing accessible paths for the **Player Display** and **Leader Notes**.

---

## 🛠 1. Installation

Update your package list and install Nginx on your Ubuntu machine:

```bash
sudo apt update
sudo apt install nginx -y

## ⚙️ 2. Configuration

Professional Nginx setups on Ubuntu use the `sites-available` directory to keep configurations organized. This allows you to toggle the game server on or off without deleting files.

### Step A: Create the configuration file
Run this command to open a new configuration file in the `nano` text editor:
```bash
sudo nano /etc/nginx/sites-available/music-quiz

## 🚀 3. Activation & Security

After saving your configuration file, you must activate it within Nginx's internal structure and ensure the Ubuntu firewall allows external devices to connect.

### Step A: Link and Enable the Site
Nginx uses a "sites-enabled" folder to decide which configurations to actually run. Run these commands to link your file and disable the default welcome page:

```bash
# 1. Create a symbolic link to activate your quiz config
sudo ln -s /etc/nginx/sites-available/music-quiz /etc/nginx/sites-enabled/

# 2. Remove the default Nginx welcome configuration
sudo rm /etc/nginx/sites-enabled/default

## 📱 4. Usage Summary

This table summarizes how to access each part of the system once Nginx is running. Ensure your laptop is connected to the same WiFi network as your other devices.

| Interface | Primary User | Access URL | Device | Security Level |
| :--- | :--- | :--- | :--- | :--- |
| **Control Panel** | Game Host | `http://localhost:5174` | Laptop | **Private** (Locked to Host) |
| **Player Display** | Audience | `http://<YOUR_IP>/display` | TV/Projector | **Public** (No Controls) |
| **Leader Notes** | Game Master | `http://<YOUR_IP>/leader` | Smartphone | **Protected** (Cheat Sheet) |
| **System Root** | Everyone | `http://<YOUR_IP>/` | Any | **Blocked** (403 Forbidden) |



---

### 💡 Host Best Practices

* **Bookmark the Links:** Save the `/display` and `/leader` links on the target devices' home screens for instant access.
* **Static IP:** For a professional experience, set a static IP on your Ubuntu laptop so the addresses don't change if the router reboots.
* **Screen Timeout:** Disable the "Auto-Lock" or "Sleep" mode on the phone used for the Leader Display to ensure you don't lose your notes mid-song.
* **Full-Screen Mode:** On most mobile browsers, you can "Add to Home Screen" to launch the Leader Display without the browser address bar, giving you more vertical space for notes.

---

### 🔍 Verification Checklist
Before the players arrive, run this 10-second test:
1.  **Laptop:** Can I click buttons? (Yes ✅)
2.  **TV:** Can I see the "Waiting for Players" screen? (Yes ✅)
3.  **Phone:** Can I see the song notes? (Yes ✅)
4.  **Phone (Root):** Does `http://<YOUR_IP>/` show an error? (Yes ✅)


## 🔍 5. Professional Maintenance

As a professional host, you need to be able to monitor connections and update your setup quickly when moving between different WiFi networks.

### 📊 Real-Time Monitoring
You can watch every connection attempt in real-time. This is useful for verifying that the TV and your phone have connected successfully, or for spotting if someone is trying to access restricted areas.

Run this in your Ubuntu terminal:
```bash
# Watch live access logs (Press Ctrl+C to stop)
sudo tail -f /var/log/nginx/access.log

## 🔍 6. Verification

```netstat -tuln | grep 5174

```sudo nginx -t

```sudo systemctl status nginx

