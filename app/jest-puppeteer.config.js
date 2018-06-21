const isDebug = process.env.DEBUG === 'true';
const args = ['--no-sandbox', '--disable-setuid-sandbox'];
if (!isDebug) {
  args.push('--headless');
}

module.exports = {
  launch: {
    dumpio: false,
    slowMo: isDebug ? 250 : 0,
    devtools: isDebug,
    args,
  },
  server: {
    command: 'yarn serve',
    debug: true,
    port: 8080,
  },
};
