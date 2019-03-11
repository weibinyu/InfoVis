let stupid = 1===1?2:3;
let container = d3.select("#container");
//append to add, remove to delete element to html
d3.csv("../cars.csv").then(function (data) {
    console.log("data is here");
    let dataF = data.filter(d => {              //filter creates a new list
        return d.price !== "?"
    });
    dataF.map(d=>{
       d.price = Number(d.price);               //remap data values
       return d;
    });
    dataF.sort((a,b) => {                        //sort changes the original list
        return d3.ascending(a.price,b.price);
    });
    showData(dataF);
});


function showData(cars){
    for(let car of cars){
        write(car.price);
    }
    write("-----------------------------")   //aggregate
    let sum = cars.reduce((prev,curr)=>{
       return prev + curr.price
    },0);
    write(sum);
    let extent = d3.extent(cars,function (d) {           //min and max using d3
        return d.price;
    });
    write(extent);
}

function write(text){
    container.append("div").text(text);
}

//-------------------------------------------------------------------- data bind lecture
let svg = d3.select("#dataBind");
let clients = [{
    Name: "Client0"
}];
let count = 1;
let a = d3.select("#add");
let b = d3.select("#remove");

a.on("click",addNewClient);     //on is event handler for d3
b.on("click",removeClient);

function addNewClient() {                               //add data element to list
    clients.push({Name:"Client"+count});
    count++;
    showSVG(clients);
}
function removeClient() {                               //remove data element from the list
    clients = clients.slice(0,-1);
    count--;
    showSVG(clients);
}
function showSVG(clients) {
    let join = svg.selectAll("div").data(clients);         //checks the data list,bind data to html element
    join.enter().append("div").text(d=>d.Name+": New");  //enters new element
                                                        // if data don't have a element create one and binds them
    join.exit().remove();                               //remove element that doesn't have data.
    join.text(d=>d.Name + ": Updated"); //updates current element
}
showSVG(clients);
//------------------------------------------------------------------------ scales

d3.csv("../cars.csv").then(showScale);
let scaleC = d3.select("#scale");
function showScale(cars) {

    let dataF = cars.filter(d => {              //filter creates a new list
        return d.price !== "?"
    });

    dataF.map(d=>{
        d.price = Number(d.price);               //remap data values
        return d;
    });
    dataF.sort((a,b)=>{return d3.ascending(a.price,b.price)});
    let max = d3.max(dataF,d => d.price);
    let scale = d3.scaleLinear().domain([0,max]).range([0,500]);  //domain maps value to range. In here domain 0 is range 0

    let positionScale = d3.scaleBand()  //can be used to determine categorical value position, etc height
        .domain(dataF.map( d => d.make))    //ignore repeated value
        .range([0,200]).paddingInner(0.03);

    let join = scaleC.selectAll("div").data(dataF);

    join.enter().append("div").text(d => d.price + ":" + scale(d.price))
        .style("background-color","blue").style("margin","5px").style("color","white")
        .style("width",d => scale(d.price) + "px");

    let join2 = d3.select("#scaleBody").selectAll("rect").data(dataF);

    join2.enter().append("rect").attr("fill","blue").attr("width", d=>scale(d.price))
        .attr("height",positionScale.bandwidth())
        .attr("y",d => positionScale(d.make)).on("click",d=> {
            alert(d.make)
        }).on("mouseover",function () {
            this.style.fill = "red"             //can't have => when use this
        }).on("mouseout",function () {
            this.style.fill = "blue"
        });
    d3.select("#scaleBody").append("line").attr("x1",0).attr("x2",0).attr("y1",0).attr("y2",500)
        .attr("stroke","red").attr("stroke-width","3px").attr("z-index",-2).attr("id","moveL");

    d3.select("#scaleBody").on("mousemove",function(){
       let x = d3.mouse(this)[0];
       let y = d3.event.y;
       d3.select("#moveL").attr("transform","translate("+x+",-10)");
    });
    let xAxis = d3.axisBottom(scale).ticks(10).tickFormat(x=>x+"$");   //ticks is number of parts
    d3.select("#xAxis").call(xAxis).attr("transform","translate(100,200)");

    let yAxis = d3.axisLeft(positionScale);
    d3.select("#yAxis").call(yAxis).attr("transform","translate(100,0)");
}

