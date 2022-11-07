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
  const data = {
    labels,
    datasets
  }
  return <Bar
    options={{}}
    data={data}
    {...props}
    style={{
      backgroundColor: 'white',
      maxHeight:"100%",
      ...props.style
    }}
  />

}

export default BarChart;