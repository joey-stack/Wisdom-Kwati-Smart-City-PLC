const fs = require('fs');
const { spawnSync } = require('child_process');

try {
  const envContent = fs.readFileSync('.env.local', 'utf8');
  const lines = envContent.split('\n');

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const firstEquals = trimmed.indexOf('=');
    if (firstEquals === -1) continue;

    const name = trimmed.substring(0, firstEquals).trim();
    let value = trimmed.substring(firstEquals + 1).trim();

    // Strip wrapping quotes if any
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    if (!name) continue;

    console.log(`Setting ${name} on Vercel Production...`);
    const prodResult = spawnSync('npx', ['vercel', 'env', 'add', name, 'production', '--value', value, '--yes', '--force'], { 
      stdio: 'inherit',
      shell: false
    });
    if (prodResult.status !== 0) {
      console.error(`Failed to set ${name} on Production`);
    }
  }
  console.log('Successfully completed environment variables updates on Vercel Production!');
} catch (error) {
  console.error('Error updating environment variables:', error);
  process.exit(1);
}
