var data = [30,60,70,80,90];

d3.select('.chart')
.selectAll("div")
.data(data)
.enter()
.append("div")
.style("width", function(d){ return d + "px"})
