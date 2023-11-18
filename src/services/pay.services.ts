import { ProductModel } from "../models/products.model";
import Stripe from "stripe";
import { ProdPay } from "../interfaces/interfaces";

/* Se especifica el secret key para indicarle a la nueva instancia de stripe que nos estamos conectando
desde nuestra cuenta usando nuestras credenciales */

const stripe = new Stripe(`${process.env.SECRET_KEY}`);
async function payService(arrayProducts: ProdPay[]) {
  const arrayIds = arrayProducts.map((product) => product.id);
  const cantidades = arrayProducts.map((product) => product.cantidad);

  // Usamos la función find con $in para buscar productos con IDs en el array
  const productDb = await ProductModel.find({ _id: { $in: arrayIds } });
  if (productDb.length > 0) {
    const items = productDb.map((item, index) => {
      return {
        price_data: {
          product_data: {
            name: item.name,
            images: item.image,
          },
          currency: "mxn",
          unit_amount: parseInt(item.price.replace(",", "")) * 100,
        },
        quantity: parseInt(cantidades[index]),
      };
    });

    const session = await stripe.checkout.sessions.create({
      line_items: items,
      mode: "payment",
      success_url: "http://localhost:3000/",
      cancel_url: "http://localhost:3000/error",
    });
    return session;
  }
}

/* 
payment_method_types (obligatorio):
Especifica los tipos de métodos de pago que puedes aceptar. Ejemplo, ["card"] para tarjetas de crédito/débito.

line_items (obligatorio):
Array que describe los productos/servicios que se están comprando. 
Cada elemento del array debe tener información sobre la cantidad, el precio y otros detalles.

mode (opcional):
Puede ser "payment" o "subscription". Determina si la sesión es para un pago único o una suscripción.

locale (opcional):
El idioma que se utilizará en la interfaz de usuario de Checkout. 
*/

export { payService };
