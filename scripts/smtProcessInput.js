/*
// File		: smtProcessInput.js
// Author	: COMPANY CONFIDENTIAL
// Date		: 4/22/2017
// Purpose	: Input Processing Functions
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
	console.debug('smtProcessTransactions running:',strSubmitted)
	var patternTransSep = /\;\\n/;
	var arrRelationships = [];
	if ((strSubmitted === undefined)||(strSubmitted === null)) {
        strSubmitted = "blank blank";
    }
	//UniqueFriendsNum


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
	var fileContentArea = document.getElementById('canvas');
	console.debug('smtAnalyzeRelationships running:',fileContentArea.innerText)
	var patternSpace = / /;

	var arrayTransactions = [];
	var txtToProcess;
	var txtFromInput;

	try{
		txtFromInput=fileContentArea.innerText
		console.log('txtFromInput: ',txtFromInput);
	}catch(err){
		console.log('txtFromInput ERROR: "' + err + '"');
		txtFromInput = "";
	}

	var txtFromFile;

	try{
		txtFromFile =smtForm.elements["fileInput"].innerText;
		console.log('text from file: ',txtFromFile);
	}catch(err){
		console.log('txtFromFile ERROR: "' + err + '"');
		txtFromFile = "";
	}

	var arrayFriends = [];
	var arrayUniqFriends = [];
	var strUniqFriends;
	var DisplayArea=document.getElementById("canvas");
	// var countUniqFriends=document.getElementById("UniqueFriendsNum");
	// var listUniqFriends=document.getElementById("UniqueFriendsList");

	//The input field was empty, try the file upload
	if ((txtFromInput === undefined)||(txtFromInput === "")) {
        txtToProcess = txtFromFile;
    } else {
		txtToProcess = txtFromInput;
	}
	console.log('txtToProcess: ', txtToProcess)
	//Then check it again and if we're not passed anything, set it.
	if ((txtToProcess === undefined)||(txtToProcess === "")) {
		txtToProcess = "empty set";
	}

	//alert(typeof txtToProcess.toString());
	arrayFriends = txtToProcess.toString().split(/[ ;\n]/);
	txtToProcess.replace(/\*\*/g, "");
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
		arrayFriends = txtToProcess.toString().split(/[ ;\n]+/).filter(function(el){
			return el != '';
		},this);
		arrayUniqFriends = arrayFriends.unique();
		strUniqFriends = arrayUniqFriends.toString();
		// change commas to spaces
		strUniqFriends.replace(/,/g, " ");
		// Set these values
		document.getElementById("UniqueFriendsNum").innerHTML=arrayFriends.length;
		document.getElementById("UniqueFriendsList").innerHTML=strUniqFriends;
		$('#uniqueCount').text($('#UniqueFriendsList').text().split(',').length)
		$('#uniqueList').text($('#UniqueFriendsList').text())
		// debug Print the Unique Friends to the right place
		console.log('%c arrayFriends:' + arrayFriends,'background: #222; color: #bada55');
		console.log('%c arrayFriends:' + arrayFriends.join(' / '),'background: #222; color: #bada55');
		window.app = {};
		app.arrayFriends = arrayFriends;
		DisplayArea.innerHTML = "<ul>" +
								"<li><b># Unique Friends:</b> " + arrayFriends.length + "</li>" +
								"<li><b>List of Unique Friends</b><br>" + strUniqFriends +
								"</li>" +
								"</ul>";
		myTabs.goToTab(2)
		return false;

	} else {
		txtOutput="<b>Input contained no valid relationships</b>";
		document.getElementById("paper").innerHTML = txtOutput;
		return false;
	}
}

// function smtConductStudy(form){
// 	try{
// 		txtFromFile =form.elements["fileInput"].innerText;
// 	}catch(err){
// 		console.log('txtFromFile ERROR: "' + err + '"');
// 		txtFromFile = "";
// 	}
// 		if(txtToProcess){
// 			_makeGraphs();
// 			myTabs.goToTab(4);
// 		} else {
// 			return false;
// 		}
// }

function isInArray(relationship,arrayFriends){
	var foundInArray=0;
	for (i=0; i < arrayFriends.length; i++) {
		if (arrayFriends[i].match(relationship)) {
			foundInArray = 1;
			i = arrayFriends.length;
		}
	}
	return foundInArray;
}
function smtConductStudy(formStudyOptions) {
	console.log($('#UniqueFriendsList'));
	console.log($('#UniqueFriendsList').text());
	var graphNodes 			= $('#UniqueFriendsList').text().split(",");
	var relationFocus 	=$('input#tUnderStudy').val() == "" ? 'none' : $('input#tUnderStudy').val() ;
	var graphType = $("input:radio[name='radio_position']:checked").val() == undefined ? 'none' : $("input:radio[name='radio_position']:checked").val();


	console.log('graphNodes: \n', graphNodes)
	console.log('relationFocus: \n', relationFocus)
	console.log('graphType: \n', graphType)
	myTabs.goToTab(3);
	smtMakeGraph(graphNodes,undefined, relationFocus,graphType);
}
function _makeGraphs(){

}
