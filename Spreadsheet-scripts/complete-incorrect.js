// Функция для перезаполнения столбца описаний
function completeIncorrectDescription() {
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

// Если вместо айди ссылка то:
function extractIdPhoto() {
	var lastRowMap = mapSheet.getLastRow() + 1
	for (let i = 2; i <= lastRowMap; i++) {
		let str = mapSheet.getRange('I' + i).getValue()
		mapSheet.getRange('I' + i).setValue(str.slice(str.indexOf('=') + 1))
	}
}
