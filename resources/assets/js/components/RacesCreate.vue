<template>
  <div class="Races-create">
    <div class="panel panel-default">

      <div class="panel-heading">
        <h3 class="panel-title">
          Create New Race
          <span @click="cancel" class="Races-create__x pull-right">&times</span>
        </h3>
      </div>

      <div class="panel-body">

        <validator name="validation">
          <div class="form-horizontal">

            <!-- Race Name -->
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

            <!-- Race Description -->
            <div class="form-group" :class="{ 'has-error': $validation.description.invalid && ($validation.description.touched || showErrors) }">
              <label for="description" class="col-sm-2">Description</label>
              <div class="col-sm-10">
                <textarea class="form-control" rows="3" placeholder="Race description"
                  v-model="race.description"
                  v-validate:description="{ maxlength: 60 }"
                >
                </textarea>
                <div v-if="showErrors || $validation.description.touched">
                  <span v-if="$validation.description.maxlength" class="help-block">Please enter at most 60 characters</span>
                </div>
              </div>
            </div>

            <!-- Race Venue -->
            <div class="form-group">
              <label for="date" class="col-sm-2">Venue</label>
              <div class="col-sm-6">
                <select type="date" class="form-control" placeholder="Race date"
                  v-model="race.venue"
                >
                  <option selected value="zhongli">Zhongli</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <!-- Race Date -->
            <div class="form-group">
              <label for="date" class="col-sm-2">Date</label>
              <div class="col-sm-6">
                <input type="date" class="form-control" placeholder="Race date"
                  v-model="race.date"
                >
              </div>
            </div>

            <!-- Race Time -->
            <div class="form-group">
              <label for="time" class="col-sm-2">Time</label>
              <div class="col-sm-6">
                <input type="time" class="form-control" placeholder="Race time"
                  v-model="race.time"
                >
              </div>
            </div>

            <!-- Race Photo -->
            <div class="form-group" :class="{ 'has-error': photoError }">
              <label for="photo" class="col-sm-2">Photo</label>
              <div class="col-sm-10">
                <input @change="validatePhoto" type="file" class="form-control" id="photo-upload">
                <span class="help-block">{{ photoError }}</span>
              </div>
            </div>

            <!-- Photo Preview -->
            <div class="Photo-preview" v-if="photoPreview">
              <img :src="photoPreview" alt="Photo preview...">
            </div>

            <!-- Buttons -->
            <div class="col-sm-10 col-sm-offset-2">
              <button @click="saveRace" class="submit" :class="{ 'loading': loading }">Save</button>
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

  export default {
    name: "RacesCreate",
    vuex: {
      actions: {
        createRace
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
        race: { name: '', description: '', venue: '', date:'', time:'', photo: '' },
        formAttempted: false,
        photoError: '',
        photoPreview: '',
        loading: false
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
        if (photo && photo.size > 1024000) {
          this.photoError = 'Maximum file size is 1MB'
          console.log(this.photoError)
          return false
        }

        this.previewPhoto()
        return true
      },
      previewPhoto () {
        let photo = document.getElementById('photo-upload').files[0]
        let reader = new FileReader()
        reader.addEventListener('load', () => this.photoPreview = reader.result)
        if (photo) {
          console.log('reading photo')
          reader.readAsDataURL(photo)
        }
      },
      saveRace () {
        if (this.formInvalid) {
          this.formAttempted = true
          return false
        }
        this.loading = true

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
          .catch(() => this.loading = false)
      },
      cancel () {
        this.$router.go({ name: 'races.index' })
      }
    },
  }
</script>

<style>
  .Races-create__x {
    cursor: pointer;
  }

  .Photo-preview {
    text-align: center;
  }

  .Photo-preview img {
    max-height: 200px;
    max-width: 100%;
  }
</style>
