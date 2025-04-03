const fetch = require('node-fetch');

const acumaticaBaseUrl = process.env.ACUMATICA_BASE_URL;

class AcumaticaService {
  constructor(baseUrl, clientId, clientSecret, username, password) {
    this.baseUrl = baseUrl || acumaticaBaseUrl;
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.username = username;
    this.password = password;
    this.accessToken = null;
    this.refreshToken = null;
    this.tokenExpiry = null;
  }

  async getToken() {
    try {
      if (this.accessToken && this.tokenExpiry > Date.now()) {
        console.log("✅ Using cached access token");
        return this.accessToken;
      }

      const url = `${this.baseUrl}/identity/connect/token`;
      console.log("🔑 Fetching new token from:", url);

      const body = new URLSearchParams({
        grant_type: this.refreshToken ? "refresh_token" : "password",
        client_id: this.clientId,
        client_secret: this.clientSecret,
      });

      if (this.refreshToken) {
        body.append("refresh_token", this.refreshToken);
      } else {
        body.append("username", this.username);
        body.append("password", this.password);
        body.append("scope", "api offline_access");
      }

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("❌ Token request failed:", data);
        throw new Error(`Token request failed: ${data.error || data.error_description}`);
      }

      this.accessToken = data.access_token;
      this.refreshToken = data.refresh_token;
      this.tokenExpiry = Date.now() + data.expires_in * 1000;

      console.log("✅ Access token fetched successfully");
      return this.accessToken;
    } catch (error) {
      console.error("❌ Error fetching token:", error.message);
      throw error;
    }
  }
}

module.exports = AcumaticaService;
