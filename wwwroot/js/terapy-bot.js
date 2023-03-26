var baruk = new BotUI('terapy-bot');
var searchTitle = 'Alper Seguros';
var zap = '11 976328416';
var callZap = 'https://api.whatsapp.com/send?phone=5511976328416&text=Alper+tenho+dúvidas+sobre+o+seguro+bike';
var marca = '';
var modelo = '';
var ano = new Date().getFullYear();
var valor = '25000';
var cep = '04538132';
var endereco = '';
var bairro = '';
var cidade = '';
var uf = '';
var numero = '444';
var nome = 'Daniel';
var nomecompleto = 'DANIEL COELHO DA COSTA';
var email = 'nome@ciclista.com';
var cpf = '342.002.171-42';
var rg = '48.151.623-42';
var datanascimento = '19/12/1980';

function init() {
    $('.botui-messages-container').empty();

    baruk.message.add({
        content: 'Olá, ciclista! Sou o agente virtual da Alper e irei te ajudar a contratar um seguro para sua bike.'
    }).then(function () {
        return baruk.message.add({
            delay: 1000,
            content: 'Para isso eu vou precisar de algumas informações. Blz?'
        }).then(function () {
            return baruk.message.add({
                delay: 700,
                content: 'Vamos lá..'
            });
        });
    }).then(function () {
        return baruk.message.add({
            delay: 1500,
            loading: true,
            content: 'É uma Bike Nova?'
        }).then(function () {
            return baruk.action.button({
                delay: 1000,
                action: [{
                    text: 'Sim',
                    value: 'sim'
                }, {
                    text: 'Não',
                    value: 'nao'
                }]
            });
        }).then(function () {
            return baruk.message.add({
                delay: 1000,
                content: 'Possui Nota Fiscal?'
            }).then(function () {
                return baruk.action.button({
                    delay: 1000,
                    action: [{
                        text: 'Sim',
                        value: 'sim'
                    }, {
                        text: 'Não',
                        value: 'nao'
                    }]
                });
            }).then(function () {
                return baruk.message.add({
                    delay: 1000,
                    content: 'Qual a marca da bike?'
                }).then(function () {
                    return baruk.action.button({
                        delay: 1000,
                        action: [{
                            text: 'Caloi',
                            value: 'Caloi'
                        }, {
                            text: 'Goldentec',
                            value: 'Goldentec'
                        }, {
                            text: 'Biobike',
                            value: 'Biobike'
                        }]
                    }).then(function (bike) {
                        marca = bike.value;
                        selectPerfil();
                    });
                });
            });
        });
    });
}

function tchau() {
    return baruk.message.add({
        delay: 1000,
        content: 'Foi um prazer falar com você. Até breve!'
    }).then(function () {
        return baruk.action.button({
            delay: 1000,
            action: [{
                text: 'Reiniciar',
                value: 'reiniciar'
            }, {
                text: 'Conhecer a Baruk',
                value: 'baruk'
            }]
        }).then(function (res) {
            if (res.value === 'reiniciar') {
                init();
            }
            else {
                window.open('https://www.baruk.me', '_blank');
            }
        });
    })
}

