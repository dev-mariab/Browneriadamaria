import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-d2e7a431/health", (c) => {
  return c.json({ status: "ok" });
});

// Get all products
app.get("/make-server-d2e7a431/products", async (c) => {
  try {
    const products = await kv.getByPrefix("product:");
    console.log("GET /products - Retrieved products:", products?.length || 0);
    return c.json({ products: products || [] });
  } catch (error) {
    console.error("Error getting products:", error);
    return c.json({ error: "Failed to get products", details: String(error) }, 500);
  }
});

// Add new product
app.post("/make-server-d2e7a431/products", async (c) => {
  try {
    const product = await c.req.json();
    const productId = `product:${Date.now()}`;
    await kv.set(productId, product);
    console.log("POST /products - Created product:", productId);
    return c.json({ success: true, id: productId, product });
  } catch (error) {
    console.error("Error creating product:", error);
    return c.json({ error: "Failed to create product", details: String(error) }, 500);
  }
});

// Update product
app.put("/make-server-d2e7a431/products/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const product = await c.req.json();
    await kv.set(id, product);
    console.log("PUT /products - Updated product:", id);
    return c.json({ success: true, id, product });
  } catch (error) {
    console.error("Error updating product:", error);
    return c.json({ error: "Failed to update product", details: String(error) }, 500);
  }
});

// Delete product
app.delete("/make-server-d2e7a431/products/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await kv.del(id);
    console.log("DELETE /products - Deleted product:", id);
    return c.json({ success: true, id });
  } catch (error) {
    console.error("Error deleting product:", error);
    return c.json({ error: "Failed to delete product", details: String(error) }, 500);
  }
});

Deno.serve(app.fetch);