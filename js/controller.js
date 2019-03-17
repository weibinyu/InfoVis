d3.csv("https://gist.githubusercontent.com/weibinyu/ca28742d3c7cb1e2d71a13a15cd83109/raw/96debb0a3436086759b45fc64cdb044b02bf16e8/cars.csv").then(showData);

let makerPublish = d3.select("#makerPublish");
let makerPublish2 = d3.select("#makerPublish2");
d3.select("#hideT").on("click",function () {
    let style = document.getElementById("treeS").style.display;
    if(style === "none")
        document.getElementById("treeS").style.display = "block";
    else
        document.getElementById("treeS").style.display = "none";
});
function showData(cars) {
    let data = dataRearrange(cars);
    let treeData = treeDataProcess(data);
    showTree(treeData);
    d3.selectAll(".change").on("change",function () {
        let minP = document.getElementById("minP").value;
        let maxP = document.getElementById("maxP").value;
        let minHP = document.getElementById("minHP").value;
        let maxHP = document.getElementById("maxHP").value;
        let minL = document.getElementById("minL").value;
        let maxL = document.getElementById("maxL").value;
        let two = document.getElementById("two").checked;
        let four = document.getElementById("four").checked;
        let gas = document.getElementById("gas").checked;
        let diesel = document.getElementById("diesel").checked;
        let r12 = document.getElementById("r-2").checked;
        let r11 = document.getElementById("r-1").checked;
        let r0 = document.getElementById("r0").checked;
        let r1 = document.getElementById("r1").checked;
        let r2 = document.getElementById("r2").checked;
        let r3 = document.getElementById("r3").checked;
        let subaru = document.getElementById("subaru").checked;
        let chevrolet = document.getElementById("chevrolet").checked;
        let mazda = document.getElementById("mazda").checked;
        let honda = document.getElementById("honda").checked;
        let dodge = document.getElementById("dodge").checked;
        let isuzu = document.getElementById("isuzu").checked;
        let alfa = document.getElementById("alfa-romero").checked;
        let audi = document.getElementById("audi").checked;
        let bmw = document.getElementById("bmw").checked;
        let jaguar = document.getElementById("jaguar").checked;
        let toyota = document.getElementById("toyota").checked;
        let mitsubishi = document.getElementById("mitsubishi").checked;
        let nissan = document.getElementById("nissan").checked;
        let plymouth = document.getElementById("plymouth").checked;
        let renault = document.getElementById("renault").checked;
        let saab = document.getElementById("saab").checked;
        let volkswagen = document.getElementById("volkswagen").checked;
        let volvo = document.getElementById("volvo").checked;
        let peugot = document.getElementById("peugot").checked;
        let porsche = document.getElementById("porsche").checked;
        let mercury = document.getElementById("mercury").checked;
        let benz = document.getElementById("mercedes-benz").checked;
        let dataF = data.filter(c => c.price> minP && maxP > c.price);
        dataF = dataF.filter(c => c.horsepower> minHP && maxHP > c.horsepower);
        dataF = dataF.filter(c => c["normalized-losses"]> minL && maxL > c["normalized-losses"]);
        if(!two) dataF = dataF.filter(c => c["num-of-doors"] !== "two");
        if(!four) dataF = dataF.filter(c => c["num-of-doors"] !== "four");
        if(!gas) dataF = dataF.filter(c => c["fuel-type"] !== "gas");
        if(!diesel) dataF = dataF.filter(c => c["fuel-type"] !== "diesel");
        if(!r12) dataF = dataF.filter(c => c["risk-factor"] !== -2);
        if(!r11) dataF = dataF.filter(c => c["risk-factor"] !== -1);
        if(!r0) dataF = dataF.filter(c => c["risk-factor"] !== 0);
        if(!r1) dataF = dataF.filter(c => c["risk-factor"] !== 1);
        if(!r2) dataF = dataF.filter(c => c["risk-factor"] !== 2);
        if(!r3) dataF = dataF.filter(c => c["risk-factor"] !== 3);
        if(!subaru) dataF = dataF.filter(c => c.make !== "subaru");
        if(!chevrolet) dataF = dataF.filter(c => c.make !== "chevrolet");
        if(!mazda) dataF = dataF.filter(c => c.make !== "mazda");
        if(!honda) dataF = dataF.filter(c => c.make !== "honda");
        if(!dodge) dataF = dataF.filter(c => c.make !== "dodge");
        if(!isuzu) dataF = dataF.filter(c => c.make !== "isuzu");
        if(!alfa) dataF = dataF.filter(c => c.make !== "alfa-romero");
        if(!audi) dataF = dataF.filter(c => c.make !== "audi");
        if(!bmw) dataF = dataF.filter(c => c.make !== "bmw");
        if(!jaguar) dataF = dataF.filter(c => c.make !== "jaguar");
        if(!toyota) dataF = dataF.filter(c => c.make !== "toyota");
        if(!mitsubishi) dataF = dataF.filter(c => c.make !== "mitsubishi");
        if(!nissan) dataF = dataF.filter(c => c.make !== "nissan");
        if(!plymouth) dataF = dataF.filter(c => c.make !== "plymouth");
        if(!renault) dataF = dataF.filter(c => c.make !== "renault");
        if(!saab) dataF = dataF.filter(c => c.make !== "saab");
        if(!volkswagen) dataF = dataF.filter(c => c.make !== "volkswagen");
        if(!volvo) dataF = dataF.filter(c => c.make !== "volvo");
        if(!peugot) dataF = dataF.filter(c => c.make !== "peugot");
        if(!porsche) dataF = dataF.filter(c => c.make !== "porsche");
        if(!mercury) dataF = dataF.filter(c => c.make !== "mercury");
        if(!benz) dataF = dataF.filter(c => c.make !== "mercedes-benz");

        let std = document.getElementById("std").checked;
        let turbo = document.getElementById("turbo").checked;
        let convertible = document.getElementById("convertible").checked;
        let wagon = document.getElementById("wagon").checked;
        let sedan = document.getElementById("sedan").checked;
        let hatchback = document.getElementById("hatchback").checked;
        let hardtop = document.getElementById("hardtop").checked;
        let fwd = document.getElementById("fwd").checked;
        let rwd = document.getElementById("rwd").checked;
        let wd4 = document.getElementById("4wd").checked;
        let front = document.getElementById("front").checked;
        let rear = document.getElementById("rear").checked;
        let dohc = document.getElementById("dohc").checked;
        let dohcv = document.getElementById("dohcv").checked;
        let l = document.getElementById("l").checked;
        let ohc = document.getElementById("ohc").checked;
        let ohcf = document.getElementById("ohcf").checked;
        let ohcv = document.getElementById("ohcv").checked;
        let rotor = document.getElementById("rotor").checked;
        if(!ohcv) dataF = dataF.filter(c => c["engine-type"] !== "ohcv");
        if(!rotor) dataF = dataF.filter(c => c["engine-type"] !== "rotor");
        if(!dohc) dataF = dataF.filter(c => c["engine-type"] !== "dohc");
        if(!dohcv) dataF = dataF.filter(c => c["engine-type"] !== "dohcv");
        if(!l) dataF = dataF.filter(c => c["engine-type"] !== "l");
        if(!ohc) dataF = dataF.filter(c => c["engine-type"] !== "ohc");
        if(!ohcf) dataF = dataF.filter(c => c["engine-type"] !== "ohcf");
        if(!front) dataF = dataF.filter(c => c["engine-location"] !== "front");
        if(!rear) dataF = dataF.filter(c => c["engine-location"] !== "rear");
        if(!fwd) dataF = dataF.filter(c => c["drive-wheels"] !== "fwd");
        if(!rwd) dataF = dataF.filter(c => c["drive-wheels"] !== "rwd");
        if(!wd4) dataF = dataF.filter(c => c["drive-wheels"] !== "4wd");
        if(!hardtop) dataF = dataF.filter(c => c["body-style"] !== "hardtop");
        if(!convertible) dataF = dataF.filter(c => c["body-style"] !== "convertible");
        if(!wagon) dataF = dataF.filter(c => c["body-style"] !== "wagon");
        if(!sedan) dataF = dataF.filter(c => c["body-style"] !== "sedan");
        if(!hatchback) dataF = dataF.filter(c => c["body-style"] !== "hatchback");
        if(!std) dataF = dataF.filter(c => c.aspiration !== "std");
        if(!turbo) dataF = dataF.filter(c => c.aspiration !== "turbo");

        let twoc = document.getElementById("twoc").checked;
        let three = document.getElementById("three").checked;
        let fourc = document.getElementById("fourc").checked;
        let five = document.getElementById("five").checked;
        let six = document.getElementById("six").checked;
        let eight = document.getElementById("eight").checked;
        let twelve = document.getElementById("twelve").checked;
        if(!twoc) dataF = dataF.filter(c => c["num-of-cylinders"] !== "two");
        if(!three) dataF = dataF.filter(c => c["num-of-cylinders"] !== "three");
        if(!fourc) dataF = dataF.filter(c => c["num-of-cylinders"] !== "four");
        if(!five) dataF = dataF.filter(c => c["num-of-cylinders"] !== "five");
        if(!six) dataF = dataF.filter(c => c["num-of-cylinders"] !== "six");
        if(!eight) dataF = dataF.filter(c => c["num-of-cylinders"] !== "eight");
        if(!twelve) dataF = dataF.filter(c => c["num-of-cylinders"] !== "twelve");


        let bbl1 = document.getElementById("1bbl").checked;
        let bbl2 = document.getElementById("2bbl").checked;
        let bbl4 = document.getElementById("4bbl").checked;
        let idi = document.getElementById("idi").checked;
        let mfi = document.getElementById("mfi").checked;
        let mpfi = document.getElementById("mpfi").checked;
        let spdi = document.getElementById("spdi").checked;
        let spfi = document.getElementById("spfi").checked;
        if(!bbl1) dataF = dataF.filter(c => c["fuel-system"] !== "1bbl");
        if(!bbl2) dataF = dataF.filter(c => c["fuel-system"] !== "2bbl");
        if(!bbl4) dataF = dataF.filter(c => c["fuel-system"] !== "4bbl");
        if(!idi) dataF = dataF.filter(c => c["fuel-system"] !== "idi");
        if(!mfi) dataF = dataF.filter(c => c["fuel-system"] !== "mfi");
        if(!mpfi) dataF = dataF.filter(c => c["fuel-system"] !== "mpfi");
        if(!spdi) dataF = dataF.filter(c => c["fuel-system"] !== "spdi");
        if(!spfi) dataF = dataF.filter(c => c["fuel-system"] !== "spfi");

        showScatter(dataF);
        showScatter2(dataF);
    });

    let brush = d3.brush();
    brush.extent([[0,0],[400,400]]);
    brush.on("brush",function () {
        let coords = d3.event.selection;
        let update = [];
        makerPublish.selectAll("circle").style("fill",function (d) {
            let cx = d3.select(this).attr("cx");
            let cy = d3.select(this).attr("cy");
            let select = isSelected(coords,cx,cy);
            if(select){
                update.push(d);
            }

            return select ? "red": "blue";
        });
        makerPublish2.selectAll("circle").style("r",function (dd) {
            for(let d of update){
                if(d.id === dd.id) return 10;
            }
        });
    }).on("end",function () {
        if(d3.event.selection ===null){
            makerPublish.selectAll("circle").style("fill","blue");
            makerPublish2.selectAll("circle").style("r",5);
        }
    });
    makerPublish.append("g").attr("class","brush").call(brush);
    showScatter2(cars);
    showScatter(cars);
}

