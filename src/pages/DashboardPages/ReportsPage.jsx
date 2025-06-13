import * as React from 'react';
import { BarChart, PieChart } from '@mui/x-charts';
import '../../styles/ReportsPage.css';

const ReportsPage = () => {
  return (
    <div className='reports-container'>
      <h1>Reports</h1>
      <div className='data-visualizations-section'>
        <BarChart
          xAxis={[{ data: ['group A', 'group B', 'group C'] }]}
          series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
          height={300}
        />

        <PieChart
          series={[
            {
              data: [
                { id: 0, value: 10, label: 'series A' },
                { id: 1, value: 15, label: 'series B' },
                { id: 2, value: 20, label: 'series C' },
              ],
            },
          ]}
          width={200}
          height={200}
        />
      </div>
    </div>
  )
};

export default ReportsPage;