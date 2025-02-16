"use client"

import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
// 型
import { ThemeChartDataType, UserChartDataType } from "@/app/lib/types/workloads";

// Chart.js設定
ChartJS.register(ArcElement, Tooltip, Legend);


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
const borderColorTemplate = [
  'rgba(75, 192, 192, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)',
  'rgba(255, 99, 132, 1)',

  // 'rgba(255, 99, 132, 1)',
  // 'rgba(54, 162, 235, 1)',
  // 'rgba(255, 206, 86, 1)',
  // 'rgba(75, 192, 192, 1)',
  // 'rgba(153, 102, 255, 1)',
  // 'rgba(255, 159, 64, 1)',
];


/**
 * 
 * @param workloadData
 * @returns 
 */
const ThemePieChart = ({workloadData}: {workloadData: ThemeChartDataType[]}) => {

  if (workloadData === null || workloadData.length === 0) {return null}

  const themeSet = workloadData ? new Set(workloadData.map(w => w.theme)) : [],
    themes: string[] = [];
  themeSet.forEach(theme => {themes.push(theme)});

  const datasets = [],
    backgroundColors: string[] = [],
    borderColors: string[] = [];

  const rawDatasets: {theme: string, themeLoad: number, backgroundColor: string, borderColor: string}[] = [];

  if (workloadData) {
    const themeLoadData: number[] = [];
    let i = 0;
    themes?.forEach(theme => {
      const load = workloadData
                      .map(w => (w.theme == theme ? w.load : 0))
                      .reduce( (sum, load)  => ( sum + load), 0) / 60;

      themeLoadData.push(load);
      backgroundColors.push(backgroundColorTemplate[i % backgroundColorTemplate.length]);
      borderColors.push(borderColorTemplate[i % borderColorTemplate.length]);
      i = i + 1;
    })

    datasets.push({
      label: "pie chart",
      data: [...themeLoadData],
      backgroundColor: backgroundColors,
      borderColor: borderColors,
      borderWidth: 1
    });
  }

  const data = {
    labels: themes,
    datasets: datasets
  }

  return (
    <Pie
      data={data}
      className=""
    />
  );
};


const UserPieChart = ({workloadData}: {workloadData: UserChartDataType[]}) => {

  if (workloadData === null || workloadData.length === 0) {return null}

  const userNameSet = workloadData ? new Set(workloadData.map(w => w.userName)) : [],
    userNames: string[] = [];
    userNameSet.forEach(userName => {userNames.push(userName)});

  const datasets = [],
    backgroundColors: string[] = [],
    borderColors: string[] = [];

  const rawDatasets: {
    userName: string, userLoad: number,
    backgroundColor: string, borderColor: string}[] = [];

  if (workloadData) {
    const userLoadData: number[] = [];
    let i = 0;
    userNames?.forEach(userName => {
      const userLoad = workloadData
                      .map(w => (w.userName == userName ? w.load : 0))
                      .reduce( (sum, load)  => ( sum + load), 0) / 60;
      userLoadData.push(userLoad);

      backgroundColors.push(backgroundColorTemplate[i % backgroundColorTemplate.length]);
      borderColors.push(borderColorTemplate[i % borderColorTemplate.length]);
      i = i + 1;
    });

    datasets.push({
      label: "pie chart",
      data: [...userLoadData],
      backgroundColor: backgroundColors,
      borderColor: borderColors,
      borderWidth: 1
    });
  }

  const data = {
    type: "pie",
    labels: userNames,
    datasets: datasets
  }

  return (
    <Pie
      data={data}
    />
  );
};


export {
  ThemePieChart,
  UserPieChart,
}
