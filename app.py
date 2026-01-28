from flask import Flask, jsonify, request, render_template, url_for
from scanner import ping_sweep,port_scan

app = Flask(__name__)

# Home route
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api/ping_sweep",methods=["POST"])
def ping_sweep_handler():
    data = request.get_json()
    if not data and "network" not in data or "netmask" not in data:
        return "Network and/or netmask is required."
    
    network = str(data["network"])
    netmask = str(data["netmask"])

    results = ping_sweep(network,netmask)

    return jsonify(results)

@app.route("/api/port_scan",methods=["POST"])
def port_scan_handler():
    data = request.get_json()
    if not data and "ip" not in data or "port_range" not in data:
        return "IP and/or port range is required."
    
    ip = str(data["ip"])
    port_range = list(range(1, int(data["port_range"])))

    open_ports = port_scan(ip, port_range)
    return jsonify(open_ports)


if __name__ == "__main__":
    app.run(debug=True)
