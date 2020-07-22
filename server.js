const express = require('express');
const nunjucks = require('nunjucks');
const server = express();
const cursos = require ("./data");

server.use(express.static('public'));

server.set("view engine","njk")

nunjucks.configure("views", {
   express:server,
   autoescape: false,
   noCache: true,
})

server.get("/", function(req, res) {
    const about = {
        avatar_url: "/perfil.jpg",
        name: "Rocketseat",
        description: 'Uma empresa de capacitação para profissionais de tecnologia e programação web. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi quo repudiandae maxime sint hic esse! At, amet necessitatibus. Est corrupti voluptas odit laboriosam nulla unde, natus itaque maxime aut quasi. <a href="http://danilomarra.com.br">Site</a>.',
        tecnologias: ["HTML", "CSS", "Javascript", "React & React Native"],
        links: [
            { name: "github", url: "https://github.com/gadernal/" },
            { name: "twitter", url: "https://twitter.com/danniloweb" }, 
            { name: "linkedin", url: "https://www.linkedin.com/in/danilomarra/" }
        ]
    }
    return res.render("about", {about});
})

server.get("/courses/", function(req, res) {
   return res.render("courses", { cursos });
})

server.get("/courses/:id", function(req, res) {
    const id = req.params.id;
    // return res.send(`O id fornecedio na rota é: ${id}`);
    const curso = cursos.find(function(curso) {
        return curso.title == id;
    })
    if (!curso) {
        return res.status(404).render("not-found");
    }
    return res.render("course", {curso})
})

// server.get("/course", function (req, res) {
//     const id = req.query.id;  

//     const curso = cursos.find(function(curso) {
//         return curso.title == id
//     })

//     if (!curso) {
//         return res.send("Curso not found!")
//     }

//     return res.render("course", {curso})
// })

server.use(function(req, res) {
    res.status(404).render("not-found");
})

server.listen(5000, function() {
    console.log('servidor está rodando');
})