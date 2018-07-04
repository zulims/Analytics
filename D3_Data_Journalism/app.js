d3.select(window).on("resize", makeResponsive);

//this function will remake the chart when the window is resized
makeResponsive();

function makeResponsive() {
    
    //if the svg already exists, remove it so we can start fresh
    var svgArea = d3.select("body").select("svg");
    if (!svgArea.empty()) {
        svgArea.remove();
      }
    
    //base measurements on window dimensions
    var svgWidth = window.innerWidth - 100;
    var svgHeight = window.innerHeight - 100;

    var margin = {
        top: 50,
        bottom: 100,
        right: 50,
        left: 100
      };

    var height = svgHeight - margin.top - margin.bottom;
    var width = svgWidth - margin.left - margin.right;
    var labelArea = 120;
    var tPadBot = 40;
    var tPadLeft = 40;

    var leftTextX = margin.right -10;
    var leftTextY = (svgHeight) / 2;
    var bottomTextY = svgHeight-30;
    var bottomTextX = (svgWidth) / 2 -30;


    //append the svg, chart group, and axis groups
    var svg = d3
    .select(".chart")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

    var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

    svg.append("g").attr("class", "yText");
    var yText = d3.select(".yText");
    svg.append("g").attr("class", "xText");
    var xText = d3.select(".xText");    
    
    
    //reposition axis groups when screen resizes
    function yTextRefresh() {
        yText.attr("transform","translate(" + leftTextX + ", " + leftTextY + ")rotate(-90)")
        };

    function xTextRefresh() {
        xText.attr("transform","translate(" + bottomTextX + ", " + bottomTextY + ")")
        };

    yTextRefresh();    
    xTextRefresh();

    //add the text to axis, the class "data-name" will be crucial for telling d3 what data to use
    yText
      .append("text")
      .attr("y", -26)
      .attr("data-name", "Healthy")
      .attr("data-axis", "y")
      .attr("class", "aText active y")
      .text("Healthy (%)");

    yText
      .append("text")
      .attr("x", 0)
      .attr("data-name", "Unemployed")
      .attr("data-axis", "y")
      .attr("class", "aText inactive y")
      .text("Unemployed (%)");

    yText
      .append("text")
      .attr("y", 26)
      .attr("data-name", "Own_Home")
      .attr("data-axis", "y")
      .attr("class", "aText inactive y")
      .text("Own Home (%)");

    xText
      .append("text")
      .attr("y", -26)
      .attr("data-name", "Exercised")
      .attr("data-axis", "x")
      .attr("class", "aText active x")
      .text("Exercised (%)");

    xText
      .append("text")
      .attr("y", 0)
      .attr("data-name", "Median_Income")
      .attr("data-axis", "x")
      .attr("class", "aText inactive x")
      .text("Median Income ($)");

    xText
      .append("text")
      .attr("y", 26)
      .attr("data-name", "Median_Rent")
      .attr("data-axis", "x")
      .attr("class", "aText inactive x")
      .text("Median Rent ($)");




    
    //import the data with d3's custom csv method
    d3.csv("data.csv", function(csvData) {
        visualize(csvData);
    });


    //create a function that will plot our circles axis and tooltips
    function visualize(theData) {
        var curX = "Exercised";
        var curY = "Healthy";
        var Population = "Population";
      
        var xMin;
        var xMax;
        var yMin;
        var yMax;

        //create and call tool tips
        var toolTip = d3
        .tip()
        .attr("class", "tooltip")
        .offset([100, -100])
        .html(function(d) {
            return (`<h3>${d.State}</h3>Population: ${(parseFloat(d[Population])).toLocaleString("en")}<hr><strong> ${curX}: ${Math.round(d[curX])}<br>${curY}: ${Math.round(d[curY])}</strong>`);
        });
        svg.call(toolTip); //?? why do we call toolTip on the SVG??//


        
        //BUILDING AXIS
        //this function finds min/max of selected data for building axis
        function xMinMax() {
            xMin = d3.min(theData, function(d) {
              return parseFloat(d[curX]) * 0.98;
            });
            xMax = d3.max(theData, function(d) {
              return parseFloat(d[curX]) * 1.02;
            });
          }

        
        function yMinMax() {
            yMin = d3.min(theData, function(d) {
                return parseFloat(d[curY]) * 0.98;
            });
            yMax = d3.max(theData, function(d) {
                return parseFloat(d[curY]) * 1.02;
            });
        }

        xMinMax();
        yMinMax();

        //feed scale to axis with D3's scaleLinear and axisBottom/Left functions
        var xScale = d3
            .scaleLinear()
            .domain([xMin, xMax])
            .range([labelArea, width+margin.right]);

        var yScale = d3
            .scaleLinear()
            .domain([yMax, yMin])
            .range([0, svgHeight-labelArea]);
    
        var xAxis = d3.axisBottom(xScale);
        var yAxis = d3.axisLeft(yScale);
        
        //set axis .ticks() attribute based on screen size
        function tickCount() {
            if (width <= 500) {
              xAxis.ticks(8);
              yAxis.ticks(4);
            }
            else {
              xAxis.ticks(16);
              yAxis.ticks(8);
            }
          }
          tickCount();

        //append our newly made axis
        svg
        .append("g")
        .call(xAxis)
        .attr("class", "xAxis")
        .attr("transform", "translate(0," + (svgHeight-labelArea) + ")");
        svg
        .append("g")
        .call(yAxis)
        .attr("class", "yAxis")
        .attr("transform", "translate(" + (labelArea) + ", 0)");

        // ADDING OUR ACTUAL DATA AKA "THE CIRCLES"
        // this new group will contain all future circles
        var theCircles = svg.selectAll("g theCircles").data(theData).enter();

        var radiusFactor;
        function crGet() {
            if (width <= 530 || height <=400) {
                    radiusFactor = 10;
                }
            else {
                    radiusFactor = 5;
                }
            }
        crGet();

        //append circles to the circles group (d = the piece of "theData" being added)
        theCircles
        .append("circle")
        .attr("cx", function(d) {return xScale(d[curX]);})
        .attr("cy", function(d) {return yScale(d[curY]);})
        .attr("r", function(d) {return parseFloat(d[Population])*0.00001/radiusFactor})
        .attr("fill", "lightseagreen")
        .attr("opacity", 0.8)
        .attr("stroke", "black")
        .attr("stroke-width", 3)
        .on("mouseover", function(d) {
            toolTip.show(d);
            d3.select(this).style("fill", "red");
        })
        .on("mouseout", function(d) {
            toolTip.hide(d);
            d3.select(this).style("fill", "lightseagreen");
        });


        


        //MAKE THE AXIS LABELS INTO BUTTONS THAT CHANGE THE DIMENSIONS
        function labelChange(axis, clickedText) {
            d3
                .selectAll(".aText")
                .filter("." + axis)
                .filter(".active")
                .classed("active", false)
                .classed("inactive", true);
                clickedText.classed("inactive", false).classed("active", true);
            }

        d3.selectAll(".aText").on("click", function() {
            var self = d3.select(this);
        
            if (self.classed("inactive")) {
              var axis = self.attr("data-axis");
        
              // When x is the saved axis, execute this:
              if (axis === "x") {
                curX = self.attr("data-name");
                xMinMax();
                xScale.domain([xMin, xMax]);
                svg.select(".xAxis").transition().duration(300).call(xAxis);
                d3.selectAll("circle").each(function() {
                  // Each state circle gets a transition for it's new attribute.
                  d3
                    .select(this)
                    .transition()
                    .attr("cx", function(d) {
                      return xScale(d[curX]);
                    })
                    .duration(300);
                });
        
                // We need change the location of the state texts, too.
                d3.selectAll(".stateText").each(function() {
                  // We give each state text the same motion tween as the matching circle.
                  d3
                    .select(this)
                    .transition()
                    .attr("dx", function(d) {
                      return xScale(d[curX]);
                    })
                    .duration(300);
                });

                // Finally, change the classes of the last active label and the clicked label.
                labelChange(axis, self);
              }
              else {
                // When y is the saved axis, execute this:
                // Make curY the same as the data name.
                curY = self.attr("data-name");
        
                yMinMax();
                yScale.domain([yMax, yMin]);
        
                svg.select(".yAxis").transition().duration(300).call(yAxis);
        
        
                d3.selectAll("circle").each(function() {
                  // Each state circle gets a transition for it's new attribute.
                  d3
                    .select(this)
                    .transition()
                    .attr("cy", function(d) {
                      return yScale(d[curY]);
                    })
                    .duration(300);
                });
        
                // Finally, change the classes of the last active label and the clicked label.
                labelChange(axis, self);
              }
            }
          });
    }
}