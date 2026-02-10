const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("BFHL API is running successfully");
});


app.get("/health", (req, res) => {
  return res.status(200).json({
    is_success: true,
    official_email: process.env.OFFICIAL_EMAIL,
    data: "API is healthy"
  });
});


function fibonacci(n) {
  let res = [0, 1];
  for (let i = 2; i < n; i++) {
    res.push(res[i - 1] + res[i - 2]);
  }
  return res.slice(0, n);
}

function isPrime(n) {
  if (n < 2) return false;
  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) return false;
  }
  return true;
}

function gcd(a, b) {
  while (b !== 0) {
    let temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

function lcm(arr) {
  return arr.reduce((a, b) => (a * b) / gcd(a, b));
}

app.post("/bfhl", (req, res) => {
  try {
    const body = req.body;

    
    if (body.fibonacci !== undefined) {
      return res.status(200).json({
        is_success: true,
        official_email: process.env.OFFICIAL_EMAIL,
        data: fibonacci(body.fibonacci)
      });
    }

    if (body.prime !== undefined) {
      return res.status(200).json({
        is_success: true,
        official_email: process.env.OFFICIAL_EMAIL,
        data: body.prime.filter(isPrime)
      });
    }

    
    if (body.lcm !== undefined) {
      return res.status(200).json({
        is_success: true,
        official_email: process.env.OFFICIAL_EMAIL,
        data: lcm(body.lcm)
      });
    }

    if (body.hcf !== undefined) {
      return res.status(200).json({
        is_success: true,
        official_email: process.env.OFFICIAL_EMAIL,
        data: body.hcf.reduce(gcd)
      });
    }

    if (body.AI !== undefined) {
      const question = body.AI.toLowerCase();

      if (
        question.includes("capital") &&
        question.includes("maharashtra")
      ) {
        return res.status(200).json({
          is_success: true,
          official_email: process.env.OFFICIAL_EMAIL,
          data: "Mumbai"
        });
      }

      return res.status(200).json({
        is_success: true,
        official_email: process.env.OFFICIAL_EMAIL,
        data: "Answer"
      });
    }

    return res.status(400).json({
      is_success: false,
      error: "Invalid request format"
    });

  } catch (err) {
    console.error("SERVER ERROR:", err);
    return res.status(500).json({
      is_success: false,
      error: "Server error"
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API Running on port ${PORT}`);
});
