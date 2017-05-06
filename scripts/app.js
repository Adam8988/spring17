

$(document).ready(function(){
  // initial starting state
  window.app ={};
  app.selectedTab = 'define';
  $('.segment').hide();
  $('#define').show();
  $('#define_tab').toggleClass('active',true);
  $(".checkbox-fields input[name='graph-type-full']").prop('checked',true);

  //add click handlers to tabs and toolbar
  $('span.tab').click(function(e){
    app.selectedTab = e.target.id.split('_')[0]; //eg. 'define'
    $('span.tab').toggleClass('active',false);
    $(e.target).toggleClass('active',true);
    $('.segment').hide();
    $('#'+app.selectedTab).fadeIn();
  });
  $('#toolbar button').click(function(e){
    if($(e.target).text() == 'Reset'){
      window.location.reload();
      return false;
    }
    if($(e.target).text() == 'Print'){
      window.print();
      return false;
    }

    if(app.selectedTab == 'overview'){
      $(e.target).text() == 'Return' ? {} : $('#define_tab').click();
      return false;
    }
    if(app.selectedTab == 'define'){
      ($(e.target).text() == 'Return') ? $('#overview_tab').click() : processDefinition(), $('#options_tab').click();
      return false;
    }
    if(app.selectedTab == 'options'){
      ($(e.target).text() == 'Return') ? $('#define_tab').click() : processOptions(),$('#graphs_tab').click();
      return false;
    }
    if(app.selectedTab == 'graphs'){
      ($(e.target).text() == 'Return') ? $('#options_tab').click() : {};
      return false;
    }
  })
  //filereader
  $("input[name='relationship-file']").change(function(e){
    app.reader = new FileReader();
    app.reader.onload = function(e){
      app.textFromFile = app.reader.result;
      console.log('text from file: ',app.textFromFile);
    }
    app.reader.readAsText(e.target.files[0]);
  });
  //graphtype radio buttons
  console.log($('#options div.ui.radio.checkbox'))
  $("#options div.ui.radio.checkbox").click(function(e){
    console.log('radio click')
    $('#options div.ui.radio.checkbox input').prop('checked',false);
    var name = 'graph-type-'+$(e.target).text().split(' ')[0].toLowerCase();
    console.log(name)
    console.log($(e.target))
    console.log($("#options dive.ui.radio.checkbox input[name='"+name+"']"))
    $("#options div.ui.radio.checkbox input[name='"+name+"']").prop('checked', true);

  });
  //graph selection handlers
  $('#graphs button.graph-button').click(function(e){
    var selectedGraph = $(e.target).text().toLowerCase();
    clearGraphStyles();
    if(selectedGraph == 'full'){
      console.log('full')
      //remove css from all nodes and edges
    }
    if(selectedGraph == 'target'){
      console.log('target')
      var targetNode = app.cy.elements('#'+app.targetNode);
      targetNode.addClass('target');
      app.graphData.targetEdges.forEach(function(edge){
        console.log(edge)
        app.cy.elements('#'+ edge.data.id).addClass('target');
      },this);
    }
    if(selectedGraph == 'relationship'){
      console.log('relationship')
      app.focusGroup.split(',').forEach(function(id){
        app.cy.elements('#'+id).addClass('focus');
      },this);
      app.graphData.edges.forEach(function(el){
        if(app.focusGroup.indexOf(el.data.source) != -1 || app.focusGroup.indexOf(el.data.target) != -1 ){
          console.log(el.data.id)
          app.cy.elements('#'+el.data.id).addClass('focus');
        }
      },this);
    }
  })

}); //end $.ready

function processOptions(){
  // console.log($('#options input:checked').prop('name'))
  app.graphType = $('#options input:checked').prop('name').split('-')[2];
  app.focusGroup = $("#options input[name='relationship-focus-group']").val();
  app.graphData = {};
  app.focusGroup = $("#options input[name='relationship-focus-group']").val();
  app.targetNode = $("#options input[name='target-node']").val();
  if(app.targetNode != ""){
    app.graphData.targetNode = [{data:{id:app.targetNode}}];
    app.graphData.targetEdges = [];
    app.edges.forEach(function(el){
      if(el.data.id.indexOf(app.targetNode) != -1){
        console.log(el)
        app.graphData.targetEdges.push(el);
      }
    },this);
  }
  app.graphData.edges = app.edges;
  app.graphData.nodes = app.nodes;
  app.graphData.graphType = app.graphType;

  //insert data into next segment
  $('#graphs span.numNodes').text(app.numNodes)
  $('#graphs span.nodeList').text(app.nodeList)
  $('#graphs span.focusGroup').text(app.focusGroup)
  $('#graphs span.targetNode').text(app.targetNode)
  $('#graphs span.graphType').text(app.graphType)

  //build graph
  console.log(app)
  createGraphs();
}

