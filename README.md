This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.



<!-- Chart Type |	Single Column |	Multi-Column (X-Axis) | 	Multi-Column (Y-Axis)
Bar Chart	Yes	No	Yes
Line Chart	Yes	Yes	Yes
Area Chart	Yes	Yes	Yes



dataset_id,

//single column chart
{
  "key": "string",  //chart name
  "label": "string", // Title of the chart
  "description": "string", // Description of the chart
  //check box for simgle or multiple columns
  "option": "string", //Option to plot the chart like, count, average, median etc
  "column": "string", //Column name of data to plot
  "dtype": "string" //Data type of the column selected
}

//multi column selection

{
    "key": "string", //Column name 
    "label": "string", // Title of the chart
    "description": "string", // Description of the chart
    //check box for simgle or multiple columns
    "option": "string", //Option to plot the chart like, grouped, comparison etc
    "xAxis":[""],
    "yAxis":["",""]
    xAxisdtype=[""]
    yAxisdtype=["",""]
}