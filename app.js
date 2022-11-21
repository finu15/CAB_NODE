const http = require('http');
const Handlebars = require('handlebars');
const url = require('url');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const { template, templates } = require('handlebars');

registerPartials();
const server = http.createServer(function (req, res) {
    const link = url.parse(req.url, true);
    const query = link.query;
    const page = link.pathname;

    if (page == "/") {
        let template = renderTemplate('confirm', {});
        res.end(template);
    }

    else if( page.startsWith("/static/")){
        console.log(page);
        let fileName = page.replace("/static/", "");
        console.log(fileName);
        var file = fs.readFileSync("statics/"  + fileName);
        res.end(file);

    }
    else if( page.startsWith("/statics/image")){
        console.log(page);
        let fileName = page.replace("/static/image", "");
        console.log(fileName);
        var file = fs.readFileSync("static/image"  + fileName);
        res.end(file);
    }
});

server.listen(80);

function renderTemplate(name, data) {
    var filePath = path.join(__dirname, "templates", name + ".hbs");
    let templateText = fs.readFileSync(filePath, "utf8");
    let template = Handlebars.compile(templateText);
    return template(data);
}

function registerPartials() {
    var filePath = path.join(__dirname, "templates", "partials", "navbar.hbs");
    let templateText = fs.readFileSync(filePath, "utf8");
    Handlebars.registerPartial("navbar", templateText)
}
