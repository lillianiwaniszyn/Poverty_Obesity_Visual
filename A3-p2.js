function tooltipHtml(n, d){	/* function to create html content string in tooltip div. */
		//console.log(d.cerealLink);
		drawLineChart();
		drawPic(d.cerealLink, d.stateName, d.calories, d.Carbo, d.Cups, d.Fat, d.Fibre, d.Potassium, d.Protein, d.Rating, d.Shelf, d.Sodium, d.Sugars,
		d.Vitamins, d.Weight, d.cerealName);
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
		var calories = data[i].Calories;
		var stateName = data[i].state;
		var cerealName = data[i].favCereal;
		var Carbo = data[i].Carbo;	
		var Cups = data[i].Cups;	
		var Fat	= data[i].Fat;
		var Fibre = data[i].Fiber;	
		var Potassium = data[i].Potassium;	
		var Protein	= data[i].Protein;
		var Rating = data[i].Rating;
		var Shelf = data[i].Shelf;
		var Sodium = data[i].Sodium;
		var Sugars = data[i].Sugars;
		var Vitamins  = data[i].Vitamins;
		var Weight = data[i].Weight;
		var goodD= data[i].good;
		var ov= data[i].Overweight;
		var ob= data[i].Obese;
			sampleData[d]={good:(goodD),overweight:(ov), obese:(ob), color:(lilColour),cerealLink:(cerealLink), stateName: (stateName),
			calories: (calories), Carbo: (Carbo), Cups: (Cups),Fat: (Fat),Fibre: (Fibre),Potassium: (Potassium),
			Protein: (Protein),Rating: (Rating),Shelf: (Shelf),Sodium: (Sodium), Sugars: (Sugars),Vitamins: (Vitamins),Weight: (Weight),
			cerealName: (cerealName)}; 
			i++;
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
function drawLineChart(){
var svg = d3.select("svg"),
    width = 500,
    height = 200,
    g = svg.append("g").attr("transform", "translate(" + 900+ "," + 500 + ")");


var x = d3.scaleLinear()
    .rangeRound([0, width]);

var y = d3.scaleLinear()
    .rangeRound([height, 0]);

var line = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.close); });

d3.tsv("data.tsv", function(d) {
  d.date = d.date;
  d.close = +d.close;
  return d;
}, function(error, data) {
  if (error) throw error;

  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain(d3.extent(data, function(d) { return d.close; }));

  g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).ticks(5).tickFormat(d3.format("d")))
    .select(".domain")
      ;

  g.append("g")
      .call(d3.axisLeft(y))
    .append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("text-anchor", "end")


  g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", line);
});

}

