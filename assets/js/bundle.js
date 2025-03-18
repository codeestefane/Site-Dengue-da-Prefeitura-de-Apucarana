/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _assets_css_footer_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assets/css/footer.css */ "./src/assets/css/footer.css");
/* harmony import */ var _assets_css_geral_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assets/css/geral.css */ "./src/assets/css/geral.css");
/* harmony import */ var _assets_css_grafico_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./assets/css/grafico.css */ "./src/assets/css/grafico.css");
/* harmony import */ var _assets_css_header_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./assets/css/header.css */ "./src/assets/css/header.css");
/* harmony import */ var _assets_css_section_casos_faixa_etaria_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./assets/css/section_casos_faixa_etaria.css */ "./src/assets/css/section_casos_faixa_etaria.css");
/* harmony import */ var _assets_css_section_distribuicao_semana_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./assets/css/section_distribuicao_semana.css */ "./src/assets/css/section_distribuicao_semana.css");
/* harmony import */ var _assets_css_section_chikungunya_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./assets/css/section_chikungunya.css */ "./src/assets/css/section_chikungunya.css");
/* harmony import */ var _assets_css_section_dengue_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./assets/css/section_dengue.css */ "./src/assets/css/section_dengue.css");
/* harmony import */ var _assets_css_section_zika_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./assets/css/section_zika.css */ "./src/assets/css/section_zika.css");
/* harmony import */ var _assets_css_section_equipe_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./assets/css/section_equipe.css */ "./src/assets/css/section_equipe.css");
/* harmony import */ var _assets_css_section_mitos_verdades_css__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./assets/css/section_mitos_verdades.css */ "./src/assets/css/section_mitos_verdades.css");
/* harmony import */ var _assets_css_section_n_casos_css__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./assets/css/section_n_casos.css */ "./src/assets/css/section_n_casos.css");
/* harmony import */ var _assets_css_section_prevencao_css__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./assets/css/section_prevencao.css */ "./src/assets/css/section_prevencao.css");
/* harmony import */ var _assets_css_section_voce_sabia_css__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./assets/css/section_voce_sabia.css */ "./src/assets/css/section_voce_sabia.css");














var totalNotificacoesDengue;
var casosConfirmadosDengue;
var casosNotificadosFaixaEtaria;
var labelFaixaEtaria;
var casosSuspeitosSemana;
var casosConfirmadosSemana;
var obitosDengue;
var animacaoNumeroCasosNotificados;
var animacaoNumeroCasosConfirmados;
var animacaoNumeroObitosDengue;
var paragrafoNumeroCasosDengue;
var paragrafoNotificacoesAdultos;
var paragrafoSuspeitosSemana;
var paragrafoConfirmadosSemana;
plotcharts();

/**
 * Animações relacionadas ao menu
 */

