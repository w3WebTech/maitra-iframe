<template>
  <div>
    <h1>URL ID to iframe</h1>

    <div class="control-panel">
      <h3>Current URL Parameters</h3>
      <div id="url-params">{{ urlParams }}</div>

      <h3>Test with a custom URL</h3>
      <input type="text" v-model="testUrl" placeholder="Enter a URL with ID (e.g., https://example.com?VIN=VIN001)">
      <button @click="testWithUrl">Test</button>

      <h3>Direct ID input</h3>
      <input type="text" v-model="directId" placeholder="Enter ID directly (e.g., VIN001)">
      <button @click="testWithDirectId">Load</button>
    </div>

    <h3>iframe content:</h3>
    <iframe :src="iframeUrl" width="100%" height="500px" frameborder="1"></iframe>
  </div>
</template>

<script>
export default {
  data() {
    return {
      testUrl: '',
      directId: '',
      iframeUrl: 'about:blank',
      urlParams: 'Looking for parameters...',
    };
  },
  mounted() {
    this.displayUrlParams();
    window.addEventListener('popstate', this.displayUrlParams);
  },
  beforeDestroy() {
    window.removeEventListener('popstate', this.displayUrlParams);
  },
  methods: {
    getUrlParams(url) {
      const urlObj = new URL(url);
      const params = new URLSearchParams(urlObj.search);
      const result = {};
      for (const [key, value] of params) {
        result[key] = value;
      }
      return result;
    },
    extractIdFromUrl(url) {
      const params = this.getUrlParams(url);
      if (params['VIN']) {
        return params['VIN'];
      }
      const idParams = ['id', 'ID', 'userId', 'user_id', 'itemId', 'item_id', 'productId', 'product_id', 'vin'];
      for (const idParam of idParams) {
        if (params[idParam]) {
          return params[idParam];
        }
      }
      const pathSegments = new URL(url).pathname.split('/').filter(segment => segment);
      for (const segment of pathSegments) {
        if (segment.startsWith('VIN')) {
          return segment;
        }
      }
      for (const segment of pathSegments) {
        if (/^[A-Za-z0-9]+$/.test(segment) && !['users', 'profile', 'maitra', 'sso-login'].includes(segment)) {
          return segment;
        }
      }
      return null;
    },
    updateIframe(id) {
      if (!id) {
        this.iframeUrl = 'about:blank';
        return;
      }
      this.iframeUrl = `https://pf.maitracommodities.com/maitra/sso-login/${id}`;
    },
    displayUrlParams() {
      try {
        const params = this.getUrlParams(window.location.href);
        const id = this.extractIdFromUrl(window.location.href);
        this.urlParams = `<strong>Found parameters:</strong> ${Object.keys(params).length === 0 ? 'None' : JSON.stringify(params)}`;
        this.urlParams += `<br><strong>Extracted ID:</strong> ${id ? id : 'None'}`;
        if (id) {
          this.updateIframe(id);
        }
      } catch (e) {
        this.urlParams = 'Error parsing URL: ' + e.message;
      }
    },
    testWithUrl() {
      if (!this.testUrl) {
        alert('Please enter a URL');
        return;
      }
      try {
        const id = this.extractIdFromUrl(this.testUrl);
        this.urlParams = `<strong>Test URL:</strong> ${this.testUrl}<br><strong>Extracted ID:</strong> ${id ? id : 'None'}`;
        this.updateIframe(id);
      } catch (e) {
        this.urlParams = 'Error parsing URL: ' + e.message;
      }
    },
    testWithDirectId() {
      if (!this.directId) {
        alert('Please enter an ID');
        return;
      }
      this.urlParams = `<strong>Direct ID input:</strong> ${this.directId}`;
      this.updateIframe(this.directId);
    },
  },
};
</script>

<style scoped>
.control-panel {
  background-color: # f5f5f5;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
}
button {
  padding: 8px 15px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #45a049;
}
input[type="text"] {
  padding: 8px;
  width: 60%;
  margin-right: 10px;
}
</style>
