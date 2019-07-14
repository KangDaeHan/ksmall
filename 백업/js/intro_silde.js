(function( $ ) {
	var SliderProExamples = {
		currentExample: -1,

		loadExample: function(index) {
			var that = this;

			if ( this.currentExample === index ) {
				return;
			}

			if ( this.currentExample !== -1 ) {
				window.location.hash = 'intro_slide' + index;
			}

			this.currentExample = index;

			$.ajax({
				url: 'intro_slide' + index + '.html',
				type: 'get',
				dataType: 'html',
				success: function( result ) {
					that.unloadCurrentExample();

					$( '.example' ).html( result );
					
					that[ 'renderExample' + that.currentExample ]();
				}
			});
		},

		renderExample1: function() {
			$( '#example1' ).sliderPro({
				fade: true,
				width: '1920',
				height: '100vh',
				touchSwipe: false,
				waitForLayers: false,
				autoplay: false,
				// autoScaleLayers: false,
				//visibleSize: '100%',
				//autoSlideSize: true,
				forceSize: 'fullWidth'
			});
		},

		unloadCurrentExample: function() {
			var slider = $( '.example' ).find( '.slider-pro' );

			slider.sliderPro( 'destroy' );
			$( '.example' ).empty();
		}
	};

	
	jQuery( document ).ready(function() {

		var exampleIndex = 1;

		if ( window.location.hash !== '' ) {
			var index = window.location.hash.slice( -1 );

			if( isNaN( index ) === false ) {
				exampleIndex = index;
			}
		}

		SliderProExamples.loadExample( exampleIndex );

		$('.slider-pro-example').hover(function() {
			$( '.example-description' ).eq( $( this ).index() ).addClass( 'hovered-example' );
		}, function() {
			$( '.hovered-example' ).removeClass( 'hovered-example' );
		});

		$('.slider-pro-example').click(function() {
			SliderProExamples.loadExample( $( this ).index() + 1 );

			$( '.clicked-example' ).removeClass( 'clicked-example' );
			$( '.example-description' ).eq( $( this ).index() ).addClass( 'clicked-example' );
		});
	});
})( jQuery );