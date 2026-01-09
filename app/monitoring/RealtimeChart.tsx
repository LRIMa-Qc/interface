"use client";

import ApexCharts, { ApexOptions } from "apexcharts";
import { useEffect, useMemo } from "react";
import ReactApexChart from "react-apexcharts";
import { DataEntry } from "../stores/store";

interface RealTimeChartProps<T> {
  store: (selector: (state: T) => DataEntry[]) => DataEntry[];
  chartId: string;
  title: string;
  windowMs?: number;
  height?: number;
}

export default function RealTimeChart<T>({
  store,
  chartId,
  title,
  windowMs = 15_000,
  height = 350,
}: RealTimeChartProps<T>) {
  const history = store((state: any) => state.history) as DataEntry[];

  const hasData = history.length > 0;

  const seriesData = useMemo(() => {
    if (!hasData) {
      return [{ x: Date.now(), y: 0 }];
    }

    return history.map((entry) => ({
      x: entry.timestamp,
      y: entry.value,
    }));
  }, [history, hasData]);

  const { yMin, yMax } = useMemo(() => {
    if (!hasData) {
      return { yMin: 0, yMax: 1 };
    }

    let min = Infinity;
    let max = -Infinity;

    for (const p of history) {
      if (p.value < min) min = p.value;
      if (p.value > max) max = p.value;
    }

    const padding = Math.max((max - min) * 0.05, 1);

    return {
      yMin: Math.floor(min - padding),
      yMax: Math.ceil(max + padding),
    };
  }, [history, hasData]);

  useEffect(() => {
    ApexCharts.exec(chartId, "updateSeries", [{ data: seriesData }]);
  }, [seriesData, chartId]);

  const options: ApexOptions = {
    theme: { mode: "dark" },

    chart: {
      id: chartId,
      type: "line",
      background: "#000000",
      animations: { enabled: false },
      toolbar: { show: false },
      zoom: { enabled: false },
    },

    colors: ["#00FF6A"],

    stroke: {
      curve: "smooth",
      width: 2,
    },

    grid: {
      borderColor: "rgba(0,255,106,0.15)",
      strokeDashArray: 4,
    },

    markers: {
      size: 0,
    },

    xaxis: {
      type: "datetime",
      range: windowMs,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: { colors: "#00FF6A", fontSize: "11px" },
        datetimeFormatter: { second: "mm:ss" },
      },
    },

    yaxis: {
      min: yMin,
      max: yMax,
      labels: {
        formatter: (val) => Math.round(val).toString(),
        style: { colors: "#00FF6A", fontSize: "11px" },
      },
    },

    tooltip: { enabled: false },

    title: {
      text: title,
      style: { color: "#00FF6A", fontWeight: 500 },
    },
  };

  return (
    <ReactApexChart
      options={options}
      series={[{ name: "live", data: seriesData }]}
      type="line"
      height={height}
    />
  );
}
