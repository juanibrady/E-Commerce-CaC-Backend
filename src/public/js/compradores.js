document.addEventListener('DOMContentLoaded', async function () {

    await fetch('http://localhost:3000/api/usuarios') 
        .then(response => response.json())
        .then(data => {    
            const compradores = document.querySelector ("table")
            data.usuarios.forEach(usuario => {
                const compradorElement = document.createElement ('tr');
                compradorElement.innerHTML = `<td>${usuario.id}</td>
                        <td>${usuario.nombre}</td>
                        <td>${usuario.usuario}</td>
                        <td>${usuario.correo}</td>
                        <td>${usuario.rol}</td>
                        <td><a href="/admin/compradores/editComprador?id=${usuario.id}"class="btnEdit">Editar</a></td>
                        <td><button id=${usuario.id}> Borrar</button></td>`;
                compradores.appendChild(compradorElement)
            });

        })
        .catch(error => {
            console.error('Error:', error)
    });
    
    const bottones = document.querySelectorAll("button");
    console.log(bottones)
    bottones.forEach( botton =>{
    botton.addEventListener("click", async e =>{
        const id = botton.id
        const response = await fetch(`http://localhost:3000/api/usuarios/${id}`,{
            method:"DELETE",
            headers:{'Content-Type': 'application/json'},
        });
        if(!response.ok){
            throw new Error(`Error: ${response.status} ${response.statusText}`)
        }
        const data = await response.json()
        this.location.reload()
    })
})

});



    