

function generateTable(lines){
	//Clear previous data
	//findCol(lines)
	console.log('generateTable');
	console.log(lines[0].length, lines.length)
	var t0 = performance.now();
	document.getElementById("output").innerHTML = "";
	var table = document.createElement("table");
	table.id = "searchtable";
	table.className = 'xreftable';
	/*var len = 0;
	for (var i = 0; i < lines.length; i++) {
		console.log(lines[i].length)
		if (lines[i].length > len) {
			len = lines[i].length;
		}
	}
	*/
	
	len = lines[6].length
	table.createCaption();
	table.caption.innerHTML = lines[0];
	// make header
	var row = document.createElement('TR');
	for (var j = 3; j < len; j++) {
		var th = document.createElement("TH");
		th.appendChild(document.createTextNode('col '+j));
		th.className = 'Col'+j
		var fontCol = 0;
		row.appendChild(th);
	}

	
	table.appendChild(row);
	var tbody = document.createElement('TBODY');
	for (var i = 0; i < lines.length; i++) {  // get line
		if (i < 3) continue
		if (lines[i].length > 1) {	// process row
			var row = document.createElement('TR');
			row.className = "item";
			for (var j = 0; j < lines[i].length; j++) {
				/*if (i ===0) {
					if (j>3) {
						break
					}
				} */
				var text = ""
				var td = document.createElement("TD");

				if (lines[i][j]) text = lines[i][j].trim();
				
				td.appendChild(document.createTextNode(text));
				td.className = 'Col'+j
				row.appendChild(td);
				
			}  // end column process

						
			row.style.display = "";
			
			
		}	// end row process
		tbody.appendChild(row);
	}  // end process line
		
	table.appendChild(tbody);
	//table.rows[0].cells[3].colSpan = 9;
	
	
	document.getElementById("output").appendChild(table);
	var t1 = performance.now();
	console.log("generateTable " + (t1 - t0) + " milliseconds.");
}

/*
function jscsvToArray(text) {
	console.log('xcsv...')
	row = [];
	lines = text.split('\n');
	for (var i in lines){
		//l = lines[i].replace(/|/g, ",");
		l = lines[i].split('|')
		for (var j in l) {
			l[j] = l[j].substring(1, l[j].length - 1)
		}
		row.push(l);
	}
	console.log(row[2])
	return row;
}
*/
function removeLeading3(ary) {
	console.log(typeof(ary))
	for (i =0; i<ary.length; i++) {
		ary[i].shift()
		ary[i].shift()
		ary[i].shift()
		console.log(ary[i]);
	}
	return ary
}

function csvToArray(text) {
	console.log(text)
	var t0 = performance.now();
	let p = '', row = [''], ret = [row], i = 0, r = 0, s = !0, line;
	for (line of text) {
		if ('"' === line) {
			if (s && line === p) {
				row[i] += line;
			}
			s = !s;
		} else if (',' === line && s) {
			line = row[++i] = '';
		} else if ('\n' === line && s) {
			if ('\r' === p) {
				row[i] = row[i].slice(0, -1);
			}
			row = ret[++r] = [line = '']; i = 0;
		} else {
			row[i] += line;
		}
		p = line;
	}
	//console.log('csv2array',ret[4]);
	var t1 = performance.now();
	console.log("csvToArray " + (t1 - t0) + " milliseconds.");
    return ret;
};

function search_Table(){
	var input = document.getElementById('xsearch').value.toUpperCase();
	var filter =  input.split(' '); 
	console.log('searchtable',srchType, input)	
	table = document.getElementById("searchtable");
	tr = table.getElementsByTagName("tr");
	for (i = 1; i < tr.length; i++) {
		td = tr[i].getElementsByTagName("td") ; 
		var txt = "+";
		for(j=1 ; j < td.length ; j++) {
			  let tdata = td[j] ;
			  if (tdata) {
				 txt = txt +'+'+ tdata.innerHTML.toUpperCase();
			  }
		}
		//console.log('srch',txt, 'filter',filter);
		if (srchType === 'word') {  // word search
			txt = txt +'+';
			txt = txt.replace(/ /g,'+')
			txt = txt.replace(/:/g,'+')
			txt = txt.replace(/,/g,'+')
			//txt = txt.split('+')
			
			var found = true;
			for(var f = 0; f < filter.length; f++) {
				if (txt.indexOf('+'+filter[f]+'+')  === -1) { 
					found = false;
				}
			}
		} else {			// char search
			var found = true;
			for(var f = 0; f < filter.length; f++) {
				if (txt.indexOf(filter[f])  === -1) { 
					found = false;
				}
			}
		}	
		//found = arrayContains(txt, filter)
		//console.log(i,input, txt, found)
		if (found) {
				tr[i].style.display = "";
		} else {
				tr[i].style.display = "none";
		}
	}
}



function xsortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("searchtable");
  switching = true;
  //Set the sorting direction to ascending:
  dir = "asc"; 
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("td")[n];
      y = rows[i + 1].getElementsByTagName("td")[n];
      /*check if the two rows should switch place,
      based on the direction, asc or desc:*/
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      //Each time a switch is done, increase this count by 1:
      switchcount ++;      
    } else {
      /*If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again.*/
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

function xsortArrayByCol(arr, colIndex){
    arr.sort(sortFunction);
    function sortFunction(a, b) {
        a = a[colIndex];
        b = b[colIndex];
       return isNaN(a-b) ? (a === b) ? 0 : (a < b) ? -1 : 1 : a-b  ;  // test if text string - ie cannot be coerced to numbers.
       // Note that sorting a column of mixed types will always give an entertaining result as the strict equality test will always return false
       // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness

       }
}
function clearTable() {
    var input, filter, found, srchtable, tr, td, i, j;
    document.getElementById('xsearch').value = "";
	search_Table();
//	document.getElementById('xlf').value = ""; 
	console.log("clearall");
}