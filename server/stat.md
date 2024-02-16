# 服务器状态

::: echarts Physical Server Stats

```js
const data = {
    cpu: [12,373,343],
    mem: [1111,12121,2324]
};

option = {
    tooltip: {
        trigger: "axis",
        axisPointer: {
            animation: false,
        }
    },
    legend: {
        show: true,
    },
    xAxis: {
        data: ['A', 'B', 'C', 'D', 'E']
    },
    yAxis: {},
    series: [
        {
            data: data.cpu,
            name: "CPU",
            type: 'line',
            smooth: true
        },
        {
            data: data.mem,
            name: "Memory",
            type: 'line',
            smooth: true
        }
    ]
};
const timeId = setInterval(() => {
    if (myChart._disposed) return clearInterval(timeId);
    var ts = Math.round(new Date().getTime()/1000);
    fetch(`https://data.loliurl.club/api/v1/query_range?query=node_memory_MemAvailable_bytes&start=${ts-150}&end=${ts}&step=15s`)
        .then((response) => response.json())
        .then((data) => {
            for(var k in data['data']['result'][0]['values']) {
                var obj = data['data']['result'][0]['values'][k];
                data.mem.push(obj[1]);
            }
            myChart.setOption({
                series: [
                    {
                        data: data.cpu,
                        name: "CPU",
                        type: 'line',
                        smooth: true
                    },
                    {
                        data: data.mem,
                        name: "RAM",
                        type: 'line',
                        smooth: true
                    }
                ],
            });
    });
}, 99999999999);
```

:::
