import axios from "axios";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";


const app = express();

dotenv.config({ path: "../.env" });


// Función que se ejecuta al iniciar para probar la API

async function testHuggingFaceAPI() {
  const HF_API_URL = "https://api-inference.huggingface.co/models/vennify/t5-base-grammar-correction";
  const TEST_TEXT = "zoy julian y quiero ser un futbolsta";

  try {
    const response = await axios.post(
      HF_API_URL,
      { inputs: TEST_TEXT },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`, // Asegúrate de que esté definido
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Resultado:");
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error("❌ Error con Hugging Face:");
    if (error) {
      console.error(error);
    } else {
      console.error(error);
    }
  }
}

testHuggingFaceAPI();


// Ruta principal
// app.post("/api/corregir", async (req, res) => {
//   const { texto } = req.body;

//   if (!texto) {
//     res.status(400).json({ error: "Falta el campo 'texto'" });
//     return 
//   }

//   try {
//     console.log("📨 Texto recibido:", texto);

//     // Enviar a Hugging Face
//     const hfResponse = await axios.post(
//       HF_API_URL,
//       { inputs: `gec: ${texto}` }, // IMPORTANTE: "gec:" es parte del prompt requerido
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.HF_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     const respuestaModelo = hfResponse.data[0]?.generated_text || "Error al generar respuesta";

//     res.status(200).json({
//       original: texto,
//       corregido: respuestaModelo,
//     });

//   } catch (error) {
//     console.error("❌ Error con Hugging Face:", error);
//     res.status(500).json({ error: "Fallo al comunicarse con Hugging Face." });
//   }
// });

app.use(
  cors({
    origin: [
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"], 
  })
);
app.use(express.json());



const server = http.createServer(app);

app.post("/api",(req,res)=>{
    const {texto} = req.body
    console.log("📥 Petición recibida en /api");
    console.log("este es el valor que del fronted :"+ texto)
    res.status(200).json("texto recivido")
})

// axios.post('https://textcleaner.net/tu-endpoint', {
//   text: textoUsuario,
//   options: { stripHtml: true, removeSpaces: true, toLowerCase: false }
// })
// .then(res => {
//   const limpio = res.data.cleanedText;
//   // envías 'limpio' a tu frontend
// })
// .catch(console.error)

const PORT = process.env.PORT || 3001
server.listen(PORT, () => {
  console.log(` Servidor API corriendo en http://localhost:${PORT}`);
});
