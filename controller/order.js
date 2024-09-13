$(function() {

    $('.btn-getOrders').click(function() {
        $('#container').empty();
        $.ajax({
            url: "http://nodejs-api:3000/api/order",
            type: "GET",
        }).done(function(response) {
            if (response.status == "ERR") {
                var err = JSON.parse(response.error);
                $('#container').append(err.sender + ': ' + err.message);
            } else {
                $.each(response, function(key,item) {
                    $('#container').append('<input type="button" data-id="' + item.Id + '" value="Delete" class="btn btn-danger btn-sm btn-deleteOrder" />&nbsp;');
                    $('#container').append(item.Title + '<br>');
                });
                $('#container').find('.btn-deleteOrder').click(function() {
                    $.ajax({
                        url: "http://nodejs-api:3000/api/order/" + $(this).data('id'),
                        type: 'DELETE',
                        success: function (response) {
                            if (response.status == "ERR") {
                                var err = JSON.parse(response.error);
                                $('#container').append(err.sender + ': ' + err.message);
                            } else {
                                $('.btn-getOrders').trigger('click');
                            }
                        },
                        error: function (request, message, error) {
                        }
                    });
                });
            }
        }).fail(function(xhr, status, errorThrown) {
            //console.log( "Error: " + errorThrown );
            //console.log( "Status: " + status );
            //console.dir( xhr );
        }).always(function(xhr, status) {

        });
    });

    $('.btn-getOrder').click(function() {
        $('#container').empty();
        $.ajax({
            url: "http://nodejs-api:3000/api/order/" + $('#OrderId').val(),
            type: "GET",
        }).done(function(response) {
            if (response.status == "ERR") {
                var err = JSON.parse(response.error);
                $('#container').append(err.sender + ': ' + err.message);
            } else {
                $.each(JSON.parse(response.data), function(key,item) {
                    $('#container').append(item.Title + '<br>'); 
                });
            }
        }).fail(function(xhr, status, errorThrown) {
            //console.log( "Error: " + errorThrown );
            //console.log( "Status: " + status );
            //console.dir( xhr );
        }).always(function(xhr, status) {

        });
    });

    $('.btn-addOrder').click(function() {
        $.ajax({
            url: "http://nodejs-api:3000/api/order/" + $('#OrderId').val(),
            type: "POST",
            data: {            
                id: $('#Id').val(),
                title: $('#Title').val(),
                quantity: $('#Quantity').val(),
                message: $('#Message').val(),
                city: $('#City').val()
            },
        }).done(function(response) {
            //console.log(JSON.parse(JSON.parse(response.data).output)); 
            if (response.status == "ERR") {
                var err = JSON.parse(response.error);
                $('#container').append(err.sender + ': ' + err.message);
            } else if (response.status == "OK") {
                console.log(JSON.parse(JSON.parse(response.data).output))
                $('.btn-getOrders').trigger('click');
            } else {
                $('#container').append('Ordine non inserito.');
            }
        }).fail(function(xhr, status, errorThrown) {
            //console.log( "Error: " + errorThrown );
            //console.log( "Status: " + status );
            //console.dir( xhr );
        }).always(function(xhr, status) {

        });
    });

});
