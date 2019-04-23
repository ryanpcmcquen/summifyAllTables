/* global chrome */
(() => {
  const runMe = `
document.addEventListener('DOMContentLoaded', () => {

    const summifyThisTable = (table) => {
        let columns = table.querySelectorAll(
            'th'
        ).length
        let tds = [...table.querySelectorAll('td')]
            .map(
                cell => Number(cell.textContent.trim())
            )
        let sets = {}
        Array(columns).fill().map((ignore, column) => {
            sets[column] = Array.isArray(sets[column]) ? sets[column] : []
            tds
                .reduce((place, index) => {
                    if (sets[column].length === 0) {
                        place = column
                        sets[column].push(tds[column])
                    }
                    place = place + columns
                    sets[column].push(tds[place])
                    return place
                }, 0)
            sets[column] = sets[column]
                .filter(Boolean)
                .reduce((acc, val) => {
                    acc = acc + val
                    return acc
                }, 0)
        })

        let newRow = table
            .insertRow()
        Object.keys(sets).forEach(set => {
            let newColumn = newRow.insertCell()
            newColumn.textContent = sets[set]
        })
    }

    [...document.querySelectorAll('table')]
        .forEach(table => summifyThisTable(table))
})
    `
  try {
    chrome.browserAction.onClicked.addListener(() => {
      chrome.tabs.executeScript({
        code: runMe
      })
    })
  } catch (ignore) { }
})()
