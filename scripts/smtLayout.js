/*
// File		: smtLayout.js	
// Date		: 4/22/2017
// Purpose	: Do tab layouts
*/
var tabLinks = new Array();
var contentDivs = new Array();
	
// START SMT TAB Initialization
// Credits: http://www.elated.com/articles/javascript-tabs/
 function init() {

      // Grab the tab links and content divs from the page
      var tabListItems = document.getElementById('smtTabs').childNodes;
	  /*
	  It loops through all the li elements in the tabs unordered list. For each li element, it calls the getFirstChildWithTagName() helper function to retrieve the a link element inside. Then it calls the getHash() helper function to extract the part of the link's URL after the hash; this is the ID of the corresponding content div. The link element is then stored by ID in the tabLinks array, and the content div is stored by ID in the contentDivs array.
	  */
      for ( var i = 0; i < tabListItems.length; i++ ) {
        if ( tabListItems[i].nodeName === "LI" ) {
          var tabLink = getFirstChildWithTagName( tabListItems[i], 'A' );
          var id = getHash( tabLink.getAttribute('href') );
          tabLinks[id] = tabLink;
          contentDivs[id] = document.getElementById( id );
        }
      }

      // Assign onclick events to the tab links, and
      // highlight the first tab
      var i = 0;

      for ( var id in tabLinks ) {
        tabLinks[id].onclick = showTab;
        tabLinks[id].onfocus = function() { this.blur() };
        if ( i == 0 ) tabLinks[id].className = 'selected';
        i++;
      }

      // Hide all content divs except the first
      var i = 0;

      for ( var id in contentDivs ) {
        if ( i != 0 ) contentDivs[id].className = 'smtTabCon hide';
        i++;
      }
}
// END SMT TAB Initialization
// START ShowTAB
/*
The function extracts the selected ID from the clicked link's href attribute and stores it in selectedId. It then loops through all the IDs. For the selected ID it highlights the corresponding tab and shows the content div; for all other IDs it dims the tab and hides the content div. It does all this by setting CSS classes on the tab links and content divs.

Finally the function returns false to prevent the browser from following the clicked link and adding the link to the browser history.
*/
function showTab() {
      var selectedId = getHash( this.getAttribute('href') );

      // Highlight the selected tab, and dim all others.
      // Also show the selected content div, and hide all others.
      for ( var id in contentDivs ) {
        if ( id === selectedId ) {
          tabLinks[id].className = 'selected';
          contentDivs[id].className = 'smtTabCon';
        } else {
          tabLinks[id].className = '';
          contentDivs[id].className = 'smtTabCon hide';
        }
      }

      // Stop the browser following the link
      return false;
}
// END ShowTAB

// START OF getFirstChildWithTagName
/*
This helper function returns the first child of a specified element that matches a specified tag name. init() calls this function to retrieve the a (link) element inside each list item in the tabs list.

The function loops through the child nodes of element until it finds a node that matches tagName. It then returns the node.
*/
function getFirstChildWithTagName( element, tagName ) {
    for ( var i = 0; i < element.childNodes.length; i++ ) {
        if ( element.childNodes[i].nodeName == tagName ) return element.childNodes[i];
    }
}
// END OF getFirstChildWithTagName

// START OF getHash
/*
The getHash() helper function returns the portion of a URL after any hash symbol. 
Used by init() and showTab() to extract the content div ID referenced in a tab link.
*/
function getHash( url ) {
    var hashPos = url.lastIndexOf ( '#' );
    return url.substring( hashPos + 1 );
}
// END OF getHash
/////////// END OF Layout Functions
