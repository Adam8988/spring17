/*
// File		: smtGraphing.js	
// Date		: 4/22/2017
// Purpose	: Actual Graphing Functions that Call Raphael functions
*/
// $('#smtMakeGraph').click(function(){ smtOpenGraph(); return false; });

// START OF smtOpenGraph
// smtOpenGraph is a function that displays the graphs in tabs
/*
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
} */
function smtOpenGraph(evt, smtGraphType) {
  var i, arrGraphTabs, tablinks;
  arrGraphTabs = document.getElementsByClassName("w3-container graph");
  for (i = 0; i < arrGraphTabs.length; i++) {
     arrGraphTabs[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < arrGraphTabs.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" w3-red", ""); 
  }
  document.getElementById(smtGraphType).style.display = "block";
  evt.currentTarget.className += " w3-red";
  //$("#"+smtGraphType).load("/pages/4_Graph_DefectiveMod.html");

}
// END smtOpenGraph	
/*
	 * set number of vertices in new graph = newGraph
	 * set all graph vertices with empty list of connections
	 * adds all edges from relationship list
	 */
function smtMakeGraph(graphNodes,transactionFocus,graphType){
	var vertices =[];
	var arrEdges =[];
	NodeCount = graphNodes.length;
	//TODO 4/25/2017
	for (var i = 0; i < NodeCount; i++) {
			smtGraph.addEdge(graphNodes[i], graphNodes[i+1]);
	}	
	/*	
		//initialize all graph vertices
		for (String mod : systemData){
			List<String> arr = new ArrayList<String>();
			vertices.put(mod, arr);	
		}
		
		//add edges
		for (String pair : relationships){
			String[] parts = pair.split(" ");
			addEdge(parts[0], parts[1]);
		}
		*/
}
		/*
function smtMakeGraph(graphNodes,transactionFocus,graphType){
	var smtGraph = new Graph();
	for (var i = 0, len = graphNodes.length; i < len; i++) {
			smtGraph.addEdge(graphNodes<i>, graphNodes<i+1>);
	}
	
	// Open Tab to display the graph
	smtOpenGraph(graphType);
    // layout the graph using the Spring layout implementation 
    var layouter = new Graph.Layout.Spring(smtGraph);
    layouter.layout();
    
    // draw the graph using the RaphaelJS draw implementation
    var renderer = new Graph.Renderer.Raphael('graph_canvas', smtGraph, 400, 800);
    renderer.draw();
    
    redraw = function() {
			layouter.layout();
            renderer.draw();
    };
}
*/
