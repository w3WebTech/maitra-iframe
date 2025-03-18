<template>
    <div>
    
      <div ref="" class="iframe-container">
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
        iframeUrl: 'https://pf.maitracommodities.com/maitra/sso-login/VIN001', // Replace with your desired URL
      };
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