//--------------------------------------------------------------------------------- lines
let lines = d3.select("#lines");
d3.csv("../test2.csv").then(function (data) {
    let bodyHeight = 200;
    let bodyWidth = 400;

    data = data.map(d=>({
        date : new Date(d.date),
        price : +d.price
    }));

    let max = d3.max(data,d=>d.price);
    let yScale = d3.scaleLinear().domain([0,max]).range([bodyHeight,0]);
    lines.append("g").call(d3.axisLeft(yScale));

    let xScale = d3.scaleTime().domain(d3.extent(data,d=>d.date)).range([0,bodyWidth]);
    lines.append("g").attr("transform","translate(0,"+bodyHeight+")")
        .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat("%b")));

    let valueline = d3.line().x(d=> xScale(d.date))
        .y(d => yScale(d.price)).defined(d=>!!d.price);    //!! convert d.price to boolean, if no value then false
    lines.append("path")
        .datum(data)  //.data create elements for each data element,datum binds all data to one element
        .attr("d", valueline).attr("class","line");
});

//-------------------------------------------------------------------------------------pie and donut
let pie = d3.select("#pie");
d3.csv("../test2.csv").then(function (data) {
    let bodyHeight = 200;
    let bodyWidth = 400;

    data = data.map(d=>({
        country : d.date,
        sales : +d.price
    }));

    let p = d3.pie().value(d => d.sales);
    let colorScale = d3.scaleOrdinal().range(d3.schemeCategory10).domain(data.map(d=>d.country));          //map categorical value
    let arc = d3.arc().outerRadius(bodyHeight/2).innerRadius(0);
    let g = pie.selectAll(".arc").data(p(data)).enter().append("g");
    g.append("path").attr("d",arc).attr("fill",d=>{
        return colorScale(d.data.country);                  //pie put everything in data. d = pie,
    });
});
/*
//--------------------------------------------------------------------map
let map = d3.select("#map");
d3.json("countries.geo.json").then(function (mapInfo) {
    let bodyHeight = 400;
    let bodyWidth = 400;

    let project = d3.geoMercator().scale(50).translate([bodyWidth/2,bodyHeight/2]); //alt projection :geoNaturalEarth1
    let path = d3.geoPath().projection(project);
    map.selectAll("path").data(mapInfo.features).enter().append("path")
        .attr("d",d=>path(d)).attr("stroke","black").attr("fill","none");
});
//-----------------------------------------------------------choro
Promise.all([
    d3.csv("dataset.csv"),
    d3.json("countries.geo.json")
]).then(function (datasources) {
    let mapInfo = datasources[0];
    let data = datasources[1];
    let dataIndex = {};
    for (let c of data){                //map country to magnitude
        let country = c.Country;
        dataIndex[country] = c.Magnitude;
    }
    mapInfo.features = mapInfo.map(d=>{
        let country = d.properties.name;
       let magnitude = dataIndex[country];
       d.properties.Magnitude = magnitude;
       return d;
    });

    let maxEQ = d3.max(mapInfo.features,d=>d.properties.Magnitude);
    let medianEQ = d3.median(mapInfo.features,d=>d.properties.Magnitude);
    let cScale = d3.scaleLinear().domain([0,maxEQ]).range(["white","orange","red"]);
    let bodyHeight = 400;
    let bodyWidth = 400;

    let projection = d3.geoMercator().scale(80).translate([bodyWidth/2],bodyHeight/2);
    let path = d3.geoPath().projection(projection);
    map.selectAll("path").data(mapInfo.features).enter().append("path").attr("d",d=>path(d))
        .attr("stroke","black")
        .attr("fill",d => d.properties.Magnitude ? cScale(d.properties.Magnitude):"white");
});
//----------------------------- addition mark
Promise.all([
    d3.csv("dataset.csv"),
    d3.json("countries.geo.json")
]).then(function (datasources) {
    let bodyHeight = 400;
    let bodyWidth = 400;
    let mapInfo = datasources[0];
    let data = datasources[1];

    let dataIndex = {};
    for (let c of data){                //map country to magnitude
        let country = c.Country;
        dataIndex[country] = c.Magnitude;
    }
    mapInfo.features = mapInfo.map(d=>{
        let country = d.properties.name;
        let magnitude = dataIndex[country];
        d.properties.Magnitude = magnitude;
        return d;
    });

    let maxEQ = d3.max(mapInfo.features,d=>d.properties.Magnitude);
    let medianEQ = d3.median(mapInfo.features,d=>d.properties.Magnitude);
    let cScale = d3.scaleLinear().domain([0,maxEQ]).range(["white","orange","red"]);


    let projection = d3.geoMercator().scale(80).translate([bodyWidth/2],bodyHeight/2);
    let path = d3.geoPath().projection(projection);
    map.selectAll("path").data(mapInfo.features).enter().append("path").attr("d",d=>path(d))
        .attr("stroke","#999").attr("fill","#eee");

    map.selectAll("circle").data(data).enter().append("circle").attr("r",3).attr("fill","blue")
        .attr("cx",d=> projection([+d.Longitude,+d.Latitude])[0]).style("opacity",0.5)
        .attr("cy",d=> projection([+d.Longitude,+d.Latitude])[1]);
});
*/
//--------------------------------------------------------- VN
let vn = d3.select("#vn");
d3.json("../data.json").then(function (data) {
    let bodyHeight = 400;
    let bodyWidth = 400;

    createE(data);
    let simulation = d3.forceSimulation().force("link",d3.forceLink().id((d)=>d.id))
        .force("charge",d3.forceManyBody())
        .force("center",d3.forceCenter(bodyWidth/2,bodyHeight/2));

    simulation.nodes(data.nodes).on("tick",updateE);
    simulation.force("link").links(data.links);
});
function createE(data) {
    let nodes = vn.append("g").attr("class","nodes")     //create a g for all nodes and add all node
        .selectAll("circles").data(data.nodes).enter()
        .append("circle").attr("r",5).attr("fill","black");

    let links = vn.append("g").attr("class","links")
        .selectAll("line").data(data.links).enter().append("line").style("stroke", "black");

}
function updateE() {
    d3.select(".nodes").selectAll("circle").attr("cx",d=>d.x).attr("cy", d=>d.y);
    d3.select(".links").selectAll("line").attr("x1",d=>d.source.x).attr("x2",d=>d.target.x)
        .attr("y1",d=>d.source.y).attr("y2",d=>d.target.y);
}

//---------------------------------------------------------- tree map
let tree = d3.select("#tree");
d3.json("../data1.json").then(function (data) {
    let bodyHeight = 300;
    let bodyWidth = 500;

    let treemap = d3.treemap().size([bodyWidth,bodyHeight]).paddingInner(1);
    let root = d3.hierarchy(data).sum(d=>d.sales); //sum value of parent to children and children to parent
    let cScale = d3.scaleOrdinal(d3.schemeCategory10);
    treemap(root);
    console.log(root);
    let cell = tree.selectAll("g").data(root.leaves()).enter().append("g")
        .attr("transform",d=>"translate("+d.x0+","+d.y0+")");

    cell.append("rect").attr("width",d=> d.x1 - d.x0).attr("height",d=> d.y1 - d.y0)
        .attr("fill",d => cScale(d.parent.data.name));

    cell.append("text").text(d => d.data.name).attr("alignment-baseline","hanging").attr("fill","white");
});