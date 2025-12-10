1) Usuarios
- POST /api/users/register
  - Body: { first_name, last_name, email, age, password }
- POST /api/users/login
  - Body: { email, password }
- GET /api/users/current
- POST /api/users/update
  - Body: { currentPassword, newPassword }
- POST /api/users/forgot
  - Body: { email }
- POST /api/users/reset
  - Body: { token, email, newPassword }
- GET /api/users/logout
  - Destruye sesión y cookie.

2) Productos
- GET /api/products
- GET /api/products/:pid
- POST /api/products (admin)
- PUT /api/products/:pid (admin)
- DELETE /api/products/:pid (admin)

3) Carritos
- GET /api/carts/:cid
- POST /api/carts/:cid/items (user)
- DELETE /api/carts/:cid/items/:pid (user)
- POST /api/carts/:cid/purchase (user)