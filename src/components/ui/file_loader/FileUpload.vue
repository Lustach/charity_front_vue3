<script setup lang="ts">
import { useField } from "vee-validate";
//Components
import DropZone from "@/components/ui/file_loader/DropZone.vue";
import FilePreview from "@/components/ui/file_loader/FilePreview.vue";
// File Management
import useFileList from "@/components/ui/file_loader/compositions/fileList";
import createUploader from "@/components/ui/file_loader/compositions/fileUploader";
const emit = defineEmits(["updateFiles", "update:modelValue"]);

let { files, addFiles, removeFile } = useFileList();
function onInputChange(e) {
  addFiles(e.target.files);
  e.target.value = null; // reset so that selecting the same file again will still cause it to fire this change
  emit("update:modelValue", files);
  // form.value.files = files
}
// Uploader
const { uploadFiles } = createUploader("YOUR URL HERE");
const props = defineProps(["id", "label", "accept", "uploadTextTip"]);
let { value, errorMessage, handleBlur, handleChange, meta } = useField(
  props.id,
  undefined,
  {
    initialValue: files,
    validateOnValueUpdate: false,
  }
);
value = files;
</script>
<template>
  <div class="file__container">
    <label for="drop-area-id" id="drop-area_label">{{ label }}</label>
    <DropZone
      class="drop-area"
      id="drop-area-id"
      @files-dropped="addFiles"
      #default="{ dropZoneActive }"
    >
      <label :for="id">
        <span v-if="dropZoneActive">
          <span>Перетащите или загрузите файлы</span>
          <span class="smaller">Добавьте</span>
        </span>
        <div v-else-if="!files.length">
          <div class="action">
            <span>Перетащите </span>
            <p class="smaller">
              <strong>или <em>загрузите файлы</em></strong>
            </p>
          </div>
          <p style="text-align: center;">{{uploadTextTip}}</p>
        </div>
        <p class="action" style="padding-bottom: 20px" v-else-if="files.length">
          <span>Добавить ещё</span>
        </p>
        <input type="file" :accept="accept" :id="id" multiple @change="onInputChange" />
      </label>
      <ul class="image-list" v-show="files.length">
        <FilePreview
          v-for="file of files"
          :key="file.id"
          :file="file"
          tag="li"
          @remove="removeFile"
        />
      </ul>
    </DropZone>
  </div>
</template>
<style lang="scss" scoped>
.action {
  display: flex;
  justify-content: center;
  white-space: break-spaces;
  * {
    font-weight: 600 !important;
  }
  em {
    border-bottom: 1px solid var(--vblg-c-primary);
    //   text-decoration: underline;
  }
}

.file__container {
  display: flex;
}

#drop-area_label {
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
  color: var(--vblg-c-primary);
  width: 50%;
}

.drop-area {
  display: flex;
  padding: 0;
  justify-content: center;
  flex-direction: column-reverse;
  color: var(--vblg-c-primary);
  width: 100%;
  //   max-width: 800px;
  margin: 0 auto;
  background: #ffffff55;
  //   box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  transition: 0.2s ease;
  min-height: 76px;
  max-width: 366.11px;
  border: 2px solid #b0ceec;
  border-radius: 10px;
  &[data-active="true"] {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    background: #ffffffcc;
  }
}
label {
  font-size: 36px;
  cursor: pointer;
  display: block;
  span {
    display: block;
  }
  input[type="file"]:not(:focus-visible) {
    // Visually Hidden Styles taken from Bootstrap 5
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    padding: 0 !important;
    margin: -1px !important;
    overflow: hidden !important;
    clip: rect(0, 0, 0, 0) !important;
    white-space: nowrap !important;
    border: 0 !important;
  }
  input[type="file"] {
    &::file-selector-button,
    &::-webkit-file-upload-button {
      display: none;
    }
  }
}
.image-list {
  display: flex;
  list-style: none;
  flex-wrap: wrap;
  padding: 0;
}
.upload-button {
  display: block;
  appearance: none;
  border: 0;
  border-radius: 50px;
  padding: 0.75rem 3rem;
  margin: 1rem auto;
  font-size: 1.25rem;
  font-weight: bold;
  background: #369;
  color: #fff;
  text-transform: uppercase;
}
button {
  cursor: pointer;
}
</style>
