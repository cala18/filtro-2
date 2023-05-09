document.addEventListener("DOMContentLoaded", () =>{
    //getBd();
    getCategorias();
})

function getBd(){
    fetch ('../API/bd.json')
        .then(response =>  {
            return response.json();
    })
    .then(data => {
        
        showOneBd(data)
    })
}
function showOneBd( {idUsuario, categori, producto, precio, borrar }){
    const contenedor = document.querySelector('tbody');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td> ${idUsuario} </td> 
        <td> ${categori} </td>
        <td> ${producto} </td>
        <td> ${precio} </td>
        <td> ${borrar} </td>
    `;
    contenedor.appendChild(row)
}
function getCategorias(){
    const url ="../API/categorias.json";
    fetch(url)
        .then( response =>{
            return response.json();
            
        } )

        .then(data =>{
            showAllCategorias(data)
            //console.log(data);

        })
}


function showAllCategorias(data){
    const contenedor = document.querySelector('tbody');
    categorias.forEach((categoria)=>{

        const {idUsuario, categori, producto, precio, borrar} = categoria;
        const rows = document.createElement('tr');
        row.innerHTML = `
        <td> ${idUsuario} </td> 
        <td> ${categori} </td>
        <td> ${producto} </td>
        <td> ${precio} </td>
        <td> ${borrar} </td>
    `;
    contenedor.appendChild(rows)

    })


}


const footer = document.querySelector('#footer-categotias')
const pintarFooter = () => {

    footer.innerHTML = ''

    if (Object.keys(categotias).length === 0) {
        footer.innerHTML = `
        <th scope="row" colspan="5">categotias vacío con innerHTML</th>
        `
        return
    }

    const template = document.querySelector('#template-footer').content
    const fragment = document.createDocumentFragment()

    // sumar cantidad y sumar totales
    const nCantidad = Object.values(categotias).reduce((acc, { cantidad }) => acc + cantidad, 0)
    const nPrecio = Object.values(categotias).reduce((acc, {cantidad, precio}) => acc + cantidad * precio ,0)
    // console.log(nPrecio)

    template.querySelectorAll('td')[0].textContent = nCantidad
    template.querySelector('span').textContent = nPrecio

    const clone = template.cloneNode(true)
    fragment.appendChild(clone)

    footer.appendChild(fragment)


    const boton = document.querySelector('#vaciar-categotias')
    boton.addEventListener('click', () => {
        categotias = {}
        pintarcategotias()
    })

}





const accionBotones = () => {
    const botonesAgregar = document.querySelectorAll('#items .btn-info')
    const botonesEliminar = document.querySelectorAll('#items .btn-danger')



    botonesAgregar.forEach(btn => {
        btn.addEventListener('click', () => {
           
            const producto = categotias[btn.dataset.id]
            producto.cantidad ++
            categotias[btn.dataset.id] = { ...producto }
            pintarcategotias()
        })
    })

    botonesEliminar.forEach(btn => {
        btn.addEventListener('click', () => {
           
            const producto = categotias[btn.dataset.id]
            producto.cantidad--
            if (producto.cantidad === 0) {
                delete categotias[btn.dataset.id]
            } else {
                categotias[btn.dataset.id] = { ...producto }
            }
            pintarcategotias()
        })
    })
}

