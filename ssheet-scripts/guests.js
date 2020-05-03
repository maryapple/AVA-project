const guestsSheet = app.getActiveSpreadsheet().getSheetByName("Guests")

function createTimeDrivenTriggers() {
	ScriptApp.newTrigger('handleDecision')
				.timeBased()
				.everyMinutes(1)
                .create()
}

function handleDecision() {
    for (var lineNumber = 2; lineNumber <= guestsSheet.getLastRow(); lineNumber++) {
		// Если найдено решение о предоставлении доступа
		if (guestsSheet.getRange("E" + lineNumber).getValue() !== "") {
			// И оно еще не обработано
			if (guestsSheet.getRange("F" + lineNumber).getValue() === "") {
                // Если решение положительное, то предоставляем доступ пользователю к датасету
                if (guestsSheet.getRange(lineNumber, 5).getValue() === 'y') {
                    // Если имя места в форме введено в точности так как в таблице
                    const name = guestsSheet.getRange(lineNumber, 4).getValue()
                    const email = guestsSheet.getRange(lineNumber, 2).getValue()

                    for (var lineNumberMap = 2; lineNumberMap <= mapSheet.getLastRow(); lineNumberMap++) {
                        if (name === mapSheet.getRange(lineNumberMap, 3).getValue()) {
                            const linkToDB = mapSheet.getRange('J' + lineNumberMap).getValue()
                            const dbId = linkToDB.slice(linkToDB.indexOf('id=') + 3)
                            const file = DriveApp.getFileById(dbId)

                            // Если внешняя почта
                            if (email.indexOf('@gmail') === -1) {
                                // Проверка на то что уже создана копия
                                const files = DriveApp.getFilesByName(name + '-sharable')
                                let copy
                                if (files.hasNext() === false) {
                                    copy = file.makeCopy(name + '-sharable')
                                }
                                else {
                                    copy = files.next()
                                }
                                const id = copy.getId()
                                const newFile = DriveApp.getFileById(id)
                                newFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW)
                                const shLink = newFile.getDownloadUrl()
                                const subject = 'Download DB ' + name
                                const message = 'Here is your link: ' + shLink
                                MailApp.sendEmail(email, subject, message)
                            }
                            // Google почта
                            else {
                                file.addViewer(email)
                            }
                        }
                    }
                }
                // Ставлю отметку о выполнении
                guestsSheet.getRange(lineNumber, 6).setValue('handled')
            }
        }
    }
}
