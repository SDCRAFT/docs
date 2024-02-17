# 服务器状态

::: echarts Physical Server Stats

```js

option = {
    tooltip: {
        trigger: "axis",
        axisPointer: {
            animation: false,
        },
        valueFormatter: (value) => `${value.toFixed(2)}%`
    },
    legend: {
        show: true,
    },
    xAxis: {
        name: 'Time',
        type: 'time',
    },
    yAxis: {
        name: 'Precentage',
        type: 'value',
        boundaryGap: [0, "100%"],
    },
    series: [
        {
            name: "CPU Usage",
            type: 'line',
            smooth: true
        },
        {
            name: "Memory Usage",
            type: 'line',
            smooth: true
        }
    ]
};

function update() {
    var ts = Math.round(new Date().getTime()/1000);
    fetch(`https://data.loliurl.club/api/v1/query_range?query=node_memory_MemAvailable_bytes/node_memory_MemTotal_bytes&start=${ts-150}&end=${ts}&step=15s`)
        .then((response) => response.json())
        .then((json) => {
            let mem = new Array();
            for(var k in json['data']['result'][0]['values']) {
                var obj = json['data']['result'][0]['values'][k];
                mem.push([
                    obj[0]*1000, 100-obj[1]*100, obj[1]
                ]);
            }
            fetch(`https://data.loliurl.club/api/v1/query_range?query=avg%20by(ip)(irate(node_cpu_seconds_total{mode=~"sytem|user|iowait|irq|softirq|nice|steal|guest"}[1m]))&start=${ts-150}&end=${ts}&step=15s`)
            .then((response) => response.json())
            .then((json) => {
                let cpu = new Array();
                for(var k in json['data']['result'][0]['values']) {
                    var obj = json['data']['result'][0]['values'][k];
                    cpu.push([
                        obj[0]*1000, obj[1]*100, obj[1]
                    ]);
                }
                myChart.setOption({
                    series: [
                        {
                            data: cpu,
                        },
                        {
                            data: mem,
                        }
                    ],
                });
            })
    });
}

const timeId = setInterval(() => {
    if (myChart._disposed) return clearInterval(timeId);
    update();
}, 5000);
update();
```

:::

::: echarts System Load

```js
option = {
    tooltip: {
        trigger: "axis",
        axisPointer: {
            animation: false,
        },
    },
    legend: {
        show: true,
    },
    xAxis: {
        name: 'Time',
        type: 'time',
    },
    yAxis: {
        name: 'System Load',
        type: 'value',
    },
    series: [
        {
            name: "System Load",
            type: 'line',
            connectNulls: true,
            smooth: true,
            showSymbol: false
        }
    ],
    dataZoom: [{type: 'slider'},{type: 'inside'}],
};

function update() {
    var ts = Math.round(new Date().getTime()/1000);
    fetch(`https://data.loliurl.club/api/v1/query_range?query=node_load1&start=${ts-60*60*24*30}&end=${ts}&step=5m`)
        .then((response) => response.json())
        .then((json) => {
            let load = new Array();
            for(var k in json['data']['result'][0]['values']) {
                var obj = json['data']['result'][0]['values'][k];
                load.push([
                    obj[0]*1000, obj[1]
                ]);
            }
            myChart.setOption({
                series: [
                    {
                        data: load,
                    },
                ],
            });
    });
}

const timeId = setInterval(() => {
    if (myChart._disposed) return clearInterval(timeId);
    update();
}, 5*60*1000);
update();
```

:::

::: echarts Disk Usage

```js
option = {
    tooltip: {
        trigger: "axis",
        axisPointer: {
            animation: false,
        },
        valueFormatter: (value) => `${(value).toFixed(2)}%`
    },
    legend: {
        show: true,
    },
    xAxis: {
        name: 'Time',
        type: 'time',
    },
    yAxis: {
        name: 'Precentage',
        type: 'value',
    },
    series: [],
    dataZoom: [{type: 'slider'},{type: 'inside'}],
};

function update() {
    var ts = Math.round(new Date().getTime()/1000);
    fetch(`https://data.loliurl.club/api/v1/query_range?query=node_filesystem_free_bytes/node_filesystem_size_bytes&start=${ts-60*60*24*30}&end=${ts}&step=5m`)
        .then((response) => response.json())
        .then((json) => {
            let series  = new Array();
            for(var j in json['data']['result']) {
                var diskType = json['data']['result'][j]['metric']['fstype'];
                var mp = json['data']['result'][j]['metric']['mountpoint'];
                if (diskType == "vfat" || diskType == "tmpfs") continue;
                if (mp.includes("timeshift")) continue;
                let d = new Array();
                for(var k in json['data']['result'][j]['values']) {
                    var obj = json['data']['result'][j]['values'][k];
                    d.push([
                        obj[0]*1000, (1-obj[1])*100
                    ]);
                }
                series.push(
                    {
                        name: mp,
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
}, 5*60*1000);
update();
```

:::
