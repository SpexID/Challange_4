const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const {PORT = 8000} = process.env;
const PUBLIC_DIRECTORY = path.join(__dirname, '..', 'public');

function getHtml(page) {
    const htmlFilePath = path.join(PUBLIC_DIRECTORY, `${page}.html`);
    return fs.readFileSync(htmlFilePath, 'utf-8');
}
function getJS(filename) {
    const jsFilePath = path.join(PUBLIC_DIRECTORY, 'scripts', filename);
    return fs.readFileSync(jsFilePath, 'utf-8');
}
function getImage(imageName) {
    const imageFilePath = path.join(PUBLIC_DIRECTORY, 'images', imageName);
    const image = fs.readFileSync(imageFilePath);
    return image;
}
function getJSON(data){
    const toJSON =JSON.stringify(data);

    return toJSON;
}

function router() {
    const routes = {
    get: () => {},
    post: () => {},
    };
    const get = (path, cb) => {
    routes.get[path] = cb;
    };
    const post = (path, cb) => {
    routes.post[path] = cb;
    };
    return {
    get,
    post,
    routes,
    };
    }

    const appRouter = router();

    appRouter.get('/', (req, res)=>{
        const pageContent = getHtml('index');
        res.setHeader('Content-Type', 'text/html');
        res.writeHead(200);
        res.end(pageContent);
    });
 
    appRouter.get('/cars', (req, res) => {
        const pageContent = getHtml('cars');
        res.setHeader('Content-Type', 'text/html');
        res.writeHead(200);
        res.end(pageContent);
    });
    
    appRouter.get('/redirectToCars', (req, res) => {
        res.writeHead(302, {
            'Location': '/cars'
        });
        res.end();
    });

    appRouter.get('/scripts/app.example.js', (req, res) => {
        const jsContent = getJS('app.example.js');
        res.setHeader('Content-Type', 'text/javascript');
        res.writeHead(200);
        res.end(jsContent);
    });

    appRouter.get('/scripts/binar.js', (req, res) => {
        const jsContent = getJS('binar.js');
        res.setHeader('Content-Type', 'text/javascript');
        res.writeHead(200);
        res.end(jsContent);
    });
    appRouter.get('/scripts/car.example.js', (req, res) => {
        const jsContent = getJS('car.example.js');
        res.setHeader('Content-Type', 'text/javascript');
        res.writeHead(200);
        res.end(jsContent);
    });
    appRouter.get('/scripts/main.example.js', (req, res) => {
        const jsContent = getJS('main.example.js');
        res.setHeader('Content-Type', 'text/javascript');
        res.writeHead(200);
        res.end(jsContent);
    });
    appRouter.get('/images/:imageName', (req, res) => {
        const imageName = req.params.imageName;
        const imageContent = getImage(imageName);
        const imageType = imageName.split('.').pop();
        res.setHeader('Content-Type', `image/${imageType}`);
        res.writeHead(200);
        res.end(imageContent);
    });
    
    const server = () => {
        return (req, res) => {
        const parsedUrl = url.parse(req.url, true);
        const { pathname } = parsedUrl;
        if (req.method === 'GET' && appRouter.routes.get[pathname]) {
        appRouter.routes.get[pathname](req, res);
        } else if (req.method === 'POST' &&
        appRouter.routes.post[pathname]) {
        appRouter.routes.post[pathname](req, res);
        } else {
        res.setHeader('Content-Type', 'text/html');
        res.writeHead(404);
        res.end(getHtml('404'));
        }
        };
        };

        http.createServer(server()).listen(PORT,'0.0.0.0',()=>{
            console.log('Server is running, open http://0.0.0.0:%d',PORT);
        });