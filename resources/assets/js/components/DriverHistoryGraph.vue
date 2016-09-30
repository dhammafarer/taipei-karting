<template>
  <div class="Race-History-Graph">

    <div v-if="historyData.points.length > 2" class="Panel">
      <div class="Panel__Heading">
        Recent Performance
      </div>
      <div class="Panel__Body">
        <canvas id="myChart"></canvas>
      </div>
    </div>

  </div>
</template>

<script>
  import Chart from 'chart.js'
  import rules from '../utilities/race-rules'

  export default {
    props: ['driver', 'drivers', 'races'],
    computed: {
      historyData () {
        let records = rules.getDriverHistory(this.driver.id, this.races)
        let points = records.map(r => r.points.total)
        let labels = records.map(r => r.race.name)
        return {
          points, labels
        }
      }
    },
    ready() {
      let ctx = document.getElementById('myChart')
      let data = {
          labels: this.historyData.labels,
          datasets: [
              {
                  label: "My First dataset",
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: "rgba(75,192,192,0.4)",
                  borderColor: "rgba(75,192,192,1)",
                  borderCapStyle: 'butt',
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: 'miter',
                  pointBorderColor: "rgba(75,192,192,1)",
                  pointBackgroundColor: "#fff",
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: "rgba(75,192,192,1)",
                  pointHoverBorderColor: "rgba(220,220,220,1)",
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 10,
                  data: this.historyData.points,
                  spanGaps: false,
              }
          ]
      }

      let myChart = new Chart(ctx, {
        type: 'line',
        data: data
      })
    }
  }
</script>