var selectPerfil = function () {
    baruk.message.bot({
        delay: 500,
        content: 'Qual o modelo da ' + marca
    }).then(function () {
        return baruk.action.select({
            action: {
                placeholder: "Escolha um modelo",
                value: 'Modelo 1',
                searchselect: true,
                label: 'text',
                icon: 'map-marker',
                size: 30,
                options: arrModel,
                button: {
                    icon: 'check',
                    label: 'OK'
                }
            }
        });
    }).then(function (model) {
        modelo = model.value;
        baruk.message.bot({
            delay: 500,
            content: 'Mais alguns detalhes...'
        }).then(function () {
            baruk.message.bot({
                delay: 1000,
                loading: true,
                content: 'Qual o ano da bike?'
            }).then(function () {
                return baruk.action.text({
                    delay: 500,
                    action: {
                        size: 4,
                        icon: 'calendar',
                        value: ano,
                        sub_type: 'number',
                        placeholder: '2021'
                    }
                }).then(function (res) {
                    ano = res.value;
                    baruk.message.bot({
                        delay: 700,
                        content: 'Qual o valor da bike?'
                    }).then(function () {
                        return baruk.action.text({
                            delay: 500,
                            action: {
                                size: 10,
                                icon: 'dollar-sign',
                                value: valor,
                                sub_type: 'number',
                                placeholder: '25000'
                            }
                        }).then(function (res) {
                            valor = res.value;
                            return baruk.message.add({
                                delay: 1000,
                                content: 'Com qual frequência você utiliza sua bike?'
                            }).then(function () {
                                return baruk.action.button({
                                    delay: 1000,
                                    action: [{
                                        text: 'Diariamente',
                                        value: 'dia'
                                    }, {
                                        text: 'Finais de Semana',
                                        value: 'fds'
                                    }, {
                                        text: 'Uso Pouco',
                                        value: 'pouco'
                                    }, {
                                        text: 'Uso p/ Trabalhar',
                                        value: 'pouco'
                                    }]
                                });
                            }).then(function () {
                                return baruk.message.add({
                                    delay: 1000,
                                    content: 'Agora para finalizar eu quero saber um pouco sobre você...'
                                });
                            }).then(function () {
                                return baruk.message.add({
                                    delay: 1500,
                                    loading: true,
                                    content: 'Envia uma imagem do seu documento de identidade com o Nome, RG e CPF legíveis, por favor?'
                                });
                            }).then(function () {
                                return baruk.action.button({
                                    delay: 1000,
                                    action: [{
                                        text: 'OK',
                                        value: 'ok'
                                    }, {
                                        text: 'Quero digitar meus dados',
                                        value: 'digitar'
                                    }]
                                });
                            }).then(function (change) {
                                if (change.value === 'ok') {
                                    baruk.message.add({
                                        delay: 2000,
                                        loading: true,
                                        human: true,
                                        type: 'embed',
                                        content: 'https://i.ibb.co/C65MVkz/novo-rg-1.jpg'
                                    }).then(function () {
                                        return baruk.message.add({
                                            delay: 1000,
                                            content: 'Maravilha, Daniel! Recebi seu RG. Agora preciso do seu endereço.'
                                        });
                                    }).then(function () {
                                        selectEndereco();
                                    });
                                } else {
                                    selectNome();
                                }
                            });
                        });
                    });
                });
            });
        });
    });
};

var selectEndereco = function () {
    baruk.message.bot({
        delay: 500,
        content: 'Qual o CEP do endereço?'
    }).then(function () {
        return baruk.action.text({
            delay: 500,
            action: {
                size: 8,
                icon: 'map-marker',
                value: cep,
                sub_type: 'number',
                placeholder: '04538132'
            }
        });
    }).then(function (zipcode) {
        let c = zipcode.value.replace('-', '').replace(' ', '');
        if (isNaN(c)) {
            baruk.message.bot({
                delay: 500,
                content: 'Não consegui validar esse CEP. Vamos tentar de novo..'
            }).then(selectEndereco());
        }
        else {
            cep = c;
            baruk.message.bot({
                delay: 500,
                content: 'Deixa eu ver onde fica esse CEP...'
            }).then(function () {
                selectCEP(c);
            });
        }
    });
};

var selectCEP = function (cep) {
    var url = 'https://viacep.com.br/ws/' + cep + '/json/';
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function () {
        var res = JSON.parse(xhr.responseText)
        if (res && res.cep) {
            endereco = res.logradouro;
            cidade = res.localidade;
            uf = res.uf;
            bairro = res.bairro;

            baruk.message.bot({
                delay: 1500,
                loading: true,
                content: 'Achei! ' + endereco + ', ' + bairro + ' ' + cidade + '  ' + uf
            }).then(function () {
                return baruk.action.button({
                    delay: 1000,
                    action: [{
                        text: 'Está certo!',
                        value: 'cepok'
                    }, {
                        text: 'Endereço errado',
                        value: 'ceperrado'
                    }]
                }).then(function (res) {
                    if (res.value === 'cepok') {
                        return baruk.message.add({
                            delay: 1000,
                            content: 'Qual o número?'
                        }).then(function () {
                            return baruk.action.text({
                                delay: 500,
                                action: {
                                    size: 4,
                                    icon: 'map-marker',
                                    value: numero,
                                    sub_type: 'number',
                                    placeholder: '444'
                                }
                            }).then(function (res) {
                                numero = res.value;
                                selectEmail();
                            });
                        });
                    }
                    else {
                        return baruk.message.add({
                            type: 'embed',
                            delay: 500,
                            content: 'https://i.ibb.co/Nt5nPx0/nazareconfusa.gif'
                        }).then(function () {
                            return baruk.message.add({
                                delay: 100,
                                content: 'Vamos tentar novamente'
                            }).then(selectEndereco());
                        });
                    }
                });
            });
        }
    }
    xhr.send();
};

