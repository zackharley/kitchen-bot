const execa = require('execa');
const pick = require('lodash.pick');
require('dotenv').config();

(async () => {
  const requiredEnvironmentVariables = [
    'GOOGLE_CLIENT_ID',
    'GOOGLE_CLIENT_SECRET',
    'SLACK_WEBHOOK_URL',
  ];
  const pickedEnvironmentVariables = pick(
    process.env,
    requiredEnvironmentVariables
  );
  const environmentVariablesString = Object.entries(pickedEnvironmentVariables)
    .map(([key, value]) => `-e ${key}="${value}"`)
    .join(' ');
  await execa.shell(`now ${environmentVariablesString}`, { stdio: 'inherit' });
})();
