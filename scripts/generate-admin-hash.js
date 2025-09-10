const bcrypt = require('bcryptjs');

async function generateHash() {
  // You can change this password to whatever you want
  const adminPassword = 'SweetDreamsAdmin2025!';
  
  console.log('Generating admin password hash...');
  console.log('Password:', adminPassword);
  
  const hash = await bcrypt.hash(adminPassword, 12);
  console.log('\nAdd this line to your .env.local file:');
  console.log(`ADMIN_PASSWORD_HASH=${hash}`);
  
  // Test the hash works
  const isValid = await bcrypt.compare(adminPassword, hash);
  console.log('\nHash verification test:', isValid ? 'PASSED' : 'FAILED');
}

generateHash().catch(console.error);