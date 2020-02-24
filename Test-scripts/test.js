/*	var emptyRow = linkSheet.getLastRow() + 1
	// Название точки на карте
	var nameOfDataset = responses[0].getResponse().toString()
	linkSheet.getRange('B' + emptyRow).setValue(nameOfDataset)

	// Ссылка на скачивание папки
	var strLink = "https://drive.google.com/uc?export=download&id=";
	var linkWithCoordinates = responses[3].getResponse();
	var pos = linkWithCoordinates.indexOf('=') + 1;
	strLink += linkWithCoordinates.slice(pos);
	linkSheet.getRange('D' + emptyRow).setValue(strLink);

	// Порядковый номер
	linkSheet.getRange('A' + emptyRow).setValue(emptyRow - 1);

	var coordinatesStr = responses[2].getResponse()
	var latitude, longtitude
	latitude = coordinatesStr.slice(0, coordinatesStr.indexOf(','))
	longtitude = coordinatesStr.slice(coordinatesStr.indexOf(',') + 1)
  
	// createPoint(latitude, longtitude);*/


	/*function createPoint(){
	// latitude = 70.38606
	// longtitude = 68.45433
	// var map = new google.maps.Map()
	// Logger.log(latitude, longtitude)
	var map = Maps.newStaticMap()
	map.addMarker(40.741799, -74.004207)
	var url = map.getMapUrl()
}
*/