function isApproximatelyZero(number, tolerance = 0.001) {
  return Math.abs(number) < tolerance;
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

}
scrapeTableData();

// Set an interval to continuously scrape data
setInterval(scrapeTableData, 10000);  // adjust the interval time as necessary
