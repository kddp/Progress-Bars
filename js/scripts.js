"use strict";

var maxLimit = null,bars = null,buttons = null
document.addEventListener('DOMContentLoaded', function(){
	init();
	document.getElementById("btn-group").addEventListener('click', function(event){
		move(event.target.textContent);
	});
});

/* Function to update dynamically generated bars based on default values */
function updateBars(className, call, percentage, callback){
	document.getElementsByClassName("text")[call].textContent = percentage + '%';
	document.getElementsByClassName("myBar")[call].style.width = percentage + '%'; 
	if(percentage >= 100){
		document.getElementsByClassName(className)[call].style.backgroundColor = "#e43c3c";
	} else if(percentage <= 25) {
		document.getElementsByClassName(className)[call].style.backgroundColor = "#FFC107";
	}
	return callback(parseInt(percentage));
}



/* Function to get the width of progress bar */
function getWidth(className, call, boolean, callback){
	var parent = document.getElementsByClassName(className)[call].parentElement.offsetWidth;
	var child = document.getElementsByClassName(className)[call].offsetWidth;
	var percentage = Math.round((child/parent) * 100);
	if(boolean) document.getElementsByClassName("text")[call].textContent = percentage + '%';
	if(percentage >= 100){
		document.getElementsByClassName(className)[call].style.backgroundColor = "#e43c3c";
	} else if(percentage <= 25) {
		document.getElementsByClassName(className)[call].style.backgroundColor = "#FFC107";
	}
	return callback(parseInt(percentage));
}

/** 
*
*	Function to initilize progress bar
* 	Setting max limit, bars with default values and select box 
*
*/
function init(){
	/**
	* 	GET request to endpoints to set default values
	*	dynamically adding max limit and buttons of the progress bars 
	*/
	httpGet("http://pb-api.herokuapp.com/bars",function(response){
		var data = JSON.parse(response);
		maxLimit = data.limit, bars = data.bars, buttons = data.buttons;
		document.getElementById("max").textContent = data.limit;
		document.getElementById("btn").textContent = data.buttons;
		document.getElementById("bars").textContent = data.bars;
		var ele = document.getElementById("btn-group");
		var select = document.getElementById("mySelect");
		var bar = document.getElementById("bar-container");

		// dynamically generates buttons
		for (var i = 0; i < buttons.length; i++) {
			var myEle = document.createElement("button");
		    myEle.type = "button";
		    myEle.textContent = buttons[i];
		    myEle.className = "btn-group";
		    ele.appendChild(myEle);
		};

		// dynamically generates bars with default value
		for (var j = 0; j < bars.length; j++) {
			var option = document.createElement("option");
			var eachBar = document.createElement("div");
			var barText = document.createElement("span");
			var barBox = document.createElement("div");
			
			//bars
			eachBar.className = "progress-box";
			barBox.className = "myBar";
			barText.className = "text";
			eachBar.appendChild(barText);
			eachBar.appendChild(barBox);

			bar.appendChild(eachBar);
			
			// select box options
			option.textContent = "Progress#"+bars[j];
			option.value = j;
			select.appendChild(option);

			updateBars("myBar", j, bars[j], function(data){});
		};

		//init();

	});
}

/* Button event handler for increasing and decreasing progress bar */
function move(steps) {
	steps = parseInt(steps);
	var progressNo = document.getElementById("mySelect").value;
	getWidth("myBar", progressNo, false, function(initialWidth){
		var totalWidth = steps + initialWidth; 
		var textValue = null;
		var str = document.getElementsByClassName("text")[progressNo].textContent;
		var newVal = steps + parseInt(str.substring(0,str.length-1));
		if(newVal <= maxLimit){
			if(newVal > 100){
				totalWidth = 100;
				textValue = newVal;
			} else if(newVal < 0){
				totalWidth = 0;
				textValue = 0;
			} else {
				if(textValue > 100){
					totalWidth = totalWidth + ((100 - totalWidth));	
					textValue = newVal;
				} else if(textValue < 0){
					totalWidth = 0;	
					textValue = 0;
				} else {
					totalWidth = newVal;
					textValue = newVal;
				}
			}
			if(newVal >= 100){
				document.getElementsByClassName("myBar")[progressNo].style.backgroundColor = "#e43c3c";
			} else if(newVal <= 25) {
				document.getElementsByClassName("myBar")[progressNo].style.backgroundColor = "#FFC107";
			} else {
				document.getElementsByClassName("myBar")[progressNo].style.backgroundColor = "#4CAF50";
			}
		} else {
			totalWidth = 100;
			textValue = maxLimit;	
		}
		document.getElementsByClassName("myBar")[progressNo].style.width = totalWidth + '%'; 
		document.getElementsByClassName("text")[progressNo].textContent = textValue + '%';
	});
};

// method to make api call
function httpGet(theUrl, callback){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
            callback(xmlHttp.responseText);
        } else if(xmlHttp.readyState == 4 && ( xmlHttp.status == 0) || (xmlHttp.status == 404)){
        	alert("Unable to get data from end points, Check your Internet connection!!!");
        }
    }
    xmlHttp.open("GET", theUrl, true); 
    xmlHttp.send();
};