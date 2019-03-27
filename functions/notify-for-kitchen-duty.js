const dateFns = require('date-fns');
const fetch = require('node-fetch');

const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

module.exports = async (req, res) => {
  const method = req.method;
  if (method !== 'GET') {
    res.statusCode = 405;
    res.end();
    return;
  }
  const employeesOnKitchenDuty = getEmployeesOnKitchenDuty();

  try {
    const options = {
      body: JSON.stringify({
        text: `<@${employeesOnKitchenDuty[0]}> and <@${
          employeesOnKitchenDuty[1]
        }> are on kitchen duty`,
      }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    };
    const response = await fetch(SLACK_WEBHOOK_URL, options);
    if (response.ok) {
      res.statusCode = 200;
      res.end('Check Slack!');
    } else {
      res.statusCode = 500;
      res.end("Oops, couldn't post to Slack!");
    }
    console.log({ text: await response.text(), status: response.status });
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    res.end('Oops, an error occured!');
  }
};

const EMPLOYEES = [
  'zack',
  'derek',
  'rick',
  'morty',
  'beth',
  'jerry',
  'summer',
  'krombopulous',
];
const NUMBER_OF_PEOPLE_IN_A_PAIR = 2;

function getEmployeesOnKitchenDuty() {
  const now = new Date();
  const startDate = dateFns.parse('2019-03-25');
  const weekNumber = dateFns.differenceInCalendarWeeks(startDate, now);
  const numberOfEmployees = EMPLOYEES.length;
  const firstIndex =
    (weekNumber * NUMBER_OF_PEOPLE_IN_A_PAIR) % numberOfEmployees;
  const secondIndex =
    (weekNumber * NUMBER_OF_PEOPLE_IN_A_PAIR + 1) % numberOfEmployees;
  return [EMPLOYEES[firstIndex], EMPLOYEES[secondIndex]];
}
