const http = require("http")
const { read_file, write_file } = require("./fs/dataTransformer")

const options = { "content-type": "application/json", "Access-Control-Allow-Origin": "*" }

const app = http.createServer((req, res) => {
    const reqID = Number(req.url.split("/")[2])


    //////////////////student/////////////////////////////////
    ///GET
    if (req.method === "GET" && req.url === "/students") {
        const students = read_file("students.json")
        res.writeHead(200, options)
        res.end(JSON.stringify(students))
    }

    ///POST
    if (req.method === "POST" && req.url === "/add_student") {
        req.on("data", (chunk) => {
            const data = JSON.parse(chunk)
            const students = read_file("students.json")
            students.push({
                ...data
            })
            write_file("students.json", students)
            res.writeHead(201, options)
            res.end(JSON.stringify({
                message: "add new student"
            }))
        })
    }


    ////GET ONE
    if (req.method === "GET" && req.url === `/get_one/${reqID}`) {
        const students = read_file("students.json")
        const findOne = students.find((item) => item.id === reqID)
        if (findOne) {
            res.writeHead(200, options);
            res.end(JSON.stringify(findOne));
        } else {
            res.writeHead(404, options);
            res.end(JSON.stringify({ message: "student not found" }));
        }
    }


    ///PUT
    if (req.method === "PUT" && req.url === `/update/${reqID}`) {
        req.on("data", (chunk) => {
            const data = JSON.parse(chunk)
            const { title, desc, img, price } = data
            const students = read_file("students.json")
            const findOne = students.find((item) => item.id === reqID)
            if (!findOne) {
                res.writeHead(404, options);
                return res.end(JSON.stringify({
                    message: "Student not found"
                }));
            }
            students.forEach((item) => {
                if (item.id === reqID) {
                    item.title = title ? title : item.title
                    item.desc = desc ? desc : item.desc
                    item.price = price ? price : item.price
                    item.img = img ? img : item.img
                }
            })
            write_file("students.json", students)
            res.writeHead(201, options)
            res.end(JSON.stringify({
                message: "student update"
            }))
        })
    }


    //DELETE
    if (req.method === "DELETE" && req.url === `/delete/${reqID}`) {
        const students = read_file("students.json")
        const findOne = students.find((item) => item.id === reqID)
        if (!findOne) {
            res.writeHead(404, options);
            return res.end(JSON.stringify({
                message: "Student not found"
            }));
        }
        students.forEach((item, idx) =>{
            if(item.id===reqID){
              students.splice(idx, 1)
            }
        })
        write_file("students.json", students)
        res.writeHead(201, options)
        res.end(JSON.stringify({
            message: "student deleted"
        }))
    }


    ///////////////hospital//////////////////////////////////////////////
    ///GET
if (req.method === "GET" && req.url === "/hospitals") {
    const hospitals = read_file("hospitals.json")
    res.writeHead(200, options)
    res.end(JSON.stringify(hospitals))
}

///POST
if (req.method === "POST" && req.url === "/add_hospital") {
    req.on("data", (chunk) => {
        const data = JSON.parse(chunk)
        const hospitals = read_file("hospitals.json")
        hospitals.push({
            ...data
        })
        write_file("hospitals.json", hospitals)
        res.writeHead(201, options)
        res.end(JSON.stringify({
            message: "add new hospital"
        }))
    })
}

///GET ONE
if (req.method === "GET" && req.url === `/get_one_hospital/${reqID}`) {
    const hospitals = read_file("hospitals.json")
    const findOne = hospitals.find((item) => item.id === reqID)
    if (findOne) {
        res.writeHead(200, options);
        res.end(JSON.stringify(findOne));
    } else {
        res.writeHead(404, options);
        res.end(JSON.stringify({ message: "Hospital not found" }));
    }
}

///PUT
if (req.method === "PUT" && req.url === `/update_hospital/${reqID}`) {
    req.on("data", (chunk) => {
        const data = JSON.parse(chunk)
        const { name, type, age, image } = data
        const hospitals = read_file("hospitals.json")
        const findOne = hospitals.find((item) => item.id === reqID)
        if (!findOne) {
            res.writeHead(404, options);
            return res.end(JSON.stringify({
                message: "Hospital not found"
            }));
        }
        hospitals.forEach((item) => {
            if (item.id === reqID) {
                item.name = name ? name : item.name
                item.type = type ? type : item.type
                item.age = age ? age : item.age
                item.image = image ? image : item.image
            }
        })
        write_file("hospitals.json", hospitals)
        res.writeHead(201, options)
        res.end(JSON.stringify({
            message: "hospital updated"
        }))
    })
}

///DELETE
if (req.method === "DELETE" && req.url === `/delete_hospital/${reqID}`) {
    const hospitals = read_file("hospitals.json")
    const findOne = hospitals.find((item) => item.id === reqID)
    if (!findOne) {
        res.writeHead(404, options);
        return res.end(JSON.stringify({
            message: "Hospital not found"
        }));
    }
    hospitals.forEach((item, idx) => {
        if (item.id === reqID) {
            hospitals.splice(idx, 1)
        }
    })
    write_file("hospitals.json", hospitals)
    res.writeHead(201, options)
    res.end(JSON.stringify({
        message: "hospital deleted"
    }))
}


})

app.listen(3000, () => {
    console.log("server ishladi");
})