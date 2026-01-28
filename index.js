const http = require("http")
const { read_file, write_file } = require("./fs/dataTransformer")

const options = { "content-type": "application/json", "Access-Control-Allow-Origin": "*" }

const app = http.createServer((req, res) => {
    const reqID = Number(req.url.split("/")[2])


    //////////////////products/////////////////////////////////
    ///GET
    if (req.method === "GET" && req.url === "/products") {
        const products = read_file("products.json")
        res.writeHead(200, options)
        res.end(JSON.stringify(products))
    }

    ///POST
    if (req.method === "POST" && req.url === "/add_product") {
        req.on("data", (chunk) => {
            const data = JSON.parse(chunk)
            const products = read_file("products.json")
            products.push({
                ...data
            })
            write_file("products.json", products)
            res.writeHead(201, options)
            res.end(JSON.stringify({
                message: "add new product"
            }))
        })
    }


    ////GET ONE
    if (req.method === "GET" && req.url === `/get_one/${reqID}`) {
        const products = read_file("products.json")
        const findOne = products.find((item) => item.id === reqID)
        if (findOne) {
            res.writeHead(200, options);
            res.end(JSON.stringify(findOne));
        } else {
            res.writeHead(404, options);
            res.end(JSON.stringify({ message: "Product not found" }));
        }
    }


    ///PUT
    if (req.method === "PUT" && req.url === `/update/${reqID}`) {
        req.on("data", (chunk) => {
            const data = JSON.parse(chunk)
            const { title, desc, img, price } = data
            const products = read_file("products.json")
            const findOne = products.find((item) => item.id === reqID)
            if (!findOne) {
                res.writeHead(404, options);
                return res.end(JSON.stringify({
                    message: "Product not found"
                }));
            }
            products.forEach((item) => {
                if (item.id === reqID) {
                    item.title = title ? title : item.title
                    item.desc = desc ? desc : item.desc
                    item.price = price ? price : item.price
                    item.img = img ? img : item.img
                }
            })
            write_file("products.json", products)
            res.writeHead(201, options)
            res.end(JSON.stringify({
                message: "product update"
            }))
        })
    }


    //DELETE
    if (req.method === "DELETE" && req.url === `/delete/${reqID}`) {
        const products = read_file("products.json")
        const findOne = products.find((item) => item.id === reqID)
        if (!findOne) {
            res.writeHead(404, options);
            return res.end(JSON.stringify({
                message: "Product not found"
            }));
        }
        products.forEach((item, idx) =>{
            if(item.id===reqID){
              products.splice(idx, 1)
            }
        })
        write_file("products.json", products)
        res.writeHead(201, options)
        res.end(JSON.stringify({
            message: "product deleted"
        }))
    }


    ///////////////animals//////////////////////////////////////////////
    ///GET
if (req.method === "GET" && req.url === "/animals") {
    const animals = read_file("animals.json")
    res.writeHead(200, options)
    res.end(JSON.stringify(animals))
}

///POST
if (req.method === "POST" && req.url === "/add_animal") {
    req.on("data", (chunk) => {
        const data = JSON.parse(chunk)
        const animals = read_file("animals.json")
        animals.push({
            ...data
        })
        write_file("animals.json", animals)
        res.writeHead(201, options)
        res.end(JSON.stringify({
            message: "add new animal"
        }))
    })
}

///GET ONE
if (req.method === "GET" && req.url === `/get_one_animal/${reqID}`) {
    const animals = read_file("animals.json")
    const findOne = animals.find((item) => item.id === reqID)
    if (findOne) {
        res.writeHead(200, options);
        res.end(JSON.stringify(findOne));
    } else {
        res.writeHead(404, options);
        res.end(JSON.stringify({ message: "Animal not found" }));
    }
}

///PUT
if (req.method === "PUT" && req.url === `/update_animal/${reqID}`) {
    req.on("data", (chunk) => {
        const data = JSON.parse(chunk)
        const { name, type, age, image } = data
        const animals = read_file("animals.json")
        const findOne = animals.find((item) => item.id === reqID)
        if (!findOne) {
            res.writeHead(404, options);
            return res.end(JSON.stringify({
                message: "Animal not found"
            }));
        }
        animals.forEach((item) => {
            if (item.id === reqID) {
                item.name = name ? name : item.name
                item.type = type ? type : item.type
                item.age = age ? age : item.age
                item.image = image ? image : item.image
            }
        })
        write_file("animals.json", animals)
        res.writeHead(201, options)
        res.end(JSON.stringify({
            message: "animal updated"
        }))
    })
}

///DELETE
if (req.method === "DELETE" && req.url === `/delete_animal/${reqID}`) {
    const animals = read_file("animals.json")
    const findOne = animals.find((item) => item.id === reqID)
    if (!findOne) {
        res.writeHead(404, options);
        return res.end(JSON.stringify({
            message: "Animal not found"
        }));
    }
    animals.forEach((item, idx) => {
        if (item.id === reqID) {
            animals.splice(idx, 1)
        }
    })
    write_file("animals.json", animals)
    res.writeHead(201, options)
    res.end(JSON.stringify({
        message: "animal deleted"
    }))
}


//////////////fruit////////////////////////////
/// GET
if (req.method === "GET" && req.url === "/fruits") {
    const fruits = read_file("fruits.json");
    res.writeHead(200, options);
    res.end(JSON.stringify(fruits));
}

/// POST
if (req.method === "POST" && req.url === "/add_fruit") {
    req.on("data", (chunk) => {
        const data = JSON.parse(chunk);
        const fruits = read_file("fruits.json");
        fruits.push({ ...data });
        write_file("fruits.json", fruits);
        res.writeHead(201, options);
        res.end(JSON.stringify({
            message: "add new fruit"
        }));
    });
}

/// GET ONE
if (req.method === "GET" && req.url === `/get_one_fruit/${reqID}`) {
    const fruits = read_file("fruits.json");
    const findOne = fruits.find((item) => item.id === reqID);
    if (findOne) {
        res.writeHead(200, options);
        res.end(JSON.stringify(findOne));
    } else {
        res.writeHead(404, options);
        res.end(JSON.stringify({ message: "Fruit not found" }));
    }
}

/// PUT
if (req.method === "PUT" && req.url === `/update_fruit/${reqID}`) {
    req.on("data", (chunk) => {
        const data = JSON.parse(chunk);
        const { name, type, age, image } = data;
        const fruits = read_file("fruits.json");
        const findOne = fruits.find((item) => item.id === reqID);
        if (!findOne) {
            res.writeHead(404, options);
            return res.end(JSON.stringify({
                message: "Fruit not found"
            }));
        }
        fruits.forEach((item) => {
            if (item.id === reqID) {
                item.name = name ? name : item.name;
                item.type = type ? type : item.type;
                item.age = age ? age : item.age;
                item.image = image ? image : item.image;
            }
        });
        write_file("fruits.json", fruits);
        res.writeHead(201, options);
        res.end(JSON.stringify({
            message: "fruit updated"
        }));
    });
}

/// DELETE
if (req.method === "DELETE" && req.url === `/delete_fruit/${reqID}`) {
    const fruits = read_file("fruits.json");
    const findOne = fruits.find((item) => item.id === reqID);
    if (!findOne) {
        res.writeHead(404, options);
        return res.end(JSON.stringify({
            message: "Fruit not found"
        }));
    }
    fruits.forEach((item, idx) => {
        if (item.id === reqID) {
            fruits.splice(idx, 1);
        }
    });
    write_file("fruits.json", fruits);
    res.writeHead(201, options);
    res.end(JSON.stringify({
        message: "fruit deleted"
    }));
}



})

app.listen(3000, () => {
    console.log("server ishladi");
})