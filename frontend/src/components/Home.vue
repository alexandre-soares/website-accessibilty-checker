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
            <button id="clearResults" class="btn btn-danger">
                Clear Results
            </button>
            <button id="csvBtn" class="btn btn-warning">
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
      <div id="number"></div>
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
                alertMessage: `<div class="alert alert-danger" role="alert">Something went wrong</div>`,
                emptyUrl: `<div class="alert alert-danger" role="alert">Please add an URL</div>`,
                warningMessage: `<div class="alert alert-warning" role="alert">no Issues Found</div>`,
                CsvMessage: `<div class="alert alert-warning" role="alert">CSV not available</div>`,

            }
        },
        methods: {
            // Fetch accessibility issues
            checkURL() {
                console.log(this.url);
                if (this.url === "") {
                    this.message = this.emptyUrl
                } else {
                    this.issues = []
                    this.isLoading = true
                    this.message = ''

                     axios.get(`/api/test?url=${this.url}`).then((response) => {
                        console.log(response.data)
                        this.issues = response.data.issues
                         
                        this.isLoading = false

                        this.showActionsButtons= true
                    }) .catch(function (error) {
                        // handle error
                        console.log(error);
                        this.isLoading = false
                        this.message = this.alertMessage
                    })
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