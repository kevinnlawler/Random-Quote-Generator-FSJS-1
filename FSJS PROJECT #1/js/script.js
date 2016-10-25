//Techdegree- Project #1 - Random Quote Generator
//Treehouse- Kevin Lawler
//GitHub- kevinnlawler
//Slack- kevin.lawler

//The Quote Array, a global variable named "quotes," is to be found in QUOTE_ARRAY.JS file.//

//I changed the quote font size in STYLES.CSS Line:16 from 4rem to 3rem due to long quotes getting under button on Google Chrome.//
//This program was executed successfully on Google Chrome, Mozilla Firefox, and Microsoft Edge.//
//No further re-coding was necessary.//


/* 
  For the future: 
  1) I would like to adjust the random parameters for the background color change to optimize readablity in "near white" colors.
  Possibly by darkening the text at certain points, or by limiting brightness of colors at certain points.
  2) Engage an interval "reset" to resolve button click vs. interval quote changes timing issue. I attempted a clearInterval, without success. I think it may be easier to code through jQuery syntax, but I decided to stop and submit as is, at this time.
  3) Do a random search among particular tags when lots of quotes are available. For example, search ONLY among ALL the #history tags, or ALL the #humor tags etc., and randomize the quote display as with the "no repeat" display in this program. I started with prompting input,
 Yes=1, No=2 if you want a THEME search, then a prompting for tag type, #tech, #humor etc., but I decided to stop and submit as is, at this time.
*/


//Declare global variable used for manipulating array length value to prevent quote repeat.//
var noRepeatArrayLength = quotes.length;
//Declare global variable used for interval between quote display.//
var intervalId;
//Declare global variables used to hold random color values for background color changes.//
var red, green, blue;

//Declare Function for Random Number generation used for random Array Index and random Background Color.//
function getRandomNumber( quoteIndex, backgroundColor ) {
  return Math.floor((Math.random()) * quoteIndex, backgroundColor);
}

//Declare Function that will Return the random quote (single quote and related properties and values).//
function getRandomQuote() {
//Variable for random number generated for quote selection.//
  var quoteIndex;
//Variable for a selected object, quote position (value) in the "Array of Objects".//
  var quoteObj;
//When all quotes are used once, reset for continued "no repeat".//
    if (noRepeatArrayLength === 0) {
    noRepeatArrayLength = quotes.length;
    }

//Call getRandomNumber function and assign to quoteIndex.//  
  quoteIndex = getRandomNumber(noRepeatArrayLength);
//Assign the selected position for the quote in the array.//
  quoteObj = quotes[quoteIndex];

//Remove quote at selected array position.//
    quotes.splice(quoteIndex,1);
//Add selected quote to end of array.//
    quotes.push(quoteObj);
//Decrement array length variable by one.//
    noRepeatArrayLength --;
  return quoteObj;
}

//Declare Function to create new random Background Color.//
function changeBackgroundColor() {
  red = getRandomNumber(256);
  green = getRandomNumber(256);
  blue = getRandomNumber(256);
//Construct new RGB Color for Background and Button.//
  document.body.style.backgroundColor = 'rgb(' + red + ',' + green + ',' + blue + ')';
  document.getElementById('loadQuote').style.backgroundColor = 'rgb(' + red + ',' + green + ',' + blue + ')';
}

//Declare Function to Construct and Print new quote page from random array object.//
function printQuote() {
//Call, and then assign getRandomQuote function to quoteObj variable.//
  var quoteObj = getRandomQuote();
//Declare variable to hold contents for new quote page.//
  var newQuotePage;
  
//Construct new quote by adding strings for available properties within the selected value quote object.//
  newQuotePage = '<p class = "quote">' + quoteObj.quote + '</p>';
  newQuotePage += '<p class = "source">' + quoteObj.source;
//Test if additional quote properties are present in quote object.//
//Add to quote string if TRUE.//
    if( quoteObj.citation ) {
    newQuotePage += '<span class = "citation">' + quoteObj.citation + '</span>';
    } if ( quoteObj.year ) {
    newQuotePage += '<span class = "year">' + quoteObj.year + '</span>';
    } if ( quoteObj.tag ) {
    newQuotePage += '<span class = "tag">' + " " + quoteObj.tag + '</span>';
    } newQuotePage += '</p>';
  
//Replace original quote from INDEX.HTML with newly generated random quote.//
//newQuotePage string will be new HTML in browser.//
  document.getElementById('quote-box').innerHTML = newQuotePage;
  
//Call the Background Color change function when quote changes.//
  changeBackgroundColor();
}

//Set 12 second interval to auto-execute (non-button click) printQuote function.//
//30 second interval was too long a wait time for me.//
intervalId = window.setInterval(printQuote, 12000);

//Load new quote on Click of "Show another quote" button.//
document.getElementById('loadQuote').addEventListener("click", printQuote, false);

//End of Project- #1   SCRIPT.JS