<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  mounted () {
    this.renderChart({
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Data One',
          borderColor: '#f87979',
          data: [40, 39, 10, 40, 39, 80, 40]
        },
        {
          label: 'Data two',
          borderColor: 'black',
          data: [44, 29, 10, 10, 39, 40, 70]
        }
      ]
    }, {responsive: true, maintainAspectRatio: false})
  }
}
</script>
