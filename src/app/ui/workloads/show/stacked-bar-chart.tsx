"use client"

import { Chart as ChartJS, CategoryScale, LinearScale,
    BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
// 型
import { ThemeChartDataType, UserChartDataType } from '@/app/lib/types/workloads';

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
  backgroundColor: string[]
}


const backgroundColorTemplate = [
  'rgba(75, 192, 192, 0.2)',
  'rgba(255, 206, 86, 0.2)',
  'rgba(54, 162, 235, 0.2)',
  'rgba(153, 102, 255, 0.2)',
  'rgba(255, 159, 64, 0.2)',
  'rgba(255, 99, 132, 0.2)',
  // 'rgba(255, 99, 132, 0.2)',
  // 'rgba(54, 162, 235, 0.2)',
  // 'rgba(255, 206, 86, 0.2)',
  // 'rgba(75, 192, 192, 0.2)',
  // 'rgba(153, 102, 255, 0.2)',
  // 'rgba(255, 159, 64, 0.2)'
];
// const borderColorTemplate = [
//   'rgba(75, 192, 192, 1)',
//   'rgba(255, 206, 86, 1)',
//   'rgba(54, 162, 235, 1)',
//   'rgba(153, 102, 255, 1)',
//   'rgba(255, 159, 64, 1)',
//   'rgba(255, 99, 132, 1)',
//   // 'rgba(255, 99, 132, 1)',
//   // 'rgba(54, 162, 235, 1)',
//   // 'rgba(255, 206, 86, 1)',
//   // 'rgba(75, 192, 192, 1)',
//   // 'rgba(153, 102, 255, 1)',
//   // 'rgba(255, 159, 64, 1)',
// ];

const ThemeStackedBarChart = ({workloadData}: {workloadData: ThemeChartDataType[]}) => {

  if (workloadData === null || workloadData.length === 0) {return null}

  const themeSet = workloadData ? new Set(workloadData.map(w => w.theme)) : [],
    monthSet = workloadData ? new Set(workloadData.map(w => w.workMonth)) : [],
    themes: string[] = [],
    months: string[] = [];
  // 各集合から要素を取り出して、users, monthsに格納
  themeSet.forEach(theme => {themes.push(theme)});
  monthSet.forEach(workMonth => {months?.push(workMonth)});
  // 要素のソート
  themes.sort();
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
    let i = 0;
    themes?.forEach(theme => {
      const themeLoad: number[] = [];
      const backgroundColors: string[] = []
      months.forEach( month => {
        themeLoad.push(workloadData.map(w => (w.theme == theme && w.workMonth == month) ? w.load : 0)
                  .reduce( (sum, load)  => ( sum + load), 0) / 60);
        backgroundColors.push(backgroundColorTemplate[i % backgroundColorTemplate.length]);
      })
      datasets.push({
        label: theme,
        data: [...themeLoad],
        backgroundColor: backgroundColors,
      })
      i += 1
    });
  };

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


const UserStackedBarChart = ({workloadData}: {workloadData: UserChartDataType[]}) => {

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
    plugins: {},
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

  // datasetsの初期化
  const datasets: DatasetType[] = []

  if (workloadData) {
    let i: number = 0;
    users?.forEach(user => {
      const userLoad: number[] = [];
      const backgroundColors: string[] = [];
      months.forEach( month => {
        userLoad.push(workloadData.map(w => (w.userName == user && w.workMonth == month) ? w.load : 0)
                  .reduce( (sum, load)  => ( sum + load), 0) / 60);
        backgroundColors.push(backgroundColorTemplate[i % backgroundColorTemplate.length]);
      });
      datasets.push({
        label: user,
        data: [...userLoad],
        backgroundColor: backgroundColors,
      });
      i += 1;
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
  UserStackedBarChart,
};
