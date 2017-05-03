# spring17
Produce network graphs from a string of related data 


**// Relationship Tracker
 
1	Goal
Produce network graphs from a string of related data

2	Tab 1 (Define Relationships) 
1.	When "Continue" is clicked, right now, it performs the parsing required.
2.	In addition to the parsing, it needs to make "Tab 2" visible.
3.	Relationships are a list of friends separated by a space
4.	Unique Friends are separated by semicolons

3	Tab 2 (Select Study Options) 
1.	Tab 2 allows user to identify which relationship (related friends) that should be graphed
2.	The Relationship Focus Group field is optional
3.	Tab 2 allows the user to identify which module is defective. 
4.	The Bad Apple field is optional
5.	If Bad Apple is identified, the following features are active
* An error should be displayed, on the current tab/screen if the user entered a module that does not appear in the list of    
  unique friends
* The Bad Apple study option (on the Study Options tab) should become available. It should be greyed out otherwise
* On all resulting graphs the Bad Apple should be highlighted (light yellow, with bold red font). 
6.	 Clicking "Conduct Study" should make Tab 3 (Graphs) visible.

4	Tab 3 (Graphs)
1.	Tab 3 is for displaying output.
2.	The initially displayed sub tab in tab 3, is the one that was selected in Tab 2.
3.	If Relationship Focus Group field in Tab 2 was empty, the Focus Group subtab in Tab 3 should be disabled.
4.	If the Bad Apple field in tab 2 was empty, Defective sub tab should be disabled.
5.	All graphs should show lines between friends. 
6.	All friends should have labels (bold font text in font size 10 or 11)
7.	If the “Redraw” subtab is clicked, the currently displayed graph should be recalculated and the graph reset to fit all friends on the displayed screen.
8.	Graphs should grow length-wise, if needed
9.	Circular relationships can exist and the graph should show the connected line 
10. We would prefer to use cytoscape libraries. http://js.cytoscape.org/demos/310dca83ba6970812dd0/ instead of Jraphael

//**
