const http = require('http'); 
const students = require("./students.js");
const url = require('url');
const PORT = 5050;

const server = http.createServer((req, res) => {

    // Logic will come here

    const parsedURL = url.parse(req.url, true);
    const pathName = parsedURL.pathname;
    const method = req.method;


    // Route to get all students data

    if(pathName === "/students" && method === "GET"){

        res.writeHead(200, {'content-type': 'application/json'});
        res.end(JSON.stringify(students));

    }

    else if(pathName.startsWith("/students/") && method === "GET"){

        const id = parseInt(pathName.split("/")[2]);
        const student = students.find(s => s.id === id);

        if(student){

            res.writeHead(200, {'content-type': 'application/json'});
            res.end(JSON.stringify(student));

        }

        else{

            res.writeHead(404);
            res.end("Student not found.....😫");

        }
        
    }

    else if(pathName === "/students" && method === "POST"){

        let body = "";
        req.on('data', chunk => {

            body += chunk.toString();

        })

        req.on("end", () => {

            const newStudent = JSON.parse(body);
            newStudent.id = Date.now();
            students.push(newStudent);

            res.writeHead(200, {'content-type': 'application/json'});
            res.end(JSON.stringify(newStudent));

        })
    }

    else{

        res.writeHead(404);
        res.end("Route doesn't exist")
    }

})

server.listen(PORT, () =>{
    console.log(`Server Running on Port Number ${PORT}`);
})
