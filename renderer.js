// Import Vuetify 3
const { createApp } = Vue;
const { createVuetify } = Vuetify;

// Create Vuetify instance
const vuetify = createVuetify();

// Create Vue App
const app = createApp({
    data() {
        return {
            message: 'Hello from Vuetify 3 in Electron!',
            puppeteerResult: '',
        };
    },
    methods: {
        async runPuppeteer() {
            const { ipcRenderer } = require('electron');
            const result = await ipcRenderer.invoke('run-puppeteer');
            this.puppeteerResult = result;
        },
    },
    template: `
    <v-app>
      <v-main>
        <div style="text-align: center; margin-top: 20px;">
          <v-container>
            <v-card class="pa-4" outlined>
              <v-card-title class="headline">{{ message }}</v-card-title>
              <v-btn color="primary" @click="runPuppeteer">Run Puppeteer</v-btn>
              <v-alert v-if="puppeteerResult" type="success" class="mt-4">
                {{ puppeteerResult }}
              </v-alert>
            </v-card>
          </v-container>
        </div>
      </v-main>
    </v-app>
  `,
});

// Use Vuetify in the app
app.use(vuetify);
app.mount('#app');
