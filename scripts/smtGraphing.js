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
function smtMakeGraph(graphNodes,graphEdges,transactionFocus,graphType){
	var vertices =[];
	var arrEdges =[];
  var graphData = {
    nodes: undefined,
    edges: undefined
  };
	NodeCount = graphNodes.length;
  var filteredNodes = graphNodes.filter(function(el){
    return el != '';
  })
  graphData.nodes = filteredNodes.map(function(el){
    if(el != ""){
      return {
        data: {id: el}
      }
    }
  },this);
  graphData.edges = app.arrayFriends.map(function(el,index,arr){
    if(index % 2 == 0){
      return {
        data: {
          id: el + arr[index+1],
          source: el,
          target: arr[index+1]
        }
      }
    }
  },this).filter(function(el){
    if(el == undefined){
      return false;
    }
    if(el.data == undefined){
      return false;
    }
    if(el.data.id == undefined || el.data.id == 'undefined'){
      return false;
    }
    return true;
  },this);
  var graphContainer = $('#'+graphType);
  console.log(graphContainer)
  console.log(graphData)
  console.log('%c'+JSON.stringify(graphData, null, 2),'background: #222; color: #bada55');
  // $(graphContainer).css('display','block');
  var cy = cytoscape({
    container: graphContainer,
    style: cytoscape.stylesheet()
      .selector('node')
        .css({
          'background-color': '#B3767E',
          'width': 'mapData(baz, 0, 10, 10, 40)',
          'height': 'mapData(baz, 0, 10, 10, 40)',
          'content': 'data(id)'
        })
      .selector('edge')
        .css({
          'line-color': '#F2B1BA',
          'target-arrow-color': '#F2B1BA',
          'width': 2,
          'target-arrow-shape': 'circle',
          'opacity': 0.8
        })
      .selector(':selected')
        .css({
          'background-color': 'black',
          'line-color': 'black',
          'target-arrow-color': 'black',
          'source-arrow-color': 'black',
          'opacity': 1
        })
      .selector('.faded')
        .css({
          'opacity': 0.25,
          'text-opacity': 0
      }),

      elements: graphData,

      layout: {
        name: 'circle',
        padding: 10,
        boundingBox: {
          x1: 0, y1: 0, x2: 560, y2: 376, w: 560, h: 376
        }
      },

      ready: function(){
        // ready 1
        $('#'+graphType).css('display','block');
      }
  })
  console.log(graphContainer);
  // switch(graphType){
  //   case 'graphFocusGroup':
  //   break;
  //   case 'graphDefMod':
  //   break;
  //   case 'graphFull':
  //   break;
  // }
  //TODO use cytoscape to  graph these points



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
