import axios from 'axios';
import colors from 'colors';

const name = 'Shawn';

let ampm = 'am';

const datetime = new Date();
let hours = datetime.getHours();

let partOfDay = hours > 17 ? 'evening' : hours > 11 ? 'afternoon' : 'morning';

if (hours > 11) ampm = 'pm';
if (hours > 12) {
  hours -= 12;
}

let minutes = datetime.getMinutes();
minutes = minutes < 10 ? `0${minutes}` : minutes;

const year = datetime.getFullYear();
const month = datetime.getMonth();
const date = datetime.getDate();

let day = datetime.getDay();

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const time = hours + ':' + minutes + ampm;

console.log(`\nGood ${partOfDay}, ${name}!\n`.brightCyan);
console.log(
  `It's ${time} on ${days[day]}, ${months[month]} ${date}, ${year}.\n`
);

const getWeather = async () => {
  const url = `https://api.weatherapi.com/v1/current.json?key=12ba0b6fbccb49c793e205937221005&q=80233&aqi=no`;
  await axios
    .get(url)
    .then(res => {
      const data = res.data;
      const { location, current } = data;
      const { name } = location;
      const { temp_f, condition } = current;
      const weatherString =
        ` ${name} is ${condition.text.toLowerCase()} and ${temp_f}˚F `[
          temp_f > 70 ? 'bgRed' : 'bgBlue'
        ];
      console.log(weatherString, '\n');
    })
    .catch(error => console.error('error in weather:', error));
};

const getVOD = async () => {
  const url = 'https://beta.ourmanna.com/api/v1/get?format=json&order=daily';
  const options = { headers: { Accept: 'application/json' } };
  await axios
    .get(url, options)
    .then(res => {
      const data = res.data.verse.details;
      const { text, reference, version } = data;
      console.log("Here's your Verse of the Day: \n".brightCyan);
      console.log(`${text}`);
      console.log(`${reference} ${version} \n`.gray);
    })
    .catch(error => console.error('vod error:', error));
};

const writeEncouragement = () => {
  const encouragement1 = 'Remember that God is with you.';
  const encouragement2 = 'Fear not.';
  console.log(`${encouragement1} \n`);
  setTimeout(() => console.log(`${encouragement2} \n`), 3000);
};

const runDay = async () => {
  setTimeout(await getWeather, 3000);
  setTimeout(await getVOD, 6000);
  setTimeout(writeEncouragement, 12000);
};

runDay();
