(function() {
	var triggerBttn = document.getElementById( 'trigger-overlay' ),
		overlay = document.querySelector( 'div.overlay' ),
    closeBttn = overlay.querySelector( 'button.overlay-close' );
    thanksBttn = overlay.querySelector( '#thanks_close' );
		transEndEventNames = {
			'WebkitTransition': 'webkitTransitionEnd',
			'MozTransition': 'transitionend',
			'OTransition': 'oTransitionEnd',
			'msTransition': 'MSTransitionEnd',
			'transition': 'transitionend'
		},
		transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
		support = { transitions : Modernizr.csstransitions };

	function toggleOverlay() {
		if( classie.has( overlay, 'open' ) ) {
			classie.remove( overlay, 'open' );
			classie.add( overlay, 'close' );
			var onEndTransitionFn = function( ev ) {
				if( support.transitions ) {
					if( ev.propertyName !== 'visibility' ) return;
					this.removeEventListener( transEndEventName, onEndTransitionFn );
				}
				classie.remove( overlay, 'close' );
			};
			if( support.transitions ) {
				overlay.addEventListener( transEndEventName, onEndTransitionFn );
			}
			else {
				onEndTransitionFn();
			}
		}
		else if( !classie.has( overlay, 'close' ) ) {
			classie.add( overlay, 'open' );
		}

    overlay.focus();
	}

	triggerBttn.addEventListener( 'click', toggleOverlay );
	closeBttn.addEventListener( 'click', toggleOverlay );
  thanksBttn.addEventListener( 'click', toggleOverlay );


  $('#children_field').change(function(o, evt) {
    if ($(this).val() == 'Yes') {
      $('#children_section').show();
    } else {
      $('#children_section').hide();
    }
  });

  $('#attending').change(function(o, evt) {
    if ($(this).val() == 'Yes') {
      $('#attending_section').show();
    } else {
      $('#attending_section').hide();
    }
  });

  $('#attending').change(function() { $(this).removeClass('error'); });
  $('#first_name').change(function() { $(this).removeClass('error'); });
  $('#last_name').change(function() { $(this).removeClass('error'); });
  $('#email').change(function() { $(this).removeClass('error'); });
  $('#children_field').change(function() { $(this).removeClass('error'); });
  $('#adult_guests').change(function() { $(this).removeClass('error'); });
  $('#child_guests_over12').change(function() { $(this).removeClass('error'); });
  $('#child_guests_under12').change(function() { $(this).removeClass('error'); });


  form = $('form#rsvp_form');
  url = 'https://script.google.com/macros/s/AKfycbxIo_FAMz3aVDzsZT3ZnM3dX7AibkBC2UBEfYL1g1h7igbNuE4/exec';

  $('#submit_rsvp').on('click', function(e) {
    error = false;

    if (!$('#attending').val()) { $('#attending').addClass('error'); error=true; }

    if (!$('#first_name').val()) { $('#first_name').addClass('error'); error=true; }
    if (!$('#last_name').val()) { $('#last_name').addClass('error'); error=true; }
    if ($('#attending').val() == 'Yes') {
      if (!$('#email').val()) { $('#email').addClass('error'); error=true; }

      if (!$('#children_field').val()) { $('#children_field').addClass('error'); error=true; }
      if (!$('#adult_guests').val()) { $('#adult_guests').addClass('error'); error=true; }

      if ($('#children_field').val() == 'Yes') {
        if (!$('#child_guests_over12').val() && !$('#child_guests_under12').val()) { $('#child_guests_over12').addClass('error'); $('#child_guests_under12').addClass('error');  error=true; }
      }
    }


    if (error) {
      $('#error_msg').show();
    } else {
      $('#form_overlay').hide();
      $('#saving_overlay').show();
      e.preventDefault();
      var jqxhr = $.ajax({
        url: url,
        method: "GET",
        dataType: "json",
        data: form.serialize()+'&date_submitted='+Date().toLocaleString("en-US", {timeZone: "America/Anchorage"})
      }).success(function() { $('#error_msg').hide(); $('#thanks_overlay').show();  $('#saving_overlay').hide(); }
      );
    }
  });

})();
