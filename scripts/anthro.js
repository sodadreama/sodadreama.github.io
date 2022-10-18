const measurements = ["Abdominal Extension Depth (Sitting)","Acromial Height","Acromion Radial Length","Ankle Circumference","Axilla Height","Ball of Foot Circumference","Ball of Foot Length","Biacromial Breadth","Biceps Circumference (Flexed)","Bicristal Breadth","Bideltoid Breadth","Bimalleolar Breadth","Bitragion Chin Arc","Bitragion Submandibular Arc","Bizygomatic Breadth","Buttock Circumference","Buttock Depth","Buttock Height","Buttock Knee Length","Buttock Popliteal Length","Calf Circumference","Cervical Height","Chest Breadth","Chest Circumference","Chest Depth","Chest Height","Crotch Height","Crotch Length Omphalion","Crotch Length Posterior Omphalion","Ear Breadth","Ear Length","Ear Protrusion","Elbow Rest Height","Eye Height Sitting","Foot Breadth Horizontal","Foot Length","Forearm Center of Grip Length","Forearm Circumference (flexed)","Forearm Breadth","Forearm Hand Length","Functional Leg Length","Hand Breadth","Hand Circumference","Hand Length","Head Breadth","Head Circumference","Head Length","Heel Ankle Circumference","Heel Breadth","Hip Breadth","Hip Breadth (sitting)","Iliocristal Height","Interpupillary Breadth","Interscyei","Interscyeii","Knee Height Mid-patella","Knee Height (sitting)","Lateral Femoral Epicondyle Height","Lateral Malleolus Height","Lower Thigh Circumference","Mentonsellion Length","Neck Circumference","Neck Circumference (base)","Overhead Fingertip Reach (sitting)","Palm Length","Popliteal Height","Radial-stylion Length","Shoulder Circumference","Shoulder-elbow Length","Shoulder Length","Sitting Height","Sleeve Length Spine Wrist","Sleeve Outseam","Span","Stature","Suprasternal Height","Tenth Rib Height","Thigh Circumference","Thigh Clearance","Thumbtip Reach","Tibial Height","Bitragion Top of Head","Trochanterion Height","Vertical Trunk Circumference","Waist-back Length","Waist Breadth","Waist Circumference","Waist depth","Waist Front Length (sitting)","Waist-height Omphalion","Weight(kg)","Wrist Circumference","Wrist Height","Height (in)","Weight (lbs)"];

let x_col = 1;
let y_col = 2;

let plot;
let data_1 = [];

let global_options = {
    series: {
        lines: {show: false}, //Don't show lines, show points though
        points: {show: true}
    }
};

function generateMassData(url) {
    $.ajax({   
        async: false,
        dataType: "json",
        url: url,
        success: function(data){
            let index_x = measurements[x_col].toLowerCase().replace(/ /g, '').replace(/[\])}[{(]/g,'').replace(/[\])}[{(]/g,'');
            let index_y = measurements[y_col].toLowerCase().replace(/ /g, '').replace(/[\])}[{(]/g,'').replace(/[\])}[{(]/g,'');
            let dataset = [];
            let jsondata = JSON.parse(JSON.stringify(data));
            for(let i=0;i<jsondata.length;i++) {
                let temp_pair = [];
                temp_pair.push(jsondata[i][index_x]);
               
                temp_pair.push(jsondata[i][index_y]);
                dataset.push(temp_pair);
            }
            //console.log(dataset);
            return dataset;
        }
    });
}

function plotMassData() {
    if($("#both_gender").is(":checked")) {
        let femaleseries = {
            color: 0,
            data: generateMassData("scripts/femaledata.json"),
            label: "Female",
            lines: {show: false},
            bars: {show: false},
            points: {show: true},
        };
        let maleseries = {
            color: 1,
            data: generateMassData("scripts/maledata.json"),
            label: "Male",
            lines: {show: false},
            bars: {show: false},
            points: {show: true},
        }
        let myseries = {
            color: 2,
            data: data_1,
            label: "YOU",
            lines: {show: false},
            bars: {show: false},
            points: {show: true},
        }
        plot = $.plot($("#data_canvas"), [femaleseries, maleseries], global_options);
    } else {
        let genderseries = {
            color: 1,
            data: [generateMassData("scripts/maledata.json")],
            label: "Male",
            lines: {show: false},
            bars: {show: false},
            points: {show: true},
        }
    };
};



function initMeasurementsInputs() { //Generates the textboxes and such so we can input measurements. It's a recursive function so that I don't manually have to create every textbox and clog the html page!
    let input_area = $("#input_measurements");
    for(let i=0;i<measurements.length;i++) {
        input_area.append(`
        <div class='mb-3'>
            <input id='textbox`+i+`' type='text' class='form-control input-sm bg-dark text-white'></input>
            <label for='textbox`+i+`' id='text`+i+`'>`+measurements[i]+`</label>
        </div>`
        );

        $("#text"+i+"").click(function(e) {
            $("#axis-label").html("<p>Showing <strong>"+measurements[x_col]+"</strong> (X-axis) in relation to <strong>"+measurements[y_col]+" </strong>(Y-axis)</p>");
            if (e.ctrlKey) {
                x_col = i;
            } else {
                y_col = i;
            }
        });

        $("#textbox"+i).on("input", function(){
            if (x_col == i) {
                data_1[0] = $("#textbox"+i).val();
            } else if (y_col == i) {
                data_1[1] = $("#textbox"+i).val();
            }
        });
    };
};

$("#plotbtn").click(function(){
    console.log(measurements[x_col].toLowerCase().replace(/ /g, '').replace(/[\])}[{(]/g,'').replace(/[\])}[{(]/g,''));
    console.log(measurements[y_col].toLowerCase().replace(/ /g, '').replace(/[\])}[{(]/g,'').replace(/[\])}[{(]/g,''));
    plotMassData();
});



function plotData(data) {
    plot = $.plot($("#data_canvas"), [data], global_options); //Plot the data
};

$(document).ready(
    initMeasurementsInputs(),
    plotMassData(),
);