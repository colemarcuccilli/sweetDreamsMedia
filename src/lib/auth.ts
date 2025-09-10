import bcrypt from 'bcryptjs'

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12
  return await bcrypt.hash(password, saltRounds)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash)
}

// Generate a hash for your admin password
export async function generateAdminHash(password: string) {
  const hash = await hashPassword(password)
  console.log('Add this to your .env.local file:')
  console.log(`ADMIN_PASSWORD_HASH=${hash}`)
  return hash
}

// Verify admin authentication
export async function verifyAdmin(password: string): Promise<boolean> {
  const adminHash = process.env.ADMIN_PASSWORD_HASH
  if (!adminHash) {
    throw new Error('Admin password hash not configured')
  }
  return await verifyPassword(password, adminHash)
}