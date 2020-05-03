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
                            file.addViewer(email)
                        }
                    }
                }
                // Ставлю отметку о выполнении
                guestsSheet.getRange(lineNumber, 6).setValue('handled')
            }
        }
    }
}

// Как долго действует триггер и что делать когда исчерпается лимит ?
