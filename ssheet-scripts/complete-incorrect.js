// Функция для перезаполнения столбца описаний
function completeIncorrectDescription() {
	const lastRowMap = mapSheet.getLastRow() + 1
	for (let i = 2; i <= lastRowMap; i++) {
		const name = mapSheet.getRange('C' + i).getValue()
		const plots = mapSheet.getRange('H' + i).getValue()
		const photoId = mapSheet.getRange('I' + i).getValue()
		const region = mapSheet.getRange('E' + i).getValue()
		const authors = mapSheet.getRange('F' + i).getValue()
		const year = mapSheet.getRange('G' + i).getValue()
		const dbLink = mapSheet.getRange('J' + i).getValue()
		const linkToDoc = createDocs(name, region, authors, year, plots, photoId, dbLink)

		let description = `<p>` + plots + ' plots' + `</p>`
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

		description += `<a href="https://docs.google.com/document/d/` + linkToDoc + `">Go to page</a>`
		mapSheet.getRange('B' + i).setValue(description)
		
		// if (photoId.indexOf(',' !== -1)) {
		// 	let arrayOfIds = photoId.split(/[\^,]/)
		// 	for (let i = 0; i < arrayOfIds.length; i++) {
		// 		description += `<iframe src='https://drive.google.com/file/d/` + arrayOfIds[i] + `/preview' width='100%'></iframe>`
		// 	}
		// 	// description += `<a href="https://sites.google.com/auditory.ru/aconstus/main/` + name.replace(/\s/g, '').toLowerCase() + `">Go to page</a>`
		// }
		// else {
		// 	description = `<p>` + plots + `</p><iframe src='https://drive.google.com/file/d/` 
		// 	+ photoId + `/preview' width='100%'></iframe><a href="https://sites.google.com/auditory.ru/aconstus/main/` + name.replace(/\s/g, '').toLowerCase() + `">Go to page</a>`
		// }
		
	}
}