function drawPic(link, stateName, calories, Carbo, Cups, Fat, Fibre, Potassium, Protein, Rating, Shelf, Sodium, Sugars,
		Vitamins, Weight, cerealName){
		
d3.selectAll(".first").remove();
d3.selectAll(".stateName").remove();
d3.selectAll(".variables").remove();
d3.select('body').select('svg').append("image")
  .attr("x", 900)
  .attr("y", 200)
  .attr("height", "128px")
  .attr("width", "128px")
  .attr("class", "first")
  .attr("xlink:href", link)
  
d3.select('body').select('svg').append('text')
             .attr('class', 'stateName')
             .attr('text-anchor', 'middle')
			 .style('fontWeight', 'bold')
              .attr("x", 1050)
             .attr("y", 180)
             .text(stateName + "'s favorite cereal is " + cerealName )
d3.select('body').select('svg').append('text')
             .attr('class', 'NutritionFacts')
			 .attr('fontWeight', 'bold')
			 .attr('font-size', '14')
			 .attr('font-family', 'Franklin Gothic Heavy')
             .attr("x", 1050)
             .attr("y", 220)
             .text("Nutrition Facts")
d3.select('body').select('svg').append('text')
             .attr('class', 'NutritionFacts')
			 .attr('font-family', 'Franklin Gothic Heavy')
             .attr("x", 1050)
             .attr("y", 240)
             .text("Calories")
d3.select('body').select('svg').append('text')
             .attr('class', 'variables')
             .attr("x", 1125)
             .attr("y", 240)
             .text(calories)			 
d3.select('body').select('svg').append('text')
             .attr('class', 'NutritionFacts')
			 .attr('font-family', 'Franklin Gothic Heavy')
             .attr("x", 1050)
             .attr("y", 260)
             .text("Fat")
d3.select('body').select('svg').append('text')
             .attr('class', 'variables')
             .attr("x", 1125)
             .attr("y", 260)
             .text(Fat)
d3.select('body').select('svg').append('text')
             .attr('class', 'NutritionFacts')
			 .attr('font-family', 'Franklin Gothic Heavy')
             .attr("x", 1050)
             .attr("y", 280)
             .text("Protein")
d3.select('body').select('svg').append('text')
             .attr('class', 'variables')
             .attr("x", 1125)
             .attr("y", 280)
             .text(Protein)
d3.select('body').select('svg').append('text')
             .attr('class', 'NutritionFacts')
			 .attr('font-family', 'Franklin Gothic Heavy')
             .attr("x", 1050)
             .attr("y", 300)
             .text("Sodium")
d3.select('body').select('svg').append('text')
             .attr('class', 'variables')
             .attr("x", 1125)
             .attr("y", 300)
             .text(Sodium)
d3.select('body').select('svg').append('text')
             .attr('class', 'NutritionFacts')
			 .attr('font-family', 'Franklin Gothic Heavy')
             .attr("x", 1050)
             .attr("y", 320)
             .text("Sugar")			 
d3.select('body').select('svg').append('text')
             .attr('class', 'variables')
             .attr("x", 1125)
             .attr("y", 320)
             .text(Sugars)			 
d3.select('body').select('svg').append('text')
             .attr('class', 'NutritionFacts')
			 .attr('font-family', 'Franklin Gothic Heavy')
             .attr("x", 1050)
             .attr("y", 340)
             .text("Vitamins")
d3.select('body').select('svg').append('text')
             .attr('class', 'variables')
             .attr("x", 1125)
             .attr("y", 340)
             .text(Vitamins)			 
d3.select('body').select('svg').append('text')
             .attr('class', 'NutritionFacts')
			 .attr('font-family', 'Franklin Gothic Heavy')
             .attr("x", 1050)
             .attr("y", 360)
             .text("Potassium")
d3.select('body').select('svg').append('text')
             .attr('class', 'variables')
             .attr("x", 1125)
             .attr("y", 360)
             .text(Potassium)			 
d3.select('body').select('svg').append('text')
             .attr('class', 'NutritionFacts')
			 .attr('font-family', 'Franklin Gothic Heavy')
             .attr("x", 1050)
             .attr("y", 380)
             .text("Fibre")
d3.select('body').select('svg').append('text')
             .attr('class', 'variables')
             .attr("x", 1125)
             .attr("y", 380)
             .text(Fibre)			 
d3.select('body').select('svg').append('text')
             .attr('class', 'NutritionFacts')
			 .attr('font-family', 'Franklin Gothic Heavy')
             .attr("x", 1050)
             .attr("y", 400)
             .text("Carbo")
d3.select('body').select('svg').append('text')
             .attr('class', 'variables')
             .attr("x", 1125)
             .attr("y", 400)
             .text(Carbo)			 
d3.select('body').select('svg').append('text')
             .attr('class', 'NutritionFacts')
			 .attr('font-family', 'Franklin Gothic Heavy')
             .attr("x", 1050)
             .attr("y", 420)
             .text("Cups")
d3.select('body').select('svg').append('text')
             .attr('class', 'variables')
             .attr("x", 1125)
             .attr("y", 420)
             .text(Cups)			 
d3.select('body').select('svg').append('text')
             .attr('class', 'NutritionFacts')
			 .attr('font-family', 'Franklin Gothic Heavy')
             .attr("x", 1050)
             .attr("y", 440)
             .text("Weight")
d3.select('body').select('svg').append('text')
             .attr('class', 'variables')
             .attr("x", 1125)
             .attr("y", 440)
             .text(Weight)			 
d3.select('body').select('svg').append('text')
             .attr('class', 'NutritionFacts')
			 .attr('font-family', 'Franklin Gothic Heavy')
             .attr("x", 1050)
             .attr("y", 460)
             .text("Rating")
d3.select('body').select('svg').append('text')
             .attr('class', 'variables')
             .attr("x", 1125)
             .attr("y", 460)
             .text(Rating)
d3.select('body').select('svg').append('text')
             .attr('class', 'NutritionFacts')
			 .attr('font-family', 'Franklin Gothic Heavy')
             .attr("x", 1050)
             .attr("y", 480)
             .text("Shelf")	
d3.select('body').select('svg').append('text')
             .attr('class', 'variables')
             .attr("x", 1125)
             .attr("y", 480)
             .text(Shelf)			 
			 



}
