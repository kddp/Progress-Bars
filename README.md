# Progress-Bars

### Dynamic progress bars without any javascript library.

End point url : [End points](http://pb-api.herokuapp.com/bars)

### Requirements

* Read data from the endpoint
* Multiple bars
* One set of controls that can control each bar on the fly
* Can't go under 0
* Can go over limit (defined in API), but limit the bar itself and change its colour
* Display usage amount, centered
* Implement a responsive solution: testing it on mobile, iphone, etc.
* Animated bar changing.

### Endpoint inputs:
``` {
    "buttons": [
        10,
        38,
        -13,
        -18
    ],
    "bars": [
        62,
        45,
        62
    ],
    "limit": 230
} ```