const cursos = document.querySelectorAll('.curso');

for (let curso of cursos) {
    curso.addEventListener("click", function(){
        const cursoId = curso.getAttribute("id");
        window.location.href= `/courses/${cursoId}`
    })
}


