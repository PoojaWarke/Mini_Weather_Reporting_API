var fs = require('fs');
var axios = require('axios');

var api_url = 'https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22';
(async function () {
    await axios.get(api_url).then(response => 
        {
        console.log("Json Fetched");
        writeData(response.data);

    });
})();

function writeData(response) {
    fs.writeFile('env.html', createFile(response), function (er) {
        if (er) throw er;
        console.log('Report Ready to Show');
    })
}
function createFile(response) {
    var context = JSON.stringify(response);
    var html =
        `<!DOCTYPE html>
        <html>
        <head>
          <!-- external CDN OF JQUERY ARE USED -->
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/handlebars@latest/dist/handlebars.js"></script>
            <script type="text/javascript">
                 $(function () {
                        var theTemplateScript = $("#data").html();
                        var theTemplate = Handlebars.compile(theTemplateScript);
                         var context=JSON.parse('${context}');
                            var theCompiledHtml = theTemplate(context);
                        $('.env').html(theCompiledHtml);
                });
</script>
</head>
<body>
        <script id="data" type="text/x-handlebars-template">
            <h2 style="text-align:center;"><b><u>Mini_Weather_Reporting_API</u></b></h2>
            <table border="2" align="center" style="border-collapse:collapse; width:400px;">
                <tr><td>City</td><td>{{name}}</td></tr>
                <tr><td>Weather</td><td>{{weather.0.main}}</td></tr>
                <tr><td>Description</td><td>{{weather.0.description}}</td></tr>
                <tr><td>Current Temperature</td><td>{{main.temp}}</td></tr>
                <tr><td>Maximum Temperature</td><td>{{main.temp_max}}</td></tr>
                <tr><td>Minimum Temperate</td><td>{{main.temp_min}}</td></tr>
                <tr><td>Pressure</td><td>{{main.pressure}}</td></tr>
                <tr><td>Humidity</td><td>{{main.humidity}}</td></tr>
                <tr><td>Visibility</td><td>{{visibility}}</td></tr>
            </table>
            <!--anchor tag is being used along with the attributes in order to save report in local -->
        </script>
            <center><a href="http://localhost:8080" download="Mini_eather_Reporting_API"></a></center>

        </script>
        <div class="env"></div></body></html>`
    return html;
}
