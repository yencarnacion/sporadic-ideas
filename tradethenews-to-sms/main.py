import sounddevice as sd
import numpy as np
import io
import requests

fs = 44100  # Sample rate
seconds = 30  # Duration of recording
threshold = 15  # volume threshold for sound detection
is_recording = False  # Variable to track if we are currently recording

def audio_callback(indata, frames, time, status):
    global is_recording

    volume_norm = np.linalg.norm(indata)*10
    print("volume_norm =", volume_norm)
    if volume_norm > threshold and not is_recording:
	print("Sound detected! Starting Recording.")
	is_recording = True  # Set is_recording to True since we are about to start recording
	record_and_send_audio()
	is_recording = False  # Set is_recording back to False since we have finished recording

def record_and_send_audio():
    print("Recording Audio")
    recording = sd.rec(int(seconds * fs), samplerate=fs, channels=2)
    sd.wait()  # Wait until recording is finished
    print("Recording Finished")

    # convert the numpy array to bytes
    byte_io = io.BytesIO()
    np.save(byte_io, recording)
    byte_audio = byte_io.getvalue()

    # send the audio data to REST API
    response = requests.post('http://example.com/audio', data=byte_audio)
    print("Response from server: ", response.text)

stream = sd.InputStream(callback=audio_callback)
with stream:
    while True:
        sd.sleep(1000)  # Check for sound every second
	    
