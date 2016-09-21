<template>
  <div class="Races-create">
    <div class="Panel">

      <div class="Panel__Heading">
        <div class="Panel__Title">
          Create New Race
        </div>
      </div>

      <div class="Panel__Body">

        <validator name="validation">

            <!-- Race Name -->
            <div class="Floated-form" :class="{ 'has-error': $validation.name.invalid && (showErrors || $validation.name.dirty) }">
              <label v-if="race.name || ($validation.name.invalid && (showErrors || $validation.name.dirty))" transition="floatUp">
                Name
                <span v-if="$validation.name.required"> is required</span>
                <span v-else>
                  <span v-if="$validation.name.minlength"> must be at least 4 characters</span>
                  <span v-if="$validation.name.maxlength"> must be at most 20 characters</span>
                </span>
              </label>
              <input class="form-field" type="text" placeholder="Race name"
                :class="{ 'has-input': race.name }"
                v-model="race.name"
                v-validate:name="{ required: true, minlength: 4, maxlength: 20 }"
              >
            </div>

            <!-- Race Description -->
            <div class="Floated-form" :class="{ 'has-error': $validation.description.invalid && (showErrors || $validation.description.dirty)}">
              <label v-if="race.description || ($validation.description.invalid && (showErrors || $validation.description.dirty))" transition="floatUp">
                Description
                <span v-if="$validation.description.required"> is required</span>
                <span v-else>
                  <span v-if="$validation.description.maxlength"> must be at most 60 characters</span>
                </span>
              </label>
              <textarea class="form-field" rows="3" placeholder="Race description"
                :class="{ 'has-input': race.description }"
                v-model="race.description"
                v-validate:description="{ required: true, maxlength: 60 }"
              >
              </textarea>
            </div>

            <!-- Race Date -->
            <div class="Floated-form">
              <label v-if="race.date">
                Date
              </label>
              <input class="form-field" type="text" placeholder="Race date"
                :class="{ 'has-input': race.date }"
                onfocus="this.type = 'date'"
                onblur="this.type = 'text'"
                v-model="race.date"
              >
            </div>

            <!-- Race Time -->
            <div class="Floated-form">
              <label v-if="race.time">
                Time
              </label>
              <input class="form-field" type="text" placeholder="Race time"
                :class="{ 'has-input': race.time }"
                onfocus="this.type = 'time'"
                onblur="this.type = 'text'"
                v-model="race.time"
              >
            </div>

            <!-- Race Venue -->
            <div class="Floated-form">
              <label v-if="race.venue" transition="floatUp">
                Venue
              </label>
              <select type="date" class="form-field"
                :class="{ 'has-input': race.venue }"
                v-model="race.venue"
              >
                <option disabled value="">Venue</option>
                <option value="zhongli">Zhongli</option>
                <option value="other">Other</option>
              </select>
            </div>

            <!-- Race Circuit -->
            <div class="Floated-form">
              <label v-if="race.circuit" transition="floatUp">
                Circuit
              </label>
              <select type="date" class="form-field"
                :class="{ 'has-input': race.circuit }"
                v-model="race.circuit"
              >
                <option disabled value="">Circuit</option>
                <option>A</option>
                <option>B</option>
              </select>
            </div>

            <!-- Race Weather -->
            <div class="Floated-form">
              <label v-if="race.weather" transition="floatUp">
                Weather
              </label>
              <select type="date" class="form-field"
                :class="{ 'has-input': race.weather }"
                v-model="race.weather"
              >
                <option disabled value="">Weather</option>
                <option value="clear">Clear</option>
                <option value="rain">Rain</option>
              </select>
            </div>

            <!-- Race Photo -->
            <div class="Floated-form" :class="{ 'has-error': photoError }">
              <label for="photo">
                Photo
                <span>{{ photoError }}</span>
              </label>
              <input @change="validatePhoto" class="form-field has-input" type="file" id="photo-upload">
            </div>

            <!-- Photo Preview -->
            <div class="Photo-preview" v-if="photoPreview">
              <img :src="photoPreview" alt="Photo preview...">
            </div>

            <!-- Buttons -->
            <button @click="saveRace" class="Btn Btn--submit" :class="{ 'loading': loading }">Save</button>

        </validator>
      </div>
    </div>

  </div>
</template>

<script>
  import { createRace } from '../vuex/races/actions'
  import { addNotification } from '../vuex/notifications/actions'

  export default {
    name: "RacesCreate",
    vuex: {
      actions: {
        createRace,
        addNotification
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
        race: { name: '', description: '', venue: '', circuit: '', weather: '', date:'', time:'', photo: '' },
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
          this.photoError = ' must be an image'
          return false
        }
        if (photo && photo.size > 2048000) {
          this.photoError = ' must be smaller than 2MB'
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
          this.addNotification({ title: 'Fail!', body: 'Your form contains errors.', type: 'danger' })
          this.formAttempted = true
          return false
        }
        this.loading = true

        let photo = document.getElementById('photo-upload').files[0]
        let formData = new FormData()

        formData.append('name', this.race.name)
        formData.append('description', this.race.description)
        formData.append('venue', this.race.venue)
        formData.append('circuit', this.race.circuit)
        formData.append('weather', this.race.weather)
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
  .Photo-preview {
    text-align: center;
  }

  .Photo-preview img {
    max-height: 200px;
    max-width: 100%;
  }
</style>
