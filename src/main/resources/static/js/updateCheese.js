document.addEventListener('DOMContentLoaded', async () => {
    const id = localStorage.getItem('idProduct'); 
    localStorage.removeItem('idProduct');
    //console.log(id);
    if (id) {
        try {
            //GET del producto por su id
            const response = await fetch(`http://localhost:8080/api/products/${id}`);
            const product = await response.json();

            //Cargarlo al formulario
            document.getElementById('idProductHidden').value = id;
            document.getElementById('name').value = product.name;
            document.getElementById('description').value = product.description;
            document.getElementById('price').value = product.price;
            document.getElementById('stock').value = product.stock;
            document.getElementById('category').value = product.id_category;
            const preview = document.getElementById('preview');
            preview.innerHTML = `<img src="data:image/jpeg;base64,${product.image}" id="previewImage" class="w-25 mb-2">`;
        } catch (error) {
            alert("Producto no encontrado");
            window.location.href = `../html/productForm.html`;
        }
    } else {
        alert("Producto no encontrado");
        window.location.href = `../html/productForm.html`;
    }
});
function sendForm() {
    //Obtener los datos de las variables
    const id = document.getElementById("idProductHidden").value;
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;
    const stock = document.getElementById("stock").value;
    const category = document.getElementById("category").value;
    const image = document.querySelector('#image').files[0];
    const alert = document.getElementById('alert');
    //Comprobacion con JS que todos los campos esten completos
    if (!name || !description || !price || !stock || !category)
    {
        alert.innerHTML = `
            <div class="alert alert-danger d-flex align-items-center" role="alert">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-exclamation-triangle-fill me-2" viewBox="0 0 20 20">
            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
            </svg>
                <div>
                    Llene todos los campos del formulario
                </div>
            </div>`;
        if(!name){
            document.getElementById("name").style.border = '0.1vh solid';
            document.getElementById("name").style.borderColor = 'red';
        }
        if(!description){
            document.getElementById("description").style.border = '0.1vh solid';
            document.getElementById("description").style.borderColor = 'red';
        }
        if(!price){
            document.getElementById("price").style.border = '0.1vh solid';
            document.getElementById("price").style.borderColor = 'red';
        }
        if(!stock){
            document.getElementById("stock").style.border = '0.1vh solid';
            document.getElementById("stock").style.borderColor = 'red';
        }
        if(!category){
            document.getElementById("category").style.border = '0.1vh solid';
            document.getElementById("category").style.borderColor = 'red';
        }
        setTimeout(function() {
            alert.innerHTML = '';
            document.getElementById("name").style.border = '';
            document.getElementById("name").style.borderColor = '';
            document.getElementById("description").style.border = '';
            document.getElementById("description").style.borderColor = '';
            document.getElementById("price").style.border = '';
            document.getElementById("price").style.borderColor = '';
            document.getElementById("stock").style.border = '';
            document.getElementById("stock").style.borderColor = '';
            document.getElementById("category").style.border = '';
            document.getElementById("category").style.borderColor = '';
        }, 5000);
        return;
    }
    else
    {
        if(image){
        // Convertir la imagen a base64
        const reader = new FileReader();
        reader.readAsDataURL(image);

        reader.onload = function () {
            const base64Image = reader.result.split(',')[1];

            // Crear el JSON
            const productCheese = {
                name: name,
                description: description,
                price: parseFloat(price),
                stock: parseInt(stock),
                image: base64Image,
                id_category: parseInt(category)
            };
            if(saveProductUpdate(productCheese,id))
            {
                // Limpiar los campos del formulario
                document.getElementById('name').value = '';
                document.getElementById('description').value = '';
                document.getElementById('price').value = '';
                document.getElementById('stock').value = '';
                document.getElementById('category').value = '';
                document.querySelector('#image').value = '';
                const previewImage =  document.getElementById('previewImage');
                previewImage.remove();//Remover el img que muestra la preview de la imagen
                alert.innerHTML = `
                    <div class="alert alert-success d-flex align-items-center" role="alert">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-check-circle-fill me-2" viewBox="0 0 20 20">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                    </svg>
                        <div>
                            Producto actualizado exitosamente
                        </div>
                    </div>`;
                setTimeout(function() {
                alert.innerHTML = '';
                window.location.href = `../html/productForm.html`;
                }, 5000);
            }
            else{
                alert.innerHTML = `
                    <div class="alert alert-danger d-flex align-items-center" role="alert">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-exclamation-triangle-fill me-2" viewBox="0 0 20 20">
                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                    </svg>
                        <div>
                            Error de respuesta con el servidor
                        </div>
                    </div>`;
                setTimeout(function() {
                alert.innerHTML = '';
                window.location.href = `../html/productForm.html`;
                }, 5000);
            }
        };
        }
        else
        {
            const productCheese = {
                name: name,
                description: description,
                price: parseFloat(price),
                stock: parseInt(stock),
                id_category: parseInt(category)
            };
            if(saveProductUpdate(productCheese,id))
            {
                // Limpiar los campos del formulario
                document.getElementById('name').value = '';
                document.getElementById('description').value = '';
                document.getElementById('price').value = '';
                document.getElementById('stock').value = '';
                document.getElementById('category').value = '';
                document.querySelector('#image').value = '';
                const previewImage =  document.getElementById('previewImage');
                previewImage.remove();//Remover el img que muestra la preview de la imagen
                alert.innerHTML = `
                    <div class="alert alert-success d-flex align-items-center" role="alert">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-check-circle-fill me-2" viewBox="0 0 20 20">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                    </svg>
                        <div>
                            Producto actualizado exitosamente
                        </div>
                    </div>`;
                setTimeout(function() {
                alert.innerHTML = '';
                window.location.href = `../html/productForm.html`;
                }, 5000);
            }
            else{
                alert.innerHTML = `
                    <div class="alert alert-danger d-flex align-items-center" role="alert">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-exclamation-triangle-fill me-2" viewBox="0 0 20 20">
                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                    </svg>
                        <div>
                            Error de respuesta con el servidor
                        </div>
                    </div>`;
                setTimeout(function() {
                alert.innerHTML = '';
                window.location.href = `../html/productForm.html`;
                }, 5000);
            }
        }
    }
}

//Mostrar la preview de la imagen
document.getElementById('image').addEventListener('change', function(event) {
    const file = event.target.files[0];  // Obtener la imagen que cargo el usuario

    if (file) {
        const reader = new FileReader();  // Crear una instancia de FileReader

        // Mostrar la vista previa
        reader.onload = function(e) {
            const preview = document.getElementById('preview');
            // Usamos innerHTML para insertar la imagen en el contenedor
            preview.innerHTML = `<img src="${e.target.result}" id="previewImage" class="w-25 mb-2">`;
        }

        // Cargar la imagen
        reader.readAsDataURL(file);
    }
});
//ACTUALIZAR PRODUCTO
async function saveProductUpdate(productCheese,id) {
    fetch('http://localhost:8080/api/products/'+id,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(productCheese)
    })
    .then((productSave)=>{
        return true;
    })
    .catch((err)=>{
        return false;
    })
}