const crypto = require("crypto");
const getRandomId = () => Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const isValidEmail = email => emailRegex.test(email)

// const generateSKU = (category, title) => {
//   const catPrefix = category.substring(0, 3).toUpperCase(); 
//   const titlePrefix = title.replace(/[^a-zA-Z0-9]/g, "").substring(0, 3).toUpperCase();
//   const randomCode = Math.floor(1000 + Math.random() * 9000); 

//   return `${catPrefix}-${titlePrefix}-${randomCode}`;
// };

const isAdmin = (user) => user?.role === "admin";


const generateOrderId = () => {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, ""); // YYYYMMDD
  const randomSuffix = crypto.randomBytes(3).toString("hex").toUpperCase(); // 6-char hex
  return `ORD-${dateStr}-${randomSuffix}`;
};

const generateProductId = (category = "") => {
  const prefix = "PRD";
  const currentYear = new Date().getFullYear();

  // 1. Category Code Extractor (e.g., "Men's Fashion" -> "MEN", "Electronics" -> "ELE")
  let categoryCode = "GEN"; // Default: General
  if (category && typeof category === "string" && category.trim().length > 0) {
    const cleanCategory = category.replace(/[^a-zA-Z]/g, "").toUpperCase();
    if (cleanCategory.length >= 3) {
      categoryCode = cleanCategory.substring(0, 3);
    } else if (cleanCategory.length > 0) {
      categoryCode = cleanCategory.padEnd(3, "X");
    }
  }

  // 2. Cryptographically secure 6-character hex hash (Zero collision risk)
  const secureHash = crypto.randomBytes(3).toString("hex").toUpperCase();

  // 3. Final Formatted Real-World Product ID
  return `${prefix}-${categoryCode}-${currentYear}-${secureHash}`;
};

module.exports = { getRandomId, isValidEmail,isAdmin,generateOrderId,generateProductId }