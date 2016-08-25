<template>
  <div class="Drivers-create">
    <div class="panel panel-default">

      <div class="panel-heading">
        <h3 class="panel-title">
          Create New Driver
          <span @click="cancel" class="Races-create__x pull-right">&times</span>
        </h3>
      </div>

      <div class="panel-body">

        <validator name="validation">
          <div class="form-horizontal">

            <!-- Driver Name -->
            <div class="form-group" :class="{ 'has-error': $validation.name.invalid && ($validation.name.touched || showErrors) }">
              <label for="name" class="col-sm-2">Name</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" placeholder="Race name"
                  v-model="driver.name"
                  v-validate:name="{ required: { rule: true }, minlength: { rule: 2 }, maxlength: { rule: 20 }, unique: { rule: true, initial: 'off' } }"
                >
                <span v-if="checking" class="help-block">checking...</span>
                <div v-if="showErrors || $validation.name.touched">
                  <span v-if="$validation.name.required" class="help-block">This field is required</span>
                  <span v-if="$validation.name.minlength" class="help-block">Please enter at least 2 characters</span>
                  <span v-if="$validation.name.maxlength" class="help-block">Please enter at most 20 characters</span>
                  <span v-if="$validation.name.unique" class="help-block">This name is not available</span>
                </div>
              </div>
            </div>

            <!-- Driver Country -->
            <div class="form-group" :class="{ 'has-error': $validation.country.invalid && ($validation.country.touched || showErrors) }">
              <label for="date" class="col-sm-2">Country</label>
              <div class="col-sm-6">
                <select class="form-control"
                  v-model="driver.country"
                  v-validate:country="{ minlength: 1 }"
                >
                  <option disabled selected value="">Select Country</option>
                  <option v-for="country in countries" value="{{ country.ccode }}">{{ country.cname }}</option>
                </select>
                <div v-if="showErrors || $validation.country.touched">
                  <span v-if="$validation.country.minlength" class="help-block">This field is required</span>
                </div>
              </div>
            </div>

            <!-- Driver Country -->
            <div class="form-group" :class="{ 'has-error': $validation.name.invalid && ($validation.name.touched || showErrors) }">
              <label for="name" class="col-sm-2">Birthday Month</label>
              <div class="col-sm-10">
                <input type="number" min="0" max="12" class="form-control" placeholder="month"
                  v-model="driver.month"
                  v-validate:month="{ required: true, min: 0, max: 12 }"
                >
                <div v-if="showErrors || $validation.name.touched">
                  <span v-if="$validation.name.min" class="help-block">Please enter a number between 0 and 12</span>
                  <span v-if="$validation.name.max" class="help-block">Please enter a number between 0 and 12</span>
                </div>
              </div>
            </div>

            <!-- Driver Photo -->
            <div class="form-group" :class="{ 'has-error': photoError }">
              <label for="photo" class="col-sm-2">Photo</label>
              <div class="col-sm-10">
                <input @change="validatePhoto" type="file" class="form-control" id="photo-upload">
                <span class="help-block">{{ photoError }}</span>
              </div>
            </div>

            <!-- Buttons -->
            <div class="col-sm-10 col-sm-offset-2">
              <button @click="saveRace" class="btn btn-primary" :class="{ 'disabled': $validation.invalid }">Save</button>
              <button @click="cancel" class="btn btn-default">Cancel</button>
            </div>

          </div>
        </validator>
      </div>
    </div>

  </div>
</template>

<script>
  import { createRace } from '../vuex/races/actions'
  import countries from '../utilities/countries'
  import R from 'ramda'
  import driver from '../api/driver.js'

  export default {
    name: "RacesCreate",
    vuex: {
      actions: {
        createRace
      }
    },
    validators: {
      unique (val) {
        console.log('checking unique')
        this.vm.checking = true
        return driver.checkName(val.trim()).then(this.vm.checking = false)
          .catch(json => Promise.reject(new ValidationError(json.message)))
      }
    },
    computed: {
      showErrors () {
        return (this.formAttempted && this.$validation.invalid) ? true : false
      },
      formInvalid () {
        return this.$validation.invalid
      }
    },
    data () {
      return {
        countries: countries,
        checking: false,
        driver: { name: '', country: '', month: '', photo: '' },
        formAttempted: false,
        photoError: ''
      }
    },
    methods: {
      intCountries () {
        return '<option>test</option>,<option>test2</option>'
      },
      validatePhoto () {
        let photo = document.getElementById('photo-upload').files[0]

        this.photoError = ''

        if (!photo) return false
        if (photo && !photo.type.match('image.*')) {
          this.photoError = 'Uploaded file must be an image'
          return false
        }
        if (photo && photo.size > 2048000) {
          this.photoError = 'Maximum file size is 2MB'
          console.log(this.photoError)
          return false
        }

        return true
      },
      saveRace () {
        if (this.formInvalid) {
          this.formAttempted = true
          return false
        }

        let photo = document.getElementById('photo-upload').files[0]
        let formData = new FormData()

        formData.append('name', this.race.name)
        formData.append('description', this.race.description)
        formData.append('venue', this.race.venue)
        formData.append('date', this.race.date)
        formData.append('time', this.race.time)
        if (this.validatePhoto()) formData.append('photo', photo, photo.name)

        this.createRace(formData)
          .then(() => this.$router.go({ name: 'races.index' }))
      },
      cancel () {
        this.$router.go({ name: 'races.index' })
      }
    }
  }
</script>

<style>
  .Races-create__x {
    cursor: pointer;
  }
</style>
