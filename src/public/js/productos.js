document.addEventListener('DOMContentLoaded', async function () {

    await fetch('https://e-commerce-cac-backend.onrender.com/api/productos/listar') 
        .then(response => response.json())
        .then(data => {    
            const tablaProductos = document.querySelector("table")
            data.productos.forEach(producto => {
                const productoElement = document.createElement ('tr');
                productoElement.innerHTML = `<td>${producto.id}</td>
                        <td>${producto.nombre}</td>
                        <td>${producto.descripcion}</td>
                        <td>${producto.precio}</td>
                        <td>${producto.stock}</td>
                        <td><a href="/admin/products/editProduct?id=${producto.id}" class="btnEdit" >Editar</a></td>
                        <td><button id=${producto.id}>Borrar</button></td>`;
                tablaProductos.appendChild(productoElement)
            });

        })
        .catch( error => {
            console.error('Error:', error)
        });
        const bottones = document.querySelectorAll("button");

        bottones.forEach( botton =>{
            botton.addEventListener("click", async e =>{
                const id = botton.id
                try {
                    const response = await fetch(`https://e-commerce-cac-backend.onrender.com/api/productos/${id}`,{
                        method:"DELETE",
                        headers:{
                            'Content-Type': 'application/json',
                        },
                    });
                    if(!response.ok){
                        throw new Error(`Error: ${response.status} ${response.statusText}`)
                    }
                    const data = await response.json()
                    this.location.reload()
                } catch (error) {
                    console.log(error)
                }
            })
        })
    });