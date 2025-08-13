export default async function handler(req, res) {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=pax-gold,tether-gold&vs_currencies=usd"
      );
      const data = await response.json();
  
      // Permitir que cualquier frontend consuma esto
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: "Error obteniendo precios" });
    }
  }
  