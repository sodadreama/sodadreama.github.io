/*Race constraints: 1 = White, 2 = Black, 3 = Hispanic, 4 = Asian, 5 = Native American, 
6 = Pacific Islander, 8 = Other*/

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })

const measurements = ["Abdominal Extension Depth (Sitting)","Acromial Height","Acromion Radial Length","Ankle Circumference","Axilla Height","Ball of Foot Circumference","Ball of Foot Length","Biacromial Breadth","Biceps Circumference (Flexed)","Bicristal Breadth","Bideltoid Breadth","Bimalleolar Breadth","Bitragion Chin Arc","Bitragion Submandibular Arc","Bizygomatic Breadth","Buttock Circumference","Buttock Depth","Buttock Height","Buttock-Knee Length","Buttock-Popliteal Length","Calf Circumference","Cervical Height","Chest Breadth","Chest Circumference","Chest Depth","Chest Height","Crotch Height","Crotch Length (Omphalion)","Crotch Length Posterior (Omphalion)","Ear Breadth","Ear Length","Ear Protrusion","Elbow Rest Height","Eye Height (sitting)","Foot Breadth Horizontal","Foot Length","Forearm Center of Grip Length","Forearm Circumference (flexed)","Forearm Breadth","Forearm-Hand Length","Functional Leg Length","Hand Breadth","Hand Circumference","Hand Length","Head Breadth","Head Circumference","Head Length","Heel-Ankle Circumference","Heel Breadth","Hip Breadth","Hip Breadth (sitting)","Iliocristal Height","Interpupillary Breadth","Interscye I","Interscye II","Knee Height Mid-patella","Knee Height (sitting)","Lateral Femoral Epicondyle Height","Lateral Malleolus Height","Lower Thigh Circumference","Menton-Sellion Length","Neck Circumference","Neck Circumference (base)","Overhead Fingertip Reach (sitting)","Palm Length","Popliteal Height","Radiale-Stylion Length","Shoulder Circumference","Shoulder-Elbow Length","Shoulder Length","Sitting Height","Sleeve Length Spine-Wrist","Sleeve Outseam","Span","Stature","Suprasternale Height","Tenth Rib Height","Thigh Circumference","Thigh Clearance","Thumbtip Reach","Tibial Height","Bitragion Top of Head","Trochanterion Height","Vertical Trunk Circumference","Waist Back Length","Waist Breadth","Waist Circumference","Waist depth","Waist Front Length (sitting)","Waist-height (Omphalion)","Weight (kg)","Wrist Circumference","Wrist Height","Height"];

const tooltips = [
    ""
];

let x_col = 1;
let y_col = 2;

let global_race_constraint = 9

let data_1 = [0,0];

let global_options = {
    series: {
        lines: {show: false}, //Don't show lines, show points though
        points: {show: true}
    }
};

function generateMassData(url) {
    let dataset = [];
    $.ajax({   
        async: false,
        dataType: "json",
        url: url,
        success: function(data){
            let index_x = measurements[x_col].toLowerCase().replace(/ /g, '').replace(/[\])}[{(]/g,'').replace(/[\])}[{(]/g,'').replace(/-/g, '');
            let index_y = measurements[y_col].toLowerCase().replace(/ /g, '').replace(/[\])}[{(]/g,'').replace(/[\])}[{(]/g,'').replace(/-/g, '');
            let jsondata = JSON.parse(JSON.stringify(data));
            for(let i=0;i<jsondata.length;i++) {
                if (global_race_constraint != 9) {
                    if (jsondata[i].SubjectNumericRace == global_race_constraint) {
                        let temp_pair = [];
                        temp_pair.push(jsondata[i][index_x]);
                        temp_pair.push(jsondata[i][index_y]);
                        dataset.push(temp_pair);
                    }
                } else {
                    let temp_pair = [];
                    temp_pair.push(jsondata[i][index_x]);
                    temp_pair.push(jsondata[i][index_y]);
                    dataset.push(temp_pair);
                };
                
            }
        }
    });
    return dataset;
}

function plotMassData() {
    if($("#both_gender").is(":checked")) {
        let femdata = generateMassData("scripts/femaledata.json");
        let mascdata = generateMassData("scripts/maledata.json");
        let femaleseries = {
            color: 0,
            data: femdata,
            label: "Female ["+femdata.length+"]",
            lines: {show: false},
            bars: {show: false},
            points: {show: true},
        };
        let maleseries = {
            color: 1,
            data: mascdata,
            label: "Male ["+mascdata.length+"]",
            lines: {show: false},
            bars: {show: false},
            points: {show: true},
        };
        let myseries = {
            color: 2,
            data: [data_1],
            label: "YOU",
            lines: {show: false},
            bars: {show: false},
            points: {show: true},
        };
        let plot = $.plot($("#data_canvas"), [femaleseries,maleseries,myseries], global_options);
    } else if($("#female").is(":checked")) {
        let genderdata = generateMassData("scripts/femaledata.json");
        let genderseries = {
            color: 0,
            data: genderdata,
            label: "Female ["+genderdata.length+"]",
            lines: {show: false},
            bars: {show: false},
            points: {show: true},
        }; 
        let myseries = {
            color: 2,
            data: [data_1],
            label: "YOU",
            lines: {show: false},
            bars: {show: false},
            points: {show: true},
        };
        let plot = $.plot($("#data_canvas"), [genderseries, myseries], global_options);
    } else if($("#male").is(":checked")) {
        let genderdata = generateMassData("scripts/maledata.json");
        let genderseries = {
            color: 1,
            data: genderdata,
            label: "Male ["+genderdata.length+"]",
            lines: {show: false},
            bars: {show: false},
            points: {show: true},
        };
        let myseries = {
            color: 2,
            data: [data_1],
            label: "YOU",
            lines: {show: false},
            bars: {show: false},
            points: {show: true},
        };
        let plot = $.plot($("#data_canvas"), [genderseries, myseries], global_options);
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
                if (measurements[x_col] == "Weight (kg)") {
                    data_1[0] = $("#textbox"+i).val()*10;
                } else {
                    data_1[0] = $("#textbox"+i).val();
                }
                
            } else if (y_col == i) {
                if (measurements[y_col] == "Weight (kg)") {
                    data_1[1] = $("#textbox"+i).val()*10;
                } else {
                    data_1[1] = $("#textbox"+i).val();
                }
            }
        });
    };
};

$("#black").change(function(){
    global_race_constraint = 2;
});
$("#white").change(function(){
    global_race_constraint = 1;
});
$("#hispanic").change(function(){
    global_race_constraint = 3;
});
$("#asian").change(function(){
    global_race_constraint = 4;
});
$("#namerican").change(function(){
    global_race_constraint = 5;
});
$("#pislander").change(function(){
    global_race_constraint = 6;
});

$("#other-race").change(function(){
    global_race_constraint = 8;
});
$("#both_race").change(function(){
    global_race_constraint = 9;
});


$("#plotbtn").click(function(){
    plotMassData();
});

$(document).ready(
    initMeasurementsInputs(),
    $.plot($("#data_canvas"), [], global_options),
);