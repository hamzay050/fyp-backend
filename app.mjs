import cookieParser from "cookie-parser";
import cors from "cors";
import htmlToPdf from "html-pdf";
import express from "express";
import helmet from "helmet";
import logger from "morgan";
import path from "path";
import setRoutes from "./routes/index.mjs";
import env from "dotenv";
import { createCanvas, registerFont } from "canvas";
import htmlToImage from "html-to-image";
import puppeteer from "puppeteer";
env.config();
const __dirname = path.resolve();

const app = express();
const corsOptions = {
  credentials: true,
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
    "http://localhost:3003",
  ],
};

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());

app.get("/view-pres", (req, res) => {
  const prescriptions = [
    {
      medicineName: "Medicine A",
      dosage: "10mg",
      frequency: "Once daily",
      instructions: "Take after meal",
    },
    {
      medicineName: "Medicine B",
      dosage: "20mg",
      frequency: "Twice daily",
      instructions: "Take before meal",
    },
    // Add more dummy prescription data as needed
  ];

  const patientName = "John Doe";
  const patientAge = 35;

  const diagnosisComment =
    "The patient is suffering from a common cold. Prescribed medication to alleviate symptoms.";

  const specialInstructions =
    "Avoid exposure to cold weather and get plenty of rest.";

  const doctorName = "Dr. Smith";
  const doctorSpecialization = "General Practitioner";

  // Render the template passing the above data
  res.render(
    "prescription",
    {
      prescriptions,
      patientName,
      patientAge,
      diagnosisComment,
      specialInstructions,
      doctorName,
      doctorSpecialization,
    },
    (err, html) => {
      if (err) {
        console.error("Error rendering prescription template:", err);
        res.status(500).send("Error rendering prescription template");
      } else {
        // Send the rendered HTML content in the response
        res.send(html);
      }
    }
  );
});
app.get("/generate-pdf", async (req, res) => {
  const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Sample PDF</title>
            <style>
            
                body {
                    font-family: Arial, sans-serif;
                    color: #333;
                }
            </style>
        </head>
        <body>
            <h1>Hello, World!</h1>
            <p>This is a sample PDF generated from HTML content.</p>
            <p>This is a sample PDF generated from HTML content.</p>
            <p>This is a sample PDF generated from HTML content.</p>
        </body>
        </html>
    `;

  try {
    htmlToPdf.create(htmlContent).toBuffer((err, buffer) => {
      if (err) {
        console.error("Error generating PDF:", error);
        res.status(500).send("Error generating PDF");
      } else {
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", 'inline; filename="sample.pdf"');
        res.send(buffer);
      }
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).send("Error generating PDF");
  }
});

app.get("/generate-image", async (req, res) => {
  const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Sample Image</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    color: #333;
                }
            </style>
        </head>
        <body>
            <h1>Hello, World!</h1>
            <p>This is a sample image generated from HTML content.</p>
        </body>
        </html>
    `;

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Set the HTML content
    await page.setContent(htmlContent);

    // Take a screenshot of the page
    const screenshotBuffer = await page.screenshot({ type: "png" });

    // Close the browser
    await browser.close();

    // Set response headers
    res.setHeader("Content-Type", "image/png");
    res.send(screenshotBuffer);
  } catch (error) {
    console.error("Error generating image:", error);
    res.status(500).send("Error generating image");
  }
});

setRoutes(app);

// error(app);

export default app;
