<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col>
        <NuxtLink to='/host/login'>ホストユーザー</NuxtLink>
        <v-btn depressed @click="testSdk">AWS SDK Test</v-btn>
        <v-file-input
          label="file input"
          @change="testUploadedSdk"
          ref="file"
        >
          AWS SDK upload Test
        </v-file-input>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h2>Current Camera</h2>
        <div class="border">
          <vue-web-cam
            ref="webcam"
            :device-id="deviceId"
            width="100%"
            @started="onStarted"
            @stopped="onStopped"
            @error="onError"
            @cameras="onCameras"
            @camera-change="onCameraChange"
          />
        </div>

        <div class="row">
          <div class="col-md-12" style="background-color: white;">
            <select v-model="camera">
              <option selected>-- Select Device --</option>
              <option
                v-for="device in devices"
                :key="device.deviceId"
                :value="device.deviceId"
              >
                {{ device.label }}
              </option>
            </select>
          </div>
          <div class="col-md-12">
            <v-btn @click="onCapture">
              Capture Photo
            </v-btn>
            <v-btn :disabled="!isGetCapture" @click="uploadCapture">
              Upload Camera
            </v-btn>
            <v-btn @click="onStop">
              Stop Camera
            </v-btn>
            <v-btn @click="onStart">
              Start Camera
            </v-btn>
          </div>
        </div>
      </v-col>
      <v-col>
        <div class="col-md-6">
          <h2>Captured Image</h2>
          <figure class="figure">
            <img :src="img" class="img-responsive" />
          </figure>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <img ref="debugImg" :src="imageSrc">
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

@Component({ components: {}})
export default class Index extends Vue {
  text: string = '';
  imageSrc: string = '';
  isUploaded: boolean = false;
  fr: any = '';

  // image server test
  async testSdk() {
    console.log(this.$s3Connect.getTestString());
    
    const num: Number = 1;

    await this.$s3Connect.getImagesList('resized-media');

    const res = await this.$s3Connect.getImage('resized-media', '20201206173714_testuser.jpeg');
    this.imageSrc = URL.createObjectURL(res);
    this.isUploaded = true;
  };

  async testUploadedSdk(file: any) {
    console.log(file);
    if (file !== undefined && file !== null) {
      if (file.name.lastIndexOf('.') <= 0) return
      this.fr = new FileReader();
      // これでheicだろうがなんだろうがbase64データになる
      // this.fr.readAsArrayBuffer(file);
      this.fr.readAsDataURL(file);
      this.fr.addEventListener('load', this.loadedFile);
    }
  }

  async loadedFile () {
    // console.log(this.fr.result);
    // this.imageSrc = this.fr.result;
    const res = await this.$s3Connect.uploadImage('media', this.fr.result);
    console.log(res);
  }

  // web cam test
  '$refs': {
    webcam: any
  };
  img: any = null;
  camera: any = null;
  deviceId: any = null;
  devices: any = [];
  isGetCapture: boolean = false;

  get device() {
    return this.devices.find(
      (n: { deviceId: any }) => n.deviceId === this.deviceId
    );
  }

  @Watch('camera')
  onCameraChanged(val: any) {
    this.deviceId = val
  }

  @Watch('devices')
  onDeviceChanged() {
    const first = this.devices[0]
    if (first) {
      this.camera = first.deviceId
      this.deviceId = first.deviceId
    }
  }
  onCapture() {
    this.img = this.$refs.webcam.capture();
    this.isGetCapture = true;
  }
  onStarted(stream: any) {
    console.log('On Started Event', stream)
  }
  onStopped(stream: any) {
    console.log('On Stopped Event', stream)
  }
  onStop() {
    this.$refs.webcam.stop()
  }
  onStart() {
    this.$refs.webcam.start()
  }
  onError(error: any) {
    console.log('On Error Event', error)
  }
  onCameras(cameras: any) {
    this.devices = cameras
    console.log('On Cameras Event', cameras)
  }
  onCameraChange(deviceId: any) {
    this.deviceId = deviceId
    this.camera = deviceId
    console.log('On Camera Change Event', deviceId)
  }
  async uploadCapture() {
    console.log('uploadCapture');
    const res = await this.$s3Connect.uploadImage('media', this.img);
  }
}
</script>
