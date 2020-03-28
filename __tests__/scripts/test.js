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


function myFunction() {
	var currentSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
	var targetSheet = currentSpreadsheet.getSheetByName("Скачать");
	var emptyRow = targetSheet.getLastRow()
	Logger.log(emptyRow)
}


function deleteSpaces() {
	var str = 'aaa vvv ccc'
	Logger.log(str.replace(/\s+/g, ''))
}

function test1() {
	var sites = SitesApp.getSites();
	for (var i in sites) {
		Logger.log(sites[i].getUrl());
	}
}

function ex() {
	var pageStart = 0;
	var pageSize = 10;
	while (true) {
		Logger.log("Loading sites starting at %s", pageStart);
		var sites = SitesApp.getAllSites("example.com", pageStart, pageSize);
		if (sites.length == 0) {
			break;
		}
		Logger.log("Got %s sites back", sites.length);
		pageStart += sites.length;
		for (var i in sites) {
			Logger.log("Found site: %s", sites[i].getUrl());
		}
	}
}

/* function addBlock () {
	var mySite = 'https://sites.google.com/auditory.ru/avatest/main';
	var myDomain = 'auditory.ru'
	var site1 = SitesApp.getSite(myDomain)
	var myPages = site1.getAllDescendants();
	for (i in myPages) {
		Logger.log('page=' + myPages[i].getTitle());
	}  
	var site = SitesApp.getSiteByUrl(mySite);
	// var site = SitesApp.getSite('auditory.ru', 'Ava Rus');
	var page = site.getChildren()[0];

	var sitesByD = SitesApp.getSites('auditory.ru');
	Logger.log(sitesByD)
	page.setHtmlContent('index.html');
} */

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