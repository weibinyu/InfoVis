d3.csv("../cars.csv").then(showData);
let makerPublish = d3.select("#makerPublish");
d3.select("#hideT").on("click",function () {
    let style = document.getElementById("treeS").style.display;
    if(style === "none")
        document.getElementById("treeS").style.display = "block";
    else
        document.getElementById("treeS").style.display = "none";
});
function showData(cars) {


    let treeData = treeDataProcess(cars);
    console.log(treeData);
    showTree(treeData);
    let data = dataRearrange(cars);
    showScatter(data);

}

function showScatter(data) {
    let max = d3.max(data,d => d.price);
    console.log(max);
    let extend = d3.extent(data,d => d.horsepower);
    let xScale = d3.scaleLinear().domain([0,max]).range([0,600]);  //domain maps value to range. In here domain 0 is range 0

    let yScale = d3.scaleLinear().domain([extend[1],0]).range([0,600]);

    let join = makerPublish.selectAll("circle").data(data);
    join.enter().append("circle").attr("fill","blue").attr("r", 5)
        .attr("cx",d=>xScale(d.price)).attr("cy",d => yScale(d.horsepower))
        .on("click",d=> {
            alert(d.make)
        }).on("mouseover",function () {
        this.style.fill = "red"             //can't have => when use this
    }).on("mouseout",function () {
        this.style.fill = "blue"
    });


    makerPublish.append("g").attr("transform","translate(0,600)")
        .call(d3.axisBottom(xScale).ticks(10).tickFormat(x=>x+"$"));
    makerPublish.append("g").attr("transform","translate(0,0)")
        .call(d3.axisLeft(yScale));
}
function showTree(data) {
    let tree = d3.select("#tree");
    tree.append("g").attr("class","cell");
    tree.append("g").attr("class","make");
    let bodyHeight = 500;
    console.log(bodyHeight);
    let bodyWidth = 1300;
    let colorR = [
        0xd5fe14, 0xfec7f8, 0x0b7b3e, 0x0bf0e9, 0xc203c8, 0xfd9b39, 0x888593,
        0x906407, 0x98ba7f, 0xfe6794, 0x10b0ff, 0xac7bff, 0xfee7c0, 0x964c63,
        0x1da49c, 0x0ad811, 0xbbd9fd, 0xfe6cfe, 0x297192, 0xd1a09c, 0x78579e,
        0x81ffad, 0x739400, 0xca6949, 0xd9bf01, 0x646a58, 0xd5097e, 0xbb73a9,
    ].map(d3_rgbString);

    let treemap = d3.treemap().size([bodyWidth,bodyHeight]).paddingInner(1);
    let root = d3.hierarchy(data).count(); //sum value of parent to children and children to parent
    let cScale = d3.scaleOrdinal(colorR);

    treemap(root);
    console.log(root);
    let cell = tree.select(".cell").selectAll("g").data(root.leaves()).enter().append("g")
        .attr("transform",d=>"translate("+d.x0+","+d.y0+")");
    let makerT = tree.select(".make").selectAll("g").data(root.children).enter().append("g")
        .attr("transform",d=>"translate("+d.x0+","+d.y0+")");

    cell.append("rect").attr("width",d=> d.x1 - d.x0).attr("height",d=> d.y1 - d.y0)
        .attr("fill",d => cScale(d.data.make));
    makerT.append("rect").attr("width",d=> d.x1 - d.x0).attr("height",d=> d.y1 - d.y0).style("visibility","hidden");
    makerT.append("text").text(d => d.data.make).attr("alignment-baseline","hanging").attr("fill","white");
}

function dataRearrange(data){
    console.log(data);
    let dataF = data.filter(d => {              //filter creates a new list
        return d.price !== "?"
    });
    let count = 1;
    dataF.map(d=>{

        d.height = Number(d.height);
        d.width = Number(d.width);
        d.length = Number(d.length);
        d.price = Number(d.price);               //remap data values
        d.horsepower = Number(d.horsepower);
        d["wheel-base"] = Number(d["wheel-base"]);
        d["risk-factor"] = Number(d["risk-factor"]);
        d["curb-weight"] = Number(d["curb-weight"]);
        d["engine-size"] = Number(d["engine-size"]);
        return d;
    });


    dataF.sort((a,b)=>{return d3.ascending(a.price,b.price)});

    return dataF;
}
function treeDataProcess(cars) {
    let added = false;
    let treeData = {
        make:  "overall",
        children: []
    };
    for(let car of cars){
        //treeData.children.push({make:car.make,children:[]})
        if(treeData.children === undefined || treeData.children.length === 0){
            treeData.children.push({make:car.make,children:[]})
        }
        for(let c of treeData.children){
            if(car.make === c.make){
                added = true;
                c.children.push(car);
            }
        }
        if(added == false){
            let current = {
                make:car.make,
                children:[]
            };
            current.children.push(car);
            treeData.children.push(current);
        }
        added = false;
    }
    return treeData;
}
function d3_rgbString (value) {
    return d3.rgb(value >> 16, value >> 8 & 0xff, value & 0xff);
}