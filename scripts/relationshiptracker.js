/*
// ################################################################
// Layout Functions
// ################################################################
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


/*
// ###################################################################
// Input Processing Functions
// ###################################################################
*/
// Build a unique array using a "hash map" to check if an item is repeated
// credit goes to  Chunlong http://jszen.com
Array.prototype.unique = function(){
		var n = {},arrayR=[];
		for(var i = 0; i < this.length; i++){
			if (!n[this[i]]){
				n[this[i]] = true;
				arrayR.push(this[i]);
			}
		}
		return arrayR;
}

function smtProcessTransactions(strSubmitted){
	var patternTransSep = /\;\\n/;
	var arrRelationships = [];
	if ((strSubmitted === undefined)||(strSubmitted === null)) {
        strSubmitted = "blank blank";
    }
//	UniqueFriendsNum


	arrRelationships = strSubmitted.toString().split(/[;\n]/);
	console.log('The original string is: "' + strSubmitted + '"');
	console.log('The separator is: "' + patternTransSep + '"');
	console.log('The array arrRelationships[] has '
				+ arrRelationships.length
				+ ' elements: '
				+ arrRelationships.join(' / ')
				);

	return true;
// TODO
}
function smtAnalyzeRelationships(smtForm) {
	var patternSpace = / /;

	var arrayTransactions = [];
	var txtToProcess;
	var txtFromInput;

		try{
			txtFromInput=smtForm.elements["txtModRelationships"].value;
		}catch(err){
			console.log('txtFromInput ERROR: "' + err + '"');
			txtFromInput = "";
		}

	var txtFromFile;

		try{
			txtFromFile =smtForm.elements["fileInput"].innerText;
		}catch(err){
			console.log('txtFromFile ERROR: "' + err + '"');
			txtFromFile = "";
		}

	var arrayFriends = [];
	var arrayUniqFriends = [];
	var strUniqFriends;
	var DisplayArea=document.getElementById("paper");
	var countUniqFriends=document.getElementById("UniqueFriendsNum");
	var listUniqFriends=document.getElementById("UniqueFriendsList");

	//The input field was empty, try the file upload
	if ((txtFromInput === undefined)||(txtFromInput === "")) {
        txtToProcess = txtFromFile;
    } else {
		txtToProcess = txtFromInput;
	}
	//Then check it again and if we're not passed anything, set it.
	if ((txtToProcess === undefined)||(txtToProcess === "")) {
		txtToProcess = "empty set";
	}

	//alert(typeof txtToProcess.toString());
	arrayFriends = txtToProcess.toString().split(/[ ;\n]/);
	arrayFriends.replace(/\*\*/g, "");
	console.log('The original string is: "' + txtToProcess + '"');
	console.log('The separator is: "' + patternSpace + '"');
	console.log('The array has '
				+ arrayFriends.length
				+ ' elements: '
				+ arrayFriends.join(' / ')
				);
	//We need at least 1 relationship
	//The .test is a pattern matching function
	if(patternSpace.test(txtToProcess)){
		//get user input for transactions
		// get Unique Friends
		arrayFriends = txtToProcess.toString().split(/[ ;\n]+/);
		arrayUniqFriends = arrayFriends.unique();
		strUniqFriends = arrayUniqFriends.toString();
		// change commas to spaces
		strUniqFriends.replace(/,/g, " ");
		// Set these values
		document.getElementById("UniqueFriendsNum").innerHTML=arrayFriends.length;
		document.getElementById("UniqueFriendsList").innerHTML=strUniqFriends;
		// debug Print the Unique Friends to the right place

		DisplayArea.innerHTML = "<ul>" +
								"<li><b># Unique Friends:</b> " + arrayFriends.length + "</li>" +
								"<li><b>List of Unique Friends</b><br>" + strUniqFriends +
								"</li>" +
								"</ul>";
		// TODO
		if(txtToProcess){
			return smtProcessTransactions(txtToProcess);
		} else {
			return false;
		}



	} else {
		txtOutput="<b>Input contained no valid relationships</b>";
		document.getElementById("paper").innerHTML = txtOutput;
		return false;

	}
}

function studyDefects(form){
	//TODO
			return false;
}
/* ###################################################################
// Actual Graphing Functions that Call Raphael functions
// ###################################################################
*/
// $('#smtMakeGraph').click(function(){ smtOpenGraph(); return false; });

// START OF smtOpenGraph
// smtOpenGraph is a function that displays the graphs in tabs
function smtOpenGraph(evt, smtGraphType) {
  var i, x, tablinks;
  x = document.getElementsByClassName("graph");
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < x.length; i++) {
     tablinks[i].className = tablinks[i].className.replace(" w3-border-red", "");
  }
  document.getElementById(smtGraphType).style.display = "block";
  evt.currentTarget.firstElementChild.className += " w3-border-red";
}
// END smtOpenGraph

redraw = function() {
	layouter.layout();
    renderer.draw();
};

function smtMakeGraph(tabDestination){
	if(!tabDestination){
		alert("tabDestination not set");
		return false;
	}
	var smtGraph = new Graph();
	for (var i = 0, len = nodes.length; i < len; i++) {
		smtGraph.addEdge(nodes<i>, nodes<i+1>);
	}

    /* layout the graph using the Spring layout implementation */
    var layouter = new Graph.Layout.Spring(smtGraph);
	layouter.layout();

	/* draw the graph using the RaphaelJS draw implementation */
	var renderer = new Graph.Renderer.Raphael('canvas', smtGraph, 400, 400);
	renderer.draw();
	return false;
}
