var app = SpreadsheetApp
var initialSheet = app.getActiveSpreadsheet().getSheetByName('Answers from Form')
var linkSheet = app.getActiveSpreadsheet().getSheetByName("Links")
var mapSheet = app.getActiveSpreadsheet().getSheetByName("Map")
// var placesSheet = app.getActiveSpreadsheet().getSheetByName("Places")
var form = FormApp.openById('1NfHSL2y2U1zkx-pkNH9KSYxF8KzshdOS_bqdDPm3nX4')

// Add a trigger which listens for form submit
function addTrigger() {
    ScriptApp.newTrigger('onSubmit')
        .forForm('1NfHSL2y2U1zkx-pkNH9KSYxF8KzshdOS_bqdDPm3nX4')
        .onFormSubmit()
        .create();
}

// Сюда приходит ОДИН ПОСЛЕДНИЙ ответ из формы
function onSubmit(e){
	// Массив ответов на форму
	var responses = e.response.getItemResponses()
	// Logger.log(responses[0].getResponse(), responses[1].getResponse(), responses[2].getResponse(), responses[3].getResponse())

	sendResponse(responses)
	// completePlaces(responses)
}

function sendResponse(responses) {
	var name = responses[0].getResponse().toString()
	var region = responses[1].getResponse().toString()
	var authors = responses[2].getResponse().toString()
	var year = responses[3].getResponse().toString()
	var plots = responses[4].getResponse().toString() + ' plots'
	var photoId = responses[5].getResponse().toString()
	var coordinates = responses[6].getResponse().toString()
	var dbLink = responses[7].getResponse().toString()
	var title = name + ' (' + authors + ', ' + year + ')'
	

	var lastRowMap = mapSheet.getLastRow() + 1
	mapSheet.getRange('A' + lastRowMap).setValue(title)
	// if (photoId.indexOf(',' !== -1)) {
	// 	let amountOfPhoto = ("str1,str2,str3,str4".match(/,/g) || []).length
	// 		photoId.split(/[^,]+/)
	// }
	mapSheet.getRange('I' + lastRowMap).setValue(photoId)
	
	// var description = `<p style='font-weight: 600; font-size: 0.9rem;'>${title}</p><p>` + plots + `</p><iframe src='https://drive.google.com/file/d/` 
	// 	+ photoId + `/preview' width='100%'></iframe><a href="https://sites.google.com/auditory.ru/avarus/main/` + name.replace(/\s/g, '').toLowerCase() + `">Go to page</a>`
	var description = `<p>` + plots + `</p><iframe src='https://drive.google.com/file/d/` 
		+ photoId + `/preview' width='100%'></iframe><a href="https://sites.google.com/auditory.ru/avarus/main/` + name.replace(/\s/g, '').toLowerCase() + `">Go to page</a>`
	mapSheet.getRange('B' + lastRowMap).setValue(description)
	mapSheet.getRange('C' + lastRowMap).setValue(name)
	mapSheet.getRange('D' + lastRowMap).setValue(coordinates)
	mapSheet.getRange('E' + lastRowMap).setValue(region)
	mapSheet.getRange('F' + lastRowMap).setValue(authors)
	mapSheet.getRange('G' + lastRowMap).setValue(year)
	mapSheet.getRange('H' + lastRowMap).setValue(plots)
	// где хранится фото? права доступа?
	
	// не на скачивание?
	mapSheet.getRange('J' + lastRowMap).setValue(dbLink)
}

function completeIncorrect() {
	var lastRowMap = mapSheet.getLastRow() + 1
	for (let i = 2; i <= lastRowMap; i++) {
		var name = mapSheet.getRange('C' + i).getValue()
		var plots = mapSheet.getRange('H' + i).getValue()
		var photoId = mapSheet.getRange('I' + i).getValue()
		var description = `<p>` + plots + `</p><iframe src='https://drive.google.com/file/d/` 
		+ photoId + `/preview' width='100%'></iframe><a href="https://sites.google.com/auditory.ru/avarus/main/` + name.replace(/\s/g, '').toLowerCase() + `">Go to page</a>`
		mapSheet.getRange('B' + i).setValue(description)
	}
}

// function completePlaces(responses) {
// 	var lastRowMPlaces = placesSheet.getLastRow() + 1
// 	var name = responses[0].getResponse().toString()
// 	var authors = responses[2].getResponse().toString()
// 	var year = responses[3].getResponse().toString()
// 	var nameOfDataset = name + ' (' + authors + ', ' + year + ')'

// 	var nameToLink = name.toLowerCase()
// 	nameToLink = nameToLink.replace(/\s+/g,'')
// 	var hyperLink = '=hyperlink("https://sites.google.com/auditory.ru/avarus/main/' + nameToLink + '"; "' + nameOfDataset + '")'

// 	placesSheet.getRange('A' + lastRowMPlaces).setValue(hyperLink)
// }