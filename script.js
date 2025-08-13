const ctx = document.getElementById("paxgChart").getContext("2d");

let chart = new Chart(ctx, {
  type: "line",
  data: {
    labels: [],
    datasets: [{
      label: "PAXG/XAU Ratio",
      data: [],
      borderColor: "gold",
      backgroundColor: "rgba(255,215,0,0.2)",
      fill: true,
      tension: 0.1
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: { beginAtZero: false }
    }
  }
});

async function getPrices() {
  // Precio PAXG/USDT
  const paxgData = await fetch("https://api.binance.com/api/v3/ticker/price?symbol=PAXGUSDT")
    .then(r => r.json());

  // Precio Oro XAU/USDT
  const goldData = await fetch("https://api.binance.com/api/v3/ticker/price?symbol=XAUUSDT")
    .then(r => r.json());

  const paxgPrice = parseFloat(paxgData.price);
  const goldPrice = parseFloat(goldData.price);

  return paxgPrice / goldPrice;
}

async function updateChart() {
  const ratio = await getPrices();
  const now = new Date().toLocaleTimeString();

  chart.data.labels.push(now);
  chart.data.datasets[0].data.push(ratio);

  if (chart.data.labels.length > 20) {
    chart.data.labels.shift();
    chart.data.datasets[0].data.shift();
  }

  chart.update();
}

setInterval(updateChart, 10000); // Cada 10s
updateChart();
