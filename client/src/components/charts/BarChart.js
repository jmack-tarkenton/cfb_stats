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

const BarChart = (props) => {
  const { datasets, labels } = props;
  console.log({ datasets, labels });
  const data = {
    labels,
    datasets
  }
  return <Bar
    options={{}}
    data={data}
    style={{
      backgroundColor: 'white',
      ...props.style
    }}
    {...props}
  />

}

export default BarChart;