var menuItemDoencas = document.querySelector('#menu_item_doencas');
var menuDoencas = document.querySelector('.menu_doencas');
var navbarLista = document.querySelector('#navbarLista');
var navbar = document.querySelector('nav');
var iconeMenuResponsivo = document.querySelector('#icon_menu_responsivo');
var dropdown = false;
var menuResponsivo = false;
window.onclick = function (e) {
  if (dropdown && !e.target.id.match('menu_item_doencas')) {
    menuDoencas.classList.remove('ativo');
    menuDoencas.classList.add('inativo');
    dropdown = false;
  }
  if ((e.target.id.match('menu_opcao_dengue') || e.target.id.match('menu_opcao_zika') || e.target.id.match('menu_opcao_chikungunya') || e.target.id.match('menu_opcao_n_casos') || e.target.id.match('menu_opcao_prevencao') || e.target.id.match('menu_opcao_mitosVerdades') || e.target.id.match('menu_opcao_voceSabia') || e.target.id.match('menu_opcao_equipe')) && menuResponsivo) {
    navbar.classList.remove('navbar_lista_responsivo');
    navbarLista.classList.remove('menu_visivel_responsivo');
    iconeMenuResponsivo.innerHTML = '☰';
    menuResponsivo = false;
  }
  if (e.target.id.match('menu_item_doencas')) {
    if (!dropdown) {
      menuDoencas.classList.add('ativo');
      menuDoencas.classList.remove('inativo');
      dropdown = true;
    } else {
      menuDoencas.classList.remove('ativo');
      menuDoencas.classList.add('inativo');
      dropdown = false;
    }
  }
  if (e.target.id.match('icon_menu_responsivo')) {
    if (!menuResponsivo) {
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
};

/**
 * Funções que obtém os dados da tabela e desenha os gráficos
 */

function plotcharts() {
  var divGrafico;
  var avisoGrafico;
  fetch('https://script.google.com/macros/s/AKfycbwcNZyVfA0D6zISHpCy0TtN7c3WQ84NSV-T3GB5dfXL--hGw1JgIQSlhPXuDX3HBsziLw/exec').then(function (response) {
    return response.json();
  }).then(function (data) {
    var faixaEtaria = [];
    var notificacoes = [];
    totalNotificacoesDengue = parseInt(data[0]['Total Notificações Dengue']);
    casosConfirmadosDengue = parseInt(data[0]['Casos Confirmados Dengue']);
    obitosDengue = parseInt(data[0]['Óbito']);
    var contadorFaixaEtaria = data[0]['Notificações'];
    animaNumeroCasos();
    for (var i = 0; i < data.length; i++) {
      if (data[i]['Faixa Etária'] != null) {
        faixaEtaria.push(data[i]['Faixa Etária']);
        notificacoes.push(parseInt(data[i]['Notificações']));
      }
    }
    var dataset = addData('N° de Casos', notificacoes, '#47AF9E', '#47AF9E');
    drawchart(dataset, faixaEtaria, 'bar', 1);
    var semanaEpidemiologica = [];
    var numeroCasosSuspeitos = [];
    var numeroCasosConfirmados = [];
    for (var _i = 0; _i < data.length; _i++) {
      if (data[_i]['Semana Epidemiológica'] !== null) semanaEpidemiologica.push(data[_i]['Semana Epidemiológica']);
      numeroCasosSuspeitos.push(parseInt(data[_i]['Nº de casos suspeitos']));
      numeroCasosConfirmados.push(parseInt(data[_i]['Nº de casos confirmados']));
    }
    var dataset1 = addData('N° de casos suspeitos', numeroCasosSuspeitos, 'rgba(113, 99, 91, 0.7)', 'rgba(113, 99, 91, 1)', 1);
    var dataset2 = addData('N° de casos confirmados', numeroCasosConfirmados, 'rgba(255, 0, 0, 0.7)', 'rgba(255, 0, 0, 0.7)', 2);
    drawDoubleChart(dataset1, dataset2, semanaEpidemiologica, 'line', 2);
    for (var _i2 = 0; _i2 < data.length; _i2++) {
      if (contadorFaixaEtaria < data[_i2]['Notificações']) {
        casosNotificadosFaixaEtaria = data[_i2]['Notificações'];
        labelFaixaEtaria = data[_i2]['Faixa Etária'];
        contadorFaixaEtaria = casosNotificadosFaixaEtaria;
      }
    }
    drawNotificacoesFaixaEtaria(casosNotificadosFaixaEtaria, labelFaixaEtaria, 'notificados_adulto');
    for (var _i3 = 0; _i3 < data.length; _i3++) {
      if (data[_i3]['Nº de casos suspeitos'] !== null) {
        casosSuspeitosSemana = data[_i3]['Nº de casos suspeitos'];
        casosConfirmadosSemana = data[_i3]['Nº de casos confirmados'];
      }
    }
    //console.log("Casos confirmados na semana:", casosConfirmadosSemana);
    drawCasosSuspeitosSemana(casosSuspeitosSemana, 'suspeitos_semana');
    drawCasosConfirmadosSemana(casosConfirmadosSemana, 'confirmados_semana');
  })["catch"](function (err) {
    console.log(err);
  });
  function addData(title, Data, bgcolor, bordercolor) {
    var order = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    return {
      label: title,
      data: Data,
      backgroundColor: bgcolor,
      borderColor: bordercolor,
      pointRadius: 3,
      pointBorderWidth: 4,
      borderWidth: 2,
      borderRadius: 12,
      order: order
    };
  }
  function drawchart(dataset, Labels, type, number) {
    divGrafico = document.getElementById('grafico' + number);
    avisoGrafico = document.querySelector('.aviso_grafico' + number);
    var canvas = document.createElement('canvas');
    canvas.id = type + number + 'chart';
    var ctx = canvas.getContext('2d');
    Chart.defaults.font.size = 18;
    var myChart = new Chart(ctx, {
      type: type,
      data: {
        labels: Labels,
        datasets: [dataset]
      },
      options: {
        aspectRatio: 1.5,
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
              color: 'black',
              width: 0.5
            },
            grid: {
              tickColor: "black",
              drawOnChartArea: false
            }
          },
          y: {
            ticks: {
              beginAtZero: true,
              tickWidth: 4,
              stepSize: 10,
              weight: 1,
              color: 'black',
              font: {
                size: 16,
                family: 'Roboto'
              }
            },
            border: {
              color: 'black',
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
            display: false
          }
        }
      }
    });
    divGrafico.appendChild(canvas);
    divGrafico.removeChild(avisoGrafico);
  }
  function drawDoubleChart(dataset1, dataset2, Labels, type, number) {
    var divGrafico2 = document.getElementById('grafico' + number);
    var avisoGrafico2 = document.querySelector('.aviso_grafico' + number);
    var canvas2 = document.createElement('canvas');
    canvas2.id = type + number + 'chart';
    var ctx = canvas2.getContext('2d');
    Chart.defaults.font.size = 18;
    var myChartDouble = new Chart(ctx, {
      type: type,
      data: {
        labels: Labels,
        datasets: [dataset1, dataset2]
      },
      options: {
        aspectRatio: 1.5,
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
              color: 'black',
              width: 0.5
            },
            grid: {
              tickColor: "black",
              drawOnChartArea: false
            }
          },
          y: {
            ticks: {
              beginAtZero: true,
              tickWidth: 4,
              stepSize: 10,
              weight: 1,
              color: 'black',
              font: {
                size: 16,
                family: 'Roboto'
              }
            },
            border: {
              color: 'black',
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
            display: true,
            position: top
          }
        }
      }
    });
    divGrafico2.appendChild(canvas2);
    divGrafico2.removeChild(avisoGrafico2);
  }
}

