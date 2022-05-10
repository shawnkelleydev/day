import axios from 'axios';
import colors from 'colors';

const name = 'Shawn';

let ampm = 'am';

const datetime = new Date();
let hours = datetime.getHours();

let partOfDay = hours > 18 ? 'evening' : hours > 11 ? 'afternoon' : 'morning';

if (hours > 12) {
  hours -= 12;
  ampm = 'pm';
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

console.log(`\nGood ${partOfDay}, ${name}!\n`.yellow);
console.log(
  `It's ${time} on ${days[day]}, ${months[month]} ${date}, ${year}.\n`.yellow
);

const getVerse = () => {
  const url = 'https://beta.ourmanna.com/api/v1/get?format=json&order=daily';
  const options = { method: 'GET', headers: { Accept: 'application/json' } };

  axios(url, options)
    .then(res => {
      const data = res.data.verse.details;
      console.log(`Here's your Verse of the Day:\n`.yellow);
      console.log(`${data.text}`.brightCyan);
      console.log(`${data.reference} ${data.version}`.gray, '\n');
    })
    .catch(err => console.error('error:' + err));
};

const getWeather = query => {
  const url = `https://api.weatherapi.com/v1/current.json?key=12ba0b6fbccb49c793e205937221005&q=${query}&aqi=no`;
  axios
    .get(url)
    .then(res => {
      const { data } = res;
      const see =
        `I see you're in ${data.location.name}, ${data.location.region}...`
          .yellow;
      const conditions = `Looks like it's ${
        data.current.temp_f
      }˚F and ${data.current.condition.text.toLowerCase()} there.\n`.yellow;

      console.log(see);
      console.log(conditions);
    })
    .catch(error => console.error(error));
};

const giveEncouragement = () => {
  console.log('Remember that God is with you today.\n'.yellow);
  setTimeout(() => console.log('Fear not.\n'.yellow), 2000);
};

setTimeout(() => getWeather('80233'), 3000);
setTimeout(getVerse, 6000);
setTimeout(giveEncouragement, 12000);
