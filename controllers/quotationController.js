const clientModel = require("../models/clientModel.js");
const {
  MarketRates,
  Customer,
  AddedProducts,
} = require("../database/indexDB.js");
const fs = require('fs');
const pdf = require('pdf-creator-node');
const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const AddedProductsModel = require("../models/addedProductsModel.js");
const path = require('path');


// Configurar el transporte de correo electrónico
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "consultasbodegatodoraquira@gmail.com",
    pass: "gopyilcepuqwahyd",
  },
});

const sendEmail = async (body) => {
  try {
    fs.readFile(
      "../controllers/emailTemplate.html",
      "utf8",
      async (err, htmlContent) => {
        if (err) {
          console.error("Error al leer el archivo HTML:", err);
          return;
        }
        const dataJSON = JSON.stringify(formatPrices(body.data));
        htmlContent = htmlContent.replace("${data}", dataJSON);

        const template = handlebars.compile(htmlContent);
        const compiledHtml = template({ data: formatPrices(body.data) });

        const emailOptions = {
          from: "consultasbodegatodoraquira@gmail.com",
          to: body.data.customer.email_customer,
          subject: "Tu cotizacion - TodoRáquira",
          html: compiledHtml,
          attachments: [
            {
              filename: body.filename,
              path: body.path,
            },
          ],
        };
        await transporter.sendMail(emailOptions);
      }
    );
  } catch (error) {
    console.error("Error al enviar el correo electrónico:", error);
  }
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function formatPrices(data) {
  let quotationData = data;

  let newProducts = quotationData.products.map((prod) => {
    return {
      product: {
        id_product: prod.product.id_product,
        id_category: prod.product.id_category,
        name_product: prod.product.name_product,
        description_product: prod.product.description_product,
        quantity: prod.product.quantity,
        product_reference: prod.product.product_reference,
        unit_price: prod.product.unit_price.toLocaleString("es-CO"),
        product_picture: prod.product.product_picture,
        status_product: prod.product.status_product,
      },
      quantity: prod.quantity,
      subtotal_quote: prod.subtotal_quote.toLocaleString("es-CO"),
    };
  });
  quotationData.products = newProducts;
  quotationData.total_quote = quotationData.total_quote.toLocaleString("es-CO");
  return quotationData;
}

function convertPDFtoBase64(path) {
  // Leer el archivo PDF
  const PDF = fs.readFileSync(path);
  // Convertir el archivo a Base64
  const base64 = PDF.toString('base64');
  return base64;
}

exports.generatePDFQuotation = async (req) => {
    const htmlPath = path.join(__dirname, "../controllers/template.html");
    const logoPath = path.join(__dirname, "../assets/logo.jpg");

    try {
        const html = fs.readFileSync(htmlPath, "utf8");
        const bitmap = fs.readFileSync(logoPath);
        const logo = bitmap.toString('base64');
        const fileName = getRandomInt(100000, 9999999999);

        const options = {
            format: "Letter",
            orientation: "portrait",
            border: "10mm",
        };

        const documentPath = path.join(__dirname, `./${fileName}.pdf`);

        const document = {
            html: html,
            data: {
                data: formatPrices(req.body),
                logo: logo,
            },
            path: documentPath,
            type: "",
        };

        const response = await pdf.create(document, options);

        return {
            response: response,
            filename: fileName + ".pdf",
            path: document.path,
            base64: convertPDFtoBase64(document.path),
        };
    } catch (error) {
        throw error;
    }
};

exports.getAllQuotes = async (req, res) => {
  try {
    const quotes = await MarketRates.findAll({
      include: [{ model: Customer, as: "customer_data" }, AddedProducts],
    });
    res.json(quotes);
  } catch (error) {
    console.log(error.message);
    res.json({ message: error.message });
  }
};

exports.getQuote = async (req, res) => {
  try {
    const quotation = await MarketRates.findAll({
      include: [{ model: Customer, as: "customer_data" }, AddedProducts],
      where: {
        id: req.params.id,
      },
    });
    res.json(quotation[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const makeCotizationInsert = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newQuotation = await MarketRates.create({
        id_customer: req.clientSearch[0].id_customer,
        date_quote: req.formatDate,
        subtotal_quote: req.req.body.subtotal_quote,
        total_quote: req.req.body.total_quote,
        status_quote: "C",
      });
      resolve(newQuotation);
    } catch (error) {
      reject(error);
    }
  });
};

exports.createQuote = async (req, res) => {
  const actualDate = new Date();
  const formatDate = actualDate.toISOString().slice(0, 19).replace("T", " ");
  try {
    const client = await clientModel.findAll({
      where: {
        number_document: req.body.customer.number_document,
        name_customer: req.body.customer.name_customer,
        lastname_customer: req.body.customer.lastname_customer,
      },
    });
    const newQuotation = await makeCotizationInsert({
      clientSearch: client,
      formatDate: formatDate,
      req,
    });
    const quotationNumber = 'COT-'+newQuotation.id_quote.toString().padStart(6, '0')
        await Quotes.update({number_quote: quotationNumber},{
            where: {id_quote: newQuotation.id_quote}
        })
    if (newQuotation) {
      const poductsAdded = req.body.products.map(async (prod) => {
        return await AddedProducts.create({
          id_quote: newQuotation.id_quote,
          id_product: prod.product.id_product,
          quantity: prod.quantity,
        });
      });
      res.json({
        message: "Cotización registrada con éxito",
        number_quote: newQuotation.id,
      });
    } else {
      throw new Error("No se ha registrado la cotización aún");
    }
  } catch (error) {
    res.json({ message: error.message });
    console.log(error.message);
  }
};

exports.printQuote = async (req,res) =>{
    try {
        const quotationDocument = await generatePDFQuotation(req)
        fs.unlink(quotationDocument.path, (err) => {
            if (err) {
              console.error('Error al eliminar el archivo de la cotización:', err);
            } else {
              console.log('Archivo de la cotización eliminado con éxito.');
            }
          })
        res.json({ "message": "Documento generado con éxito", base64: quotationDocument })
    } catch (error) {
        res.json({ message: error.message })
    }

}

exports.sendEmailQuote = async (req, res) => {
  const quotationDocument = await generatePDFQuotation(req);
  if (quotationDocument) {
    try {
      const email = await sendEmail({
        data: req.body,
        filename: quotationDocument.fileName,
        path: quotationDocument.path,
        base64: quotationDocument.base64
      });
      res.json({
        message: "Documento generado con éxito",
        base64: quotationDocument,
      });
    } catch (error) {
      res.json({ message: error.message });
    }
  } else {
    res.json({ message: "No fue posible generar el documento de cotización" });
    throw new Error("El archivo de cotización aún no esta disponible");
  }
};

exports.updateClient = async (req, res) => {
  try {
    await AddedProductsModel.update(req.body, {
      where: { id: req.params.id },
    });
    res.json({ message: "Cliente actualizado con éxito" });
  } catch (error) {
    res.json({ message: error.message });
  }
};
