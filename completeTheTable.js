var app = SpreadsheetApp
var initialSheet = app.getActiveSpreadsheet().getSheetByName('Answers from Form')
var linkSheet = app.getActiveSpreadsheet().getSheetByName("Links")
var mapSheet = app.getActiveSpreadsheet().getSheetByName("Map")
var form = FormApp.openById('1NfHSL2y2U1zkx-pkNH9KSYxF8KzshdOS_bqdDPm3nX4')

// Сюда приходит ОДИН ПОСЛЕДНИЙ ответ из формы
function onSubmit(e){
	// Массив ответов на форму
	var responses = e.response.getItemResponses()
	Logger.log(responses[0].getResponse(), responses[1].getResponse(), responses[2].getResponse(), responses[3].getResponse())

	// Номер последнего ответа из формы
	// var currentResponseNumber = form.getResponses().length + 1;

	// MAP
	var lastRowMap = linkSheet.getLastRow() + 1
	var nameOfDataset = responses[0].getResponse().toString()
	var authors = responses[1].getResponse().toString()
	var region = responses[2].getResponse().toString()
	var year = responses[3].getResponse().toString()
	var description = responses[4].getResponse().toString()
	var photo = responses[5].getResponse().toString()
	var address = responses[6].getResponse().toString()
	var db = responses[7].getResponse().toString()

	mapSheet.getRange('A' + lastRowMap).setValue(nameOfDataset + ' ' + authors + ' ' + year)
	mapSheet.getRange('B' + lastRowMap).setValue(region)
	mapSheet.getRange('C' + lastRowMap).setValue(address)
	mapSheet.getRange('D' + lastRowMap).setValue(description)
	mapSheet.getRange('E' + lastRowMap).setValue(photo)
}

// Add a trigger which listens for form submit
function addTrigger() {
    ScriptApp.newTrigger('onSubmit')
        .forForm('1NfHSL2y2U1zkx-pkNH9KSYxF8KzshdOS_bqdDPm3nX4')
        .onFormSubmit()
        .create();
}