import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
import uuid

# Path to your Firebase service account key
SERVICE_ACCOUNT_KEY_PATH = 'credentials.json'

# Initialize Firebase app
cred = credentials.Certificate(SERVICE_ACCOUNT_KEY_PATH)
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://hackelite-museum-default-rtdb.asia-southeast1.firebasedatabase.app/'  # Replace with your Firebase database URL
})

def upload_error_data(predicted_defect, sensor_data, time):
    # Generate a unique ID for the new error entry
    error_id = str(uuid.uuid4())
    
    # Define the error data with the unique ID
    error_data = {
        'predicted_defect': predicted_defect,
        'sensor_data': sensor_data,
        'time': time
    }
    
    # Reference to the 'errors' node in the Firebase Realtime Database
    ref = db.reference('errors')
    
    # Set the new error entry with the unique ID
    ref.child(error_id).set(error_data)

    print(f"Error data uploaded successfully with ID: {error_id}")

# Sample data
predicted_defect = "High vibration"
sensor_data = {
    'Current_Sensor': 3,
    'Humidity_Sensor': 42,
    'Pressure_Sensor': 126,
    'Proximity_Sensor': 7.2,
    'Sound_Level_Sensor': 30,
    'Temperature_Sensor': 220.5,
    'Vibration_Sensor': 2.05,
    'Voltage_Sensor': 150
}
time = "22:07:42"

# Upload the sample data
upload_error_data(predicted_defect, sensor_data, time)
