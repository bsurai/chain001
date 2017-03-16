/// <reference path="./typings/modules/soap/index.d.ts" />
/// <reference path="./typings/globals/node/index.d.ts" />
/// <reference path="./typings/modules/soap/index.d.ts" />
/*jshint esversion: 6 */

import  http from "http";
import fs from "fs";
import soap from "soap"; 

http.createServer(function(req, res) {
    
    res.writeHead(200, {'Content-Type':'text/html'});
    res.end('Hello World !!!');
    let user = 'master';
    let password = '';
    let base = 'ASUP_4_test';
    
    // http:\\master:@localhost/ASUP_4_test/ws/ProjectsService.1cws?wsdl
    let url     = 'http://'+user+':'+password+'@localhost/'+base+'/ws/ProjectsService.1cws?wsdl';
    let args    = {name: 'value'};
    let options = {
        connection: 'keep-alive'
    };
    soap.createClient(url, options, function(err, client:soap.Client) {
      if (client===undefined) return;
      
      //let authSec = new soap.BasicAuthSecurity('master', '');
      //client.setSecurity(authSec);
      client.GetList({},function(err, result) {
          console.log(result);
      });
    });

    /*soap.createClient(url)
    .then((client) => client.GetList())
    .then((result) => console.log(result))
    .catch((error) => console.error(`There was an error! ${error}`));*/

}).listen(process.env.PORT || 3000, ()=>{console.log('bound to port 3000');});

//console.log(process.env.PORT);
console.log('Server running on 3000');
