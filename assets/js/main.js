import ('https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js');

var totalNotificacoesDengue;
var casosConfirmadosDengue;
var casosNotificadosAdulto;
var casosNotificadosSemana;
var obitosDengue;
let animacaoNumeroCasosNotificados;
let animacaoNumeroCasosConfirmados;
let animacaoNumeroObitosDengue;
let paragrafoNumeroCasosDengue;
let paragrafoNotificacoesAdultos;
let paragrafoNotificacoesSemana;

plotcharts();

/**
 * Animações relacionadas ao menu
 */
const menuItemDoencas = document.querySelector('#menu_item_doencas');
const menuDoencas = document.querySelector('.menu_doencas');
const navbarLista = document.querySelector('#navbarLista');
const navbar = document.querySelector('nav');
const iconeMenuResponsivo = document.querySelector('#icon_menu_responsivo');

let dropdown = false;
let menuResponsivo = false;

window.onclick = (e) => {
    if(dropdown && !e.target.id.match('menu_item_doencas')){
        menuDoencas.classList.remove('ativo');
        menuDoencas.classList.add('inativo');
        dropdown = false;
    }

    if((e.target.id.match('menu_opcao_dengue') ||
        e.target.id.match('menu_opcao_zika') ||
        e.target.id.match('menu_opcao_chikungunya') ||
        e.target.id.match('menu_opcao_n_casos') ||
        e.target.id.match('menu_opcao_prevencao') ||
        e.target.id.match('menu_opcao_mitosVerdades') ||
        e.target.id.match('menu_opcao_voceSabia') ||
        e.target.id.match('menu_opcao_equipe')
    ) && menuResponsivo) {
        navbar.classList.remove('navbar_lista_responsivo');
        navbarLista.classList.remove('menu_visivel_responsivo');
        iconeMenuResponsivo.innerHTML = '☰';
        menuResponsivo = false;
    }

    if(e.target.id.match('menu_item_doencas')){
        if(!dropdown){
            menuDoencas.classList.add('ativo');
            menuDoencas.classList.remove('inativo');
            dropdown = true;
        } else {
            menuDoencas.classList.remove('ativo');
            menuDoencas.classList.add('inativo');
            dropdown = false;
        }
    }

    if(e.target.id.match('icon_menu_responsivo')){
        if(!menuResponsivo){
            navbar.classList.add('navbar_lista_responsivo');
            navbarLista.classList.add('menu_visivel_responsivo');
            iconeMenuResponsivo.innerHTML = 'x';
            menuResponsivo = true;
        } else {
            navbar.classList.remove('navbar_lista_responsivo');
            navbarLista.classList.remove('menu_visivel_responsivo');
            iconeMenuResponsivo.innerHTML = '☰';
            menuResponsivo = false;
        }
    }
}

/**
 * Funções que obtém os dados da tabela e desenha os gráficos
 */

