function isApproximatelyZero(number, tolerance = 0.001) {
  return Math.abs(number) < tolerance;
}

// Table injection
// Function to create and update the table
function updateTable(aboveCount, belowCount, unchangedCount) {
    let table = document.getElementById('dataExtractorTable');
    if (!table) {
        // If the table doesn't exist yet, create it
        table = document.createElement('table');
        table.id = 'dataExtractorTable';
        table.innerHTML = `
            <tr>
                <th>Up</th>
                <th>Down</th>
                <th>Unchanged</th>
            </tr>
            <tr>
                <td id="aboveCount"></td>
                <td id="belowCount"></td>
                <td id="unchangedCount"></td>
            </tr>`;
        //document.body.appendChild(table);

	// Inject the table at the top of the body
        document.body.insertBefore(table, document.body.firstChild);

    }

    // Update the counts and background colors
    let aboveCountCell = document.getElementById('aboveCount');
    aboveCountCell.textContent = aboveCount;
    aboveCountCell.style.backgroundColor = 'green';

    let belowCountCell = document.getElementById('belowCount');
    belowCountCell.textContent = belowCount;
    belowCountCell.style.backgroundColor = 'red';

    let unchangedCountCell = document.getElementById('unchangedCount');
    unchangedCountCell.textContent = unchangedCount;
    unchangedCountCell.style.backgroundColor = 'black';
    unchangedCountCell.style.color = 'white';  // to make the text visible on a black background

}

function scrapeTableData() {
    console.log("scrapeTableData is running");

    let aboveCount = 0;
    let belowCount = 0;
    let unchangedCount = 0;
    
    const targetNumber = 0; // Replace this with the number you want to compare

    // Select all spans within the td element with the class 'screener-tickers'
    let spans = document.querySelectorAll('td.screener-tickers span');

    spans.forEach((span) => {
        let textContent = span.getAttribute('data-boxover');
        let percentageIndex = textContent.lastIndexOf(': ');
        let percentage = parseFloat(textContent.slice(percentageIndex + 2, -1));

        // Log the percentage to the console
        // console.log(percentage);

	if ( isApproximatelyZero(percentage)) {
	    unchangedCount++;
        } else if (percentage > targetNumber) {
            aboveCount++;	   
        } else {
            belowCount++;
        }
    });

    console.log('AboveCount: '+aboveCount);
    console.log('BelowCount: '+belowCount);
    console.log('UnchangedCount: '+unchangedCount);
		  
    // Send a message back to the background script with the counts
    chrome.runtime.sendMessage({
	aboveCount: aboveCount,
	belowCount: belowCount,
	unchangedCount: unchangedCount
    });

// Save the counts to the storage
    chrome.storage.sync.set({ aboveCount, belowCount, unchangedCount });

    // Update the table
    updateTable(aboveCount, belowCount, unchangedCount);
    
}
scrapeTableData();

// Set an interval to continuously scrape data
setInterval(scrapeTableData, 1000);  // adjust the interval time as necessary
