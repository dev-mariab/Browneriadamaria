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
    const productsWithKeys = await kv.getByPrefix("product:");
    const products = productsWithKeys.map(({ key, value }) => ({
      ...value,
      id: key,
    }));
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
    const productWithId = {
      ...product,
      id: productId,
    };
    await kv.set(productId, productWithId);
    console.log("POST /products - Created product:", productId);
    return c.json({ success: true, id: productId, product: productWithId });
  } catch (error) {
    console.error("Error creating product:", error);
    return c.json({ error: "Failed to create product", details: String(error) }, 500);
  }
});

// Update product
app.put("/make-server-d2e7a431/products/:id", async (c) => {
  try {
    const id = decodeURIComponent(c.req.param("id"));
    if (!id || !id.startsWith("product:")) {
      return c.json({ error: "Invalid product id" }, 400);
    }
    const product = await c.req.json();
    const productWithId = {
      ...product,
      id,
    };
    await kv.set(id, productWithId);
    console.log("PUT /products - Updated product:", id);
    return c.json({ success: true, id, product: productWithId });
  } catch (error) {
    console.error("Error updating product:", error);
    return c.json({ error: "Failed to update product", details: String(error) }, 500);
  }
});

// Delete product
app.delete("/make-server-d2e7a431/products/:id", async (c) => {
  try {
    const id = decodeURIComponent(c.req.param("id"));
    if (!id || !id.startsWith("product:")) {
      return c.json({ error: "Invalid product id" }, 400);
    }
    await kv.del(id);
    console.log("DELETE /products - Deleted product:", id);
    return c.json({ success: true, id });
  } catch (error) {
    console.error("Error deleting product:", error);
    return c.json({ error: "Failed to delete product", details: String(error) }, 500);
  }
});

Deno.serve(app.fetch);