/**
 * Animações com os números de casos de dengue
 */

var contadorCasosNotificados = 0;
var contadorCasosConfirmados = 0;
var contadorObitosDengue = 0;
var timer = 1;
function animaNumeroCasos() {
  animacaoNumeroCasosNotificados = setInterval(function () {
    paragrafoNumeroCasosDengue = document.getElementById('numero1');
    if (contadorCasosNotificados <= totalNotificacoesDengue) paragrafoNumeroCasosDengue.innerHTML = contadorCasosNotificados;else clearInterval('animacaoNumeroCasosNotificados');
      if (contadorCasosNotificados < totalNotificacoesDengue*0.80) 
	  contadorCasosNotificados += 20;
      else
          contadorCasosNotificados += 1;
  }, timer);
  animacaoNumeroCasosConfirmados = setInterval(function () {
    paragrafoNumeroCasosDengue = document.getElementById('numero2');
    if (contadorCasosConfirmados <= casosConfirmadosDengue) paragrafoNumeroCasosDengue.innerHTML = contadorCasosConfirmados;else clearInterval('animacaoNumeroCasosConfirmados');
    contadorCasosConfirmados += 1;
  }, timer);
  animacaoNumeroObitosDengue = setInterval(function () {
    paragrafoNumeroCasosDengue = document.getElementById('numero3');
    if (contadorObitosDengue <= obitosDengue) paragrafoNumeroCasosDengue.innerHTML = contadorObitosDengue;else clearInterval('animacaoNumeroObitosDengue');
    contadorObitosDengue += 1;
  }, timer);
}
var contadorNotificacoesAdulto = 0;
var contadorSuspeitosSemana = 0;
var contadorConfirmadosSemana = 0;
function drawNotificacoesFaixaEtaria(dados, label, dadosID) {
  paragrafoNotificacoesAdultos = document.getElementById(dadosID);
  var animacaoNotificacoesAdultos = setInterval(function () {
    if (contadorNotificacoesAdulto <= dados) {
      paragrafoNotificacoesAdultos.innerHTML = "".concat(contadorNotificacoesAdulto, " CASOS NOTIFICADOS ENTRE <br> PESSOAS DE ").concat(label, " ANOS");
      contadorNotificacoesAdulto++;
    } else {
      clearInterval(animacaoNotificacoesAdultos);
    }
  }, 20);
}
function drawCasosSuspeitosSemana(dados, dadosID) {
  paragrafoSuspeitosSemana = document.getElementById(dadosID);
  var animacaoSuspeitosSemana = setInterval(function () {
    if (contadorSuspeitosSemana <= dados) {
      paragrafoSuspeitosSemana.innerHTML = "<span>".concat(contadorSuspeitosSemana, "</span><br>casos suspeitos");
      contadorSuspeitosSemana++;
    } else {
      clearInterval(animacaoSuspeitosSemana);
    }
  }, 30);
}
function drawCasosConfirmadosSemana(dados, dadosID) {
  paragrafoConfirmadosSemana = document.getElementById(dadosID);
  var animacaoConfirmadosSemana = setInterval(function () {
    if (contadorConfirmadosSemana <= dados) {
      paragrafoConfirmadosSemana.innerHTML = "<span>".concat(contadorConfirmadosSemana, "</span><br>casos confirmados");
      contadorConfirmadosSemana++;
    } else {
      clearInterval(animacaoConfirmadosSemana);
    }
  }, 60);
}

