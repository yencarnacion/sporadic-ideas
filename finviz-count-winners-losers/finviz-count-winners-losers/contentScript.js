function isApproximatelyZero(number, tolerance = 0.001) {
  return Math.abs(number) < tolerance;
}

function compareWith0style(percentage, targetNumber=0){
       if ( isApproximatelyZero(percentage)) {
           return('black');
        } else if (percentage > targetNumber) {
            return('green');
        } else {
            return('red');
        }
}
// Table injection
// Function to create and update the table
function updateTable(aboveCount, belowCount, unchangedCount,
                              amazonValue,
                              appleValue,
                              googValue,
                              googlValue,
                              metaValue,
                              microsoftValue,
                              nvidiaValue) {
let stocktable = document.getElementById('dataExtractorTable');	
    if (!stocktable) {
	stocktable = document.createElement('table');
        stocktable.id = 'stockdataExtractorTable';
        stocktable.innerHTML = `
            <tr>
                <th>Symbol</th>
                <th>Change</th>
            </tr>
            <tr>
                <td>AMZN</td>
                <td id="amazonValue"></td>
            </tr>
            <tr>
                <td>AAPL</td>
                <td id="appleValue"></td>
            </tr>
            <tr>
                <td>GOOG</td>
                <td id="googValue"></td>
            </tr>
            <tr>
                <td>GOOGL</td>
                <td id="googlValue"></td>
            </tr>
            <tr>
                <td>META</td>
                <td id="metaValue"></td>
            </tr>
            <tr>
                <td>MSFT</td>
                <td id="microsoftValue"></td>
            </tr>
            <tr>
                <td>NVDA</td>
                <td id="nvidiaValue"></td>
            </tr>`;

	// Inject the table at the top of the body
        document.body.insertBefore(stocktable, document.body.firstChild);
    }
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

    let amznValueCell = document.getElementById('amazonValue');
    amznValueCell.textContent = amazonValue;
    amznValueCell.style.backgroundColor = compareWith0style(amazonValue);
    amznValueCell.style.color = 'white';  // to make the text visible on a black\

    let aaplValueCell = document.getElementById('appleValue');
    aaplValueCell.textContent = appleValue;
    aaplValueCell.style.backgroundColor = compareWith0style(appleValue);
    aaplValueCell.style.color = 'white';  // to make the text visible on a black\

    let googValueCell = document.getElementById('googValue');
    googValueCell.textContent = googValue;
    googValueCell.style.backgroundColor = compareWith0style(googValue);
    googValueCell.style.color = 'white';  // to make the text visible on a black\

    let googlValueCell = document.getElementById('googlValue');
    googlValueCell.textContent = googlValue;
    googlValueCell.style.backgroundColor = compareWith0style(googlValue);
    googlValueCell.style.color = 'white';  // to make the text visible on a black\

    let metaValueCell = document.getElementById('metaValue');
    metaValueCell.textContent = metaValue;
    metaValueCell.style.backgroundColor = compareWith0style(metaValue);
    metaValueCell.style.color = 'white';  // to make the text visible on a black\

    let msftValueCell = document.getElementById('microsoftValue');
    msftValueCell.textContent = microsoftValue;
    msftValueCell.style.backgroundColor = compareWith0style(microsoftValue);
    msftValueCell.style.color = 'white';  // to make the text visible on a black\

    let nvdaValueCell = document.getElementById('nvidiaValue');
    nvdaValueCell.textContent = nvidiaValue;
    nvdaValueCell.style.backgroundColor = compareWith0style(nvidiaValue);
    nvdaValueCell.style.color = 'white';  // to make the text visible on a black\

}

function getStockValues() {
  var elements = document.querySelectorAll('td.screener-tickers span');
  var stockData = {};

  elements.forEach(function(element) {
    var bodyText = element.getAttribute('data-boxover');
    if (bodyText) {
      var changeValue = bodyText.split('Change: ')[1].split('%')[0];
      var stockSymbol = element.textContent.trim();
      stockData[stockSymbol] = parseFloat(changeValue);
    }
  });

  return stockData;
}

var stockData = getStockValues();

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

    let amazonValue = stockData['AMZN'];
    let appleValue = stockData['AAPL'];
    let googValue  = stockData['GOOG'];
    let googlValue  = stockData['GOOGL'];
    let metaValue = stockData['META'];
    let microsoftValue = stockData['MSFT'];
    let nvidiaValue = stockData['NVDA'];
    
    console.log('AboveCount: '+aboveCount);
    console.log('BelowCount: '+belowCount);
    console.log('UnchangedCount: '+unchangedCount);
    console.log('AMZN: ' + amazonValue);
    console.log('AAPL: ' + appleValue);
    console.log('GOOG: ' + googValue);
    console.log('GOOGL: ' + googlValue);
    console.log('META: ' + metaValue);
    console.log('MSFT: ' + microsoftValue);
    console.log('NVDA: ' + nvidiaValue);		  
    // Send a message back to the background script with the counts
    chrome.runtime.sendMessage({
	aboveCount: aboveCount,
	belowCount: belowCount,
	unchangedCount: unchangedCount,
	amazonValue: amazonValue,
        appleValue:  appleValue,
        googValue: googValue,
        googlValue: googlValue,
        metaValue: metaValue,
        microsoftValue: microsoftValue,
        nvidiaValue: nvidiaValue
    });

// Save the counts to the storage
    chrome.storage.sync.set({ aboveCount, belowCount, unchangedCount,
			      amazonValue,
			      appleValue,
                              googValue,
			      googlValue,
			      metaValue,
			      microsoftValue,
                              nvidiaValue});

    // Update the table
    updateTable(aboveCount, belowCount, unchangedCount,
                              amazonValue,
                              appleValue,
                              googValue,
                              googlValue,
                              metaValue,
                              microsoftValue,
                              nvidiaValue

	       );
    
}
scrapeTableData();

// Set an interval to continuously scrape data
setInterval(scrapeTableData, 1000);  // adjust the interval time as necessary
