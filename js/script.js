//on ready function
document.addEventListener('DOMContentLoaded', function(){

	// Get the modal
	var modal = document.getElementById('myModal');

	// Get the trigger class that opens the modal
	var triggerModal = document.getElementsByClassName('main-content')[0];

	// Get the  close button that closes the modal
	var closeBtn = document.getElementsByClassName('close-btn')[0];

	// When the user clicks on the article, open the modal 
	triggerModal.onclick = function() {
	    modal.style.display = 'block';
	}

	// When the user clicks on close button, close the modal
	closeBtn.onclick = function() {
	    modal.style.display = 'none';
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
	    if (event.target == modal) {
	        modal.style.display = 'none';
	    }
	}

	// on press of Escape key close modal
	document.onkeydown = function(e){
	    if (e.key == 'Escape' || e.keyCode == 27) {
	        modal.style.display = 'none';
	    }
	};

});