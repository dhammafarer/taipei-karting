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

            <!-- Race Name -->
            <div class="Floated-form" :class="{ 'has-error': $validation.name.invalid}">
              <label v-if="race.name || $validation.name.invalid" transition="floatUp">
                Name
                <span v-if="$validation.name.required"> is required</span>
                <span v-else>
                  <span v-if="$validation.name.minlength"> must be at least 4 characters</span>
                  <span v-if="$validation.name.maxlength"> must be at most 20 characters</span>
                </span>
              </label>
              <input class="form-field" type="text" placeholder="Race name"
                :class="{ 'has-input': race.name }"
                initial="off"
                detect-change="off"
                v-model="race.name"
                v-validate:name="{ required: true, minlength: 4, maxlength: 20 }"
              >
            </div>

            <!-- Race Description -->
            <div class="Floated-form" :class="{ 'has-error': $validation.description.invalid }">
              <label v-if="race.description || $validation.description.invalid" transition="floatUp">
                Description
                <span v-if="$validation.description.required"> is required</span>
                <span v-else>
                  <span v-if="$validation.description.maxlength"> must be at most 60 characters</span>
                </span>
              </label>
              <textarea class="form-field" rows="3" placeholder="Race description"
                :class="{ 'has-input': race.description }"
                initial="off"
                detect-change="off"
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
              <label v-if="race.venu" transition="floatUp">
                Venue
              </label>
              <select type="date" class="form-field"
                v-model="race.venue"
              >
                <option disabled value="">Venue</option>
                <option value="zhongli">Zhongli</option>
                <option value="other">Other</option>
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
          this.photoError = ' must be an image'
          return false
        }
        if (photo && photo.size > 1024000) {
          this.photoError = ' must be smaller than 1MB'
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