function showScatter(cars) {
    let data = cars.filter(d => {              //filter creates a new list
        return d.price !== "?" && d.horsepower !== "?";
    });

    let extent1 = d3.extent(data,d => d.price);
    let extent2 = d3.extent(data,d=>d.horsepower);

    let xScale = d3.scaleLinear().domain(extent1).range([0,400]);  //domain maps value to range. In here domain 0 is range 0
    let yScale = d3.scaleLinear().domain([extent2[1],extent2[0]]).range([0,400]);
    makerPublish.append("text").attr("transform", "translate(200,430 )")
        .style("text-anchor", "middle").text("Price");
    makerPublish.append("text").attr("transform", "rotate(-90)").attr("y", -50)
        .attr("x",-200).attr("dy", "1em").style("text-anchor", "middle").text("Horse Power");
    let join = makerPublish.selectAll("circle").data(data);
    join.enter().append("circle");

    let newE = makerPublish.selectAll("circle").data(data).attr("fill","blue").attr("r", 5)
        .attr("cx",d=>xScale(d.price)).attr("cy",d => yScale(d.horsepower))
        .attr("fill-opacity",0.4)
        .attr("pointer-events", "all")
        .on("click",function (d) {
            makerPublish.selectAll("circle").style("fill","blue");
            this.style.fill = "red";
            showScatter2(data,[d]);
        }).on("mouseover",function (d) {
            showTooltip(d,[d3.event.pageX,d3.event.pageY]);
             this.style["fill-opacity"] = 1;
         }).on("mouseout",function () {
            d3.select("#tooltip").style("display","none");
            this.style["fill-opacity"] = 0.4;
        });
    join.merge(newE).attr("cx",d=>xScale(d.price)).attr("cy",d => yScale(d.horsepower)).transition();

    join.exit().remove();

    let yAxis = d3.axisLeft(yScale);
    let xAxis = d3.axisBottom(xScale).ticks(10);
    d3.select("#yAxis").style("transform","translate(0,0)").transition().call(yAxis);
    d3.select("#xAxis").style("transform","translate(0,400)").transition().call(xAxis);
};

