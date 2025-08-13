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
  // Precio de PAXG en USD
  const paxgData = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=pax-gold&vs_currencies=usd")
    .then(r => r.json());

  // Precio de Oro (XAU) en USD
  const goldData = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=gold&vs_currencies=usd")
    .then(r => r.json());

  const paxgPrice = paxgData["pax-gold"].usd;
  const goldPrice = goldData.gold.usd;

  return paxgPrice / goldPrice;
}

async function updateChart() {
  try {
    const ratio = await getPrices();
    const now = new Date().toLocaleTimeString();

    chart.data.labels.push(now);
    chart.data.datasets[0].data.push(ratio);

    if (chart.data.labels.length > 20) {
      chart.data.labels.shift();
      chart.data.datasets[0].data.shift();
    }

    chart.update();
  } catch (err) {
    console.error("Error obteniendo precios:", err);
  }
}

setInterval(updateChart, 10000); // cada 10s
updateChart();
