const app = SpreadsheetApp
const mapSheet = app.getActiveSpreadsheet().getSheetByName("Map")
const form = FormApp.openById('1NfHSL2y2U1zkx-pkNH9KSYxF8KzshdOS_bqdDPm3nX4')

function addTrigger() {
    ScriptApp.newTrigger('onSubmit')
        .forForm('1NfHSL2y2U1zkx-pkNH9KSYxF8KzshdOS_bqdDPm3nX4')
        .onFormSubmit()
        .create();
}

// Last response from form
function onSubmit(e){
	const responses = e.response.getItemResponses()
	handleResponse(responses)
}

function handleResponse(responses) {
	const name = responses[0].getResponse().toString()
	const region = responses[1].getResponse().toString()
	const authors = responses[2].getResponse().toString()
	const year = responses[3].getResponse().toString()
	const plots = responses[4].getResponse().toString()
	const photoId = responses[5].getResponse().toString()
	const coordinates = responses[6].getResponse().toString()
	const dbLink = responses[7].getResponse().toString()
	const title = name + ' (' + authors + ', ' + year + ')'

	let description = `<p>` + plots + ' plots' + `</p>`
	if (photoId.indexOf(',' !== -1)) {
		let arrayOfIds = photoId.split(/[\^,]/)
		for (let i = 0; i < arrayOfIds.length; i++) {
			description += `<iframe src='https://drive.google.com/file/d/` + arrayOfIds[i] + `/preview' width='100%'></iframe>`
		}
	}
	else {
		description = `<p>` + plots + `</p><iframe src='https://drive.google.com/file/d/` + photoId + `/preview' width='100%'></iframe>`
	}
	
	const linkToDoc = createDocs(name, region, authors, year, plots, photoId, dbLink)

	description += `<a href="https://docs.google.com/document/d/` + linkToDoc + `">Go to page</a>`

	const lastRowMap = mapSheet.getLastRow() + 1
	mapSheet.getRange('A' + lastRowMap).setValue(title)
	mapSheet.getRange('B' + lastRowMap).setValue(description)
	mapSheet.getRange('C' + lastRowMap).setValue(name)
	mapSheet.getRange('D' + lastRowMap).setValue(coordinates)
	mapSheet.getRange('E' + lastRowMap).setValue(region)
	mapSheet.getRange('F' + lastRowMap).setValue(authors)
	mapSheet.getRange('G' + lastRowMap).setValue(year)
	mapSheet.getRange('H' + lastRowMap).setValue(plots)
	mapSheet.getRange('I' + lastRowMap).setValue(photoId)
	mapSheet.getRange('J' + lastRowMap).setValue(dbLink)
}
