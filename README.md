# SPTrans-OlhoVivo-Wrapper

Wrapper desenvolvido em Node.js para utilização da API OlhoVivo disponibilizada pela SPTrans para monitoramento do transporte público na cidade de São Paulo.

Nenhum código chique! Apenas **_JavaScript_** com uma pitadinha de ajuda da biblioteca **_restify-clients_**.

Código em português e com métodos de títulos semânticos para facilitar a vida do desenvolvedor brasileiro (ou lusófono :D).

- [SPTrans-OlhoVivo-Wrapper](#sptrans-olhovivo-wrapper)
  - [Utilização](#utiliza%C3%A7%C3%A3o)
  - [Chamadas mapeadas](#chamadas-mapeadas)
  - [Licença](#licen%C3%A7a)
  - [Doações/Donations](#doa%C3%A7%C3%B5esdonations)
        - [Autor](#autor)

## Utilização
Clone o projeto, e execute `npm install`.

```javascript

var SPTrans = require("./sptrans")();

let token = "<<<SEU_TOKEN_DE_ACESSO>>>";

// Instancie o objeto SPTrans utilizando seu TOKEN de acesso
let sptrans = new SPTrans(token);

// Faça as chamadas dos métodos. Use e abuse das Promises!
sptrans.buscarLinha("9301").then(linhas => {
    console.log(linhas[0]);
}).catch(err => {
    console.log(err.message);
});

// Fácil né? Easy, easy. Very easy.

```

## Chamadas mapeadas

- [x] `POST /Login/Autenticar?token={token}`
- [x] `GET  /Linha/Buscar?termosBusca={termosBusca}`
- [x] `GET  /Linha/CarregarDetalhes?codigoLinha={codigoLinha}`
- [x] `GET  /Parada/Buscar?termosBusca={termosBusca}`
- [x] `GET  /Parada/BuscarParadasPorLinha?codigoLinha={codigoLinha}`
- [x] `GET  /Parada/BuscarParadasPorCorredor?codigoCorredor={codigoCorredor}`
- [x] `GET  /Corredor`
- [x] `GET  /Posicao?codigoLinha={codigoLinha}`
- [x] `GET  /Previsao?codigoParada={codigoParada}&codigoLinha={codigoLinha}`
- [x] `GET  /Previsao/Linha?codigoLinha={codigoLinha}`
- [x] `GET  /Previsao/Parada?codigoParada={codigoParada}`


## Licença
Blá-blá-blá padrão da licença **MIT** para **_Diello Cardoso de La Paz Arias_**. 

Pode usar, mas lembre-se dos créditos! :D

## Doações/Donations
Sintam-se a vontade para me pagar milhões de dólares em **Bitcoins** na wallet: **16jGqLTmyxfLiSqJUkiEuPfzzyBN1Yms9v**

Não se façam de rogados. Abre a carteira aí, galera!

##### Autor
Diello Cardoso de La Paz Arias (dielloarias@gmail.com)