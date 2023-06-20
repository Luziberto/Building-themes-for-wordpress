var wpActiveEditor = null;

jQuery(function(){
	// init color picker
	initMenuFields();

});


function initMenuFields(){

	var mega_txt = ' <b style="color:#000; font-size:11px; font-weight:normal;">(Mega Menu)</b>';
	var col_txt = ' <b style="color:#000; font-size:11px; font-weight:normal;">(Category)</b>';

	var replace_title = function($el, text){
		var _title = $el.find('> .menu-item-bar').find('.item-type').html() + '';
		_title = _title.replace(mega_txt, '').replace(col_txt, '');
		$el.find('> .menu-item-bar').find('.item-type').html( _title + text );
	};

	var mega_menu_handler = function($target){
		var $li = $target;
		var $mega = $li.find('.edit-menu-item-activemega');

		var _mega_txt = $mega.is(':checked') ? mega_txt : '';
		replace_title($li, _mega_txt);

		var _col_txt = $mega.is(':checked') ? col_txt : '';
		$li.find('> ul').find('>li').each(function(){
			replace_title(jQuery(this), _col_txt);
		});
	};

	/* Initial */
	jQuery('#menu-to-edit').find('>li').each(function(){
		mega_menu_handler(jQuery(this));
	});
	
	/* Change event */
	jQuery('#menu-to-edit').find('>li').find('.edit-menu-item-activemega').on('change', function(){
		var $li = jQuery(this).parents('li.menu-item');
		mega_menu_handler($li);
	});
	
	/* Drag & drop event */
	jQuery('#menu-to-edit').on( "sortstop", function( event, ui ) {
		setTimeout(function(){
			jQuery('#menu-to-edit').find('>li').each(function(){
				mega_menu_handler( jQuery(this) );
			});
		}, 500);

	} );

}