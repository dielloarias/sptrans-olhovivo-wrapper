const restify = require("restify-clients");

let baseUrl = "http://api.olhovivo.sptrans.com.br";

function SPTransWrapper(token = "", versao = "2.1") {
    this._token = token;
    this._versao = versao;
    this._options = {};
    this._client = restify.createJsonClient({
        url: baseUrl
    });
}

SPTransWrapper.prototype._queryAPI = function(endpoint) {
    let self = this;

    let fn = function() {
        return new Promise(function(resolve, reject) {
            self._options.path = encodeURI(endpoint);
            // self._options.path = endpoint;
            self._client.get(self._options, function(err, req, res, obj) {
                if (err) {
                    return reject(err);
                }
                resolve(obj);
            });
        });
    };

    if (!self._cookie) {
        return self._autenticar().then(fn);
    }
    return fn;

};

SPTransWrapper.prototype._autenticar = function() {
    let self = this;
    let endpoint = `/v${self._versao}/Login/Autenticar?token=${self._token}`;

    return new Promise(function(resolve, reject) {
        self._client.post(endpoint, function(err, req, res, obj) {
            if (err) {
                return reject(err);
            }

            let value = true;
            if (obj === 'false') {
                value = false;
            }

            self._cookie = res.headers["set-cookie"];

            self._options = {
                contentType: "application/json",
                headers: {
                    Cookie: `${self._cookie}`
                }
            };

            resolve(value);
        });
    });
};

SPTransWrapper.prototype.buscarLinha = function(codigoLinha, sentido) {

    let composicaoSentido = "";
    if (sentido) {
        composicaoSentido = `&sentido=${sentido}`;
    }

    let endpoint = `/v${this._versao}/Linha/Buscar?termosBusca=${codigoLinha}${composicaoSentido}`;

    let fn = this._queryAPI(endpoint);
    return fn;
};

SPTransWrapper.prototype.buscarParadas = function(termosBusca) {
    let endpoint = `/v${this._versao}/Parada/Buscar?termosBusca=${termosBusca}`;

    let fn = this._queryAPI(endpoint);
    return fn;
};

SPTransWrapper.prototype.buscarParadasPorCodigoLinha = function(codigoLinha) {
    let endpoint = `/v${this._versao}/Parada/BuscarParadasPorLinha?codigoLinha=${codigoLinha}`;

    let fn = this._queryAPI(endpoint);
    return fn;
};

SPTransWrapper.prototype.buscarParadasPorCorredor = function(codigoCorredor) {
    let endpoint = `/v${this._versao}/Parada/BuscarParadasPorCorredor?codigoCorredor=${codigoCorredor}`;

    let fn = this._queryAPI(endpoint);
    return fn;
};

SPTransWrapper.prototype.corredores = function() {
    let endpoint = `/v${this._versao}/Corredor`;

    let fn = this._queryAPI(endpoint);
    return fn;
};

SPTransWrapper.prototype.empresas = function() {
    let endpoint = `/v${this._versao}/Empresa`;

    let fn = this._queryAPI(endpoint);
    return fn;
};

SPTransWrapper.prototype.posicao = function() {
    let endpoint = `/v${this._versao}/Posicao`;

    let fn = this._queryAPI(endpoint);
    return fn;
};

SPTransWrapper.prototype.posicaoPorCodigoLinha = function(codigoLinha) {
    let endpoint = `/v${this._versao}/Posicao/Linha?codigoLinha=${codigoLinha}`;

    let fn = this._queryAPI(endpoint);
    return fn;
};

SPTransWrapper.prototype.garagem = function(codigoEmpresa, codigoLinha) {

    let composicaoQuery = "";
    if (codigoLinha) {
        composicaoQuery = `&codigoLinha=${codigoLinha}`;
    }

    let endpoint = `/v${this._versao}/Posicao/Garagem?codigoEmpresa=${codigoEmpresa}`;

    let fn = this._queryAPI(endpoint);
    return fn;
};

SPTransWrapper.prototype.previsaoChegada = function(codigoParada, codigoLinha) {

    let endpoint = `/v${this._versao}/Previsao?codigoParada=${codigoParada}&codigoLinha=${codigoLinha}`;

    let fn = this._queryAPI(endpoint);
    return fn;
};

SPTransWrapper.prototype.previsaoLinha = function(codigoLinha) {

    let endpoint = `/v${this._versao}/Previsao/Linha?codigoLinha=${codigoLinha}`;

    let fn = this._queryAPI(endpoint);
    return fn;
};

SPTransWrapper.prototype.previsaoParada = function(codigoParada) {

    let endpoint = `/v${this._versao}/Previsao/Parada?codigoParada=${codigoParada}`;

    let fn = this._queryAPI(endpoint);
    return fn;
};
module.exports = function() {
    return SPTransWrapper;
};
