$(function() {

	var padNumber = function(num) {
		if (num < 10) {
			num = "0" + num;
		}

		return num;
	};

	var datePickerChange = function(e) {
		var $this = $(this);
		var datePicker = $this.data("DateTimePicker");
		
		var date = datePicker.getDate();
		
		
		var id = $this.attr("id");

		var month = date.month() + 1;
		var day = date.date();
		var hour = date.hour();

		var meridian = 'am'
		if (hour > 12) {
			hour = hour - 12;
			meridian = 'pm';
		}

		var minute = date.minute();
		var year = date.year();

		$("#" + id + "Month").val(padNumber(month));
		$("#" + id + "Day").val(padNumber(day));
		$("#" + id + "Year").val(year);
		$("#" + id + "Hour").val(padNumber(hour));
		$("#" + id + "Min").val(padNumber(minute));
		$("#" + id + "Meridian").val(meridian);
	};

	var $datePickers = $('.datepicker');
	$datePickers.each(function(){
		var existingDate = $(this).children().first().val() || "";
		
		if(!existingDate){
			existingDate = new Date();
		}
		
		$(this).datetimepicker({
			useCurrent: false,
			defaultDate: existingDate
		});
	});
	
	$datePickers.on("change.dp", datePickerChange);
	$datePickers.trigger("change.dp");

});