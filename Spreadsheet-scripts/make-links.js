// let placesSheet = app.getActiveSpreadsheet().getSheetByName("Places");

function makeDownloadLinks(targetSheet) {
	for (let i = 2; i <= targetSheet.getLastRow(); i++) {
		let currentLink = targetSheet.getRange('J' + i).getValue()
		if (currentLink !== '-') {
			linkId = currentLink.slice(currentLink.indexOf('id='))
			targetSheet.getRange('J' + i).setValue('https://drive.google.com/uc?export=download&' + linkId)
		}
	}
}

function makeLinksToPages() {
	for (let i = 2; i <= placesSheet.getLastRow(); i++) {
		let link = "https://sites.google.com/auditory.ru/aletus/"
		let name = placesSheet.getRange(i, 1).getValue()
		placesSheet.getRange(i, 1).setValue('=HYPERLINK("' + link + '"; "' + name + '")')
	}
}