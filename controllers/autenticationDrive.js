const { google } = require("googleapis");
const { Readable } = require("stream");

// Carga las credenciales desde el archivo JSON
const credentials = {
  "type": "service_account",
  "project_id": "todoraquirabodega",
  "private_key_id": "e4e91fc46052266ebb6aab7379fe18469e9ab617",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDOphJVQknL3vCm\n/F0J6yg8akmxIVmD3np5XcGMh7LINUdSR+ZDc0ekeG9QGuX46HB/jNX2K/RYSYCV\nTvtrfP6AZhaz5osWHJAjiO4M+97VDd8bfo6cnarq6nAmQZO+gyd9QOFAA8sQBax5\n6GSzS2GVKz7ofxhSpH7FNf4FoYBrIMILIbhRlKyjBGDY+f7aW+yQEi6Mxv8IPF9K\nA5UApIH33cxK96IOBtBpjJELDZdL5BJsEWrPF8RhCmI1Qnx13u6AkmNcuMpC1b62\nZYXtbJ3fmuZN2mOKt0r+mDcckLdeBlOHSGfZ77L0s9u/95Fv9RgYnalrllnZHfL/\n4kdc10tNAgMBAAECggEAKEd+GNDGLh8bNM1JfEqyKc6E5SoNNvM5V6lC9feoTTZ3\nW64oj5qriv8voUNQ8qqp7O7AcM6h/sh67/94abvwJopfn/rOvwVbwhVpYy4AAfLF\ne2g4d4YS/92o9QgAuph5bMRl83KZ1NpqQ0vdPwZxM6B9j1dgoBEwpZOP2zye2aJr\nwRpbbtBJ40Hhmu2K+5v15co9RDELPdjpPjrn5xKF+gc77KnXYNE1Pez9aDNzMybh\nI1vcByKalVSRRoHZ/Knc4pFrhIJAM+ET2GODBEXsxg7R0sf2Ute4XGFL0pApRgVm\nX1tOPq26Qhr2C2YyCawjtKPxbn945Urjisi/AFNsmQKBgQD5n/dzqUkI2p1fdsjs\nu5bqlsMf83lESK2/1S19TkuyQOtAv/m0XMoomJ8MFBB8AJrtnSMfQD4ZmW+yQ50Y\n8esFAbfUIDGVW8w5xcKpJCl4HIJcql79vtzdM5CCoR08ZtEhrDj05/AcRaa6PUbp\npul9ikDMg8iuwpv/WOKjSXASNQKBgQDT7SEb6sJ+rqkCzNu50xQTno2yaOZpuPId\nwK0G/Q2+kGkjvb0aLHP9nG10ggQoZLXU5dZDmiPtWE1lCWgD8BfkvMHWi9t8qgyE\nDcruELPCE6+k3cniKQ9Tg2IAqxZWEqJuf2CZqJOEeHJyXGc6nQSpho8fYWFAmTCY\nrk1yXUX3uQKBgQCG0gMQEOpFQe2lVb6HPXnxEaQpaZKhcq+E4FpFRzhS+gUVX5o5\n87Or4WJlX6DXmGwU0b3abxQbN2fAXAxJIL/SYG8svoaJKJ9QxKKyP7m2CY/PBKVx\nXthjECqIowPrT4y8JwxMGcjxPB0kkVvvbhrFlxoQW0zUNn+SlisyDcPd0QKBgQCJ\nHxEhIxCdLx2j9jDlVzHST/CW01DibwwZPCW4M9vExWOCAK5uVPznx2L603UlPaR5\nEA1GyGEenNfW2/M1OQ/8rDUvQGbPjqdyegonZx8oH9yx699IOhD0lDnA/PIC1yPK\nIxi5010/hT9nx2nzfs0Zczr/rt5iEbxjzcPGj5tJ4QKBgQDjus/ETAX4mnpqlZm0\nawjoCiytex1OaLbP8OuD677NXy7YmX3WN8HEFjsDCF6o+oGJfNaIgq+YXQQi7g7V\nB2vwcaih4/2NrA/CvCr/hVmSbnbmUABPMIVFS0MiDqHn3lmKDCuB/abzNfykJRaj\nij6GcLixwg6jYmFKiPevxAWrMA==\n-----END PRIVATE KEY-----\n",
  "client_email": "todoraquirabodega@todoraquirabodega.iam.gserviceaccount.com",
  "client_id": "103795060827026401543",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/todoraquirabodega%40todoraquirabodega.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
};


const auth = new google.auth.GoogleAuth({
  credentials: credentials,
  scopes: [
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/drive.file",
    "https://www.googleapis.com/auth/drive.appdata",
    "https://www.googleapis.com/auth/drive.scripts",
    "https://www.googleapis.com/auth/drive.metadata",
  ],
});
const folderId = "1eH8qG-U4PKqjBCanTddR3Pbt4btGWPyw";

exports.getGoogleToken = async (req, res) => {

  try {
    const authorizedClient = await auth.getClient();
    const accessToken = await authorizedClient.getAccessToken();
    res.status(200).json({message: 'Token de acceso obtenido exitosamente', token: accessToken.token})
  } catch (error) {
    res.status(403).json({message: 'no fue posible obtener el token de acceso'})
  }

}

exports.fileUrl = async (req) => {
  return new Promise((resolve, reject) => {
    const drive = google.drive({ version: "v3", auth });
    const base64Content = req.body.imagen_producto;
    const fileName = req.body.nombre_producto;
    const fileMetadata = {
      name: fileName,
      parents: [folderId],
    };
    const media = {
      mimeType: "image/jpeg",
      body: Readable.from(Buffer.from(base64Content, "base64")),
    };

    drive.files.create(
      {
        resource: fileMetadata,
        media: media,
        fields: "id",
      },
      async (err, file) => {
        if (err) {
          console.error("Error al subir el archivo:", err);
          reject(err);
        } else {
          try {
            const response = await drive.files.get({
              fileId: file.data.id,
              fields: "webContentLink",
            });
            const fileUrl = response.data.webContentLink;
            resolve(fileUrl);
          } catch (error) {
            console.error("Error al obtener la URL del archivo:", error);
            reject(error);
          }
        }
      }
    );
  });
}
