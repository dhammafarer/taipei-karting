<template>
  <div class="Edit-details">
    <div class="panel panel-default">

      <div class="panel-heading">
        <h3 class="panel-title">
          Edit Race Details
        </h3>
      </div>

      <div class="panel-body">

        <validator name="validation">
          <div class="form-horizontal">

            <!-- RaceName -->
            <div class="form-group" :class="{ 'has-error': $validation.name.invalid && ($validation.name.touched || showErrors) }">
              <label for="name" class="col-sm-2">Name</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" placeholder="Race name"
                  v-model="race.name"
                  v-validate:name="{ required: true, minlength: 4, maxlength: 20 }"
                >
                <div v-if="showErrors || $validation.name.touched">
                  <span v-if="$validation.name.required" class="help-block">This field is required</span>
                  <span v-if="$validation.name.minlength" class="help-block">Please enter at least 4 characters</span>
                  <span v-if="$validation.name.maxlength" class="help-block">Please enter at most 20 characters</span>
                </div>
              </div>
            </div>

            <!-- RaceDescription -->
            <div class="form-group" :class="{ 'has-error': $validation.description.invalid && ($validation.description.touched || showErrors) }">
              <label for="description" class="col-sm-2">Description</label>
              <div class="col-sm-10">
                <textarea class="form-control" rows="3" placeholder="Race description"
                  v-model="race.description"
                  v-validate:description="{ required: true, maxlength: 60 }"
                >
                </textarea>
                <div v-if="showErrors || $validation.description.touched">
                  <span v-if="$validation.description.required" class="help-block">This field is required</span>
                  <span v-if="$validation.description.maxlength" class="help-block">Please enter at most 60 characters</span>
                </div>
              </div>
            </div>

            <!-- RaceVenue -->
            <div class="form-group" :class="{ 'has-error': $validation.venue.invalid && ($validation.venue.touched || showErrors) }">
              <label for="date" class="col-sm-2">Venue</label>
              <div class="col-sm-6">
                <select class="form-control"
                  v-model="race.venue"
                  v-validate:venue="{ required: true }"
                >
                  <option value="zhongli">Zhongli</option>
                  <option value="other">Other</option>
                </select>
                <div v-if="showErrors || $validation.venue.touched">
                  <span v-if="$validation.venue.required" class="help-block">This field is required</span>
                </div>
              </div>
            </div>

            <!-- RaceCircuit -->
            <div class="form-group">
              <label for="date" class="col-sm-2">Circuit</label>
              <div class="col-sm-6">
                <select class="form-control"
                  v-model="race.circuit"
                >
                  <option disabled>Select Circuit</option>
                  <option>A</option>
                  <option>B</option>
                </select>
              </div>
            </div>

            <!-- RaceDate -->
            <div class="form-group">
              <label for="date" class="col-sm-2">Date</label>
              <div class="col-sm-6">
                <input type="date" class="form-control" placeholder="Race date"
                  v-model="race.date"
                >
              </div>
            </div>

            <!-- RaceTime -->
            <div class="form-group">
              <label for="time" class="col-sm-2">Time</label>
              <div class="col-sm-6">
                <input type="time" class="form-control" placeholder="Race time"
                  v-model="race.time"
                >
              </div>
            </div>

            <!-- RacePhoto -->
            <div class="form-group" :class="{ 'has-error': photoError }">
              <label for="photo" class="col-sm-2">Photo</label>
              <div class="col-sm-10">
                <button class="btn btn-default btn-sm" @click="race.photo = ''" v-show="race.photo">Remove photo</button>
                <input type="file" class="form-control" id="photo-upload"
                  v-else
                  @change="validatePhoto"
                >
                <span class="help-block">{{ photoError }}</span>
              </div>
            </div>

            <!-- RaceWeather -->
            <div class="form-group">
              <label for="date" class="col-sm-2">Weather</label>
              <div class="col-sm-6">
                <select type="date" class="form-control" placeholder="Race date"
                  v-model="race.weather"
                >
                  <option disabled>Select Conditions</option>
                  <option value="clear">Clear</option>
                  <option value="rain">Rain</option>
                </select>
              </div>
            </div>

            <!-- Buttons -->
            <div class="col-sm-10 col-sm-offset-2">
              <button @click="saveRace" class="btn btn-primary" :class="{ 'disabled': $validation.invalid }">Save</button>
              <button @click="setEditorView(null)" class="btn btn-default">Cancel</button>
            </div>

          </div>
        </validator>
      </div>
    </div>

  </div>
</template>

<script>
  import { setEditorView, updateRace } from '../vuex/races/actions'
  import { getCurrentRace } from '../vuex/races/getters'

  export default {
    vuex: {
      actions: {
        setEditorView,
        updateRace
      },
      getters: {
        currentRace: getCurrentRace
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
        race: {},
        formAttempted: false,
        photoError: ''
      }
    },
    methods: {
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

        // Laravel cannot handle patch request with files
        formData.append('_method', 'patch')

        formData.append('name', this.race.name)
        formData.append('description', this.race.description)
        formData.append('venue', this.race.venue)
        formData.append('circuit', this.race.circuit)
        formData.append('date', this.race.date)
        formData.append('time', this.race.time)
        formData.append('weather', this.race.weather)
        if (this.validatePhoto()) formData.append('photo', photo, photo.name)
        else formData.append('photo', this.race.photo)

        this.updateRace(this.race.id, formData)
          .then(()=>this.$router.go({ name: 'races.show', params: {id: this.$route.params.id } }))
      }
    },
    created () {
      this.race = JSON.parse(JSON.stringify(this.currentRace))
    }
  }
</script>
