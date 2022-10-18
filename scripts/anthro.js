const measurements = ["Abdominal Extension Depth (Sitting)","Acromial Height","Acromion Radial Length","Ankle Circumference","Axilla Height","Ball of Foot Circumference","Ball of Foot Length","Biacromial Breadth","Biceps Circumference (Flexed)","Bicristal Breadth","Bideltoid Breadth","Bimalleolar Breadth","Bitragion Chin Arc","Bitragion Submandibular Arc","Bizygomatic Breadth","Buttock Circumference","Buttock Depth","Buttock Height","Buttock Knee Length","Buttock Popliteal Length","Calf Circumference","Cervical Height","Chest Breadth","Chest Circumference","Chest Depth","Chest Height","Crotch Height","Crotch Length Omphalion","Crotch Length Posterior Omphalion","Ear Breadth","Ear Length","Ear Protrusion","Elbow Rest Height","Eye Height Sitting","Foot Breadth Horizontal","Foot Length","Forearm Center of Grip Length","Forearm Circumference (flexed)","Forearm Breadth","Forearm Hand Length","Functional Leg Length","Hand Breadth","Hand Circumference","Hand Length","Head Breadth","Head Circumference","Head Length","Heel Ankle Circumference","Heel Breadth","Hip Breadth","Hip Breadth (sitting)","Iliocristal Height","Interpupillary Breadth","Interscyei","Interscyeii","Knee Height Mid-patella","Knee Height (sitting)","Lateral Femoral Epicondyle Height","Lateral Malleolus Height","Lower Thigh Circumference","Mentonsellion Length","Neck Circumference","Neck Circumference (base)","Overhead Fingertip Reach (sitting)","Palm Length","Popliteal Height","Radial-stylion Length","Shoulder Circumference","Shoulder-elbow Length","Shoulder Length","Sitting Height","Sleeve Length Spine Wrist","Sleeve Outseam","Span","Stature","Suprasternal Height","Tenth Rib Height","Thigh Circumference","Thigh Clearance","Thumbtip Reach","Tibial Height","Bitragion Top of Head","Trochanterion Height","Vertical Trunk Circumference","Waist-back Length","Waist Breadth","Waist Circumference","Waist depth","Waist Front Length (sitting)","Waist-height Omphalion","Weight(kg)","Wrist Circumference","Wrist Height","Height (in)","Weight (lbs)"];

const index_measurements = [];

let x_col = 1;
let y_col = 2;

let totaldata = [];

let global_options = {
    series: {
        lines: {show: false}, //Don't show lines, show points though
        points: {show: true}
    }
};

function initialize() {
}

function plotMassData(gender, race) {
    let dataset = [];
    if($("#both-gender").checked) {
        let index_x = measurements[x_col].toLowerCase().replace(/ /g, '').replace("(",'').replace(")",'');
        let index_y = measurements[y_col].toLowerCase().replace(/ /g, '').replace("(",'').replace(")",'');
        $.ajax({
            async: false,
            dataType: "json",
            url: "scripts/femaledata.json",
            
            success: function(data){
                let jsondata = JSON.parse(JSON.stringify(data));
                for(let i=0;i<jsondata.length;i++) {
                    let temp_pair = [];
                    temp_pair.push(finished[i][index_x]);
                    temp_pair.push(finished[i][index_y]);
                    dataset.push(temp_pair);
                }
                plot = $.plot($("#data_canvas"), [dataset], global_options);
            }
        });
        
    };
};

/*function initGenderedData(gender, race) {
    let dataset = [];
    if (gender==0) {
        let index_x = measurements[x_col].toLowerCase().replace(/ /g, '').replace("(",'').replace(")",'')
        let index_y = measurements[y_col].toLowerCase().replace(/ /g, '').replace("(",'').replace(")",'')
        $.ajax({ //Gets female data synchronously.
            async: false,
            dataType: "json",
            url: "scripts/femaledata.json",
            
            success: function(data) {
                let finished = JSON.parse(JSON.stringify(data));
                for(let i=0;i<finished.length;i++) {
                    let temp_data = [0,0]
                    
                    temp_data[0] = finished[i][index_x];
                    temp_data[1] = finished[i][index_y];
                    dataset.push(temp_data);
                }
                
            }
        });
        /*$.ajax({ //Gets male data synchronously.
            async: false,
            dataType: "json",
            url: "scripts/maledata.json",
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
        return dataset;
        //plot = $.plot($("#data_canvas"), [dataset], global_options);
    }


    
};*/

function initMeasurementsInputs() { //Generates the textboxes and such so we can input measurements. It's a recursive function so that I don't manually have to create every textbox and clog the html page!
    let input_area = $("#input_measurements");
    for(let i=0;i<measurements.length;i++) {
        //console.log("testing");
        input_area.append("<div class='mb-3'><input id='textbox"+i+"' type='text' class='form-control input-sm bg-dark text-white'></input><label for='textbox"+i+"' id='text"+i+"'>"+measurements[i]+"</label></div>");

        $("#text"+i+"").click(function(e) {
            if (e.ctrlKey && x_col != i) {
                x_col = i;
                //console.log(x_col);
                $("#axis-label").html("<p>X axis: <strong>"+x_col+"</strong></p><br><p>Y axis: <strong>"+y_col+"</strong></p>");
            } else if(y_col != i) {
                y_col = i;
                //console.log(y_col);
               $("#axis-label").html("<p>X axis: <strong>"+x_col+"</strong></p><br><p>Y axis: <strong>"+y_col+"</strong></p>");
            }
        });

        $("#textbox"+i).on("input", function(){
            if (x_col == i) {
                data_1[0] = $("#textbox"+i).val();
                //plotData(data_1);
            } else if (y_col == i) {
                data_1[1] = $("#textbox"+i).val();
                //plotData([4, 6]);
            }
        });
    };
};

$("#plotbtn").click(function(){
    $("#debug-div").html("<p>"+measurements[x_col].toLowerCase().replace(/ /g, '').replace("(",'').replace(")",'')+"</p><br><p>"+measurements[y_col].toLowerCase().replace(/ /g, '').replace("(",'').replace(")",'')+"</p>");
    plotMassData();
    //plot = $.plot($("#data_canvas"), [initGenderedData(0)], global_options);
    
});


var d1 = [[1,10],[5,3],[6,4],[6,5]]; //Sample data
let plot;

function plotData(data) {
    plot = $.plot($("#data_canvas"), [data], global_options); //Plot the data
};

$(document).ready(
    initMeasurementsInputs(),
    initGenderedData(0,0),
    plotData([0,0])
);//When document is loaded, run the script