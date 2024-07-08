import React from 'react';
import ReactECharts from 'echarts-for-react';

const Treemap = () => {
  const option = {
    // title: {
    //   text: 'Treemap Example',
    // },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}',
    },
    series: [
      {
        name: 'treemap',
        type: 'treemap',
        data: [
          {
            name: 'nodeA',
            value: 10,
            children: [
              {
                name: 'nodeAa',
                value: 4,
              },
              {
                name: 'nodeAb',
                value: 6,
              },
            ],
          },
          {
            name: 'nodeB',
            value: 20,
            children: [
              {
                name: 'nodeBa',
                value: 20,
                children: [
                  {
                    name: 'nodeBa1',
                    value: 20,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  return (
    <div className="h-full w-full flex items-center justify-center">
      <ReactECharts option={option} className="h-full w-full" />
    </div>
  );
};

export default Treemap;