function showScatter2(cars,update) {
    let data = cars.filter(d => {              //filter creates a new list
        return d["normalized-losses"] !== "?" && !isNaN(d["normalized-losses"]);
    });

    let extent1 = d3.extent(data,d => d["risk-factor"]);
    let extent2 = d3.extent(data,d => d["normalized-losses"]);

    makerPublish2.append("text").attr("transform", "translate(200,430 )")
        .style("text-anchor", "middle").text("Risk Factor");
    makerPublish2.append("text").attr("transform", "rotate(-90)").attr("y", -50)
        .attr("x",-200).attr("dy", "1em").style("text-anchor", "middle").text("Normalized Losses");
    let xScale = d3.scaleLinear().domain(extent1).range([0,400]);  //domain maps value to range. In here domain 0 is range 0
    let yScale = d3.scaleLinear().domain([extent2[1],extent2[0]]).range([0,400]);

    let join = makerPublish2.selectAll("circle").data(data);
    join.enter().append("circle");
    let newE = makerPublish2.selectAll("circle").data(data).attr("fill","blue").attr("r", 5)
        .attr("cx",d=>xScale(d["risk-factor"])).attr("cy",d => yScale(d["normalized-losses"]))
        .attr("fill-opacity",0.4)
        .on("click",function(d) {
            console.log(data);
        }).on("mouseover",function (d) {
            showTooltip(d,[d3.event.pageX,d3.event.pageY]);
            this.style["fill-opacity"] = 1;
        }).on("mouseout",function () {
            d3.select("#tooltip").style("display","none");
            this.style["fill-opacity"] = 0.4;
        });

    join.merge(newE).attr("cx",d=>xScale(d["risk-factor"])).attr("cy",d => yScale(d["normalized-losses"])).transition();
    makerPublish2.selectAll("circle").attr("r", 5);
    if(update !== undefined ){
        if(update.length !== 0){
            update = update.filter(d => {              //filter creates a new list
                return d["normalized-losses"] !== "?"&& !isNaN(d["normalized-losses"]);
            });
            makerPublish2.selectAll("circle").data(update).attr("fill","blue").attr("r", 10)
                .attr("cx",d=>xScale(d["risk-factor"])).attr("cy",d => yScale(d["normalized-losses"]))
                .attr("fill-opacity",0.4)
                .on("click",function(d) {

                }).on("mouseover",function (d) {
                    showTooltip(d,[d3.event.pageX,d3.event.pageY]);
                    this.style["fill-opacity"] = 1;
                }).on("mouseout",function () {
                    d3.select("#tooltip").style("display","none");
                    this.style["fill-opacity"] = 0.4;
                });
        }
    }
    join.exit().remove();


    let yAxis = d3.axisLeft(yScale);
    let xAxis = d3.axisBottom(xScale).ticks(5);
    d3.select("#yAxis2").style("transform","translate(0,0)").transition().call(yAxis);
    d3.select("#xAxis2").style("transform","translate(0,400)").transition().call(xAxis);
}

