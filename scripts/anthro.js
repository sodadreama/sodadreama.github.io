const measurements = ["Abdominal Extension Depth (Sitting)","Acromial Height","Acromion Radial Length","Ankle Circumference","Axilla Height","Ball of Foot Circumference","Ball of Foot Length","Biacromial Breadth","Biceps Circumference (Flexed)","Bicristal Breadth","Bideltoid Breadth","Bimalleolar Breadth","Bitragion Chin Arc","Bitragion Submandibular Arc","Bizygomatic Breadth","Buttock Circumference","Buttock Depth","Buttock Height","Buttock Knee Length","Buttock Popliteal Length","Calf Circumference","Cervical Height","Chest Breadth","Chest Circumference","Chest Depth","Chest Height","Crotch Height","Crotch Length Omphalion","Crotch Length Posterior Omphalion","Ear Breadth","Ear Length","Ear Protrusion","Elbow Rest Height","Eye Height Sitting","Foot Breadth Horizontal","Foot Length","Forearm Center of Grip Length","Forearm Circumference (flexed)","Forearm Breadth","Forearm Hand Length","Functional Leg Length","Hand Breadth","Hand Circumference","Hand Length","Head Breadth","Head Circumference","Head Length","Heel Ankle Circumference","Heel Breadth","Hip Breadth","Hip Breadth (sitting)","Iliocristal Height","Interpupillary Breadth","Interscyei","Interscyeii","Knee Height Mid-patella","Knee Height (sitting)","Lateral Femoral Epicondyle Height","Lateral Malleolus Height","Lower Thigh Circumference","Mentonsellion Length","Neck Circumference","Neck Circumference (base)","Overhead Fingertip Reach (sitting)","Palm Length","Popliteal Height","Radial-stylion Length","Shoulder Circumference","Shoulder-elbow Length","Shoulder Length","Sitting Height","Sleeve Length Spine Wrist","Sleeve Outseam","Span","Stature","Suprasternal Height","Tenth Rib Height","Thigh Circumference","Thigh Clearance","Thumbtip Reach","Tibial Height","Bitragion Top of Head","Trochanterion Height","Vertical Trunk Circumference","Waist-back Length","Waist Breadth","Waist Circumference","Waist depth","Waist Front Length (sitting)","Waist-height Omphalion","Weight(kg)","Wrist Circumference","Wrist Height","Height (in)","Weight (lbs)"];

const index_measurements = [];

let global_options = {
    series: {
        lines: {show: false}, //Don't show lines, show points though
        points: {show: true}
    }
};

function initData(gender) {
    let dataset = [];
    if (gender==0) {
        $.ajax({ //Gets female data synchronously.
            async: false,
            dataType: "json",
            url: "scripts/femaledata.json",
            success: function(data) {
                let finished = JSON.parse(JSON.stringify(data));
                for(let i=0;i<finished.length;i++) {
                    let temp_data = [0,0]
                    temp_data[0] = finished[i].axillaheight;
                    temp_data[1] = finished[i].balloffootcircumference;
                    dataset.push(temp_data);
                }
                
            }
        });
        console.log(dataset);
        plot = $.plot($("#data_canvas"), [dataset], global_options);
    }


    
};

let data_1 = [0,0];

let x_axis;
let y_axis;

let x_col =3;
let y_col =5;

let sel_gender = 1;

function initMeasurementsInputs() { //Generates the textboxes and such so we can input measurements. It's a recursive function so that I don't manually have to create every textbox and clog the html page!
    let input_area = $("#input_measurements");
    let template = "";
    for(let i=0;i<measurements.length;i++) {
        //console.log("testing");
        input_area.append("<div class='mb-3'><p id='text"+i+"'>"+measurements[i]+"</p><input id='textbox"+i+"' type='text' class='form-control bg-dark text-white' style='width:200px'></input></div>");

        $("#text"+i+"").click(function(e) {
            if (e.ctrlKey && x_col != i) {
                x_col = i+1;
                console.log(x_col);
            } else if(y_col != i) {
                y_col = i+1;
                console.log(y_col);
            }
        });

        $("#textbox"+i).on("input", function(){
            if (x_axis == "textbox"+i || y_axis == "textbox"+i) {
                initData(0);
            }
        });
    };
};

function testPrintJsonData() {
    

};

var d1 = [[1,10],[5,3],[6,4],[6,5]]; //Sample data
let plot;

function plotData(data) {
    plot = $.plot($("#data_canvas"), [data], global_options); //Plot the data
};

$(document).ready(
    initData(0),
    //plotData(d1),
    initMeasurementsInputs()
);//When document is loaded, run the script