import pool from './config/database.js';

async function testConnection() {
  console.log('🔍 Verificando conexión a la base de datos...\n');

  try {
    // Probar conexión
    const connection = await pool.getConnection();
    console.log('✅ Conexión exitosa a MySQL\n');

    // Verificar si la base de datos existe
    const [databases] = await connection.query('SHOW DATABASES LIKE "inmobiliaria_juliana"');
    
    if (databases.length === 0) {
      console.error('❌ La base de datos "inmobiliaria_juliana" no existe');
      console.log('\n📝 Ejecuta el schema.sql primero:');
      console.log('   mysql -u root -p < schema.sql\n');
      connection.release();
      process.exit(1);
    }
    
    console.log('✅ Base de datos "inmobiliaria_juliana" encontrada\n');

    // Verificar si la tabla administrador existe
    const [tables] = await connection.query('SHOW TABLES LIKE "administrador"');
    
    if (tables.length === 0) {
      console.error('❌ La tabla "administrador" no existe');
      console.log('\n📝 Ejecuta el schema.sql primero:');
      console.log('   mysql -u root -p < schema.sql\n');
      connection.release();
      process.exit(1);
    }

    console.log('✅ Tabla "administrador" encontrada\n');

    // Contar administradores existentes
    const [result] = await connection.query('SELECT COUNT(*) as count FROM administrador');
    console.log(`📊 Administradores registrados: ${result[0].count}\n`);

    connection.release();
    console.log('✅ Todo está correcto! Puedes crear un administrador.\n');
    
  } catch (error) {
    console.error('❌ Error de conexión:', error.message);
    console.error('\n🔧 Verifica tu archivo .env:');
    console.error('   - DB_HOST');
    console.error('   - DB_USER');
    console.error('   - DB_PASSWORD');
    console.error('   - DB_NAME');
    console.error('   - DB_PORT\n');
  } finally {
    process.exit(0);
  }
}

testConnection();