/***/ }),

/***/ "./src/assets/css/footer.css":
/*!***********************************!*\
  !*** ./src/assets/css/footer.css ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/assets/css/geral.css":
/*!**********************************!*\
  !*** ./src/assets/css/geral.css ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/assets/css/grafico.css":
/*!************************************!*\
  !*** ./src/assets/css/grafico.css ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/assets/css/header.css":
/*!***********************************!*\
  !*** ./src/assets/css/header.css ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/assets/css/section_casos_faixa_etaria.css":
/*!*******************************************************!*\
  !*** ./src/assets/css/section_casos_faixa_etaria.css ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/assets/css/section_chikungunya.css":
/*!************************************************!*\
  !*** ./src/assets/css/section_chikungunya.css ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/assets/css/section_dengue.css":
/*!*******************************************!*\
  !*** ./src/assets/css/section_dengue.css ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/assets/css/section_distribuicao_semana.css":
/*!********************************************************!*\
  !*** ./src/assets/css/section_distribuicao_semana.css ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/assets/css/section_equipe.css":
/*!*******************************************!*\
  !*** ./src/assets/css/section_equipe.css ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/assets/css/section_mitos_verdades.css":
/*!***************************************************!*\
  !*** ./src/assets/css/section_mitos_verdades.css ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/assets/css/section_n_casos.css":
/*!********************************************!*\
  !*** ./src/assets/css/section_n_casos.css ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/assets/css/section_prevencao.css":
/*!**********************************************!*\
  !*** ./src/assets/css/section_prevencao.css ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/assets/css/section_voce_sabia.css":
/*!***********************************************!*\
  !*** ./src/assets/css/section_voce_sabia.css ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/assets/css/section_zika.css":
/*!*****************************************!*\
  !*** ./src/assets/css/section_zika.css ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0,
/******/ 			"styles": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkmodelo_webpack_css"] = self["webpackChunkmodelo_webpack_css"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["styles"], () => (__webpack_require__("./src/main.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle.js.map
