function createDocs(name, region, authors, year, plots, photoId, dbLink) {
    const doc = DocumentApp.create(name)

    // Открываем доступ на чтение
    const idDoc = doc.getId()
    const file = DriveApp.getFileById(idDoc)
    file.setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.VIEW)

    // Записываем файл в нужную папку
	var parents = file.getParents();
	while (parents.hasNext()) {
		var parent = parents.next();
		parent.removeFile(file);
	}
	var folderId = `1gfMyOOBAJxqxsqdaqxFyt6ga7EqyTkkY`
	DriveApp.getFolderById(folderId).addFile(file)
    
    const body = doc.getBody()

    // Заголовок
    const header = body.appendParagraph(name)
    header.setHeading(DocumentApp.ParagraphHeading.HEADING1)

    // Изображения
    const imagePara = body.appendParagraph(' ')
    if (photoId.indexOf(',' !== -1)) {
        let arrayOfIds = photoId.split(/[\^,]/)
        let image = ''
        for (let i = 0; i < arrayOfIds.length; i++) {
            image = DriveApp.getFileById(arrayOfIds[i]).getBlob()
            imagePara.appendInlineImage(image)
                .setWidth(300)
                .setHeight(200)
        }
    }
    else {
        let image = DriveApp.getFileById(photoId).getBlob()
        imagePara.appendInlineImage(image)
            .setWidth(300)
            .setHeight(200)
    }

    const authorPara = "Authors: " + authors
    const yearPara = "Year: " + year
    const regionPara = "Region: " + region
    const plotsPara = "Amount of plots: " + plots + '\r'
    body.appendParagraph(authorPara)
    body.appendParagraph(yearPara)
    body.appendParagraph(regionPara)
    body.appendParagraph(plotsPara)

    // Ссылка на доступ
    const requestAccessLink = "To download request access: "
    body.appendParagraph(requestAccessLink)
    const requestLink = body.appendParagraph("Request access")
    requestLink.setLinkUrl('https://docs.google.com/forms/d/e/1FAIpQLSfKfrgjGuLctHbeszA8AhnxUgjDAc2zdiOYFI1oG8KxE5FQ3A/viewform?usp=sf_link')
    
    if (dbLink !== '-') {
        // Ссылка на скачивание
        const downloadPara = '\rOr download if you have access: '
        body.appendParagraph(downloadPara)
        const lnk = handleCurrentLink(dbLink)
        const downloadLink = body.appendParagraph("Download")
        downloadLink.setLinkUrl(lnk)
    }
    else {
        const downloadPara = '\rThere is no dataset to download '
        body.appendParagraph(downloadPara)
    }

    return idDoc
}

function handleCurrentLink(dbLink) {
	if (dbLink !== '-') {
		linkId = dbLink.slice(dbLink.indexOf('id='))
	}
	const downloadLink = 'https://drive.google.com/uc?export=download&' + linkId
	return downloadLink
}