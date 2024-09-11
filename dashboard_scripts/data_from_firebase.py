import os
import firebase_admin
from firebase_admin import credentials, db
import json
import csv

# Initialize Firebase Admin SDK
def initialize_firebase():
    cred = credentials.Certificate('credentials.json')  # Path to your service account key
    firebase_admin.initialize_app(cred, {
        'databaseURL': 'https://hackelite-museum-default-rtdb.asia-southeast1.firebasedatabase.app'  # Your database URL
    })

# Fetch data from Firebase Realtime Database
def fetch_data():
    try:
        ref = db.reference('sensor_data')
        data = ref.get()
        return data
    except Exception as e:
        print(f"Error fetching data: {e}")
        raise

# Save data as JSON
def save_data_as_json(data):
    try:
        with open('sensor_data.json', 'w') as f:
            json.dump(data, f, indent=2)
        print("Data has been saved as JSON.")
    except Exception as e:
        print(f"Error saving data as JSON: {e}")

# Convert data to CSV format and save (append mode)
def save_data_as_csv(data):
    try:
        file_exists = os.path.isfile('sensor_data.csv')
        with open('sensor_data.csv', 'a', newline='') as csvfile:
            fieldnames = ['Category', 'Timestamp', 'Value']
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

            if not file_exists:
                writer.writeheader()  # Write header only if the file is new

            for category, timestamps in data.items():
                for timestamp, keys in timestamps.items():
                    for key, value in keys.items():
                        writer.writerow({
                            'Category': category,
                            'Timestamp': timestamp,
                            'Value': value
                        })
        print("Data has been appended to CSV.")
    except Exception as e:
        print(f"Error saving data as CSV: {e}")

# Main function to execute the workflow
def main():
    initialize_firebase()
    data = fetch_data()
    save_data_as_json(data)
    save_data_as_csv(data)

if __name__ == "__main__":
    main()
