async function getPrices() {
  const prices = await fetch("/api/prices").then(r => r.json());

  const paxgPrice = prices["pax-gold"].usd;
  const goldPrice = prices["tether-gold"].usd;

  document.getElementById("paxgPrice").textContent = `$${paxgPrice.toFixed(2)}`;
  document.getElementById("goldPrice").textContent = `$${goldPrice.toFixed(2)}`;

  return paxgPrice / goldPrice;
}
