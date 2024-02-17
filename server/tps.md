# 子服务器数据

::: echarts TPS

```js
option = {
    tooltip: {
        trigger: "axis",
        axisPointer: {
            animation: false,
        },
        valueFormatter: (value) => `${value.toFixed(2)}`
    },
    legend: {
        show: true,
    },
    xAxis: {
        name: 'Time',
        type: 'time',
    },
    yAxis: {
        name: 'TPS',
        type: 'value',
    },
    series: [],
    dataZoom: [{type: 'slider'},{type: 'inside'}],
};

function update() {
    var ts = Math.round(new Date().getTime()/1000);
    fetch(`https://data.loliurl.club/api/v1/query_range?query=irate(minecraft_tick_duration_seconds_count{}[30s])&start=${ts-60*10}&end=${ts}&step=15s`)
        .then((response) => response.json())
        .then((json) => {
            let series  = new Array();
            for(var j in json['data']['result']) {
                let d = new Array();
                for(var k in json['data']['result'][j]['values']) {
                    var obj = json['data']['result'][j]['values'][k];
                    d.push([
                        obj[0]*1000, obj[1]*1
                    ]);
                }
                series.push(
                    {
                        name: json['data']['result'][j]['metric']['server'],
                        type: 'line',
                        connectNulls: true,
                        smooth: true,
                        data: d,
                        showSymbol: false
                    }
                )
            }
            myChart.setOption({
                series
            });
    });
}

const timeId = setInterval(() => {
    if (myChart._disposed) return clearInterval(timeId);
    update();
}, 5000);
update();
```

:::

::: echarts MSPT

```js
option = {
    tooltip: {
        trigger: "axis",
        axisPointer: {
            animation: false,
        },
        valueFormatter: (value) => `${(value*1000).toFixed(4)}ms`
    },
    legend: {
        show: true,
    },
    xAxis: {
        name: 'Time',
        type: 'time',
    },
    yAxis: {
        name: 'MSPT',
        type: 'value',
    },
    series: [],
    dataZoom: [{type: 'slider'},{type: 'inside'}],
};

function update() {
    var ts = Math.round(new Date().getTime()/1000);
    fetch(`https://data.loliurl.club/api/v1/query_range?query=histogram_quantile(0.5,rate(minecraft_tick_duration_seconds_bucket[30s]))&start=${ts-60*10}&end=${ts}&step=15s`)
        .then((response) => response.json())
        .then((json) => {
            let series  = new Array();
            for(var j in json['data']['result']) {
                let d = new Array();
                for(var k in json['data']['result'][j]['values']) {
                    var obj = json['data']['result'][j]['values'][k];
                    d.push([
                        obj[0]*1000, obj[1]*1
                    ]);
                }
                series.push(
                    {
                        name: json['data']['result'][j]['metric']['server'],
                        type: 'line',
                        connectNulls: true,
                        smooth: true,
                        data: d,
                        showSymbol: false,
                    }
                )
            }
            myChart.setOption({
                series
            });
    });
}

const timeId = setInterval(() => {
    if (myChart._disposed) return clearInterval(timeId);
    update();
}, 5000);
update();
```

:::

::: echarts Players Count

```js
option = {
    tooltip: {
        trigger: "axis",
        axisPointer: {
            animation: false,
        },
        valueFormatter: (value) => `${value}`
    },
    legend: {
        show: true,
    },
    xAxis: {
        name: 'Time',
        type: 'time',
    },
    yAxis: {
        name: 'Count',
        type: 'value',
    },
    series: [],
    dataZoom: [{type: 'slider'},{type: 'inside'}],
};

function update() {
    var ts = Math.round(new Date().getTime()/1000);
    fetch(`https://data.loliurl.club/api/v1/query_range?query=minecraft_players_count&start=${ts-60*60*24}&end=${ts}&step=15s`)
        .then((response) => response.json())
        .then((json) => {
            let series  = new Array();
            for(var j in json['data']['result']) {
                let d = new Array();
                for(var k in json['data']['result'][j]['values']) {
                    var obj = json['data']['result'][j]['values'][k];
                    d.push([
                        obj[0]*1000, obj[1]*1
                    ]);
                }
                series.push(
                    {
                        name: json['data']['result'][j]['metric']['server'],
                        type: 'line',
                        connectNulls: true,
                        smooth: true,
                        data: d,
                        showSymbol: false,
                        step: true,
                    }
                )
            }
            myChart.setOption({
                series
            });
    });
}

const timeId = setInterval(() => {
    if (myChart._disposed) return clearInterval(timeId);
    update();
}, 30000);
update();
```

:::
