"use client"

import { memo } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale,
    BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const ThemeStackedBarChart = ({chartTitle, workloadData}: {chartTitle: string, workloadData: any}) => {

  if (workloadData === null || workloadData.length === 0) {return null}

  const themeSet = workloadData ? new Set(workloadData.map(w => w.theme)) : [],
    monthSet = workloadData ? new Set(workloadData.map(w => w.workMonth)) : [],
    themes: string[] = [],
    months: string[] = [];
  themeSet.forEach(theme => {themes.push(theme)});
  themes.sort();
  monthSet.forEach(workMonth => {months?.push(workMonth)});
  months.sort();

  const options = {
    plugins: {
      title: {
        display: true,
        text: chartTitle,
      },
    },
    responsive: true,
    scales: {
      x: { stacked: true },
      y: {
        beginAtZero: true, stacked: true,
        title:  {
          display: true,
          text: "工数 (h)"
        }
      },
    },
  };

  const datasets = []

  if (workloadData) {
    themes?.forEach(theme => {
      let tmp = [];
      months.forEach( month => {
        tmp.push(workloadData.map(w => (w.theme == theme && w.workMonth == month) ? parseInt(w.load) : 0)
                  .reduce( (sum, load)  => ( sum + load), 0) / 60);
      })
      datasets.push({
        label: theme,
        data: tmp,
        backgroundColor: `hsl(${Math.floor(Math.random() * 360)}, 90%, 70%)`
      })
    })
  }

  const data = {
    labels: months,
    datasets: datasets,
  };


  return (
    <Bar
      options={options}
      data={data}
      className="w-full"
    />
  );
};

export {
  ThemeStackedBarChart,
};
