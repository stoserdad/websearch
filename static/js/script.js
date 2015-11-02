/**
 * Created by bender on 29.10.15.
 */

$(function(){
    $('#search').click(function(event) {
        $('#responseField').empty();
        $('#container').empty();
        var valueVehicleID = $('#vehicleID').val();
        var valueUserName = $('#userName').val();
        var valueDealer = $('#dealer').val();
        var valueDealerLogin = $('#dealerLogin').val();
        var valueServer = ($('#server').val() == 'silverstone') ? 'estroda': $('#server').val();
        var valueGroupName = $('#groupName').val();
        var valueRegistrationNumber = $('#registrationNumber').val();
        var valueUserLogin = $('#userLogin').val();
        var valueManufactoryID = $('#manufactoryID').val();
        var data = {
            vehicleID: valueVehicleID,
            userName:  valueUserName,
            dealer:    valueDealer,
            dealerLogin: valueDealerLogin,
            server: valueServer,
            groupName: valueGroupName,
            registrationNumber: valueRegistrationNumber,
            userLogin: valueUserLogin,
            manufactoryID: valueManufactoryID
        };
        data.vehicleID == '' & data.userName == '' & data.dealer == '' & data.dealerLogin == '' & data.server == '' & data.groupName == '' & data.registrationNumber == '' & data.userLogin == '' & data.manufactoryID == '' ? data.vehicleID = '--' : data.vehicleID = valueVehicleID;
        var dataToSend = JSON.stringify(data);

        $.ajax(
            {   url: '/data',
                type: 'POST',
                data: dataToSend,
                processData: false,
                contentType: false,
                cache: false,
                success: function(jsonResponse){
                    var objresponse = JSON.parse(jsonResponse);
                    $('#container').append('Найдено ' + objresponse.length + ' строк');
                    if (objresponse.length > 0) {
                        var table = '<table class="pure-table pure-table-bordered">';
                        table += '<thead><tr>' +
                            '<td>userName</td>' +
                            '<td>dealer</td>' +
                            '<td>vehicleID</td>' +
                            '<td>dealerLogin</td>' +
                            '<td>server</td>' +
                            '<td>groupName</td>' +
                            '<td>registrationNumber</td>' +
                            '<td>userLogin</td>' +
                            '<td>manufactoryID</td></tr></thead>';

                        $.each(objresponse, function (index, value) {
                            table += '<tr>' +
                                '<td>' + (value.userName == 'NULL' ? '' : value.userName) + '</td>' +
                                '<td>' + (value.dealerName == 'NULL' ? '' : value.dealerName) + '</td>' +
                                '<td>' + value.vehicleID + '</td>' +
                                '<td>' + (value.dealerLogin == 'NULL' ? '' : value.dealerLogin) + '</td>' +
                                '<td>' + (value.serverName.split('.')[0].replace('estroda', 'silverstone')) + '</td>' +
                                '<td>' + value.groupName + '</td>' +
                                '<td>' + value.registrationNumber + '</td>' +
                                '<td>' + (value.userLogin == 'NULL' ? '' : value.userLogin) + '</td>' +
                                '<td>' + value.manufactoryID + '</td></tr>';
                        });
                        table += '</table>';
                        $('#responseField').append(table);
                    }
                },
                error: function(){
                    $('#responseField').text('Error! No load data!');
                }
        });
        event.preventDefault();
    });
});
