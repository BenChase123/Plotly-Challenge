d3.json("samples.json").then((data) => {
    console.log(data);
    var sampleData = data;

    var dropdownMenu = d3.select("#selDataset");

    sampleData.names.forEach(function(name){
        dropdownMenu.append("option").text(name).property("value");
    });

    buildPlot(0, sampleData);
    console.log("here is sampledata")
    console.log(sampleData)
    console.log(dropdownMenu)
    d3.selectAll("#selDataset").on("change", optionChanged(dropdownMenu, sampleData));
});

// Define function to build plots
function buildPlot(index, sampleData) {

    // Save needed data for plots to variables 
    var sample_values = sampleData.samples[index].sample_values;
    console.log(sampleValue); 
    var otu_ids = sampleData.samples[index].otu_ids;
    console.log(otu_ids);
    var otu_labels = sampleData.samples[index].otu_labels;
    console.log(otu_labels);
   
        
    // Get top 10 OTU ids and save to variable with correct format for plot
    var topTenOTU = otu_ids.slice(0,10).reverse();
    console.log(topTenOTU);
    
    var topTenLabels = topTenOTU.map((otu => "OTU " + otu));
    console.log(topTenLabels)
        
    // Create bar plot 
    // Bar Trace
    var barTrace = {
        x: sampleValue.slice(0,10).reverse(),
        y: topTenLabels,
        hovertext: otu_labels.slice(0,10).reverse(),
        type: "bar",
        orientation: "h",
    };
        
    // Bar Data
    var barData = [barTrace];
        
    //  Bar Layout
    var barLayout = {
        title: "Top 10 OTU",
        margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 30
        }
    };

    // Plot Bar chart using data and layout
    Plotly.newPlot("bar", barData, barLayout)

    // Plot Bubble Chart
    // Bubble Trace
    var bubbleTrace = {
        x: otu_ids,
        y: sampleValue,
        text: otu_labels,
        mode: 'markers',
        marker: {
            color: otu_ids,
            size: sampleValue,
        }
    };
        
    // Bubble Data
    var bubbleData = [bubbleTrace];
     
    // Bubble Layout
    var bubbleLayout = {
        xaxis:{
            title: "OTU ID"
        },
        showlegend: false,
        height: 600,
        width: 1000,
    };
        
    // Plot Bubble chart using data and layout
    Plotly.newPlot('bubble', bubbleData, bubbleLayout);
        
    // Get data needs for Demographics section
    var demoKeys = Object.keys(sampleData.metadata[index]);
    console.log(demoKeys);
    var demoValues = Object.values(sampleData.metadata[index]);
    console.log(demoValues);
    var demoEntries = Object.entries(sampleData.metadata[index]);
    console.log(demoEntries);

    var demoData = d3.select('#sample-metadata');

    // Clear demographic data
    demoData.html("");

    demoEntries.forEach(([key, value]) => {
        demoData.append('p').text(`${key} : ${value}`);
    });

    idMetaData = sampleData.metadata[index]
    console.log(idMetaData)

    var result = sampleData.metadata.filter(meta => meta.id.toString === index)[0];
    console.log(idMetaData) - comes back undefined
    Object.entries(result).forEach((key)=> {
        demoData.append('p').text(key[0].toUpperCase() + ": " + key[1] + "\n");
    });

    var selection = demoData
    Object.entries(idMetaData).forEach(([key, value])=> {
        demoData.append("p").text("${key} : ${value}");
    });
    })
    sampleData.metadata.forEach(function(meta){
        demoData.append("p").text("${demoKeys[i]}: ${demoValues[i]}");

    // // Append demographic data to demographics section of html
    for (var i=0; i < demoKeys.length; i++) {
        demoData.append("p").text("${demoKeys}: ${demoValues}");
    };
};

// Handler and listener for capturing user input
// Add event listener for test subject ID dropdown


// Handler for change on test subject ID no dropdown
function optionChanged(dropdownMenu){
    d3.json("samples.json").then((data) => {
        console.log(data);
        var sampleData = data;
    
        console.log(d3.event);
        console.log("options changed function")
        // d3.event.preventDefault();
        console.log(dropdownMenu)
        var testSubjectID = dropdownMenu
        console.log(testSubjectID);
        console.log(sampleData);
        for (var i=0; i < sampleData.names.length; i++) {
            if (testSubjectID === sampleData.names[i]){
                buildPlot(i, sampleData);
            };
        };
    });
};