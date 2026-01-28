# Flask Network Scanner

A Flask-based web application that exposes basic network scanning functionality through a REST API.  
This project demonstrates ICMP ping sweeps and TCP SYN port scanning using Python and Scapy.

⚠️ **For educational and authorized testing purposes only.**

---

## 🚀 Features

- ICMP ping sweep to discover live hosts
- TCP SYN port scanning
- REST API endpoints
- Concurrent scanning using thread pools
- Simple Flask frontend

---

## 🛠 Tech Stack

- Python
- Flask
- Scapy
- ThreadPoolExecutor
- ipaddress
- HTML / Jinja2

---

## 📂 Project Structure

    project/
    ├── app.py
    ├── scanner.py
    ├── templates/
    │   └── index.html
    │   └── base.html
    ├── static/
    │   └── css
    │   │    └── style.css
    │   └── js\
    │       └── main.js
    ├── requirements.txt
    └── README.md

---

## ⚙️ Setup & Run Locally

### Clone the repository

    git clone https://github.com/TechLukas/NetMapper.git
    cd NetMapper

### Create and activate a virtual environment

    python -m venv venv
    source venv/bin/activate   # Windows: venv\Scripts\activate

### Install dependencies

    pip install -r requirements.txt

### Run the application with privileges

    sudo -E venv/bin/python3 app.py

Open your browser at:  
http://127.0.0.1:5000

⚠️ **Note:** Scapy requires elevated privileges.  
You may need to run the app with `sudo` on Linux/macOS.

---

## 🧠 How It Works

- ICMP echo requests identify live hosts
- TCP SYN packets detect open ports
- Scans are parallelized for performance
- Results are returned as JSON via Flask

---

## 👋 About

This project showcases Flask API development, concurrency, and low-level networking in Python.  
It is intended as a portfolio project demonstrating practical backend and systems skills.
