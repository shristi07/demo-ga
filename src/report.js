import React, { useState, useEffect } from "react";

const Report = () => {
  const [data, setData] = useState([]);
  const [routes, setRoutes] = useState([
    {path:"/",name:"Home"},
    {path:"/addProject",name:"Add Project"},
    {path:"/administration",name:"Administration"},
    {path:"/url",name:"URLs"},
    {path:"/url/urlInfo/urlId",name:"URL Information"}
  ]);
  useEffect(() => {
    const queryReport = () => {//(1)
      window.gapi.client
        .request({
          path: "/v4/reports:batchGet",
          root: "https://analyticsreporting.googleapis.com/",
          method: "POST",
          body: {
            reportRequests: [
              {
                viewId: "262628795", //enter your view ID here
                dateRanges: [
                  {
                    startDate: "1daysAgo",
                    endDate: "today",
                  },
                ],
                metrics: [
                  {
                    expression: "ga:pageviews",
                  },
                  {
                    expression: "ga:timeOnPage",
                  },
                ],
                dimensions: [
                  {
                    name: "ga:pagePath",
                  },
                ],
              },
            ],
          },
        })
        .then(displayResults, console.error.bind(console));
    };

    const displayResults = (response) => {//(2)
      const queryResult = response.result.reports[0].data.rows;
      const result = queryResult.map((row) => {
        const path = row.dimensions[0];
        const projectId = `${path.includes("?")?path.split("?")[1].includes("&")?path.split("?")[1].split("&").filter(ele=>ele.split("=")[0]==="project")[0].split("project=")[1]:path.split("?")[1].split("project=")[1]:""}`;

        return {
          path,
          projectId,
          component:routes.filter(ele=>ele.path.includes(path)),
          pageView: row.metrics[0].values[0],
          dwellTime: row.metrics[0].values[1],
        };
      });
      setData(result);
    };

    queryReport();
  }, []);
{data.map(ele=>console.log(ele))}
  return data.map((row) => (
    <div style={{margin:"20px 0"}} key={row.projectId}>
      <span style={{margin:"0 20px"}}><strong>PROJECT-ID </strong> - {row.projectId}</span>   
      <span style={{margin:"0 20px"}}><strong>PATH </strong> - {row.path}</span>   
      {/* <span style={{margin:"0 20px"}}><strong>COMPONENT </strong> - {row.component.path}</span>    */}
      <span style={{margin:"0 20px"}}><strong>PAGEVIEWS </strong> - {row.pageView}</span>    
      <span style={{margin:"0 20px"}}><strong>DWELLTIME </strong> - {row.dwellTime}s</span>    
      </div>//(3)
  ));
};

export default Report;