$(function(){

	var is_visible_class = 'is-visible';
	var resize_event_lag = 500; // polling time for resize events.



	// watch esc key - hide panels/modals when pressed
    $(document).keyup(function (e) {
        if (e.keyCode == 27) {
            smooveReset();
        }
    });

    // Watching document for clicks to clear 
    // http://stackoverflow.com/a/7385673
	$(document, '[data-sb-reset]').on('mouseup', function (e) {
	    var ui_panels = $('[data-sb-ui-panel]');
	    // if the target of the click isn't a sb-ui-panel...
	    // ... nor a descendant
	    if (!ui_panels.is(e.target) && ui_panels.has(e.target).length === 0) 
	    {
	        smooveReset();
	    }
	});

	// Window Resizing Timeout
	// Avoids having to poll browser hundreds of times when resizing
	var resize_event_lag_timer;
	$(window).resize(function() {
	    clearTimeout(resize_event_lag_timer);
	    resize_event_lag_timer = setTimeout(resize_event_lag);
	});

	// function to reset all modals, dropdowns, etc.
	function smooveReset() {
		$('.' + is_visible_class).removeClass(is_visible_class);
		resetModals();
		$('[class*="smoove-modal--container').hide();
	}


	



	//
	// Scoreboard Tabs
	//
	$('.smoove-tabs--nav').on('click', '.smoove-tab', function(e){
		
		// cancel default click behavior
		e.preventDefault();

		// define reusable elements
		var current_class   = 'current';		
		var clicked_tab 	= $(this);
		var tab_siblings	= clicked_tab.siblings();		
		var target_tab  	= $('' + clicked_tab.attr('href') + '');
		var target_siblings = target_tab.siblings();

		// reset all 'current' tabs
		tab_siblings.each(function(){
			$(this).removeClass(current_class);
		});

		// reset all 'current' panels
		target_siblings.each(function(){
			$(this).removeClass(current_class);
		});

		// add the 'current' class to the newly clicked tab
		clicked_tab.addClass(current_class);

		// add the show class to the target panel
		target_tab.addClass(current_class);
	});




	//
	// Scoreboard Dropdowns
	//
	if( $('.dropdown').length ) {
		$('[data-dropdown-id]').on('click', function(e){

			// cancel default click behavior
			e.preventDefault();

			// define reusable elements
			var dd_clicked = $(this);
			var dd_parent = dd_clicked.closest('.has-dropdown');
			var dd = dd_parent.find('.dropdown');

			dd.toggleClass(is_visible_class);
			dd_parent.toggleClass(is_visible_class);
		});
	}




	//
	// Scoreboard Modals
	//
	function resetModals() {
		$('body').removeClass('smoove-modal--viewing');
	}
	if( $('.smoove-modal').length ) {
		//$('[class*="sb-modal--container').hide();

		$('[data-modal-id]').on('click', function(e){

			// cancel default click behavior
			e.preventDefault();
			
			// define reusable elements
			var clicked = $(this);
			var sb_overlay = $( '#' + clicked.data('modal-id') );

			// add no scroll class to body
			$('body').addClass('sb-modal--viewing');

			sb_overlay.show();

			// add visible class to the overlay
			sb_overlay.addClass('is-visible');
			
		});
	}


});