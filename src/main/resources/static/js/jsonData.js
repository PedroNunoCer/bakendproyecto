//Cargar informacion de un JSON
function loadJSON(){
    const data = [
        {
          "name": "Adobera Fresca",
          "price" : 50,
          "description": "Queso de textura suave , con un sabor suave y ligeramente salado.",
          "image": "../Pic/quesosSinFondo/abobera-fresco.png"
        },
        {
          "name": "Adobera Enchilada",
          "price" : 75,
          "description": "Es una variante de la adobera fresca, con un ligero sabor picante y un color rojizo.",
          "image":"../Pic/quesosSinFondo/adobera-enchilada.png"
        },
        {
          "name": "Adobera Seca",
          "price" : 90,
          "description": "A diferencia de la adobera fresca, esta versión tiene un proceso de secado, lo que le da una textura más firme y un sabor más intenso.",
          "image": "../Pic/quesosSinFondo/adobera-seca.png"
        },
        {
          "name": "Panela",
          "price" : 60,
          "description": "Tiene una textura firme pero esponjosa, y un sabor muy suave y ligeramente dulce.",
          "image": "../Pic/quesosSinFondo/Panela-chica.png"
        },
        {
          "name": "Queso Fresco",
          "price" : 55,
          "description": "Queso suave y húmedo, con un sabor suave y ligeramente ácido, y se desmorona fácilmente.",
          "image": "../Pic/quesosSinFondo/Queso-fresco-ch-gd.png"
        }
      ];
      
      // Guardar en localStorage
      localStorage.setItem('productsCheese', JSON.stringify(data));
}