const pool = require('../configs/db');

async function getProducts(pageNumber, pageSize) {
   let client = await pool.connect();
   try {
      let offset = (pageNumber - 1) * pageSize;
      let sql = 'SELECT * FROM products ORDER BY product_id OFFSET $1 LIMIT $2';
      let query = await client.query(sql, [offset, pageSize]);
      return query.rows;
   } catch (error) {
      throw error;
   } finally {
      client.release();
   }
}

async function createProduct(name, desc, price, discount, stock) {
   let client = await pool.connect();
   try {
      let sql =
         'INSERT INTO products(name, desc, price, discount, stock) VALUES($1 , $2 , $3 , $4 , $5 ) RETURNING product_id, name, desc, price, discount, stock';
      let query = await client.query(sql, [name, desc, price, discount, stock]);
      return query.rows[0];
   } catch (error) {
      throw error;
   } finally {
      client.release();
   }
}

async function updateProduct(productId, name, desc, price, discount, stock) {
   let client = await pool.connect();
   try {
      let sql = `UPDATE services SET
                    name = COALESCE($2, name),
                    email = COALESCE($3, email),
                    desc = COALESCE($4, desc),
                    price = COALESCE($5, price),
                    discount = COALESCE($6, discount),
                    stock = COALESCE($7, stock),
                    updated_at = NOW()
                    WHERE product_id = $1 
                RETURNING productId, name, desc, price, discount, stock , updated_at`;
      let query = await client.query(sql, [productId, name, desc, price, discount, stock]);
      return query.rows[0];
   } catch (error) {
      throw error;
   } finally {
      client.release();
   }
}

async function deleteProduct(productId) {
   let client = await pool.connect();
   try {
      let sql = 'DELETE FROM products WHERE product_id = $1';
      await client.query(sql, [productId]);
   } catch (error) {
      throw error;
   } finally {
      client.release();
   }
}

module.exports = { getProducts, createProduct, updateProduct, deleteProduct };
