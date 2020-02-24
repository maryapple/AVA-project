// просмотр ВСЕХ ответов формы (https://developers.google.com/apps-script/reference/forms/form-response)
function getResponsesFromForm() {
	var form = FormApp.openById('1NfHSL2y2U1zkx-pkNH9KSYxF8KzshdOS_bqdDPm3nX4')
	var formResponses = form.getResponses();
	for (var i = 0; i < formResponses.length; i++) {
		var formResponse = formResponses[i];
		var itemResponses = formResponse.getItemResponses();
		for (var j = 0; j < itemResponses.length; j++) {
			var itemResponse = itemResponses[j];
			Logger.log('Response #%s to the question "%s" was "%s"',
			(i + 1).toString(),
			itemResponse.getItem().getTitle(),
			itemResponse.getResponse());
		}
	}
}