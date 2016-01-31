$(document).ready(main);

var calledOnce = false;

function main() {

    function getIPAddress() {
        calledOnce = true;
        $.getJSON('http://ipinfo.io', function(ipInfo) {
            var loc = ipInfo.city + ", " + ipInfo.region;
            $('.city').html(loc);

            return $.ajax({
                              type: "GET",
                              url: 'https://api.forecast.io/forecast/5e930f9a282080951672ad375edd55d6/' + ipInfo.loc,
                              dataType: 'jsonp',
                              success: function(weatherReport){
                                  updateWeather(weatherReport);
                              },
                              failure: function(err) {
                                  return err;
                              }
                          });
        });
    }

    function updateWeather(weather) {
        $('.temp').html(parseInt(weather.currently.temperature) );
        $('.summary').html(weather.currently.summary);
        $('.visibility').html(weather.currently.visibility);
        $('.humidity').html(weather.currently.humidity);
        $('.feelsLike').html(parseInt(weather.currently.apparentTemperature));
        $('.chanceRain').html(weather.currently.precipProbability);
        $('.windSpeed').html(weather.currently.windSpeed);
        $('.windBearing').html(weather.currently.windBearing);

        for (var i = 0; i < 5; i ++) {
            var day = weather.daily.data[i];
            var dayTemp = parseInt(day.temperatureMax) + '&deg;<br>' + parseInt(day.temperatureMin) + '&deg;<br>' + day.summary
            $('.day' + i).html(dayTemp);
        }
    }

    if( !calledOnce) {
        getIPAddress();
    }

}
