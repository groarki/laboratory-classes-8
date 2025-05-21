const Product = require("../models/Product");
const Cart = require("../models/Cart");

const { STATUS_CODE } = require("../constants/statusCode");

exports.addProductToCart = async (request, response) => {
  try {
    const productName = request.body.productName;
    const product = await Product.findByName(productName);

    if (product) {
      await Cart.add(product);
      response.status(STATUS_CODE.OK).send({ success: true });
    } else {
      response
        .status(STATUS_CODE.NOT_FOUND)
        .send({ error: "Product not found" });
    }
  } catch (error) {
    console.error("Error occurred while adding product to cart:", error);
    response.status(500).send({ error: "Internal server error" });
  }
};

exports.getProductsCount = async () => {
  return await Cart.getProductsQuantity();
};
