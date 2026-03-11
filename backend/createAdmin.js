import bcrypt from 'bcryptjs';
import readline from 'readline';
import pool from './config/database.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function createAdmin() {
  console.log('\n=== Crear Administrador ===\n');

  try {
    // Verificar conexión primero
    const connection = await pool.getConnection();
    
    // Verificar que la tabla existe
    const [tables] = await connection.query('SHOW TABLES LIKE "administrador"');
    if (tables.length === 0) {
      console.error('❌ Error: La tabla "administrador" no existe');
      console.log('📝 Ejecuta el schema.sql primero: mysql -u root -p < schema.sql\n');
      connection.release();
      rl.close();
      process.exit(1);
    }
    
    connection.release();

    const nombre = await question('Nombre: ');
    const email = await question('Email: ');
    const password = await question('Contraseña: ');

    if (!email || !password) {
      console.error('❌ Email y contraseña son requeridos');
      rl.close();
      process.exit(1);
    }

    console.log('\n⏳ Creando administrador...');

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertar en la base de datos
    const [result] = await pool.query(
      'INSERT INTO administrador (nombre, email, password) VALUES (?, ?, ?)',
      [nombre || 'Admin', email, hashedPassword]
    );

    console.log('\n✅ Administrador creado exitosamente!');
    console.log(`   ID: ${result.insertId}`);
    console.log(`   Nombre: ${nombre || 'Admin'}`);
    console.log(`   Email: ${email}`);
    console.log('\n🔐 Puedes usar estas credenciales para acceder al panel de administración.');
    console.log('   URL: http://localhost:5173/admin/login\n');

  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      console.error('\n❌ Error: El email ya está registrado');
    } else if (error.code === 'ECONNREFUSED') {
      console.error('\n❌ Error: No se pudo conectar a MySQL');
      console.error('   Verifica que MySQL esté corriendo\n');
    } else if (error.code === 'ER_BAD_DB_ERROR') {
      console.error('\n❌ Error: La base de datos no existe');
      console.error('   Ejecuta: mysql -u root -p < schema.sql\n');
    } else {
      console.error('\n❌ Error:', error.message);
      console.error('   Código:', error.code || 'N/A');
    }
  } finally {
    rl.close();
    await pool.end();
    process.exit(0);
  }
}

createAdmin();
