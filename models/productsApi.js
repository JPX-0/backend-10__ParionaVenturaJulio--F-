class ProductsApi {
  constructor() {
    this.data = [];
  }
  getAll() {
    return [...this.data]
  }
  saveProduct(reqBody) {
    const { nombre, precio, foto } = reqBody;
    const findId = this.data.map(item => item.id); // Obtine todos los ID del array.
    let newId; // Guarda el nuevo ID
    if(findId.length == 0) newId = 1; // Se asegura en guardar un 1 si está vacío el array.
    else newId = Math.max.apply(null, findId) + 1; // Busca el máximo ID y aumenta en 1.
    const newProduct = {
      id: newId,
      nombre,
      precio,
      foto
    };
    this.data.push(newProduct);
  }
}
const products = new ProductsApi();

module.exports = products;