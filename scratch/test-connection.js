const dns = require('dns').promises;
const https = require('https');

async function checkDns(hostname) {
  try {
    const addresses = await dns.resolve4(hostname);
    console.log(`[DNS] ${hostname} resolved to:`, addresses);
    return true;
  } catch (err) {
    console.error(`[DNS] Failed to resolve ${hostname}:`, err.message);
    return false;
  }
}

function checkHttps(url) {
  return new Promise((resolve) => {
    console.log(`[HTTP] Initiating HTTPS GET request to: ${url}`);
    const req = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1'
      }
    }, (res) => {
      console.log(`[HTTP] Status Code: ${res.statusCode}`);
      console.log(`[HTTP] Headers:`, JSON.stringify(res.headers, null, 2));
      resolve(true);
    });

    req.on('error', (err) => {
      console.error(`[HTTP] Connection failed:`, err.message);
      resolve(false);
    });
    
    req.setTimeout(5000, () => {
      console.error(`[HTTP] Request timed out after 5s`);
      req.destroy();
      resolve(false);
    });
  });
}

async function run() {
  console.log('=== NETWORK DIAGNOSTICS ===');
  const domain = 'wisdom-kwati-smart-city-plc.vercel.app';
  
  const dnsOk = await checkDns(domain);
  const firebaseDnsOk = await checkDns('wk-smart-city-plc.firebaseapp.com');
  
  if (dnsOk) {
    await checkHttps(`https://${domain}/`);
  }
}

run();
