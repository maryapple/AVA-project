var app = SpreadsheetApp;
var initialSheet = app.getActiveSpreadsheet().getSheetByName('Точки');
var targetSheet = app.getActiveSpreadsheet().getSheetByName("Скачать");
var form = FormApp.openById('1NfHSL2y2U1zkx-pkNH9KSYxF8KzshdOS_bqdDPm3nX4');

// Сюда приходит ОДИН ПОСЛЕДНИЙ ответ из формы
function onSubmit(e){
	// Массив ответов на форму
	var responses = e.response.getItemResponses();
	// Номер последнего ответа из формы
	// var currentResponseNumber = form.getResponses().length + 1;

	Logger.log(responses[0].getResponse(), responses[1].getResponse(), responses[2].getResponse(), responses[3].getResponse())

	var emptyRow = targetSheet.getLastRow() + 1
	// Название точки на карте
	var nameOfDataset = responses[0].getResponse()
	targetSheet.getRange('B' + emptyRow).setValue(nameOfDataset)

	// Ссылка на скачивание папки
	var strLink = "https://drive.google.com/uc?export=download&id=";
	var linkWithCoordinates = responses[3].getResponse();
	var pos = linkWithCoordinates.indexOf('=') + 1;
	strLink += linkWithCoordinates.slice(pos);
	targetSheet.getRange('D' + emptyRow).setValue(strLink);

	// Порядковый номер
	targetSheet.getRange('A' + emptyRow).setValue(emptyRow - 1);
  
//  createMap();
}

//function createMap(){
//  var map = new google.maps.Map()
//}

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


// Add a trigger which listens for form submit
function addTrigger() {
    ScriptApp.newTrigger('onSubmit')
        .forForm('1NfHSL2y2U1zkx-pkNH9KSYxF8KzshdOS_bqdDPm3nX4')
        .onFormSubmit()
        .create();
}