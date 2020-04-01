var app = SpreadsheetApp
var mapSheet = app.getActiveSpreadsheet().getSheetByName("Map")
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
	handleResponse(responses)
}

function handleResponse(responses) {
	var name = responses[0].getResponse().toString()
	var region = responses[1].getResponse().toString()
	var authors = responses[2].getResponse().toString()
	var year = responses[3].getResponse().toString()
	var plots = responses[4].getResponse().toString()
	var photoId = responses[5].getResponse().toString()
	var coordinates = responses[6].getResponse().toString()
	var dbLink = responses[7].getResponse().toString()
	var title = name + ' (' + authors + ', ' + year + ')'

	// Записываем правильно описание и фото (если их несколько тоже)
	var description = `<p>` + plots + ' plots' + `</p>`
	// Если несколько айдишников фото
	if (photoId.indexOf(',' !== -1)) {
		let arrayOfIds = photoId.split(/[\^,]/)
		for (let i = 0; i < arrayOfIds.length; i++) {
			description += `<iframe src='https://drive.google.com/file/d/` + arrayOfIds[i] + `/preview' width='100%'></iframe>`
		}
	}
	else {
		description = `<p>` + plots + `</p><iframe src='https://drive.google.com/file/d/` + photoId + `/preview' width='100%'></iframe>`
	}
	
	// Наполнение таблицы
	var lastRowMap = mapSheet.getLastRow() + 1
	mapSheet.getRange('A' + lastRowMap).setValue(title)
	mapSheet.getRange('C' + lastRowMap).setValue(name)
	mapSheet.getRange('D' + lastRowMap).setValue(coordinates)
	mapSheet.getRange('E' + lastRowMap).setValue(region)
	mapSheet.getRange('F' + lastRowMap).setValue(authors)
	mapSheet.getRange('G' + lastRowMap).setValue(year)
	mapSheet.getRange('H' + lastRowMap).setValue(plots)
	mapSheet.getRange('I' + lastRowMap).setValue(photoId)
	// ссылка просто на датасет (НЕ на скачивание). ссылка на скачивание в описании и не должна быть
	mapSheet.getRange('J' + lastRowMap).setValue(dbLink)

	// Создание гуглодока
	const linkToDoc = createDocs(name, region, authors, year, plots, photoId, dbLink)

	// Наполнение таблицы
	description += `<a href="https://docs.google.com/document/d/` + linkToDoc + `">Go to page</a>`
	mapSheet.getRange('B' + lastRowMap).setValue(description)
}
