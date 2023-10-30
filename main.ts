/* Copyright (c) 2020 MTHS All rights reserved
 *
 * Created by: Mr. Coxall
 * Created on: Sep 2020
 * This program ...
*/

// variables
let neopixelStrip: neopixel.Strip = null
let distanceToObject: number = 0

// setup
basic.clearScreen()
neopixelStrip = neopixel.create(DigitalPin.P16, 4, NeoPixelMode.RGB)
neopixelStrip.setPixelColor(0, neopixel.colors(NeoPixelColors.Black))
neopixelStrip.setPixelColor(1, neopixel.colors(NeoPixelColors.Black))
neopixelStrip.setPixelColor(2, neopixel.colors(NeoPixelColors.Black))
neopixelStrip.setPixelColor(3, neopixel.colors(NeoPixelColors.Black))
neopixelStrip.show()
basic.showIcon(IconNames.Happy)

input.onButtonPressed(Button.A, function () {
  basic.clearScreen()
  // detcect distance from object
  distanceToObject = sonar.ping(
    DigitalPin.P1,
    DigitalPin.P2,
    PingUnit.Centimeters
  )

  // if distance from object is less than 10 cm show light neopixels to red
  if (distanceToObject < 10) {
    neopixelStrip.setPixelColor(0, neopixel.colors(NeoPixelColors.Red))
    neopixelStrip.setPixelColor(1, neopixel.colors(NeoPixelColors.Red))
    neopixelStrip.setPixelColor(2, neopixel.colors(NeoPixelColors.Red))
    neopixelStrip.setPixelColor(3, neopixel.colors(NeoPixelColors.Red))
    neopixelStrip.show()
    basic.pause(1000)
    neopixelStrip.setPixelColor(0, neopixel.colors(NeoPixelColors.Black))
    neopixelStrip.setPixelColor(1, neopixel.colors(NeoPixelColors.Black))
    neopixelStrip.setPixelColor(2, neopixel.colors(NeoPixelColors.Black))
    neopixelStrip.setPixelColor(3, neopixel.colors(NeoPixelColors.Black))
  } else {
    // if distance from object is greater than 10 cm show light neopixels to green
    neopixelStrip.setPixelColor(0, neopixel.colors(NeoPixelColors.Green))
    neopixelStrip.setPixelColor(1, neopixel.colors(NeoPixelColors.Green))
    neopixelStrip.setPixelColor(2, neopixel.colors(NeoPixelColors.Green))
    neopixelStrip.setPixelColor(3, neopixel.colors(NeoPixelColors.Green))
    neopixelStrip.show()
    basic.pause(1000)
    neopixelStrip.setPixelColor(0, neopixel.colors(NeoPixelColors.Black))
    neopixelStrip.setPixelColor(1, neopixel.colors(NeoPixelColors.Black))
    neopixelStrip.setPixelColor(2, neopixel.colors(NeoPixelColors.Black))
    neopixelStrip.setPixelColor(3, neopixel.colors(NeoPixelColors.Black))
  }
  neopixelStrip.show()
  // reset
  basic.showNumber(distanceToObject)
  basic.showIcon(IconNames.Happy)
})
