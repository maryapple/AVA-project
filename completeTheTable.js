var app = SpreadsheetApp
var initialSheet = app.getActiveSpreadsheet().getSheetByName('Answers from Form')
var linkSheet = app.getActiveSpreadsheet().getSheetByName("Links")
var mapSheet = app.getActiveSpreadsheet().getSheetByName("Map")
var placesSheet = app.getActiveSpreadsheet().getSheetByName("Places")
var form = FormApp.openById('1NfHSL2y2U1zkx-pkNH9KSYxF8KzshdOS_bqdDPm3nX4')

// Сюда приходит ОДИН ПОСЛЕДНИЙ ответ из формы
function onSubmit(e){
	// Массив ответов на форму
	var responses = e.response.getItemResponses()
	Logger.log(responses[0].getResponse(), responses[1].getResponse(), responses[2].getResponse(), responses[3].getResponse())

	completeMapSheet(responses)
	completePlaces(responses)
}

function completeMapSheet(responses) {
	var lastRowMap = mapSheet.getLastRow() + 1
	var name = responses[0].getResponse().toString()
	var region = responses[1].getResponse().toString()
	var authors = responses[2].getResponse().toString()
	var year = responses[3].getResponse().toString()
	var description = responses[4].getResponse().toString()
	var photo = responses[5].getResponse().toString()
	var address = responses[6].getResponse().toString()
	var db = responses[7].getResponse().toString()
	var nameOfDataset = name + ' (' + authors + ', ' + year + ')'

	mapSheet.getRange('A' + lastRowMap).setValue(nameOfDataset)
	mapSheet.getRange('B' + lastRowMap).setValue(region)
	mapSheet.getRange('C' + lastRowMap).setValue(address)
	mapSheet.getRange('D' + lastRowMap).setValue(description + ' plots')
	mapSheet.getRange('E' + lastRowMap).setValue(photo)
}

function completePlaces(responses) {
	var lastRowMPlaces = placesSheet.getLastRow() + 1
	var name = responses[0].getResponse().toString()
	var authors = responses[2].getResponse().toString()
	var year = responses[3].getResponse().toString()
	var nameOfDataset = name + ' (' + authors + ', ' + year + ')'

	var nameToLink = name.toLowerCase()
	nameToLink = nameToLink.replace(/\s+/g,'')
	var hyperLink = '=hyperlink("https://sites.google.com/auditory.ru/avarus/main/' + nameToLink + '"; "' + nameOfDataset + '")'

	placesSheet.getRange('A' + lastRowMPlaces).setValue(hyperLink)
}

// Add a trigger which listens for form submit
function addTrigger() {
    ScriptApp.newTrigger('onSubmit')
        .forForm('1NfHSL2y2U1zkx-pkNH9KSYxF8KzshdOS_bqdDPm3nX4')
        .onFormSubmit()
        .create();
}