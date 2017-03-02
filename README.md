# Progress Bars

### Dynamic progress bars without any javascript library.

#### End point url : [End points](http://pb-api.herokuapp.com/bars)

#### Demo video : [Demo](http://static.optus.com.au/pei/progress-bars-demo.ogv)

### Requirements

* Read data from the endpoint(API)
* Multiple bars
* One set of controls that can control each bar on the fly
* Can't go under 0
* Can go over limit (defined in API), but limit the bar itself and change its colour
* Display usage amount, centered
* Responsive solution: testing it on mobile, iphone, etc.
* Animated bar changing.

### Endpoint inputs example:
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

### Breakdown
* buttons : The amount of buttons to display and what value they increment or decrement the selected bar. Randomly generates between 4 and 6 buttons.
* bars : The number of progress bars to display and their default values.
* limit	: The equivalent to 100% of each bar.

### Usage 
* Change the url in js file pointing to your endpoint.

