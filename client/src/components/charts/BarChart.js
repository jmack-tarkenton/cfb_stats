import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// const labels = [
//   'January',
//   'February',
//   'March',
//   'April',
//   'May',
//   'June',
// ];

// const data = {
//   labels: labels,
//   datasets: [{
//     label: 'My First dataset',
//     backgroundColor: 'rgb(255, 99, 132)',
//     borderColor: 'rgb(255, 99, 132)',
//     data: [0, 10, 5, 2, 20, 30, 45],
//   }]
// };
const BarChart = (props) => {
  const { teams } = props;
  const datasets = teams.map(({team,statistics}) => {
    console.log({team,statistics})

    return {
      label: team.displayName,
      backgroundColor: "#" + team.color,
      borderColor: "#" + team.alternateColor,
      // data: Object.values(statistics),
      data: statistics.map(({displayValue})=>parseFloat(displayValue)),
    }
  });

  const labels =teams[0].statistics.map(({label})=>label);

  console.log({ datasets, labels })
  const data = {
    labels,
    datasets
  }
  return <Bar
    options={{}}
    data={data}
    {...props}
  />

}

export default BarChart;