var Crawler = require('crawler');
var http = require('http');
var telefones = [];


var c = new Crawler({
    "maxConnections":10,
    "callback":function(error,result,$) {
        var title = $("title").text();
        var telefones = $(".coluna-centro").find(".telNumber");
        for(var i=0;i<telefones.length;i++){
            var fone = $(telefones[i]).text();
            telefones[i] = fone;
            console.log(fone)
        }
        /*
         $.each(telefones, function(indice, value){
         console.log($(value).text());
         });
         */
    }
});
c.queue("http://www.listamais.com.br/ResultadoBusca/BuscaJson?busca=Borracharia&cidade=Presidente%20Prudente%20-%20SP&codigo=42&vGlobalCamposAceitos=atividade");

http.createServer(function(req,res) {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    for(var i=0;i<telefones.length;i++){
        res.end(telefones[i]);
    }
}).listen(3000);

console.log('Servidor iniciado em localhost:3000. Ctrl+C para encerrar…');