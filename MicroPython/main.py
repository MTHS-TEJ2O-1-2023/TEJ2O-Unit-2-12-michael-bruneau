"""
Created by: Michael B
Created on: Oct 2023
This module is a Micro:bit MicroPython program
"""

from microbit import *
import neopixel


class HCSR04:
    # this class abstracts out the functionality of the HC-SR04 and
    #   returns distance in mm
    # Trig: pin 1
    # Echo: pin 2
    def __init__(self, tpin=pin1, epin=pin2, spin=pin13):
        self.trigger_pin = tpin
        self.echo_pin = epin
        self.sclk_pin = spin

    def distance_mm(self):
        spi.init(
            baudrate=125000,
            sclk=self.sclk_pin,
            mosi=self.trigger_pin,
            miso=self.echo_pin,
        )
        pre = 0
        post = 0
        k = -1
        length = 500
        resp = bytearray(length)
        resp[0] = 0xFF
        spi.write_readinto(resp, resp)
        # find first non zero value
        try:
            i, value = next((ind, v) for ind, v in enumerate(resp) if v)
        except StopIteration:
            i = -1
        if i > 0:
            pre = bin(value).count("1")
            # find first non full high value afterwards
            try:
                k, value = next(
                    (ind, v)
                    for ind, v in enumerate(resp[i : length - 2])
                    if resp[i + ind + 1] == 0
                )
                post = bin(value).count("1") if k else 0
                k = k + i
            except StopIteration:
                i = -1
        dist = -1 if i < 0 else round(((pre + (k - i) * 8.0 + post) * 8 * 0.172) / 2)
        return dist


# variables
np = neopixel.NeoPixel(pin16, 5)
sonar = HCSR04()

# setup
display.clear
display.show(Image.HAPPY)
np[0] = (0, 0, 0)
np[1] = (0, 0, 0)
np[2] = (0, 0, 0)
np[3] = (0, 0, 0)
np.show()

# loop
while True:
    if button_a.is_pressed():
        display.clear()
        # detects distance from object
        distance = sonar.distance_mm() / 10
        display.show(distance)
        # if distance from object is less then 10 light neopixels red
        if distance < 10:
            np[0] = (255, 0, 0)
            np[1] = (255, 0, 0)
            np[2] = (255, 0, 0)
            np[3] = (255, 0, 0)
            np.show()
            sleep(1000)
            np[0] = (0, 0, 0)
            np[1] = (0, 0, 0)
            np[2] = (0, 0, 0)
            np[3] = (0, 0, 0)
        else:
            # if distance from object is greater then 10 light neopixels green
            np[0] = (0, 255, 0)
            np[1] = (0, 255, 0)
            np[2] = (0, 255, 0)
            np[3] = (0, 255, 0)
            np.show()
            sleep(1000)
            np[0] = (0, 0, 0)
            np[1] = (0, 0, 0)
            np[2] = (0, 0, 0)
            np[3] = (0, 0, 0)
        np.show()
        sleep(1000)
        display.show(Image.HAPPY)
