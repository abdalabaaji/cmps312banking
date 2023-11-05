const projects = require('./project.json')
const fs = require("fs")

const content = projects.map(project => {
    return `
    <div class ="card"> 
        <h2 class= "project_title">${project.name}</h2>
        <details>
            <summary>Show abstract</summary>
            <p>${project.desc}
        </details>
    </div>
    <br>
`
})

fs.writeFile("project.html", content.join(""), function (err, data) {
    console.log(err)
})
console.log(content.join(""))