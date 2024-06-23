from pyfingerprint.pyfingerprint import PyFingerprint

try:
    # Initialize the sensor
    f = PyFingerprint('/dev/ttyUSB0', 57600, 0xFFFFFFFF, 0x00000000)

    if f.verifyPassword() == False:
        raise ValueError('The given fingerprint sensor password is wrong!')

    # Enroll a new finger
    print('Waiting for finger...')
    while f.readImage() == False:
        pass

    f.convertImage(0x01)
    result = f.searchTemplate()

    if result[0] >= 0:
        print('Finger already enrolled!')
    else:
        print('Finger not recognized.')

except Exception as e:
    print('Operation failed!')
    print('Exception message: ' + str(e))