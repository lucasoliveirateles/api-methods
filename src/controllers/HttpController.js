class HttpController {
  async options(request, response) {
    response.setHeader(
      'Allow', 'GET, POST, PUT, DELETE, PATCH, COPY, HEAD, PROPPATCH, LOCK, UNLOCK, REPORT, PROPFIND, MKCOL, MKACTIVITY, CHECKOUT, MOVE, MERGE, TRACE, NOTIFY' 
    );
    
    response.setHeader('Access-Control-Allow-Origin', '*');
  
    response.status(204).send();
  }
}

export default new HttpController();