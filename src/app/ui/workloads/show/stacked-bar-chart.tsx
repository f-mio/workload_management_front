"use client"

import { memo } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale,
    BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
// 型
import { ThemeBarChartDataType, UserBarChartDataType } from '@/app/lib/types/workloads';

// Chart.jsの設定
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// データセットの型を宣言
type DatasetType = {
  label: string
  data: number[]
  backgroundColor: string
}


const ThemeStackedBarChart = ({chartTitle, workloadData}: {chartTitle: string, workloadData: ThemeBarChartDataType[]}) => {

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
      // titleはH3要素で表示するためコメントアウト
      // title: {
      //   display: true,
      //   text: chartTitle,
      // },
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

  const datasets: DatasetType[] = []

  if (workloadData) {
    themes?.forEach(theme => {
      let tmp: number[] = [];
      months.forEach( month => {
        tmp.push(workloadData.map(w => (w.theme == theme && w.workMonth == month) ? w.load : 0)
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
    <div className="w-full">
      <h3 className="w-full text-center">テーマ別工数</h3>
      <Bar
        options={options}
        data={data}
        className="w-full"
      />
    </div>
  );
};


const UserStackedBarChart = ({chartTitle, workloadData}: {chartTitle: string, workloadData: UserBarChartDataType[]}) => {
  

  if (workloadData === null || workloadData.length === 0) {return null}

  const userSet = workloadData ? new Set(workloadData.map(w => w.userName)) : [],
    monthSet = workloadData ? new Set(workloadData.map(w => w.workMonth)) : [],
    users: string[] = [],
    months: string[] = [];
  // 各集合から要素を取り出して、users, monthsに格納
  userSet.forEach(userName => {users.push(userName)});
  monthSet.forEach(workMonth => {months.push(workMonth)});
  // 要素のソート
  users.sort();
  months.sort();

  const options = {
    plugins: {
      // titleはH3要素で表示するためコメントアウト
      // title: {
      //   display: true,
      //   text: chartTitle,
      // },
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

  const datasets: DatasetType[] = []

  if (workloadData) {
    users?.forEach(theme => {
      let tmp: number[] = [];
      months.forEach( month => {
        tmp.push(workloadData.map(w => (w.userName == theme && w.workMonth == month) ? w.load : 0)
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
    <div className="w-full">
      <h3 className="w-full text-center">テーマ別工数</h3>
      <Bar
        options={options}
        data={data}
        className="w-full"
      />
    </div>
  );
};

export {
  ThemeStackedBarChart,
  UserStackedBarChart,
};
