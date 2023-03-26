var baruk = new BotUI('alperseguros-bot');

function init() {
    $('.botui-messages-container').empty();

    baruk.message.add({
        content: 'Olá, Eva!'
    }).then(function () {
        return baruk.message.add({
            delay: 1000,
            content: 'Como você está se sentindo hoje?'
        });
    });
}

function sendTextMessage(text) {
    if (!text || text.trim() == '') {
        return;
    }

    // Limpa o campo de mensagem
    $('#message_send').val('');

    // Remove áudio em espera
   // $('#audio_message_send').remove();

    baruk.message.add({
        human: true,
        content: text
    });

    baruk.message.add({
        loading: true
    });

    // Desabilitar envio de mensagem
    $('#message_send').attr('disabled', true);

    var settings = {
        "url": "https://apis.brkbot.com.br/api/chatgpt",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "input": text.trim()
        }),
    };

    $.ajax(settings)
        .done(function (response) {

            if (!response) {
                return "";
            }

            if (response.success) {
                $.each(response.data, function (index, item) {
                    baruk.message.add({
                        delay: 2000,
                        content: item
                    });
                });
            }
            else {
                baruk.message.add({
                    content: response.error
                });
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            baruk.message.add({
                human: true,
                content: 'O ChatGPT não respondeu'
            });
        })
        .always(function (jqXHR, textStatus) {
            $('#message_send').attr('disabled', false);
            $('.botui-message-content.loading').parent().remove();
        });
}

init();