function plotcharts() {
    let divGrafico;
    let avisoGrafico;

    // //usa a API
    fetch('https://script.google.com/macros/s/AKfycbzIEly-Gskck89DUkLL9B198d-Qq0FsENzRkCpd6qO-4D2hef9yucAW_6KIEeWlVPmQnw/exec').then(response => {
        //recebe o arquivo json a partir da API
        return response.json();
        //extrai os dados do arquivo json
    }).then(data => {
        //itera pelas colunas da planilha

        var faixaEtaria = [];
        var notificacoes = [];
        totalNotificacoesDengue = parseInt(data[0]['Total Notificações Dengue']);
        casosConfirmadosDengue = parseInt(data[0]['Casos Confirmados Dengue']);
        obitosDengue = parseInt(data[0]['Óbito']);
        casosNotificadosAdulto = data[5]['Notificações'];
        animaNumeroCasos();
        //console.log(casosNotificadosAdulto);
        
        for (let i = 0; i < data.length; i++) {
            //guarda os dados em seus respectivos vetores
            if(data[i]['Faixa Etária'] != null){
                faixaEtaria.push(data[i]['Faixa Etária']);
                notificacoes.push(parseInt(data[i]['Notificações']));
            }
            //selling.push(parseInt(data[i]['Selling Price']));
        }

        
        //For Bar chart
        let dataset = addData('N° de Casos', notificacoes, '#47AF9E', 'black');
        drawchart(dataset, faixaEtaria, 'bar', 1);
        //console.log(faixaEtaria, notificacoes);
        
        var semanaEpidemiologica = [];
        var numeroCasosNotificados = [];

        for (let i = 0; i < data.length; i++) {
            //guarda os dados em seus respectivos vetores
            if (data[i]['Semana Epidemiológica'] !== null)
                semanaEpidemiologica.push(data[i]['Semana Epidemiológica']);
                numeroCasosNotificados.push(parseInt(data[i]['Nº de Casos Notificados']));
            //selling.push(parseInt(data[i]['Selling Price']));
        }
        
        //For Bar chart
        dataset = addData('N° de casos de dengue', numeroCasosNotificados, 'rgba(113, 99, 91, 0.7)', 'black');
        drawchart(dataset, semanaEpidemiologica, 'bar', 2);
        //tratamento de exceção
        
        drawNotificacoesAdultos(casosNotificadosAdulto, 'notificados_adulto');
        
        for(i = 0; i < data.length; i++){
            if(data[i]['Nº de Casos Notificados'] !== null)
                casosNotificadosSemana = data[i]['Nº de Casos Notificados'];
        }
        //console.log(casosNotificadosSemana);
        drawCasosSemana(casosNotificadosSemana, 'notificados_semana');

    }).catch(err => {
        console.log(err);
    });

    function addData(title, Data, bgcolor, bordercolor) {
        return [{
            label: title,
            data: Data,
            backgroundColor: bgcolor,
            borderColor: bordercolor,
            borderWidth: 0,
            borderRadius: 12
        }];
    }

    function drawchart(dataset, Labels, type, number) {
        //pincel para desenhar o gráfico (2d)
        divGrafico = document.getElementById('grafico' + number);
        avisoGrafico = document.querySelector('.aviso_grafico' + number);
        let canvas = document.createElement('canvas');
        canvas.id = type + number + 'chart';

        const ctx = canvas.getContext('2d');
        Chart.defaults.font.size = 18;
        //cria quadro de desenho
        const myChart = new Chart(ctx, {
            //tipo do gráfico
            type: type,
            //dados
            data: {
                labels: Labels,
                datasets: dataset
            },
            options: {
                aspectRatio: 1.5,
                layout: {
                    // padding: 50
                },
                responsive: true,
                animation: {
                    duration: 2000,
                    easing: 'easeInOutQuart'
                },
                scales: {

                    x: {
                        ticks: {
                            color: '#000',
                            font: {
                                size: 16,
                                family: 'Roboto'
                            }
                        },
                        border: {
                            color: 'black', // Cor da linha do eixo X
                            width: 0.5
                        },
                        grid: {
                            tickColor: "black",
                            drawOnChartArea: false
                        },
                        // text: 'Faixa Etária'
                    },

                    y: {
                        ticks: {
                            //stepSize: 10,
                            // suggestedMax: 120,
                            beginAtZero: true,
                            tickWidth: 4,
                            stepSize: 10,
                            weight: 1,
                            color: 'black',
                            font: {
                                size: 16,
                                family: 'Roboto'
                            }
                            // padding: 10
                        },
                        border: {
                            color: 'black', // Cor da linha do eixo X
                            width: 0.5
                        },
                        grid: {
                            tickColor: "black",
                            drawOnChartArea: false
                        }
                    }

                },
                plugins: {
                    legend: {
                        display: false,
                    }
                }

            }
        });

        divGrafico.appendChild(canvas);
        divGrafico.removeChild(avisoGrafico);
    }
}

/**
 * Animações com os números de casos de dengue
 */

let contadorCasosNotificados = 0;
let contadorCasosConfirmados = 0;
let contadorObitosDengue = 0;

function animaNumeroCasos () {
    animacaoNumeroCasosNotificados = setInterval(() => {
        paragrafoNumeroCasosDengue = document.getElementById('numero1');
        if(contadorCasosNotificados <= totalNotificacoesDengue) paragrafoNumeroCasosDengue.innerHTML = contadorCasosNotificados;
        else clearInterval('animacaoNumeroCasosNotificados');
        contadorCasosNotificados += 1;
    }, 20);
    
    animacaoNumeroCasosConfirmados = setInterval(() => {
        paragrafoNumeroCasosDengue = document.getElementById('numero2');
        if(contadorCasosConfirmados <= casosConfirmadosDengue) paragrafoNumeroCasosDengue.innerHTML = contadorCasosConfirmados;
        else clearInterval('animacaoNumeroCasosConfirmados');
        contadorCasosConfirmados += 1;
    }, 80);

    animacaoNumeroObitosDengue = setInterval(() => {
        paragrafoNumeroCasosDengue = document.getElementById('numero3');
        if(contadorObitosDengue <= obitosDengue) paragrafoNumeroCasosDengue.innerHTML = contadorObitosDengue;
        else clearInterval('animacaoNumeroObitosDengue');
        contadorObitosDengue += 1;
    }, 80);
}

let contadorNotificacoesAdulto = 0;
let contadorNotificacoesSemana = 0;

function drawNotificacoesAdultos(dados, dadosID) {
    paragrafoNotificacoesAdultos = document.getElementById(dadosID);
    
    let animacaoNotificacoesAdultos = setInterval(() => {
        if (contadorNotificacoesAdulto <= dados){
            paragrafoNotificacoesAdultos.innerHTML = `${contadorNotificacoesAdulto} CASOS NOTIFICADOS ENTRE <br> ADULTOS DE 20 a 34 anos`;
            contadorNotificacoesAdulto++;
        } else {
            clearInterval(animacaoNotificacoesAdultos);
        }
    }, 20); 
}

function drawCasosSemana(dados, dadosID){
    paragrafoNotificacoesSemana = document.getElementById(dadosID);
    
    let animacaoNotificacoesSemana = setInterval(() => {
        if (contadorNotificacoesSemana <= dados){
            paragrafoNotificacoesSemana.innerHTML = `<span>${contadorNotificacoesSemana}</span><br>casos notificados`;
            contadorNotificacoesSemana++;
        } else {
            clearInterval(animacaoNotificacoesSemana);
        }
    }, 30); 
}