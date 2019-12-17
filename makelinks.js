var placesSheet = app.getActiveSpreadsheet().getSheetByName("Places");

function fillDownloadLinks() {
	for (var i = 2; i <= targetSheet.getLastRow(); i++) {
		var name = targetSheet.getRange(i, 2).getValue()
		if (name !== '') {
			var linkId = targetSheet.getRange(i, 3).getValue()
			linkId = linkId.slice(linkId.indexOf('id='))
			var downloadLink = targetSheet.getRange(i, 4).setValue('=HYPERLINK("https://drive.google.com/uc?export=download&' + linkId + '"; "Download ' + name + '")')
		}
		
	}
}