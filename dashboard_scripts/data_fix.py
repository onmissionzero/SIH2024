import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
import random
from datetime import datetime, timedelta

# Initialize Firebase
cred = credentials.Certificate('credentials.json')
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://hackelite-museum-default-rtdb.asia-southeast1.firebasedatabase.app'
})

def generate_sensor_data():
    # Simulated readings
    hall_effect = random.uniform(0, 5)        # Example range
    ds18b20_temp = random.uniform(20, 25)     # Temperature in °C
    hx711_weight = random.uniform(0, 100)      # Weight in grams
    mq7_co_concentration = random.uniform(0, 100)  # CO concentration in ppm
    mpu6050_accel = [random.uniform(-2, 2) for _ in range(3)]  # Acceleration in g
    acs712_current = random.uniform(-10, 10)   # Current in A

    return {
        "hall_effect": 4.372,
        "ds18b20": 35.051248,
        "hx711": 70.12411,
        "mq7": 60.235135,
        "mpu6050": [-0.12515151,-0.85373642626,-0.632636],
        "acs712": 3.877654354,
        "timestamp": datetime.now().isoformat()
    }

def send_to_firebase(sensor_data):
    unique_id = f"{int(datetime.now().timestamp() * 1000)}"
    db.reference('sensor-data/' + unique_id).set(sensor_data)

def main():
    current_time = datetime.now()
    sensor_data = generate_sensor_data()
    send_to_firebase(sensor_data)
    exit(0)
    while True:
        # Generate and send sensor data
        sensor_data = generate_sensor_data()
        
        # Create a new timestamp that simulates continuous time progression
        current_time += timedelta(seconds=random.uniform(1, 5))
        sensor_data["timestamp"] = current_time.isoformat()
        
        send_to_firebase(sensor_data)
        print("Sent to Firebase:", sensor_data)

if __name__ == "__main__":
    main()