function showTree(data) {
    let tree = d3.select("#tree");
    tree.append("g").attr("class","cell");
    tree.append("g").attr("class","make");
    let bodyHeight = 500;
    console.log(bodyHeight);
    let bodyWidth = 1300;
    let colorR = [
        0xfec7f8, 0x0b7b3e, 0xc203c8, 0xfd9b39, 0x888593,
        0x906407, 0x98ba7f, 0xfe6794, 0x10b0ff, 0xac7bff, 0x964c63,
        0x1da49c, 0x0ad811, 0xfe6cfe, 0x297192, 0xd1a09c, 0x78579e,
        0x739400, 0xca6949, 0xd9bf01, 0x646a58, 0xd5097e, 0xbb73a9,
    ].map(d3_rgbString);

    let treemap = d3.treemap().size([bodyWidth,bodyHeight]).paddingInner(1);
    let root = d3.hierarchy(data).count(); //sum value of parent to children and children to parent
    let cScale = d3.scaleOrdinal(colorR);

    treemap(root);
    console.log(root);
    let cell = tree.select(".cell").selectAll("g").data(root.leaves()).enter().append("g")
        .attr("transform",d=>"translate("+d.x0+","+d.y0+")")
        .on("mouseover",function (d) {
            showTooltip(d.data,[d3.event.pageX,d3.event.pageY]);
        }).on("mousemove",function (d) {
            showTooltip(d.data,[d3.event.pageX,d3.event.pageY]);
        }).on("mouseleave",() =>{
            d3.select("#tooltip").style("display","none")
        });
    let makerT = tree.select(".make").selectAll("g").data(root.children).enter().append("g")
        .attr("transform",d=>"translate("+d.x0+","+d.y0+")");

    cell.append("rect").attr("width",d=> d.x1 - d.x0).attr("height",d=> d.y1 - d.y0)
        .attr("fill",d => cScale(d.data.make));
    makerT.append("rect").attr("width",d=> d.x1 - d.x0).attr("height",d=> d.y1 - d.y0).style("visibility","hidden");
    makerT.append("text").text(d => d.data.make).attr("alignment-baseline","hanging").attr("fill","white");
}

