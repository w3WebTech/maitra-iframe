<template>
  <div>
    <div ref="iframeContainer" class="iframe-container">
      <iframe
        ref="iframe"
        :src="iframeUrl"
        frameborder="0"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      iframeUrl: '', // Initialize as an empty string
    };
  },
  created() {
    // Check if clientCode is available in the route parameters
    const clientCode = this.$route.params.clientCode;
    // Set the iframeUrl based on the clientCode
    // this.iframeUrl = clientCode 
    //   ? `https://pf.maitracommodities.com/maitra/sso-login/${clientCode}` 
    //   : 'https://pf.maitracommodities.com/maitra/sso-login/VIN001'; 
      this.iframeUrl ='https://pf.maitracommodities.com/maitra/sso-login/VIN001'; 
  },
  methods: {
    toggleFullScreen() {
      const iframeContainer = this.$refs.iframeContainer;
      if (!document.fullscreenElement) {
        iframeContainer.requestFullscreen().catch(err => {
          console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
      } else {
        document.exitFullscreen();
      }
    },
  },
};
</script>

<style scoped>
.iframe-container {
  width: 100%;
  height: 100vh; /* Set to full viewport height */
  position: relative;
}

iframe {
  width: 100%;
  height: 100%; /* Take full height of the container */
  border: none;
}
</style>
