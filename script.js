const ctx = document.getElementById("paxgChart").getContext("2d");
const paxgPriceEl = document.getElementById("paxgPrice");
const goldPriceEl = document.getElementById("goldPrice");

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
  const paxgData = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=pax-gold&vs_currencies=usd")
    .then(r => r.json());

  const goldData = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=tether-gold&vs_currencies=usd")
    .then(r => r.json());

  const paxgPrice = paxgData["pax-gold"].usd;
  const goldPrice = goldData["tether-gold"].usd;

  paxgPriceEl.textContent = `$${paxgPrice.toFixed(2)}`;
  goldPriceEl.textContent = `$${goldPrice.toFixed(2)}`;

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

setInterval(updateChart, 10000);
updateChart();
