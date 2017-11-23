function tooltipHtml(n, d){	/* function to create html content string in tooltip div. */
		console.log(d.circColour);
		drawPic(d.circColour);
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
		var circColour = data[i].circColour;
		var goodD= data[i].good;
		var ov= data[i].Overweight;
		var ob= data[i].Obese;
			sampleData[d]={good:(goodD),overweight:(ov), obese:(ob), color:(lilColour),circColour:(circColour)}; 
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
function drawPic(colour){
var svg = d3.select("svg"),
    width = 200,
    height = 200,
    radius = Math.min(width, height) / 2,
    g = svg.append("g").attr("transform", "translate(" + 1000  + "," + height  + ")");

var color = d3.scaleOrdinal([colour]);

var pie = d3.pie()
    .sort(null)
    .value(function(d) { return d.population; });

var path = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

var label = d3.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);

d3.csv("data.csv", function(d) {
  d.population = +d.population;
  return d;
}, function(error, data) {
  if (error) throw error;

  var arc = g.selectAll(".arc")
    .data(pie(data))
    .enter().append("g")
      .attr("class", "arc");

  arc.append("path")
      .attr("d", path)
      .attr("fill", function(d) { return color(d.data.age); });

  arc.append("text")
      .attr("transform", function(d) { return "translate(" + label.centroid(d) + ")"; })
      .attr("dy", "0.35em")
      .text(function(d) { return d.data.age; });
});
}
