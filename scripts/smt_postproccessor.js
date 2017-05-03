window.onload = function() {
		var fileInput = document.getElementById('fileInput');
		var fileContentArea = document.getElementById('canvas');

		fileInput.addEventListener('change', function(e) {
			var smtFileObject = fileInput.files[0];
			var textType = /text.*/;

			if (smtFileObject.type.match(textType)) {
				var reader = new FileReader();

				reader.onload = function(e) {
					fileContentArea.innerText = reader.result;
					// only have this next line for debug. 
					// REMOVE in actual production code
					fileDisplayArea.innerText = reader.result;
				}

				reader.readAsText(smtFileObject);	
			} else {
				fileDisplayArea.innerText = "File not supported!";
			}
		});
}

/*
$(function () {
		$('#tabs').w2tabs({
			name: 'tabs',
			active: 'tab1',
			tabs: [
				{ id: 'tab1', caption: 'Relationship Definitions' },
				{ id: 'tab2', caption: 'Study Options', closable: true },
				{ id: 'tab3', caption: 'Graph: Transactions', closable: true },
				{ id: 'tab4', caption: 'Graph: Defective', closable: true },
				{ id: 'tab5', caption: 'Graph: Full', closable: true }
			],
			onClick: function (event) {
				$('#tab-content').html('Tab: ' + event.target);
			}
		});
	});
$(document).ready(function() {
    
    $('.tabs li a').click(function(event){
        event.preventDefault();
        $('.tabs li a').removeClass('active');
        $(this).addClass('active');
        $('.tab-content').hide();
        $($(this).attr('href')).show();
    });
    
});
*/