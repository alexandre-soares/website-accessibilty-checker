<template>
     <div class="container-sm">
      <div class="card my-5 p-3 bg-dark text-light">
        <div class="card-body">
          <h2 class="mb-3">Website Accessibility Tester</h2>
          <form id="form" @submit.prevent="checkURL">
            <div class="input-group mb-3">
                <input v-model="url" type="url" id="url" class="form-control" placeholder="Enter a website..."/>
              <button type="submit" class="btn btn-primary">Submit</button>
            </div>
          </form>
          <div v-if="showActionsButtons" class="actions">
            <button id="clearResults" class="btn btn-danger" @click.prevent="clearResults">
                Clear Results
            </button>
            <button id="csvBtn" class="btn btn-warning" @click.prevent="downloadCSV">
                Download Csv
            </button>
          </div>
        </div>
      </div>

      <div class="loader text-center" v-if="isLoading">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <div id="number" v-if="issues.length > 0"><p class="alert alert-warning">{{issues.length}} issues found !</p></div>
      <div id="issues" v-html="message">

      </div>
      <div v-for="issue, index in issues" :key="index">
         <div class="card mb-5">
          <div class="card-body">
            <h4>{{issue.message}}</h4>
            <p class="bg-light p-3 my-3">
              {{issue.context}}
            </p>
            <p class="bg-secondary text-light p-2">
              CODE: {{issue.code}}
            </p>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    import axios from "axios";
    export default {
        name: "Home",
        data() {
            return {
                url: "",
                isLoading: false,
                results: false,
                showActionsButtons: false,
                message: "",
                issues: [],
                emptyUrl: `<div class="alert alert-danger" role="alert">Please add an URL</div>`,
                warningMessage: `<div class="alert alert-warning" role="alert">no Issues Found</div>`,
                CsvMessage: `<div class="alert alert-warning" role="alert">CSV not available</div>`,

            }
        },
        methods: {
            // Fetch accessibility issues
            checkURL() {
                if (this.url === "") {
                    this.message = this.emptyUrl
                } else {
                    this.issues = []
                    this.isLoading = true
                    this.message = ''

                    axios.get(`/api/test?url=${this.url}`).then((response) => {
                        this.issues = response.data.issues
                        this.isLoading = false
                        this.showActionsButtons= true
                    }).catch((error) => {
                        // handle error
                        console.log(error.response.data);
                        this.isLoading = false
                        this.message = `<div class="alert alert-danger" role="alert">${error.response.data}</div>`
                    })
                }
            },
            //Clear results
            clearResults() {
                this.issues = []
                this.message = ""
                this.url = ""
            },
            async downloadCSV() {
                if (this.url === "") {
                    this.message = this.emptyUrl;
                } else {
                    if (this.issues.length === 0) {
                        alert(CsvMessage);
                    } else {
                        const csv = this.issues
                            .map((issue) => {
                            return `${issue.code},${issue.message},${issue.context}`;
                            })
                            .join("\n");

                        const csvBlob = new Blob([csv], { type: "text/csv" });
                        const csvUrl = URL.createObjectURL(csvBlob);
                        const link = document.createElement("a");
                        link.href = csvUrl;
                        link.download = "Accessibility_issues_list_" + this.url.substring(12) + ".csv";
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }
                }
            }
        },
    }
</script>

<style scoped>
.actions {
    display: flex;
    justify-content: center;
    gap: 2rem;
}
</style>