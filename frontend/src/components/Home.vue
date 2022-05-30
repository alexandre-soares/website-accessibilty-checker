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
          <div v-if="showActionsButtons">
            <button id="clearResults" class="btn btn-danger hideButton">
                Clear Results
            </button>
            <button id="csvBtn" class="btn btn-warning hideButton">
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
      <div id="issues" v-html="message"></div>
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
                emptyUrl: `<div class="alert alert-danger" role="alert">Please add an URL</div>`,
                alertMessage: `<div class="alert alert-danger" role="alert">Something went wrong</div>`,
                emptyUrl: `<div class="alert alert-danger" role="alert">Please add an URL</div>`,
                warningMessage: `<div class="alert alert-warning" role="alert">no Issues Found</div>`,
                CsvMessage: `<div class="alert alert-warning" role="alert">CSV not available</div>`,

            }
        },
        methods: {
            // Fetch accessibility issues
            async checkURL() {
                console.log(this.url);
                if (this.url === "") {
                    this.message = this.emptyUrl
                } else {
                    this.isLoading = true
                    this.message = ''

                    axios.get(`/api/test?url=${this.url}`)
                    .then(function (response) {
                        // handle success
                        console.log(response);
                    })
                    .catch(function (error) {
                        // handle error
                        console.log(error);
                    })

                    // const response = await fetch(`/api/test?url=${this.url}`);

                    // console.log(response);

                    // if (response.status !== 200) {
                    //     this.isLoading = false
                    //     this.message = this.alertMessage

                    // } else {
                    //     const { issues } = await response.json();
                    //     console.log(issues);
                    //     // addIssuesToDOM(issues);
                        
                    //     this.isLoading = false

                    //     this.showActionsButtons= true
                    // }
                }
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>