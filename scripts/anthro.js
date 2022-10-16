const measurements = ["abdominalextensiondepthsitting","acromialheight","acromionradialelength","anklecircumference","axillaheight","balloffootcircumference","balloffootlength","biacromialbreadth","bicepscircumferenceflexed","bicristalbreadth","bideltoidbreadth","bimalleolarbreadth","bitragionchinarc","bitragionsubmandibulararc","bizygomaticbreadth","buttockcircumference","buttockdepth","buttockheight","buttockkneelength","buttockpopliteallength","calfcircumference","cervicaleheight","chestbreadth","chestcircumference","chestdepth","chestheight","crotchheight","crotchlengthomphalion","crotchlengthposterioromphalion","earbreadth","earlength","earprotrusion","elbowrestheight","eyeheightsitting","footbreadthhorizontal","footlength","forearmcenterofgriplength","forearmcircumferenceflexed","forearmforearmbreadth","forearmhandlength","functionalleglength","handbreadth","handcircumference","handlength","headbreadth","headcircumference","headlength","heelanklecircumference","heelbreadth","hipbreadth","hipbreadthsitting","iliocristaleheight","interpupillarybreadth","interscyei","interscyeii","kneeheightmidpatella","kneeheightsitting","lateralfemoralepicondyleheight","lateralmalleolusheight","lowerthighcircumference","mentonsellionlength","neckcircumference","neckcircumferencebase","overheadfingertipreachsitting","palmlength","poplitealheight","radialestylionlength","shouldercircumference","shoulderelbowlength","shoulderlength","sittingheight","sleevelengthspinewrist","sleeveoutseam","span","stature","suprasternaleheight","tenthribheight","thighcircumference","thighclearance","thumbtipreach","tibialheight","tragiontopofhead","trochanterionheight","verticaltrunkcircumferenceusa","waistbacklength","waistbreadth","waistcircumference","waistdepth","waistfrontlengthsitting","waistheightomphalion","weightkg","wristcircumference","wristheight","Heightin","Weightlbs"];

var global_options = {
    series: {
        lines: {show: false}, //Don't show lines, show points though
        points: {show: true}
    }
};

function initMeasurementsInputs() {
    
};

var d1 = [[1,10],[5,3],[6,4],[6,5]]; //Sample data
var plot;

function plotData(data) {
    plot = $.plot($("#data_canvas"), [data], global_options); //Plot the data
};

$(document).ready(plotData(d1));//When document is loaded, run the script