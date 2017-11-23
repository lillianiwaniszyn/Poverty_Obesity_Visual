function tooltipHtml(n, d){	/* function to create html content string in tooltip div. */
		console.log(d.cerealLink);
		drawPic(d.cerealLink);
		return "<h4>"+n+"</h4><table>"+
			"<tr><td>Good:</td><td>"+ (d.good) +"</td></tr>"+
			"<tr><td>Overweight:</td><td>"+(d.overweight)+"</td></tr>"+
			"<tr><td>Obese:</td><td>"+(d.obese)+"</td></tr>"+
			"</table>";
			
	}
	

var width = 1500;
var height = 500;	
var svg = d3.select("body")
			.append("svg")
			.attr("width", width)
			.attr("height", height);	
	
// Load in my states data!

d3.csv("stateslived.csv", function(data) {

// Load GeoJSON data and merge with states data
d3.json("us-states.json", function(json) {

// Loop through each state data value in the .csv file
for (var i = 0; i < data.length; i++) {

	// Grab State Name
	var dataState = data[i].state;

	// Grab data value 
	var dataValue = data[i].visited;
	
			var sampleData ={};	/* Sample random data. */	
	["AL","AK", "AZ", "AR", "CA", "CO","CT", "DE","DC","FL","GA","HI","ID","IL","IN",
	"IA","KS","KY","LS","ME","MD","MA","MI","MN","MS","MO","MT",
	"NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR",
	"PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"
	      ]
		.forEach(function(d){ 
		var lilColour = data[i].colour;
		var cerealLink = data[i].cerealLink;
		var goodD= data[i].good;
		var ov= data[i].Overweight;
		var ob= data[i].Obese;
			sampleData[d]={good:(goodD),overweight:(ov), obese:(ob), color:(lilColour),cerealLink:(cerealLink)}; 
			i++;
			drawPic("#00000F");
		});
	
	/* draw states on id #statesvg */	
	uStates.draw("#statesvg", sampleData, tooltipHtml);
	
	d3.select(self.frameElement).style("height", "600px"); 

	// Find the corresponding state inside the GeoJSON
	for (var j = 0; j < json.features.length; j++)  {
		var jsonState = json.features[j].properties.name;

		if (dataState == jsonState) {

		// Copy the data value into the JSON
		json.features[j].properties.visited = dataValue; 

		// Stop looking through the JSON
		break;
		}
	}

}
		
	
	



	});

});
function drawPic(link){
d3.selectAll(".first").remove();
d3.select('body').select('svg').append("image")
  .attr("x", 900)
  .attr("y", 200)
  .attr("height", "128px")
  .attr("width", "128px")
  .attr("class", "first")
  .attr("xlink:href", link)





}