var selectEmail = function () {
    return baruk.message.add({
        delay: 700,
        content: 'Qual o seu e-mail principal?'
    }).then(function () {
        return baruk.action.text({
            delay: 500,
            action: {
                size: 100,
                icon: 'email',
                value: email,
                sub_type: 'email',
                placeholder: 'Digite seu e-mail'
            }
        }).then(function (res) {
            email = res.value;
            return baruk.message.add({
                delay: 300,
                content: 'Perfeito! Antes de concluirmos, me confirma seus dados, por favor..'
            }).then(confirmarDados());
        });
    });
};

var selectCPF = function () {
    return baruk.message.add({
        delay: 1000,
        content: 'Qual o seu CPF?'
    }).then(function () {
        return baruk.action.text({
            delay: 500,
            action: {
                size: 100,
                icon: 'plus',
                placeholder: '000.000.000-00'
            }
        });
    }).then(function (res) {
        cpf = res.value;
        selectEmail();
    });
};

var selectNome = function () {
    return baruk.message.add({
        delay: 1000,
        content: 'Qual o seu nome completo?'
    }).then(function () {
        return baruk.action.text({
            delay: 500,
            action: {
                size: 100,
                icon: 'plus',
                placeholder: 'Nome completo'
            }
        });
    }).then(function (res) {
        nomecompleto = res.value;
        nome = nomecompleto;
        if (nomecompleto.indexOf(' '));
        {
            nome = nomecompleto.substring(0, nomecompleto.indexOf(' '));
        }
        selectCPF();
    });
};

var confirmarDados = function () {
    return baruk.message.add({
        delay: 700,
        content: 'Nome: ' + nomecompleto
    }).then(function () {
        return baruk.message.add({
            delay: 500,
            content: 'CPF: ' + cpf
        })
    }).then(function () {
        return baruk.message.add({
            delay: 500,
            content: 'Bike: ' + marca + ' ' + modelo
        }).then(function () {
            return baruk.message.add({
                delay: 500,
                content: 'Ano: ' + ano
            }).then(function () {
                return baruk.message.add({
                    delay: 500,
                    content: 'Valor: ' + valor
                }).then(function () {
                    return baruk.action.button({
                        delay: 700,
                        action: [{
                            text: 'OK',
                            value: 'ok'
                        }, {
                            text: 'Corrigir',
                            value: 'corrigir'
                        }]
                    }).then(function (res) {
                        if (res.value === 'ok') {
                            return baruk.message.add({
                                delay: 1500,
                                loading: true,
                                content: 'Confirmando...'
                            }).then(function () {
                                return baruk.message.add({
                                    delay: 2500,
                                    loading: true,
                                    content: 'Gerando cotação...'
                                }).then(function () {
                                    return baruk.message.add({
                                        delay: 2500,
                                        loading: true,
                                        content: 'Tudo Pronto, ' + nome + '! Enviei um PDF com a cotação do seu seguro bike para o e-mail ' + email + ' e todas as informações para efetivá-lo. '
                                    }).then(function () {
                                        return baruk.action.button({
                                            delay: 1000,
                                            action: [{
                                                text: 'Muito Obrigad@',
                                                value: 'obrigada'
                                            }, {
                                                text: 'Tenho Dúvidas',
                                                value: 'duvidas'
                                            }]
                                        }).then(function (res) {
                                            if (res.value === 'obrigada') {
                                                return baruk.message.add({
                                                    delay: 500,
                                                    content: 'Eu que agradeço.'
                                                }).then(tchau());
                                            }
                                            else {
                                                return baruk.message.add({
                                                    delay: 700,
                                                    content: 'Me chama no zap. Vai ser um prazer tirar duas dúvidas por lá.'
                                                }).then(function () {
                                                    return baruk.action.button({
                                                        delay: 1000,
                                                        action: [{
                                                            text: 'Chamar no Zap',
                                                            value: 'zap'
                                                        }, {
                                                            text: 'Obrigada',
                                                            value: 'obrigada'
                                                        }]
                                                    }).then(function (res) {
                                                        if (res.value === 'obrigada') {
                                                            return baruk.message.add({
                                                                delay: 500,
                                                                content: 'Eu que agradeço.'
                                                            }).then(tchau());
                                                        }
                                                        else {
                                                            window.open(callZap, '_blank');
                                                            tchau();
                                                        }
                                                    });
                                                });
                                            }
                                        });
                                    });
                                });
                            });
                        }
                        else {
                            selectNome();
                        }
                    });
                });
            });
        });
    });
};

var arrModel = [
    { value: 'Modelo 1', text: 'Modelo Urbano' },
    { value: 'Modelo 2', text: 'Modelo Liberty' },
    { value: 'Modelo 3', text: 'Modelo Classic' }
];

init();