function clearGraphStyles(){
  app.graphData.nodes.forEach(function(node){
    app.cy.elements('#'+node.data.id).removeClass('target')
    app.cy.elements('#'+node.data.id).removeClass('focus')
  },this);
  app.graphData.edges.forEach(function(edge){
    app.cy.elements('#'+edge.data.id).removeClass('target')
    app.cy.elements('#'+edge.data.id).removeClass('focus')
  },this);
}

function createGraphs(){
  app.cy = cytoscape({
    container: $('#cy'),
    elements: {
      nodes:app.graphData.nodes,
      edges: app.graphData.edges
    },
    style: cytoscape.stylesheet()
    .selector('node')
    .css({
      'background-color': 'black',
      'width': 'mapData(baz, 0, 10, 10, 40)',
      'height': 'mapData(baz, 0, 10, 10, 40)',
      'content': 'data(id)'
    })
    .selector('edge')
    .css({
      'curve-style': 'bezier',
      'line-color': 'black',
      'mid-target-arrow-color': 'black',
      'width': 2,
      'mid-target-arrow-shape': 'triangle',
      'opacity': 0.8
    })
    .selector(':selected')
    .css({
      'background-color': 'blue',
      'line-color': 'blue',
      'target-arrow-color': 'blue',
      'source-arrow-color': 'blue',
      'opacity': 1
    })
    .selector('node.target')
    .css({
      'text-background-color': 'black',
      'background-color': '#B3767E',
      'line-color': '#B3767E',
      'color': '#B3767E',
      'target-arrow-color': '#B3767E',
      'source-arrow-color': '#B3767E',
      'opacity': 1
    })
    .selector('node.focus')
    .css({
      'text-background-color': 'black',
      'background-color': '#7692b3',
      'line-color': '#7692b3',
      'color': '#7692b3',
      'target-arrow-color': '#7692b3',
      'source-arrow-color': '#7692b3',
      'opacity': 1
    })
    .selector('edge.target')
    .css({
      'curve-style': 'bezier',
      'line-color': '#F2B1BA',
      'mid-target-arrow-color': '#F2B1BA',
      'width': 2,
      'mid-target-arrow-shape': 'triangle',
      'opacity': 0.8
    })
    .selector('edge.focus')
    .css({
      'curve-style': 'bezier',
      'line-color': '#b1bdf2',
      'mid-target-arrow-color': '#b1bdf2',
      'width': 2,
      'mid-target-arrow-shape': 'triangle',
      'opacity': 0.8
    })
    .selector('.faded')
    .css({
      'opacity': 0.25,
      'text-opacity': 0
    }),
    layout: {
      name: 'circle',
      padding: 10,
      avoidOverlap: true,
      fit: true,
      radius:app.numNodes * 20,
      avoidOverlapPadding: 10,
      boundingBox: {
        x1: 0, y1: 0, x2: 560, y2: 376, w: 560, h: 376
      }
    },
    directed: true,
    styleEnabled: true
  });
  $("#graphs button[name='"+app.graphData.graphType+"']").click();
}

function processDefinition(){
  var str = app.textFromFile ? app.textFromFile : $("#define input[name='relationship-text']").val();
  str = str.replace(/\r/g, "").replace(/\n/g, "");
  console.log(str.replace(/\r/g, "").replace(/\n/g, ""))
  var nodes = [];
  var edges = [];
  var nodeList = [];
  var edgeList = [];
  app.graphData = {};
  // console.log('relationships: ',relationships.replace(/\r/g, "").replace(/\n/g, ""))
  // //sanitized and structure relationship string for edge and node parsing
  str.replace(/\r/g, "").replace(/\n/g, "").split(';').forEach(function(el){
    var sanitized = el.split(' ').filter(function(el){
      return el != '' && nodeList.indexOf(el) == -1;
    },this);
    var structured = {
      data:{
        id: sanitized[0]+sanitized[1],
        source: sanitized[0],
        target: sanitized[1]
      }
    };
    nodes = nodes.concat(sanitized);
    edges= edges.concat(structured);
  },this);
  // //create nodelist array
  nodes.forEach(function(el){
    if(nodeList.indexOf(el) == -1){
      nodeList.push(el)
    }
  },this);
  app.nodeList = nodeList;
  app.nodes =  nodeList.map(function(el){
    return {data:{id:el}};
  },this);

  edges = str.toString().split(';').map(function(el){
    console.log(el)
    var sanitized = el.replace(';','').replace('\r','').split(' ');
    var structured = {
      data:{
        id: sanitized[0]+sanitized[1],
        source: sanitized[0],
        target: sanitized[1]
      }
    };
    return structured;
  },this).filter(function(edge){
    return edge.data.id != 'undefined';
  });
  app.edges = edges;
  console.log('app data:',app)
  app.numNodes = app.nodeList.length;
  //insert data into next segment
  $('#options span.numNodes').text(app.numNodes);
  $('#options span.nodeList').text(app.nodeList.toString());
}