function dataRearrange(data){
    let dataF = data;
    let count = 0;
    dataF.map(d=>{
        d.id = count;
        count++;
        d.height = Number(d.height);
        d.width = Number(d.width);
        d.length = Number(d.length);
        d.price = Number(d.price);               //remap data values
        d.horsepower = Number(d.horsepower);
        d["wheel-base"] = Number(d["wheel-base"]);
        d["risk-factor"] = Number(d["risk-factor"]);
        d["curb-weight"] = Number(d["curb-weight"]);
        d["engine-size"] = Number(d["engine-size"]);
        d["normalized-losses"] = Number(d["normalized-losses"]);
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
        if(added === false){
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
function isSelected(coords, x, y) {
    let x0 = coords[0][0],
        x1 = coords[1][0],
        y0 = coords[0][1],
        y1 = coords[1][1];
    return x0 <= x && x <= x1 && y0 <=y && y <= y1;
}
let coll = document.getElementsByClassName("collapsible");
let i;
for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        let content = this.nextElementSibling;
        console.log(content);
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
}
function showTooltip(data,coords) {
    let tt = d3.select("#tooltip");
    if(window.innerWidth < coords[0]+300 && window.innerHeight < coords[1]+260){
        tt.style("display","block")
            .style("top",coords[1]-245+"px").style("left",coords[0]-285+"px");
    }else if(window.innerWidth < coords[0]+300){
        tt.style("display","block")
            .style("top",coords[1]+"px").style("left",coords[0]-285+"px");
    }else if(window.innerHeight < coords[1]+260){
        tt.style("display","block")
            .style("top",coords[1]-245+"px").style("left",coords[0]+10+"px");
    }else{
        tt.style("display","block")
            .style("top",coords[1]+"px").style("left",coords[0]+10+"px");
    }
    tt.select("#price").text("Price: "+data.price+" ,");
    tt.select("#hp").text("Horsepower: "+data.horsepower+" ,");
    tt.select("#aspiration").text("Aspiration: "+data.aspiration+" ,");
    tt.select("#length").text("Length: "+data.length+",");
    tt.select("#height").text("Height: "+data.height+",");
    tt.select("#width").text("Width: "+data.width+",");
    tt.select("#risk").text("Risk factor: "+data["risk-factor"]+" ,");
    tt.select("#ft").text("Fuel type: "+data["fuel-type"]+" ,");
    tt.select("#nod").text("Doors: "+data["num-of-doors"]+" ,");
    tt.select("#bs").text("Body style: "+data["body-style"]+" ,");
    tt.select("#stroke").text("Stroke: "+data.stroke+" ,");
    tt.select("#dw").text("Drive wheels: "+data["drive-wheels"]+" ,");
    tt.select("#nl").text("Normalized losses: "+ data["normalized-losses"]+" ,");
    tt.select("#el").text("Engine location: "+data["engine-location"]+" ,");
    tt.select("#wb").text("Wheel base: "+data["wheel-base"]+" ,");
    tt.select("#make").text("Maker: "+data.make+" ,");
    tt.select("#cw").text("Curb weight: "+data["curb-weight"]+" ,");
    tt.select("#et").text("Engine type: "+data["engine-type"]+" ,");
    tt.select("#noc").text("Cylinders: "+data["num-of-cylinders"]+" ,");
    tt.select("#es").text("Engine size: "+data["engine-size"]+" ,");
    tt.select("#fs").text("Fuel system: "+data["fuel-system"]+" ,");
    tt.select("#bore").text("Bore: "+data.bore+" ,");

    tt.select("#cr").text("Compression ratio: "+data["compression-ratio"]+" ,");
    tt.select("#pr").text("Peak rpm: "+data["peak-rpm"]+" ,");
    tt.select("#cm").text("City mpg: "+data["city-mpg"]+" ,");
    tt.select("#hm").text("Highway mpg: "+data["highway-mpg"]);



}